const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('brtyper', { title: 'Braille Yazma Uygulaması' });
});

module.exports = router;
