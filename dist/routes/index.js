"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("@koa/multer"));
var router_1 = __importDefault(require("@koa/router"));
var fs_1 = __importDefault(require("fs"));
var router = new router_1.default();
var upload = (0, multer_1.default)();
router.get("/:filename", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, file, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filename = ctx.params.filename;
                return [4 /*yield*/, fs_1.default.promises.readFile("".concat(process.env.MEDIA_PATH || "./media", "/").concat(filename))];
            case 1:
                file = _a.sent();
                ctx.body = file;
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                ctx.status = 404;
                ctx.body = "File not found";
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, file, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (((_a = ctx.cookies.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== process.env.API_KEY)
                    return [2 /*return*/, ctx.throw(401, "Unauthorized")];
                console.log(ctx.request);
                console.log(ctx.request.file);
                console.log(ctx.request.files);
                console.log(ctx.files);
                console.log(ctx.file);
                if (!ctx.request.file)
                    return [2 /*return*/, ctx.throw(400, "No file uploaded")];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                filename = ctx.request.file.filename;
                return [4 /*yield*/, fs_1.default.promises.writeFile("".concat(process.env.MEDIA_PATH || "./media", "/").concat(filename), ctx.request.file.buffer)];
            case 2:
                file = _b.sent();
                ctx.redirect("/".concat(filename));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                ctx.status = 500;
                ctx.body = "Internal server error";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
