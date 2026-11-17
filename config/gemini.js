// config/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Gunakan model flash untuk respons teks standar
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

module.exports = { model };