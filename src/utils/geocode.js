const request = require('request');

const geocode = (address,callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZmFpemFuYXphbSIsImEiOiJjazlwOHBoZzkwODF2M25wbjlhNDB5eW1uIn0.U92ml4WgGyyigdd66JkZZA&limit=1";

    request({url:url,json:true}, (error,response)=>{
      if(error){
        //console.log("phew!!!");
        callback("phew!!!",undefined);
      }
      else if(response.body.features.length==0){
        //console.log("invalid city name");
        callback("invalid city name",undefined);
      }
      else{
        //console.log("Latitude:"+response.body.features['0'].center['0']+" and Longitude:"+ response.body.features['0'].center['1']);
        callback(undefined,{
          'Latitude':response.body.features['0'].center['1'],
          'Longitude':response.body.features['0'].center['0'],
          'location':response.body.features['0'].place_name,
        });
      }
    })

}



module.exports = geocode
