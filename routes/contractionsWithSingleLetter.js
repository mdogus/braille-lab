const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET single letter contractions page. */
router.get('/', function (req, res, next) {
    const jsonPath = path.join(__dirname, '..', 'public', 'src', 'braille_contractions_single.json');
    // Read the JSON file
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        try {
            const charMap = JSON.parse(data);
            res.render('contractionsWithSingleLetter', {
                title: 'BrailLab | Bir Harfli Kısaltmalar',
                charMap: charMap
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    });
});

module.exports = router;
