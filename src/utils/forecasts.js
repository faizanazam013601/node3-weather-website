const request = require('request');
const forecasts = (latitude,longitude,callback)=>{
  const url ="http://api.weatherstack.com/current?access_key=dda2f5fbc7f8c788847bfd761e710602&query="+latitude+","+longitude;
  //console.log(url);
    //debugger
    //callback(url,undefined);
    request({url:url,json:true}, (error,response)=>{
      if(error){
        //console.log("phew!!!");
        callback("phew!!!",undefined);
      }
      else if(response.body.error){
        //console.log("invalid city name");
        callback(response.body.error.info,undefined);
      }
      else{
        //console.log("Latitude:"+response.body.features['0'].center['0']+" and Longitude:"+ response.body.features['0'].center['1']);
        callback(undefined,{
          'weather_descriptions':response.body.current.weather_descriptions['0'],
          'temperature':response.body.current.temperature,
          'feelslike':response.body.current.feelslike
        });
      }
    })


}

module.exports = forecasts
