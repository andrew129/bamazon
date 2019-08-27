let mysql = require('mysql');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayItems()
});

function displayItems() {
    console.log("Selecting all products...\n");
    connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].product_name);
        }
    })
    selectItem()
}

function selectItem() {
    connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'id',
                    type: 'list',
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                    },
                    message: 'What is the ID of the product you would like to buy?',
                },
                {
                    type: 'input',
                    message: 'How many would you like to purchase?',
                    name: 'units'
                }
            ]).then(function(answer) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.id) {
                        var chosenItem = results[i];
                        var quantity = chosenItem.stock_quantity
                        var price = chosenItem.price
                        var name = chosenItem.product_name
                        console.log(chosenItem)
                    }
                }
                
                if (quantity >= answer.units) {
                    let units = answer.units
                    fulfillOrder(name, quantity, units, price)
                }
                else {
                    console.log('insufficient quantity!')
                    connection.end()
                }
            })
    })
}

function fulfillOrder(name, quantity, units, price) {   
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity -= units
            },
            {
                product_name: name
            }
        ],
    );
        console.log(quantity)
        console.log('congratulations your order was received successfully' + ', ' +  'Your total cost is: ' + '$' + price * units)     
        connection.end()
}

