var mysql = require("mysql");
var inquirer = require("inquirer");
// connect to mysql localhost
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Sc4rlet008",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for(var i = 0; i < res.length; i++){
        console.log("ID: " + res[i].id + "\nProduct: " + res[i].product_name + "\nDepartment: " 
        + res[i].department_name + "\nPrice: " + res[i].price + "\nQty: " + res[i].stock_quantity + "\n----------------------------------");
    }
    connection.end();
    });
}