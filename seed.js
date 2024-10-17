const {Item, Menu, Restaurant} = require("./models/index")
const { seedItem, seedMenu, seedRestaurant } = require("./seedData");
const {db} = require("./db/connection")

const syncSeed = async () => {
    await db.sync({force: true});
    await Restaurant.bulkCreate(seedRestaurant)
    // BONUS: Update with Item and Menu bulkCreate
    await Item.bulkCreate(seedItem);
    await Menu.bulkCreate(seedMenu);
}

syncSeed()

module.export = { syncSeed };