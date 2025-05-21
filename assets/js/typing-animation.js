document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.typing-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!textElement || !cursorElement) {
        console.error('Typing animation elements not found');
        return;
    }

    const phrases = [
        'Software Engineer',
        'Computer Science Student',
        'Full-Stack Developer',
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        if (isWaiting) return;

        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deleting text
            currentCharIndex--;
            textElement.textContent = currentPhrase.substring(0, currentCharIndex);
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    type();
                }, 500);
                return;
            }
        } else {
            // Typing text
            currentCharIndex++;
            textElement.textContent = currentPhrase.substring(0, currentCharIndex);
            
            if (currentCharIndex === currentPhrase.length) {
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    isDeleting = true;
                    type();
                }, 1500);
                return;
            }
        }

        // Calculate typing speed
        const typingSpeed = isDeleting ? 50 : 100;
        
        setTimeout(type, typingSpeed);
    }

    // Start the typing animation
    type();

    // Handle cursor animation
    setInterval(() => {
        cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
    }, 500);
}); 