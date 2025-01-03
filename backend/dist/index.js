"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const template_1 = __importDefault(require("./routes/template"));
const chat_1 = __importDefault(require("./routes/chat"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.appendHeader('Content-Type', 'application/json');
    next();
});
app.use('/template', template_1.default);
app.use('/chat', chat_1.default);
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
