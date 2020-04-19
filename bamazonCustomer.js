var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
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
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for(var i = 0; i < res.length; i++){
        console.log("ID: " + res[i].id + "\nProduct: " + res[i].product_name + "\nDepartment: " 
        + res[i].department_name + "\nPrice: " + res[i].price + "\nQty: " + res[i].stock_quantity + "\n----------------------------------");
    }
    connection.end();
    });

    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the ID of the product you'd like to purchase?",
            validate: function(value){
                if(isNaN(value) === false && parseInt(value) <= res.length && parseInt(value) > 0){
                    return true; 
                }else{
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "qty",
            message: "How much would you like to purchase?",
            validate: function(value){
                if(isNaN(value)){
                    return false;
                } else{
                    return true;
                }
            }
        }
    ]).then(function(answer){
        let itemBought = (answer.id)-1;
        let qtyBought = parseInt(ans.qty);
        let total = parseFloat(((res[itemBought].price) * qtyBought).toFixed(2));
    
    })

    
}
