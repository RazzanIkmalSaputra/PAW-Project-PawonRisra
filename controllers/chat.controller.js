// controllers/chat.controller.js
const geminiService = require('../services/gemini.service');

const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        
        // Panggil service untuk mendapatkan jawaban dari Gemini
        const reply = await geminiService.generateChatResponse(message);
        
        res.status(200).json({
            success: true,
            data: { reply }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server atau layanan Gemini sedang tidak tersedia.'
        });
    }
};

module.exports = { handleChat };