const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
// const expressHbs = require('express-handlebars');
const rootDir = require("./util/path");

const app = express();

// set pug template handlebars
// app.engine('hbs',
//             expressHbs.engine({
//               layoutsDir:'views/layouts/',
//               defaultLayout: 'main-layout',
//               extname: 'hbs'
//           })
//         );
// set pug template engine
app.set("view engine", "ejs");
//app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);
