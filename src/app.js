const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

// Code for Express Restaurant Part 1

app.get(`/restaurants`, async (req, res) => {
    const restaurants = await Restaurant.findAll(); 
    res.send(restaurants);

//     // The programme works using the above code, the soution gives the following code but does not explain the requirement for {} inside the findAll function or calling the .json() method instead of .send(). 

//     // const restaurants = await Restaurant.findAll({});
//     // res.json(restaurants);
});

// Code for Express Restaurant Part 2

app.get(`/restaurants/:id`, async (req, res) => {
    const id = req.params.id;
    const foundRestaurant = await Restaurant.findByPk(id);
    res.json(foundRestaurant);
});

// Code for Express Restaurant Part 3

app.use(express.json());
app.use(express.urlencoded());

app.post(`/restaurants`, async (req, res) => {
        const newRestaurant = await Restaurant.create(req.body);
        res.json(newRestaurant);
});

app.put(`/restaurants/:id`, async (req, res) => {
    await Restaurant.update(req.body, {where: {id: req.params.id}});
    const foundRestaurant = await Restaurant.findByPk(req.params.id);
    res.json(foundRestaurant)
})

app.delete(`/restaurants/:id`, async (req, res) => {
    const foundRestaurant = await Restaurant.findByPk(req.params.id);
    await Restaurant.destroy({where: {id: req.params.id}});
    // await foundRestaurant.destroy();
    res.json(foundRestaurant)
})

module.exports = app;