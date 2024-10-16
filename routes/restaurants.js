const { Router } = require(`express`);
const Restaurant = require("../models/index")

const restaurantRouter = Router();

restaurantRouter.get(`/`, async (req, res) => {
    const restaurants = await Restaurant.findAll({}); 
    res.json(restaurants);
});

restaurantRouter.get(`/:id`, async (req, res) => {
    const id = req.params.id;
    const foundRestaurant = await Restaurant.findByPk(id);
    res.json(foundRestaurant);
});

restaurantRouter.post(`/`, async (req, res) => {
    const newRestaurant = await Restaurant.create(req.body);
    res.json(newRestaurant);
});

restaurantRouter.put(`/:id`, async (req, res) => {
await Restaurant.update(req.body, {where: {id: req.params.id}});
const foundRestaurant = await Restaurant.findByPk(req.params.id);
res.json(foundRestaurant);
});

restaurantRouter.delete(`/:id`, async (req, res) => {
const foundRestaurant = await Restaurant.findByPk(req.params.id);
await foundRestaurant.destroy();
res.json(foundRestaurant);
});

module.exports = { restaurantRouter }