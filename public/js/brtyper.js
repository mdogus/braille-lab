import { brailleCharMap } from './brailleCharMap.js';

const allowedKeys = new Set(['s', 'd', 'f', 'j', 'k', 'l', ' ']);
let pressedKeys = new Set();
const textArea = document.getElementById('brailleInput');
const clearButton = document.getElementById('clearButton');

textArea.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (allowedKeys.has(key)) {
        if (key === ' ') {
            pressedKeys.add('space');
        } else {
            pressedKeys.add(key);
        }
        setTimeout(() => {
            const keyCombination = Array.from(pressedKeys).sort().join(',');
            const brailleChar = brailleCharMap[keyCombination] || '';
            if (brailleChar) {
                textArea.value += brailleChar;
                pressedKeys.clear();
            }
        }, 50); // Bekleme süresi 25 milisaniye olarak güncellendi
        event.preventDefault();
    } else if (key.match(/^[a-zğüşiöçı]$/)) {
        // Diğer harf tuşlarını engelle
        event.preventDefault();
    }
});

textArea.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (key === ' ') {
        pressedKeys.delete('space');
    } else {
        pressedKeys.delete(key);
    }
});

clearButton.addEventListener('click', () => {
    textArea.value = '';
});
