const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

// Code for Express Restaurant Part 1

app.get(`/restaurants`, async (req, res) => {
    const restaurants = await Restaurant.findAll(); 
    res.send(restaurants);

    // The programme works using the above code, the soution gives the following code but does not explain the requirement for {} inside the findAll function or calling the .json() method instead of .send(). 

    // const restaurants = await Restaurant.findAll({});
    // res.json(restaurants);
});

module.exports = app;