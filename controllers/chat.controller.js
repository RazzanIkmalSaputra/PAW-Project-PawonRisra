const geminiService = require('../services/gemini.service');

const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        
        const reply = await geminiService.generateChatResponse(message);
        
        res.status(200).json({
            success: true,
            data: { reply }
        });
    } catch (error) {
        console.error('\n=== ERROR DETAIL DARI CHAT CONTROLLER ===');
        console.error(error);
        console.error('===========================================\n');
        
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server atau layanan Gemini sedang tidak tersedia.'
        });
    }
};

module.exports = { handleChat };