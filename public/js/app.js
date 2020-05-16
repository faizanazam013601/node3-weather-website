console.log("client side js file loaded.");

/*fetch("http://puzzle.mead.io/puzzle").then((response)=>{
  response.json().then((data)=>{
      console.log(data);
  });
})*/



const weatherForm = document.querySelector('form');
const search =  document.querySelector('input');
const messageOne =  document.querySelector('#message-1');
const messageTwo =  document.querySelector('#message-2');

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Searching";
  //fetch("http://localhost:3000/weather?address="+location).then((response)=>{
  fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
      //console.log(data.error);
      if(data.error){
        messageOne.textContent = "";
        messageTwo.textContent = data.error;
        //console.log(data.error);
      }
      else{
        messageOne.textContent = data.location+".\nWeather description:"+data.weather_descriptions+"\n FeelsLike:"+data.feelslike+"\n Temparature:"+data.temperature+"\n is_day:"+data.is_day;
        messageTwo.textContent = "";
        /*console.log(data.location);
        console.log(data.weather_descriptions);
        console.log(data.feelslike);
        console.log(data.temperature);*/
      }
    });
  })
  //console.log(location);
});
