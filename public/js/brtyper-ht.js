
document.addEventListener('DOMContentLoaded', async () => {
    const testInput = document.getElementById('testInput');
    const printCharDisplay = document.getElementById('printCharDisplay');
    const brailleCharDisplay = document.getElementById('brailleCharDisplay');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const perkinsKeysContainer = document.querySelector('.perkins-keys');

    // Key mapping for visual feedback
    const keyMap = {
        's': 'key-s',
        'd': 'key-d',
        'f': 'key-f',
        ' ': 'key-space',
        'j': 'key-j',
        'k': 'key-k',
        'l': 'key-l'
    };

    const allowedKeys = new Set(['s', 'd', 'f', 'j', 'k', 'l', ' ']);
    let pressedKeys = new Set();
    let keyTimer;
    let brailleMap = {};

    // Fetch and prepare data
    try {
        const response = await fetch('/src/braille_alphabetical_chars.json');
        const data = await response.json();

        // Build map: 'd,f' -> { char: '*', printChar: 'ç', dots: '1_2' }
        Object.entries(data).forEach(([key, item]) => {
            const keys = item.keyCombination.split('_');
            const sortedKeyStr = keys.sort().join(',');
            brailleMap[sortedKeyStr] = {
                char: item.character, // For Braille font (e.g., '*')
                printChar: key,       // For Print display (e.g., 'ç')
                dots: item.dots
            };
        });

        // Manual entry for Space
        brailleMap['space'] = { char: ' ', printChar: ' ', dots: '' }; // Space

        console.log('Braille Map Loaded:', brailleMap);
    } catch (error) {
        console.error('Error loading Braille data:', error);
        feedbackMessage.textContent = 'Veri yüklenemedi.';
    }

    // Focus input so we can type
    document.addEventListener('click', () => {
        testInput.focus();
    });
    testInput.focus();

    testInput.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();

        if (allowedKeys.has(key)) {
            if (!pressedKeys.has(key === ' ' ? 'space' : key)) {
                const mapKey = key === ' ' ? 'space' : key;
                pressedKeys.add(mapKey);

                // Visual Highlight: Active (Pressed)
                const elementId = keyMap[key];
                if (elementId) {
                    document.getElementById(elementId).classList.add('active');
                }
            }

            clearTimeout(keyTimer);
            keyTimer = setTimeout(() => {
                const keyCombination = Array.from(pressedKeys).sort().join(',');
                console.log('Attempting combination:', keyCombination);

                const match = brailleMap[keyCombination];

                handleValidation(match, Array.from(pressedKeys));

                // Clear pressed keys set for next input logic
                // But visual reset happens after a delay in handleValidation
                pressedKeys.clear();
            }, 100); // 100ms debounce to catch chords

            event.preventDefault();
        } else if (key.match(/^[a-zğüşiöçı]$/)) {
            event.preventDefault(); // Block other typing
        }
    });

    testInput.addEventListener('keyup', (event) => {
        // We rely on timeout for chord register, so keyup is mostly for visual cleanup 
        // if we weren't continuously holding. 
        // But for Perkins simplified simulator, we usually clear visuals after validation feedback.
        // So we might not strictly need keyup to remove 'active' class immediately if we want to show red/green.
        // Let's leave keyup empty for now or use it to ensure we don't get stuck keys if logic fails.
        const key = event.key.toLowerCase();
        // Just ensuring we don't have stuck keys in logic if needed, but pressedKeys is cleared in timeout.
    });

    function handleValidation(match, keysPressed) {
        // Reset previous feedback classes first
        clearVisualFeedback();

        // Re-apply active class to keys that were part of this chord (since we want to color them)
        keysPressed.forEach(k => {
            const domKey = k === 'space' ? ' ' : k;
            const el = document.getElementById(keyMap[domKey]);
            if (el) el.classList.add('active');
        });

        const srAnnouncer = document.getElementById('sr-announcer');

        if (match) {
            // Success
            showFeedback(true, keysPressed);
            printCharDisplay.textContent = match.printChar;

            brailleCharDisplay.textContent = match.char;

            feedbackMessage.textContent = 'Doğru!';
            feedbackMessage.style.color = 'green';

            // Accessibility Announcement
            // Format dots: e.g. "1_2_4" -> "Noktalar 1, 2, 4"
            let announcement = `${match.printChar}`;
            if (match.dots) {
                const formattedDots = match.dots.replace(/_/g, ', ');
                announcement += `, Noktalar ${formattedDots}`;
            } else if (match.printChar === ' ') {
                announcement = "Boşluk";
            }
            srAnnouncer.textContent = announcement;

        } else {
            // Failure
            showFeedback(false, keysPressed);
            printCharDisplay.textContent = '?';
            brailleCharDisplay.textContent = '?';
            feedbackMessage.textContent = 'Geçersiz Kombinasyon';
            feedbackMessage.style.color = 'red';

            srAnnouncer.textContent = "Geçersiz Kombinasyon";
        }

        // Reset Visuals after delay
        setTimeout(() => {
            clearVisualFeedback();
            // Also remove 'active' class
            document.querySelectorAll('.perkins-key').forEach(el => el.classList.remove('active'));
        }, 500);
    }

    function showFeedback(isValid, keys) {
        keys.forEach(k => {
            const domKey = k === 'space' ? ' ' : k;
            const el = document.getElementById(keyMap[domKey]);
            if (el) {
                if (isValid) {
                    el.classList.add('correct');
                } else {
                    el.classList.add('incorrect');
                }
            }
        });
    }

    function clearVisualFeedback() {
        document.querySelectorAll('.perkins-key').forEach(el => {
            el.classList.remove('correct', 'incorrect');
        });
    }
});
