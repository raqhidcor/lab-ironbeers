//Variables

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


//Middleware for the view engine

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res)=>{
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(error => console.log(error));
})

app.get('/randombeer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beersFromApi => res.render('randombeer',{beersFromApi}))
  .catch(error => console.log(error));
})
 



app.listen(3000, () => console.log('🏃‍ on port 3000'));
