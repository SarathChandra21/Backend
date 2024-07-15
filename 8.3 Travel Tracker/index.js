import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "dsc210903",
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkvisited(){
  const result = await db.query("SELECT * FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkvisited();
  res.render("index.ejs", {countries: countries, total: countries.length});
});

app.post("/add", async(req, res) => {
  const country = req.body.country;
  const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [country.toLowerCase()]);
  if(result.rows.length!==0){
    const country_code = result.rows[0].country_code;
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [country_code]);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
