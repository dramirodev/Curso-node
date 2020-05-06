const express = require('express');
const hbs = require('hbs');
const helpers = require('./hbs/helpers')
const app = express();

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'David Ramiro'
    });
});
app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(3000)
