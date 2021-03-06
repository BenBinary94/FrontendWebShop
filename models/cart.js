const fs = require('fs');
const path = require('path');

// P Variable ist der aktuelle Pfad gespeichert
const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data',
    'cart.json'
);

module.exports = class Cart {

    static addProduct(id, productPrice) {

        // Datenmodell für die persistente Speicherung der Daten
        let cart = { products: [], totalPrice: 0 };

        // Fetch the previous card
        fs.readFile(p, (err, fileContent) => {

            console.log(`IN Cart.js File Content ${fileContent}`);

            // Falls kein Error beim Einlesen vorliegt
            if (!err) {
     
                // Cart-Konstante wird gefüllt mit den Daten aus der Datei cart.json
                cart = JSON.parse(fileContent);

            } 
     


        // Analyze the card => Find existing products
        const existingProductIndex = cart.products.findIndex(prod => +prod.id == id);
        const existingProduct = cart.products[existingProductIndex];

        let updatedProduct;

        console.log(`IN Cart.js Existing Product Index ${existingProductIndex}`);
        console.log(`IN Cart.js Existing Product ${existingProduct}`);
        
        // Add new product / increase quantity
        if (existingProduct) {

            // Produkt liegt schon im Korb: Die Anzahl wird erhöht
            updatedProduct = { ...existingProduct};             // entsprechendes Produtk
            updatedProduct.qty = updatedProduct.qty + 1;        // Erhöhen der Qty
            cart.products = [...cart.products];                 // 
            cart.products[existingProductIndex] = updatedProduct;

        } else {

            // Neuens Produkt wird zum Einkaufswagen hinzugefügt
            updatedProduct = { id: id, qty: 1 };
            cart.products = [...cart.products, updatedProduct]; // Mit Feature wird es hinzugefügt
        }
        cart.totalPrice = cart.totalPrice + +productPrice; // Hinzufügen des Preises
        //cart.products = [...cart.products]; // Next Gen JS Feature


        // Wagen wird unter p als JSON-String abgespeichert. Errors werden geloggt
        fs.writeFile(p, JSON.stringify(cart), (err) => {
            console.log(err);
        });
        
    });
    }



    // Ein Produkt löschen
    static deleteProduct(id, productPrice) {

        // Fetch the previous card
        fs.readFile(p, (err, fileContent) => {

            if (err) {
                
                // Falls ein Error aufkommt
                return;
            }

            // Mit Next Gen JS, Thread Operator
            const updatedCart = { ...JSON.parse(fileContent) };

            // Das jeweilige Produt herausfinden, das gelöscht werden soll
            const product = updatedCart.products.find(prod => prod.id === id);

            if (!product) {
                return;
            }

            // Die entsprechende Anzahl ermitteln
            const productQty = product.qty;


            // Herausfiltern
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);


            // Reduzieren des gesamten Preises
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            // Wagen wird unter p als JSON-String abgespeichert. Errors werden geloggt
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });

        });

    }

    // Alle Proudkte 
    static getCard(cb) {

         // Fetch the previous card
         fs.readFile(p, (err, fileContent) => {

            const cart = JSON.parse(fileContent);

            if (err) {
                
                // Falls ein Error aufkommt
                cb(null);
            } else {
                cb(cart);
            }

    
        });
    }   


}