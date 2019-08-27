let inquirer = require('inquirer')
let mysql = require('mysql')
let connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

function start() {
    inquirer
        .prompt([
            {
                type: 'rawlist',
                message: 'What would you like to do?',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
                name: 'action'
            }
        ]).then(function(answer) {
            switch (answer.action) {
                case 'View Products for Sale':
                    return viewProducts()

                case 'View Low Inventory':
                    return lowInventory()

                case 'Add to Inventory':
                    return addStock()

                case 'Add New Product':
                    return addProduct()
                
                case 'Exit':
                    return connection.end()
                
                default:
                    break
            }
            connection.end()
        })
}

function confirm() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                message: 'would you like to do something else?',
                name: 'confirm',
                default: true
            }
        ]).then(function(answer) {
            switch (answer.confirm) {
                case true:
                    return start()
                
                case false:
                    return connection.end()

                default:
                    break
            }
        })
        connection.end()
}

function viewProducts() {
    console.log("Selecting all products...\n");
    connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            console.log('id: ' + results[i].item_id);
            console.log('name: ' + results[i].product_name);
            console.log('price: ' + '$' + results[i].price);
            console.log('quantity: ' + results[i].stock_quantity)
            console.log('----------------------------------')
        }
        connection.end() 
    }) 
}

function lowInventory() {
    console.log('Selecting all products with low inventory...' + '\n')
    connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            let quantity = results[i].stock_quantity
            if (quantity < 5) {
                console.log('----------------------------------')
                console.log('id: ' + results[i].item_id);
                console.log('name: ' + results[i].product_name);
                console.log('price: ' + '$' + results[i].price);
                console.log('quantity: ' + quantity)
                console.log('----------------------------------') 
            }
        }
    })
    connection.end()
}

function addStock() {
    connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    type: 'rawlist',
                    message: 'What product would you like to add to?',
                    choices: function() {
                        let choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name)
                        }
                        return choiceArray;
                    },
                    name: 'product'
                },
                {
                    type: 'input',
                    message: 'how many would you like to add?',
                    name: 'number'
                }
            ]).then(function(answer) {
                for (let j = 0; j < results.length; j++) {
                    if (answer.product === results[j].product_name) {
                        var chosenItem = results[j];
                        var quantity = chosenItem.stock_quantity;
                    } 
                }
                connection.query('INSERT INTO products SET ?',
                    {
                        stock_quantity: quantity += answer.number
                    },
                    console.log('The new stock count for ' + chosenItem + 'is ' + quantity)
                )
            })
            connection.end()
    })
}

function addProduct() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of your product',
                name: 'product'   
            },
            {
                type: 'list',
                choices: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                message: 'What is the number id of the product',
                name: 'id'
            },
            {
                type: 'input',
                message: 'What department would this product be categorized by?',
                name: 'department'
            },
            {
                type: 'input',
                message: 'What is the price of your product?',
                name: 'price'
            },
            {
                type: 'input',
                message: 'How many of your product do you have available?',
                name: 'number'
            }
        ]).then(function(answer) {
            connection.query(
                'INSERT INTO products SET ?',
                {
                    item_id: answer.id,
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.number
                },
                function(err) {
                    if (err) throw err;
                    console.log('Your new product was successfully added to the database')
                }
            )
        })
        connection.end()
}

start()
