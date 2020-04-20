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
    


    inquirer.prompt([
        {
            type: "list",
            name: "id",
            message: "What is the ID of the product you'd like to purchase?",
            choices: function(){
                let idChoices = [];

                for(var i = 0; i < res.length; i++){
                    idChoices.push(res[i].id);
                }
                return idChoices; 
            }
        },
        {
            type: "input",
            name: "qty",
            message: "How much would you like to purchase?"
        }
    ]).then(function(answer){
        let itemBought = answer.id - 1;
        let qtyBought = parseInt(answer.qty);
        let total = res[itemBought].price * qtyBought.toFixed(2);
        console.log(total);
        console.log(res[itemBought].stock_quantity);
        if(res.stock_quantity > qtyBought){
            connection.query("UPDATE products SET ? WHERE ?", [
                {stock_quantity: res[itemBought].stock_quantity - qtyBought},
                {id: answer.id}
            ],
            )
        }
        console.log("Success! Your total is $" + total.toFixed(2) + ". Your item(s) will arrive shortly!");
        connection.end();
    })

});   
}