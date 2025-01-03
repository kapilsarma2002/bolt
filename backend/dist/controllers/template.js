"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateController = void 0;
const mistral_1 = require("../services/mistral");
const prompts_1 = require("../config/prompts");
const node_1 = require("../config/defaults/node");
const react_1 = require("../config/defaults/react");
const templateController = async (req, res) => {
    if (!req.body.prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
    }
    const prompt = req.body.prompt;
    const type = await (0, mistral_1.getTemplateResponse)(prompt);
    if (type === 'react') {
        res.status(200).json({
            prompts: [prompts_1.BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [react_1.basePrompt]
        });
        return;
    }
    if (type === 'node') {
        res.status(200).json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [node_1.basePrompt]
        });
        return;
    }
    res.status(400).json({ error: 'Invalid response' });
    return;
};
exports.templateController = templateController;
