const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
require('dotenv').config();

// Hugging Face API için doğru modeli kullanıyoruz
const API_URL = 'https://api-inference.huggingface.co/models/ai-forever/mGPT';
const API_KEY = process.env.HF_TOKEN;

router.get('/generate', async (req, res) => {
    try {
        console.log('🟢 Hugging Face API çağrısı başlatılıyor...');

        // ✅ API Anahtarının Tanımlı Olduğunu Kontrol Et
        if (!API_KEY || API_KEY.trim() === "") {
            console.error("🚨 HATA: API anahtarı eksik veya yanlış!");
            return res.status(500).json({ error: "API anahtarı eksik veya yanlış!" });
        }

        // ✅ API Anahtarını Konsolda Görüntüle (Hata Ayıklama)
        console.log("✅ Authorization Header:", `Bearer ${API_KEY}`);

        // Hugging Face API'ye POST isteği gönderiyoruz
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: "Türkçe bir cümle üret.",
                parameters: { max_length: 50 }
            })
        });

        console.log('🟢 Hugging Face API yanıtı alındı.');
        const data = await response.json();
        console.log("📌 API Yanıtı:", JSON.stringify(data, null, 2));

        // ✅ Yanıtın Beklenen Formatı İçerdiğini Kontrol Et
        if (response.ok && Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty("generated_text")) {
            console.log('✅ Cümle başarıyla üretildi:', data[0].generated_text);
            res.json({ text: data[0].generated_text });
        } else {
            console.error('❌ Cümle üretilemedi:', data);
            res.status(500).json({ error: data.error || 'Cümle üretilemedi' });
        }
    } catch (error) {
        console.error('🔥 Sunucu Hatası:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/', (req, res) => {
    console.log('🟢 Ana sayfa yüklendi.');
    res.render('brreader', { title: 'Okuma' });
});

module.exports = router;
