import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.get("/",(req,res)=>{
    const today = new Date();
    const day = today.getDay();
    var type = "a weekday";
    var adv = "work hard";
    if(day===0 || day===6){
        type = "the weekend";
        adv = "have fun";
    }
    res.render("index.ejs",{
        daytype: type,
        advice : adv
    })
});

app.listen(port, ()=>{
    console.log(`Listening on ${port}.`);
});