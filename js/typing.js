const words = [
  "creative designs",
  "modern websites",
  "web applications",
  "beautiful UIs",
  "digital experiences",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
  const currentWord = words[wordIndex];
  const typedTextElement = document.getElementById("typed-text");

  if (isDeleting) {
    // Remove characters
    typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    // Add characters
    typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 150;
  }

  // When word is complete
  if (!isDeleting && charIndex === currentWord.length) {
    // Pause before deleting
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next word
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 500;
  }

  setTimeout(type, typingSpeed);
}

// Start typing when page loads
document.addEventListener("DOMContentLoaded", type);
