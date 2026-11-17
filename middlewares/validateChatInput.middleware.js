// middlewares/validateChatInput.middleware.js
const validateChatInput = (req, res, next) => {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Pesan tidak boleh kosong.'
        });
    }

    if (message.length > 500) {
        return res.status(400).json({
            success: false,
            message: 'Pesan terlalu panjang (maksimal 500 karakter).'
        });
    }

    // Basic sanitization untuk mencegah command aneh
    req.body.message = message.trim();
    next();
};

module.exports = validateChatInput;