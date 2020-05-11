const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode_new.js');
const forecasts = require('./utils/forecasts_new.js');

/*console.log(__dirname);
//console.log(__filename);
console.log(path.join(__dirname,'../public'));*/

const app = express();
const port = process.env.PORT || 4000;

// define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath  = path.join(__dirname,'../templates/partials');

// define handle bars engine and view location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set static dir to server
app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
  //res.send('<h1>Weather</h1>');
  res.render('index',{
    title:'weather-app',
    name:'faizan'
  });
});

app.get('/help',(req, res)=>{
  /*res.send([{
    name:'Faizan',
    age:37
  },{
    name:'Yusuf',
    age:8
  }]);*/
  res.render('help',{
    title:'Help',
    helpText:'Helper files',
    name:'Yusuf'
  });
});

app.get('/about',(req, res)=>{
  //res.send('<h1>About page</h1>');
  res.render('about',{
    title:'About Me',
    name:'Asma'
  });
});

app.get('/weather',(req, res)=>{
  if(!req.query.address){
    return res.send({
      error:'No address provided'
    });
  }

  geocode(req.query.address,(error,{Latitude,Longitude,location} = {})=>{
    //const {Latitude,Longitude,location} = data;
    if(error){
      return res.send({
        error:error
      });
    }
    //console.log('Data',data.Latitude);

    forecasts(Latitude,Longitude,(error,{weather_descriptions,temperature,feelslike,url}={})=>{
      //const {weather_descriptions,temperature,feelslike} = forecastData;
      if(error){
        return res.send({
          error:error
        });
      }
      //console.log('Data',forecastData);
      //console.log(location);
      //console.log(weather_descriptions,temperature,feelslike);
      res.send({
       location:location,
       weather_descriptions: weather_descriptions,
       feelslike:feelslike,
       temperature:temperature,
       url:url
      });
    });

  });

  /*res.send({
      forecast:"windy",
      location:"Mumbai",
      address:req.query.address
  });*/
  /*res.send({
    forecast:"windy",
    location:"Mumbai"
  });*/
});

app.get('/products',(req, res)=>{
  if(!req.query.search){
    return res.send({
      error:'No search term provided'
    });
  }

  console.log(req.query.search);
  res.send({
    products:[]
  });
});

app.get('/help/*',(req, res)=>{
  //res.send('Help article not found');
  res.render('404',{
    title:'404',
    errorMssg:'Help article not found',
    name:'Faizan'
  });
});

app.get('*',(req, res)=>{
  //res.send('404 page');
  res.render('404',{
    title:'404',
    errorMssg:'404 page not found',
    name:'Faizan'
  });
});

app.listen(port, ()=>{
  console.log("Server is up " + port);
});
