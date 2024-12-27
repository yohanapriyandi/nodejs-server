const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(
    'mongodb+srv://yohanapriyandi89:H9oEIGxe8FwKNj1A@cluster0.2mxx4.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(result => {
        const user = new User({
            name: 'Yohan',
            email: 'cepoangkuningan@test.com',
            cart:{
                items: []
            }
        });
        user.save();
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
