const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "A journey of a thousand miles begins with a single step",
    "To be or not to be that is the question",
    "All that glitters is not gold",
    "The only thing we have to fear is fear itself",
    "A bird in the hand is worth two in the bush",
    "Caught between a rock and a hard place",
    "Closing the barn door after the horse escapes",
    "Do I look like a turnip that just fell off the turnip truck",
    "Don't count your chickens before they hatch",
    "Don't make a mountain out of a molehill",
    "Friends are flowers in the garden of life",
    "The grass is always greener on the other side",
    "Just staying one day ahead of yesterday",
    "The sharper the berry, the sweeter the wine",
    "The squeaky wheel gets the grease",
    "The stronger the breeze the stronger the trees",
    "The way to a man's heart is through his stomach",
    "A weed is no more than a flower in disguise",
    "We'll cross that bridge when we come to it",
    "You can lead a horse to water but you can't make him drink",
    "You can't teach an old dog new tricks",
    "All work and no play robs one of some fun in life",
    "Your car is out of date as soon as it is paid for"
];

let startTime;
let sentence;
const sentenceElement = document.getElementById('sentence');
const inputBox = document.getElementById('input-box');
const startButton = document.getElementById('start-button');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    startButton.addEventListener('click', startGame);
});

function startGame() {
    console.log('Start button clicked');
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceElement.textContent = sentence;
    inputBox.value = '';
    inputBox.disabled = false;
    inputBox.focus();
    startTime = new Date().getTime();
    startButton.disabled = true;

    inputBox.removeEventListener('input', checkInput);
    inputBox.addEventListener('input', checkInput);
}

function checkInput() {
    console.log('Input detected');
    const input = inputBox.value;
    if (input === sentence) {
        endGame();
    }
}

function endGame() {
    console.log('End game');
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000; // time in seconds
    const wordsTyped = sentence.split(' ').length;
    const wpm = Math.round((wordsTyped / timeTaken) * 60);

    const accuracy = calculateAccuracy(sentence, inputBox.value);

    wpmElement.textContent = `WPM: ${wpm}`;
    accuracyElement.textContent = `Accuracy: ${accuracy}%`;

    inputBox.disabled = true;
    startButton.disabled = false;
}

function calculateAccuracy(original, typed) {
    const originalWords = original.split(' ');
    const typedWords = typed.split(' ');

    let correctWords = 0;
    originalWords.forEach((word, index) => {
        if (word === typedWords[index]) {
            correctWords++;
        }
    });

    return Math.round((correctWords / originalWords.length) * 100);
}
