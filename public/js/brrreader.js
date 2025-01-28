document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const sentenceDisplay = document.getElementById('sentenceDisplay');

    async function generateSentence() {
        try {
            const response = await fetch('/generate', {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                sentenceDisplay.textContent = data.text;
            } else {
                sentenceDisplay.textContent = 'Bir hata oluştu. Cümle üretilemedi.';
            }
        } catch (error) {
            sentenceDisplay.textContent = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
            console.error('Error:', error);
        }
    }

    // Sayfa yüklendiğinde otomatik olarak cümle üret
    generateSentence();

    // Yenile butonuna basıldığında yeni cümle üret
    generateButton.addEventListener('click', generateSentence);
});
