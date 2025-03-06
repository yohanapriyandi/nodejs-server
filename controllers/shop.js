const Product = require("../models/product");
const Order = require("../models/order");
const e = require("express");

  exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products =>{
      res.render("shop/index", {
        prods: products,
        pageTitle: "My Shop",
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err)
    }); 
  }
  
  exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products =>{
      res.render("shop/product-lists", {
        prods: products,
        pageTitle: "All products",
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err)
    });            
  };
  

  exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => console.log(err));
  };

  exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((cart) => {
            console.log(cart);
            return cart
                .getProducts()
                .then((products) => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products,
                    });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

  exports.postCart = (req, res, next) => {
   const prodId = req.body.productId;
   let fetchedCart;
   let newQuantity = 1;
   req.user
    .getCart()
    .then((cart) =>{
      fetchedCart = cart;
      return cart.getProducts({where: { id:prodId } });
    })
    .then((products) => {
      let product
      if (products.length > 0) {        
        product = products[0];
      }
      // cek apakah produk sudah ada di cart
      // jika ada, quantity ditambah 1
      // jika tidak, produk ditambahkan ke cart
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);         
    })
    // menambah quantity di cart dengan quantity yang baru apabila
    // produk sudah ada di cart    
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err))
  };

  exports.postCartDeleteProduct = (req, res, next) => { 
    const prodId = req.body.productId;
    req.user
      .getCart()
      .then(cart => {
        return cart.getProducts({ where: { id: prodId } });
      })
      .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => console.log(err));    
  };

  exports.postOrder = (req, res, next) => {
    let fetchedCart
    req.user
      .getCart()
      .then((cart) => {
        fetchedCart = cart;
        return cart.getProducts();
      })
      .then((products) => {
        return req.user
        .createOrder()
        .then(order =>{
          return order.addProduct(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity }
              return product;
          })
        );
        })
        .then((result) => {
          return fetchedCart.setProducts(null);
        })
        .then(result => {
          res.redirect('/orders')          
        })
        .catch((err) => console.log(err));            
        })
      .catch((err) => console.log(err));      
  };

  exports.getOrders = (req, res, next) => {
    req.user
      .getOrders({include: ['products'] })
      .then((orders) => {
        res.render("shop/order", {
          path: "/orders",
          pageTitle: "Your Orders", 
          orders: orders
        });        
      })
      .catch((err) => console.log(err));
  };

  // exports.getCheckout = (req, res, next) => {
  //   res.render("shop/checkout", {
  //     path: "/checkout",
  //     pageTitle: "Checkout", 
  //   });
  // };
