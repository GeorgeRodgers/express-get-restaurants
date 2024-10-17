const { Item } = require('./Item')
const { Menu } = require('./Menu')
const { Restaurant } = require('./Restaurant')

Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu);

Menu.belongsToMany(Item, {through: "MenuItems"})
Item.belongsToMany(Menu, {through: "MenuItems"})

module.exports = { 
    Item,
    Menu,
    Restaurant
};