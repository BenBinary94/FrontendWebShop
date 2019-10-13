const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  
    res.render('admin/add-product', { 
      pageTitle: 'Add Product', 
      path: '/admin/add-product',
      formCSS: true,
      productCSS: true,
      activeAddProduct: true 
    });
  };

exports.postAddProduct =  (req, res, next) => {

    const product = new Product( req.body.title );
    product.save();
    
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {

    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products, 
            hasProducts: products.length > 0, 
            docTitle: 'ShopMop', 
            path: '/', 
            pageTitle: 'Shop',
            activeShop: true,
            activeAddProduct: false 
          });
        });
  };
