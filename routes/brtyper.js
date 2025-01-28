const express = require('express');
const router = express.Router();
//const brailleCharMapForHowTo = require('../public/js/brailleCharMapForHowTo');

router.get('/', (req, res) => {
    res.render('brtyper', { 
        title: 'BrailLab | Braille Yazma Aracı'
        //brailleCharMapForHowTo: JSON.stringify(brailleCharMapForHowTo)
    });
});

module.exports = router;
