"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var router_1 = __importDefault(require("@koa/router"));
var routes_1 = __importDefault(require("./routes"));
require("dotenv/config");
var koa_static_1 = __importDefault(require("koa-static"));
var app = new koa_1.default();
var router = new router_1.default();
app.use((0, koa_static_1.default)(process.env.MEDIA_PATH || './media'));
router.get('/hello', function (ctx) {
    ctx.body = 'Hello World!';
});
router.use(routes_1.default.routes(), routes_1.default.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
app.listen(process.env.PORT || 3000, function () { return console.log("Server started on port ".concat(process.env.PORT || 3000)); });
