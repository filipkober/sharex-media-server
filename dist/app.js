"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var router_1 = __importDefault(require("@koa/router"));
var multer_1 = __importDefault(require("@koa/multer"));
var routes_1 = __importDefault(require("./routes"));
require("dotenv/config");
var app = new koa_1.default();
var router = new router_1.default();
var upload = (0, multer_1.default)();
router.get('/hello', function (ctx) {
    ctx.body = 'Hello World!';
});
router.use(routes_1.default.routes(), routes_1.default.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
app.listen(process.env.PORT || 3000, function () { return console.log("Server started on port ".concat(process.env.PORT || 3000)); });
