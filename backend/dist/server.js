"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./data/products"));
var app = express_1.default();
var PORT = 5000;
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
app.listen(PORT, function () { return console.log("Running on Port " + PORT); });
//# sourceMappingURL=server.js.map