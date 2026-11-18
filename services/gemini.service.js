const { model } = require('../config/gemini');
const Produk = require('../models/product.model');

const generateChatResponse = async (userMessage) => {
    try {
        // Mendeteksi otomatis sumber data produk
        let products = [];
        if (typeof Produk.findAll === 'function') {
            products = await Produk.findAll();
        } else if (Array.isArray(Produk)) {
            products = Produk;
        } else if (typeof Produk === 'object') {
            const key = Object.keys(Produk)[0];
            products = Array.isArray(Produk[key]) ? Produk[key] : [];
        }

        // Memformat data produk agar mudah dipahami AI
        const productData = products && products.length > 0 
            ? products.map(p => `- ${p.nama}: Rp${p.harga} (Kategori: ${p.kategori}). Detail: ${p.keunggulan}`).join('\n')
            : 'Belum ada produk.';

        // System Prompt / Guardrail untuk membatasi topik AI
        const systemInstruction = `
            Kamu adalah AI Assistant yang ramah untuk aplikasi web toko Pawon Risra.
            Tugas utamamu HANYA memberikan informasi terkait produk camilan yang ada di aplikasi.
            
            Berikut adalah data produk yang tersedia saat ini:
            ${productData}

            ATURAN KETAT:
            1. Jika pengguna bertanya di luar konteks produk di atas, TOLAK secara sopan dan arahkan pengguna kembali ke topik camilan Pawon Risra.
            2. Berikan jawaban yang singkat, padat, dan ramah.
        `;

        // Memulai sesi obrolan dengan Gemini
        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemInstruction }] },
                { role: "model", parts: [{ text: "Baik, saya mengerti. Saya hanya akan menjawab seputar produk Pawon Risra." }] }
            ],
        });

        const result = await chat.sendMessage(userMessage);
        return result.response.text();

    } catch (error) {
        console.error('Error in Gemini Service:', error);
        throw new Error('Gagal memproses respons dari AI Assistant.');
    }
};

module.exports = { generateChatResponse };