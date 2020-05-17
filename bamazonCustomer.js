var mysql = require("mysql");
var inquirer = require("inquirer");

var Table = require("cli-table2");

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

connection.connect();

var display = function(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.log("------------------------");
        console.log("   Welcome to BAMAZON   ");
        console.log("------------------------");
        console.log("");
    
    var table = new Table({
        head: ["Product Id", "Product Description", "Cost"],
        colWidths: [12, 50, 8],
        colAligns: ["center", "left", "right"],
        style: {
            head: ["aqua"],
            compact: true
        }
    });
    for(var i = 0; i < res.length; i++){
        table.push([res[i].id, res[i].products, res[i].price]);
    }
    console.log(table.toString());
    console.log("");
    shopping();
});
}

var shopping = function(){
    inquirer.prompt({
        name: "productToBuy",
        type: "input",
        message: "Please enter the Product ID of the product you'd like to buy"
    }).then(function(answer1){
        var selection = answer1.productToBuy;
        connection.query("SELECT * FROM products WHERE id=?", selection, 
        function(err, res){
            if(err) throw err;
            if(res.length === 0){
                console.log("That item does not exist. Please select a product ID from the list above.");
            }else{
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }).then(function(answer2){
                    var quantity = answer2.quantity;
                    if (quantity > res[0].stock_quantity){
                        console.log("Sorry! We only have " 
                        + res[0].stock_quantity + " in stock!");
                        shopping();
                    }else{
                        //code goes here
                        console.log("");
                        console.log(res[0].products + " purchased!");
                        console.log(quantity + " qty @ $" + res[0].price);

                        var newQuantity = res[0].stock_quantity - quantity;
                        connection.query("UPDATE products SET stock_quantity = " + newQuantity + " WHERE ID = " + res[0].id, function(err, resUpdate){
                            if(err) throw err;
                            console.log("");
                            console.log("Your order has been processed!");
                            console.log("Thank you for shopping with bamazon!");
                            connection.end();
                        })
                    }
                });
            }
        });
    });
}
display();