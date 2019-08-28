drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
    item_id int(10) not null,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price decimal(10, 3) not null,
    stock_quantity int(20) not null,
    product_sales decimal(10, 3) not null
);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (1, 'cordless vacuum', 'household items', 190.99, 80);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (2, 'Mario Kart 25', 'video games', 49.99, 30);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (3, 'couch', 'household items', 399.99, 8);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (4, 'led flashing bluetooth speaker', 'electronics', 25.99, 130);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (5, 'iphone 20', 'electronics', 1499.99, 40);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (6, 'polarized sunglasses', 'fashion', 19.99, 200);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (7, 'orange juice', 'food and drinks', 3.99, 400);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (8, 'himalayan salt lamp', 'home decor', 19.99, 600);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (9, '8k TV', 'electronics', 7999.99, 4);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (10, 'led nighthawk drone', 'electronics', 1200, 13);

create table departments (
    department_id int(10) not null,
    department_name varchar(30) not null,
    over_head_costs int,
)