const validateChatInput = (req, res, next) => {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Pesan tidak boleh kosong.'
        });
    }
    
    next();
};

module.exports = validateChatInput;