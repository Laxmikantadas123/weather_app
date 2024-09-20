const express = require("express");
const dotenv=require("dotenv")
const axios=require("axios")
dotenv.config()
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});


app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apikey="4c689f8a7f30cf7b0b20771613cc35a2"

 
 const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`
 let weather
 let error=null
 try {
    const response=await axios.get(url)
     weather=response.data
 } catch (error) {
    weather=null,
    error="Error, Please try again"
 }
  res.render("index", { weather, error});
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
