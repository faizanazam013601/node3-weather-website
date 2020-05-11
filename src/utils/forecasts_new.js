const request = require('request');
const forecasts = (latitude,longitude,callback)=>{
  const url ="http://api.weatherstack.com/current?access_key=dda2f5fbc7f8c788847bfd761e710602&query="+latitude+","+longitude;
  //console.log(url);
    //debugger
    //callback(url,undefined);
    request({url,json:true}, (error,{body})=>{
      //console.log(response);
      if(error){
        //console.log("phew!!!");
        callback("phew!!!",undefined);
      }
      else if(body.error){
        //console.log("invalid city name");
        callback(body.error.info,undefined);
      }
      else{
        //console.log("Latitude:"+response.body.features['0'].center['0']+" and Longitude:"+ response.body.features['0'].center['1']);
        callback(undefined,{
          'weather_descriptions':body.current.weather_descriptions['0'],
          'temperature':body.current.temperature,
          'feelslike':body.current.feelslike,
          url
        });
      }
    })


}

module.exports = forecasts
