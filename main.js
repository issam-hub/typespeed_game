let btn = document.querySelector(".start");
let words = document.querySelector(".words");
let input = document.querySelector(".inp");
let counterNscore = document.querySelector(".counterNscore");
let secondsLeft = document.querySelector(".counterNscore span:first-child");
let levelChoice = document.querySelectorAll("form > input");
let levelPlaceholder = document.querySelector(".ps p > span:first-child");
let secondsPlaceholder = document.querySelector(".ps p > span:nth-child(2)");
let elementLeft = document.querySelector(
    ".counterNscore p:nth-child(2) span:first-child"
);
let totalElements = document.querySelector(
    ".counterNscore p:nth-child(2) span:nth-child(2)"
);

let stat = document.querySelector(".stat");

let EasyWordList = [
    "code",
    "java",
    "mac",
    "game",
    "laugh",
    "fun",
    "time",
    "smile",
    "html",
    "css",
    "key",
    "line",
    "right",
    "php",
    "play",
    "nice",
    "python",
    "tesla",
    "word",
    "score",
];
let NormalWordList = [
    "keyboard",
    "windows",
    "console",
    "searching",
    "president",
    "microphone",
    "pythoneer",
    "javascript",
    "structure",
    "expectable",
    "respectfull",
    "seconds",
    "selection",
    "comments",
    "indexing",
    "evening",
    "nightmare",
    "facebook",
    "ronaldinho",
    "netherlands",
    "typespeed",
];
let HardWordList = [
    "destructuring",
    "unexpectable",
    "helloWorld",
    "translation",
    "frontenddev",
    "anonymized",
    "motherboard",
    "information",
    "conditional",
    "subscribe",
    "perception",
    "acquaintance",
    "performance",
    "participate",
    "contribution",
    "inspiration",
    "understanding",
    "extraterrestrial",
    "comprehensive",
    "consciousness",
    "environnement",
];

levelChoice.forEach((level) => {
    level.onclick = (e) => {
        // enable the start button to get clicked (kicked haha)
        btn.attributes.removeNamedItem("disabled");
        levelChoice.forEach((lvl) => {
            // disable all the radio buttons except the chosen one
            lvl.setAttribute("disabled", "");
        });
        // put the seconds depending on the chosen level
        switch (e.currentTarget.value) {
            case "Easy":
                secondsPlaceholder.textContent = "3";
                break;
            case "Normal":
                secondsPlaceholder.textContent = "4";
                break;
            case "Hard":
                secondsPlaceholder.textContent = "5";
                break;
        }
        // keep the chosen level enable
        e.currentTarget.removeAttribute("disabled");
        // display the level in the ps
        levelPlaceholder.textContent = e.currentTarget.value;
        // give it a color depending on the chosen level
        levelPlaceholder.style.color = e.currentTarget.dataset.color;
    };
});

// create a span to make some words
let span = document.createElement("span");

// make a counter to count the rest words in the words set
let counter = 1;

// variable to check if the player won or not
let checkTrue;
btn.onclick = () => {
    // give some style to the words content
    words.style.cssText = "justify-content: baseline";
    elementLeft.textContent = counter;
    totalElements.textContent = 20;
    levelChoice.forEach((lvl) => {
        if (!lvl.hasAttribute("disabled")) {
            // empty the words content to add new words each time without any conflict
            words.textContent = "";
            // enable the input bar
            input.attributes.removeNamedItem("disabled");
            // auto focus the input
            input.focus();
            input.onkeypress = (event) => {
                if (event.key == "Enter") {
                    // put checkTrue false by default
                    checkTrue = false;
                    // manage creating words
                    wordsCreatingManager(lvl, input);
                    // empty the input on every submit
                    input.value = "";
                    // push the counter as the left elements and always check if it's less then 21 and when it equals stop it on 20
                    elementLeft.textContent = counter < 21 ? counter : 20;
                    // if the player won do:
                    if (checkTrue) {
                        // start over the time counter
                        time = secondsPlaceholder.textContent;
                    }
                    // check win to make sure display congrats and end the game
                    checkWin(lvl);
                }
            };
            // creating words as a start
            wordsCreating(lvl);
            // set a time counter
            let time = secondsPlaceholder.textContent;
            let count = setInterval(() => {
                secondsLeft.textContent = time;
                time = Number(time) - 1;
                if (time < 0) {
                    clearInterval(count);
                    // if player made a fault and the time is over do:
                    if (checkWin(lvl) == false) {
                        // display this message
                        stat.textContent = "Game over :(";
                        // change it's color
                        stat.style.cssText = "display: block; color: red";
                        // re-disable the input bar and the game is done
                        input.setAttribute("disabled", "");
                    }
                }
            }, 1000);
        }
    });

    btn.remove();
    input.before(span);
};

function create_word(level, index) {
    // create word depending on the chosen level
    let span = document.createElement("span");
    switch (level.value) {
        case "Easy":
            span.textContent = EasyWordList[index];
            break;
        case "Normal":
            span.textContent = NormalWordList[index];
            break;
        case "Hard":
            span.textContent = HardWordList[index];
            break;
    }
    return span;
}

function wordsCreating(lvl) {
    // create the word the shows the current input needed word
    span = create_word(lvl, 0);
    // add it before the input
    input.before(span);
    // create the words queue and put it inside words
    for (let i = 0; i < 4; i++) {
        let word = create_word(lvl, i);
        words.appendChild(word);
    }
}

function wordsCreatingManager(lvl, input) {
    switch (lvl.value) {
        case "Easy":
            // if the input value equals the first word in the queue do:
            if (input.value == EasyWordList[0]) {
                // remove the first word from the words set
                EasyWordList.shift();
                input.value = "";
                words.textContent = "";
                // remove the current input needed word
                span.remove();
                // create new words
                wordsCreating(lvl);
                // increase the counter of left words
                counter++;
                checkTrue = true;
            }
            break;
        case "Normal":
            if (input.value == NormalWordList[0]) {
                NormalWordList.shift();
                input.value = "";
                words.textContent = "";
                span.remove();
                wordsCreating(lvl);
                counter++;
                checkTrue = true;
            }
            break;
        case "Hard":
            if (input.value == HardWordList[0]) {
                HardWordList.shift();
                input.value = "";
                words.textContent = "";
                span.remove();
                wordsCreating(lvl);
                counter++;
                checkTrue = true;
            }
    }
}

function checkWin(lvl) {
    switch (lvl.value) {
        case "Easy":
            // if the player typed all the words do:
            if (EasyWordList.length == 0) {
                // display the win message
                stat.style.cssText = "display: block";
            } else {
                // this value is benefit for checking that player didn't win and helps in display game over and end the game above
                return false;
            }
            break;

        case "Normal":
            if (NormalWordList.length == 0) {
                stat.style.cssText = "display: block";
            } else {
                return false;
            }
            break;

        case "Hard":
            if (HardWordList.length == 0) {
                stat.style.cssText = "display: block";
            } else {
                return false;
            }
            break;
    }
}
