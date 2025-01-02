"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const template_1 = require("../controllers/template");
const templateRouter = (0, express_1.Router)();
templateRouter.post('/', template_1.templateController);
exports.default = templateRouter;
