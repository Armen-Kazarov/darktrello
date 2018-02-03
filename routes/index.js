const listRoutes = require('./list_routes');
module.exports = function(app, db) {
    listRoutes(app, db);
    // Тут, позже, будут и другие обработчики маршрутов
};