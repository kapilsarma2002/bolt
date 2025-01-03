"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const mistral_1 = require("../services/mistral");
const chatController = async (req, res) => {
    if (!req.body.messages) {
        res.status(400).json({ error: 'messages are required' });
        return;
    }
    const messages = req.body.messages;
    const response = await (0, mistral_1.getCodeResponse)(messages);
    res.status(200).json({ error: 'Valid response' });
    return;
};
exports.chatController = chatController;
