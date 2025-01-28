const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Hugging Face API URL ve anahtarınızı burada ayarlayın
const API_URL = 'https://api-inference.huggingface.co/models/dbmdz/bert-base-turkish-cased';
const API_KEY = process.env.HF_TOKEN;


router.get('/generate', async (req, res) => {
    try {
        console.log('Hugging Face API çağrısı başlatılıyor...'); // Hata ayıklama için
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: "Türkçe bir cümle üret",
                parameters: { max_length: 50 }
            })
        });

        console.log('Hugging Face API yanıtı alındı.'); // Hata ayıklama için
        const data = await response.json();
        console.log('API Yanıt Verisi:', data); // API'den dönen veriyi kontrol edin

        if (response.ok && data.length > 0) {
            console.log('Cümle başarıyla üretildi:', data[0].generated_text); // Üretilen cümleyi kontrol edin
            res.json({ text: data[0].generated_text });
        } else {
            console.error('Cümle üretilemedi:', data); // Üretilemeyen durumlar için hata mesajı
            res.status(500).json({ error: 'Cümle üretilemedi' });
        }
    } catch (error) {
        console.error('Hata oluştu:', error); // Sunucu tarafında meydana gelen hataları yakalayın
        res.status(500).json({ error: error.message });
    }
});

router.get('/', (req, res) => {
    console.log('Ana sayfa yüklendi.'); // Ana sayfanın yüklendiğini kontrol edin
    res.render('brreader', { title: 'Okuma' });
});

module.exports = router;
