const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
require('dotenv').config();

// OpenAI API ayarları
const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_TOKEN;

router.get('/generate', async (req, res) => {
    try {
        console.log('🟢 OpenAI API çağrısı başlatılıyor...');

        // ✅ API Anahtarının Tanımlı Olduğunu Kontrol Et
        if (!API_KEY || API_KEY.trim() === "") {
            console.error("🚨 HATA: API anahtarı eksik veya yanlış!");
            return res.status(500).json({ error: "API anahtarı eksik veya yanlış!" });
        }

        // ✅ API Anahtarını Konsolda Görüntüle (Hata Ayıklama)
        console.log("✅ Authorization Header:", `Bearer ${API_KEY}`);

        // OpenAI API'ye POST isteği gönderiyoruz
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Türkçe bir cümle üret.' }],
                max_tokens: 50
            })
        });

        console.log('🟢 OpenAI API yanıtı alındı.');
        const data = await response.json();
        console.log("📌 API Yanıtı:", JSON.stringify(data, null, 2));

        // ✅ Yanıtın Beklenen Formatı İçerdiğini Kontrol Et
        if (response.ok && Array.isArray(data.choices) && data.choices.length > 0) {
            const text = data.choices[0].message.content.trim();
            console.log('✅ Cümle başarıyla üretildi:', text);
            res.json({ text });
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
