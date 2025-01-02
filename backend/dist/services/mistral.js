"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeResponse = exports.getTemplateResponse = void 0;
require('dotenv').config();
const mistralai_1 = require("@mistralai/mistralai");
const prompts_1 = require("../config/prompts");
const apiKey = process.env.MISTRAL_API_KEY;
const mistral = new mistralai_1.Mistral({ apiKey: apiKey });
const getTemplateResponse = async (prompt) => {
    var _a;
    const res = await mistral.chat.complete({
        model: 'mistral-large-latest',
        messages: [
            {
                role: 'system',
                content: `Return either react or node based on what you think the project should be based on the user's prompt. Return only one word either 'react' or 'node'. Do not return anything else or anything extra.`,
            },
            { role: 'user', content: prompt },
        ],
    });
    return (_a = res.choices) === null || _a === void 0 ? void 0 : _a[0].message.content;
};
exports.getTemplateResponse = getTemplateResponse;
const codeResponse = async () => {
    var _a, e_1, _b, _c;
    const result = await mistral.chat.stream({
        model: 'mistral-large-latest',
        messages: [
            { role: 'system', content: (0, prompts_1.getSystemPrompt)() },
            { role: 'user', content: 'Write code for a simple todo application' },
        ],
    });
    try {
        for (var _d = true, result_1 = __asyncValues(result), result_1_1; result_1_1 = await result_1.next(), _a = result_1_1.done, !_a; _d = true) {
            _c = result_1_1.value;
            _d = false;
            const event = _c;
            const content = event.data.choices[0].delta.content;
            if (content) {
                process.stdout.write(content.toString());
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = result_1.return)) await _b.call(result_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    process.stdout.write('\n');
};
exports.codeResponse = codeResponse;
