"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = __importDefault(require("./config/db"));
var products_1 = __importDefault(require("./data/products"));
dotenv_1.default.config();
db_1.default();
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('API is running....');
});
app.get('/api/products', function (req, res) {
    res.json(products_1.default);
});
app.get('/api/products/:id', function (req, res) {
    var product = products_1.default.find(function (product) { return product._id === req.params.id; });
    product ? res.json(product) : res.json({ msg: 'No existe ese producto' });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    return console.log("Server running in " + process.env.NODE_ENV + " mode, on port " + PORT);
});
//# sourceMappingURL=server.js.map