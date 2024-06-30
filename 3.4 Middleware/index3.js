import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

//Custom Middleware
function logger(req,res,next){
  console.log("Request method: "+ req.method);
  console.log("Request url: ", req.url);
  next(); //-> goes to next miidleware
}

//middlewares start executing before the get,post,put
app.use(logger);
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req,res)=>{
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
