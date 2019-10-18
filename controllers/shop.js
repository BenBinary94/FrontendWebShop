

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products, 
            hasProducts: products.length > 0, 
            docTitle: 'Alle Produkte', 
            path: '/products', 
            pageTitle: 'Alle Produkte',
            activeShop: true,
            activeAddProduct: false 
          });
        });
};

exports.getProduct = (req, res, next) => {

  const prodId = req.params.productID;

  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      
      path: '/products',
      pageTitle: `Product Detail von ${product.title}`,
      product: product

    });
  });
};


// Get Card
exports.getCard = (req, res, next) => {

  res.render('shop/cart', {
      pageTitle: 'Cart',
      path: '/cart'
  });

};

// Post Card
exports.postCard = (req, res, next) => {

  const id = req.body.productID;

  // HOlen des Produkts aus der Produkt DB
  Product.findById(id, (product) => {

    // product wurde über Callback übergeben --> Jetzt hinzufügen zu Karte
    Cart.addProduct(id, product.price);

    //console.log(`IN SHOP Contorller ID ${id}`);
    //console.log(`IN SHOP Contorller Preis ${product.price}`);

  });
  res.redirect('/cart');
  
};

// Get Orders
exports.getOrders = (req, res, next) => {

  res.render('shop/orders', {
      pageTitle: 'Your Orders',
      path: '/orders'
  });

};

// Get Checkout
exports.getCheckout = (req, res, next) => {

  res.render('shop/checkout', {
      pageTitle: 'Checkout',
      path: '/checkout'
  });

};

// GET INDEX
exports.getIndex = (req, res, render) => {

  Product.fetchAll(products => {
    res.render('shop/index', {
        prods: products, 
        hasProducts: products.length > 0, 
        docTitle: 'Index', 
        path: '/', 
        pageTitle: 'Index',
        activeShop: true,
        activeAddProduct: false 
      });
    });
  
};