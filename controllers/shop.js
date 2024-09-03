const Product = require("../models/product");

  exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "My Shop",
        path: "/"
      });
    });
  };

  exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
      res.render("shop/product-lists", {
        prods: products,
        pageTitle: "All Products",
        path: "/product-lists"
      });
    });
  };

  exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart", 
    });
  };

  exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
      path: "/checkout",
      pageTitle: "Checkout", 
    });
  } 