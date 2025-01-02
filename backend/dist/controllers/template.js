"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateController = void 0;
const mistral_1 = require("../services/mistral");
const templateController = async (req, res) => {
    if (!req.body.prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
    }
    const prompt = req.body.prompt;
    const type = await (0, mistral_1.getTemplateResponse)(prompt);
    if (type != 'react' && type != 'node') {
        res.status(400).json({ error: 'Invalid response' });
        return;
    }
    res.status(200).json({ type });
    return;
};
exports.templateController = templateController;
