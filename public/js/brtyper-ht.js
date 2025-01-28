//import brailleCharMap from './brailleCharMap.js';
//import brailleCharMapForHowTo from './brailleCharMapForHowTo.js';
import { brailleCharMap, brailleCharMapForHowTo } from './brailleCharMap.js';

document.addEventListener('DOMContentLoaded', () => {
    const testInput = document.getElementById('testInput');
    const charDisplay = document.getElementById('charDisplay');

    const allowedKeys = new Set(['s', 'd', 'f', 'j', 'k', 'l', ' ']);
    let pressedKeys = new Set();
    let keyTimer;

    testInput.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        if (allowedKeys.has(key)) {
            if (key === ' ') {
                pressedKeys.add('space');
            } else {
                pressedKeys.add(key);
            }
            clearTimeout(keyTimer);
            keyTimer = setTimeout(() => {
                const keyCombination = Array.from(pressedKeys).sort().join(',');
                const brailleChar = brailleCharMap[keyCombination] || '';
                if (brailleChar) {
                    testInput.value += brailleChar;
                    charDisplay.textContent = brailleChar;
                }
                pressedKeys.clear();
            }, 50); // Bekleme süresi 25 milisaniye
            event.preventDefault();
        } else if (key.match(/^[a-zğüşiöçı]$/)) {
            // Diğer harf tuşlarını engelle
            event.preventDefault();
        }
    });

    testInput.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase();
        if (key === ' ') {
            pressedKeys.delete('space');
        } else {
            pressedKeys.delete(key);
        }
    });

    // Braille Chars Table
    const brailleCharTable = document.getElementById('brailleCharTable');
    const tableBody = document.createElement('tbody');

    for (const char in brailleCharMapForHowTo) {
        const data = brailleCharMapForHowTo[char];
        console.log(`Char: ${char}, KeyCombination: ${data.keyCombination}, Dots: ${data.dots}`);

        const row = document.createElement('tr');
        const charCell = document.createElement('td');
        const keysCell = document.createElement('td');
        const dotsCell = document.createElement('td');

        // Karakter hücresini doldur
        charCell.textContent = char;
        charCell.className = 'braille-text';
        charCell.setAttribute('aria-label', `Braille karakteri: ${char}`);

        // Tuş kombinasyonları hücresini doldur
        keysCell.textContent = data.keyCombination || 'N/A';
        keysCell.className = 'font-weight-bold';
        keysCell.setAttribute('aria-label', `Tuş kombinasyonu: ${data.keyCombination}`);

        // Noktalar hücresini doldur
        dotsCell.textContent = data.dots || 'N/A';
        dotsCell.className = 'braille-dots';
        dotsCell.setAttribute('aria-label', `Braille noktaları: ${data.dots}`);

        // Satırı tabloya ekle
        row.appendChild(charCell);
        row.appendChild(keysCell);
        row.appendChild(dotsCell);
        tableBody.appendChild(row);
    }

    brailleCharTable.appendChild(tableBody);
});
