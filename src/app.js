const path = require("path");
const hbs = require("hbs");
const express = require("express");
const { BADHINTS } = require("dns");
const forecast = require("./utils/forecast");

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express();
//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//changes where it looks for the views from. Default looks for them in a file named "views", changed that to templates

//Setup static directory to serve
app.use(express.static(publicDirPath));

// app.get('', (req, res) =>{
//     res.send('Hello Express!')
// }) ( commented out bc this is now done using static or dynamic. Index is a special name that express knows to use as the base page)

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Gabrielle",
  });
  //render to render the view we set up using .set. Second value is an object of values for the hbs page to access
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "*.*",
    name: "Gabrielle",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "There is no help for you.",
    name: "Gabrielle",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  forecast(req.query.address, (error, forecastData) => {
    if (error) {
      return res.send({
        error: "error",
      });
    }
    res.send(
      {
        forecast: forecastData,
      address: req.query.address
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  //can only have one response per
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Gabrielle",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Gabrielle",
  });
});

//for setting up static webpages:
// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

//app.com
//app.com/help
// app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
//port 3000 good for local machine dev

//run with nodemon from web-server folder with nodemon src/app.js -e js,hbs
