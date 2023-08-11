const express=require("express");
const app=require("https");
const body=require("body-parser");
// const t=app();

const x=express();
x.use(body.urlencoded({extended:true}));
x.get("/",function(req,res)
   {  
    res.sendFile(__dirname+"/index.html");   
});
x.post("/",function(req,res){
 console.log(req.body.cityname);

   const city=req.body.cityname;
   const apikey="22c92c38a143fcb92def4cedf6692d00";
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit+"";
    app.get(url,function(response){
     // console.log(response.statusCode);
      response.on("data",function(data){
        const d=JSON.parse(data)
        const r=d.weather[0].description;
        console.log(r);
        
        const f=d.weather[0].icon;
        const icon ="http://openweathermap.org/img/wn/"+f+"@2x.png";
       // console.log(r);
        res.write("<h1>today's weather is </h1> "+ r +"in "+city);
        res.write("<img src="+icon+">");
       
        res.send();
      })
})
    
    })
x.listen(3000,function(){
    console.log("port is running on 3000");
    
})
// 
  
   