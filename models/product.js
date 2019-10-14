const fs = require('fs');
const products = [];
const path = require('path');

// P Variable ist der aktuelle Pfad gespeichert
const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data',
    'products.json'
  );


// Zugriff auf die JSON-Datei um die Daten zu speichern
const getProductsFromFile = (cb) => {

    fs.readFile(p, (err, fileContent) => {
      if (err) {
         cb([]);
      } else {
        //console.log(JSON.parse(fileContent));
        cb(JSON.parse(fileContent));
      }
  });  
}

module.exports = class Product {

    constructor(title) {
        this.title = title;
    }

    save() {
        

        // products ist wieder Callback und (Callback-)Funktion wird ausgeführt nachdem die eigentliche Methode ausgeführt wurde
        getProductsFromFile(products => {

                // aktuelles Objekt wird dem Array hinzugefügt
                products.push(this);

                // das aktuelle Objekt wird überschrieben
                fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {

        // cb für Callback 
        getProductsFromFile(cb);

    }
}