/* =========================================================
   KHAS MALAYSIA EDITION
   FINAL GAME ENGINE
   HTML + CSS + Vanilla JavaScript
   ========================================================= */

"use strict";


/* =========================================================
   CONFIG
   ========================================================= */

const CONFIG = {

  timerSeconds: 10,

  score: {
    correct: 100,
    incorrect: -20,
    timeout: -30
  },

  storageKey: "khasMalaysiaEdition",

  editorPassword: "Ahakim17@",

  audio: {
    menu: "assets/audio/menu-music.mp3",
    ending: "assets/audio/ending-music.mp3",
    click: "assets/audio/click.mp3",
    correct: "assets/audio/correct.mp3",
    wrong: "assets/audio/wrong.mp3",
    warning: "assets/audio/timer-warning.mp3",
    timeout: "assets/audio/time-up.mp3"
  }

};


/* =========================================================
   QUESTIONS
   ========================================================= */

const QUESTION_BANK = [

  {
    difficulty: "EASY",
    question: "What is the capital city of Malaysia?",
    answers: [
      "Johor Bahru",
      "Kuala Lumpur",
      "Shah Alam",
      "Putrajaya"
    ],
    correct: 1
  },

  {
    difficulty: "EASY",
    question: "What is the national flower of Malaysia?",
    answers: [
      "Jasmine",
      "Orchid",
      "Hibiscus",
      "Rose"
    ],
    correct: 2
  },

  {
    difficulty: "EASY",
    question: "How many states are there in Malaysia?",
    answers: [
      "11",
      "12",
      "13",
      "14"
    ],
    correct: 2
  },

  {
    difficulty: "EASY",
    question: "What is the national anthem of Malaysia called?",
    answers: [
      "Jalur Gemilang",
      "Negaraku",
      "Keranamu Malaysia",
      "Malaysia Prihatin"
    ],
    correct: 1
  },

  {
    difficulty: "EASY",
    question: "Which color appears most prominently on the Malaysian flag?",
    answers: [
      "Green",
      "Blue",
      "Red",
      "Yellow"
    ],
    correct: 2
  },

  {
    difficulty: "MEDIUM",
    question: "On what date did Malaya gain independence?",
    answers: [
      "31 August 1956",
      "31 August 1957",
      "16 September 1963",
      "31 August 1963"
    ],
    correct: 1
  },

  {
    difficulty: "MEDIUM",
    question: "Which Malaysian state is known as the \"Land Below the Wind\"?",
    answers: [
      "Sarawak",
      "Sabah",
      "Perlis",
      "Kelantan"
    ],
    correct: 1
  },

  {
    difficulty: "MEDIUM",
    question: "What is the first principle of the Rukun Negara?",
    answers: [
      "Courtesy and Morality",
      "The Rule of Law",
      "Belief in God",
      "Supremacy of the Constitution"
    ],
    correct: 2
  },

  {
    difficulty: "MEDIUM",
    question: "Which strait separates Peninsular Malaysia from the island of Sumatra?",
    answers: [
      "Johor Strait",
      "Tebrau Strait",
      "Strait of Malacca",
      "Karimata Strait"
    ],
    correct: 2
  },

  {
    difficulty: "MEDIUM",
    question: "Which city serves as the federal administrative capital of Malaysia?",
    answers: [
      "Kuala Lumpur",
      "Putrajaya",
      "Shah Alam",
      "Cyberjaya"
    ],
    correct: 1
  },

  {
    difficulty: "MEDIUM",
    question: "What is the highest mountain in Malaysia?",
    answers: [
      "Mount Tahan",
      "Mount Ledang",
      "Mount Kinabalu",
      "Mount Korbu"
    ],
    correct: 2
  },

  {
    difficulty: "MEDIUM",
    question: "On which date is Malaysia Day celebrated?",
    answers: [
      "31 August",
      "16 September",
      "1 September",
      "9 September"
    ],
    correct: 1
  },

  {
    difficulty: "HARD",
    question: "In which year was Malaysia officially formed?",
    answers: [
      "1957",
      "1960",
      "1963",
      "1965"
    ],
    correct: 2
  },

  {
    difficulty: "HARD",
    question: "Which Malaysian state has the largest land area?",
    answers: [
      "Sabah",
      "Sarawak",
      "Pahang",
      "Perak"
    ],
    correct: 1
  },

  {
    difficulty: "HARD",
    question: "What is the supreme law of Malaysia?",
    answers: [
      "Rukun Negara",
      "Malaysia Act",
      "Federal Constitution",
      "Laws of Malaysia"
    ],
    correct: 2
  }

];


/* =========================================================
   GAME STATE
   ========================================================= */

const GameState = {

  screen: "menu",
  phase: "idle",

  questions: [],
  currentIndex: 0,

  score: 0,

  correct: 0,
  incorrect: 0,
  timeout: 0,

  selectedAnswer: null,

  timerId: null,
  timerStartedAt: 0,
  timerRemaining: CONFIG.timerSeconds,

  answerLocked: false,
  entranceLocked: true,

  gameRunning: false,

  audioStarted: false,

  editorMode: false,
  editorAuthenticated: false,

  editorTestResult: false,
  editorTestCredits: false,

  warningPlayed: false,

  creditsTimeouts: [],

  endingStartToken: 0

};


/* =========================================================
   DOM
   ========================================================= */

const DOM = {

  screens: {
    menu: document.getElementById("menuScreen"),
    how: document.getElementById("howScreen"),
    about: document.getElementById("aboutScreen"),
    editorLogin: document.getElementById("editorLoginScreen"),
    editor: document.getElementById("editorScreen"),
    quiz: document.getElementById("quizScreen"),
    result: document.getElementById("resultScreen"),
    credits: document.getElementById("creditsScreen")
  },

  startBtn:
    document.getElementById("startBtn"),

  howBtn:
    document.getElementById("howBtn"),

  aboutBtn:
    document.getElementById("aboutBtn"),

  editorBtn:
    document.getElementById("editorBtn"),

  howBackBtn:
    document.getElementById("howBackBtn"),

  aboutBackBtn:
    document.getElementById("aboutBackBtn"),

  editorLoginForm:
    document.getElementById("editorLoginForm"),

  editorPassword:
    document.getElementById("editorPassword"),

  editorLoginMessage:
    document.getElementById("editorLoginMessage"),

  editorLoginBackBtn:
    document.getElementById("editorLoginBackBtn"),

  editorBackBtn:
    document.getElementById("editorBackBtn"),

  testClickBtn:
    document.getElementById("testClickBtn"),

  testCorrectBtn:
    document.getElementById("testCorrectBtn"),

  testWrongBtn:
    document.getElementById("testWrongBtn"),

  testWarningBtn:
    document.getElementById("testWarningBtn"),

  testTimeoutBtn:
    document.getElementById("testTimeoutBtn"),

  testMenuMusicBtn:
    document.getElementById("testMenuMusicBtn"),

  testEndingMusicBtn:
    document.getElementById("testEndingMusicBtn"),

  stopAudioBtn:
    document.getElementById("stopAudioBtn"),

  editorQuizBtn:
    document.getElementById("editorQuizBtn"),

  editorResultBtn:
    document.getElementById("editorResultBtn"),

  editorCreditsBtn:
    document.getElementById("editorCreditsBtn"),

  editorQuizControls:
    document.getElementById("editorQuizControls"),

  editorSkipBtn:
    document.getElementById("editorSkipBtn"),

  editorTimerBtn:
    document.getElementById("editorTimerBtn"),

  editorQuizExitBtn:
    document.getElementById("editorQuizExitBtn"),

  resultBackToEditorBtn:
    document.getElementById(
      "resultBackToEditorBtn"
    ),

  creditsBackToEditorBtn:
    document.getElementById(
      "creditsBackToEditorBtn"
    ),

  menuBestScore:
    document.getElementById("menuBestScore"),

  currentQuestion:
    document.getElementById("currentQuestion"),

  totalQuestions:
    document.getElementById("totalQuestions"),

  liveScore:
    document.getElementById("liveScore"),

  progressBar:
    document.getElementById("progressBar"),

  timerText:
    document.getElementById("timerText"),

  timerCircle:
    document.getElementById("timerCircle"),

  difficultyLabel:
    document.getElementById("difficultyLabel"),

  questionText:
    document.getElementById("questionText"),

  answersContainer:
    document.getElementById("answersContainer"),

  answerFeedback:
    document.getElementById("answerFeedback"),

  feedbackIcon:
    document.getElementById("feedbackIcon"),

  feedbackTitle:
    document.getElementById("feedbackTitle"),

  feedbackPoints:
    document.getElementById("feedbackPoints"),

  finalScore:
    document.getElementById("finalScore"),

  rankText:
    document.getElementById("rankText"),

  resultQuestions:
    document.getElementById("resultQuestions"),

  resultCorrect:
    document.getElementById("resultCorrect"),

  resultIncorrect:
    document.getElementById("resultIncorrect"),

  resultTimeout:
    document.getElementById("resultTimeout"),

  resultAccuracy:
    document.getElementById("resultAccuracy"),

  breakdownCorrect:
    document.getElementById("breakdownCorrect"),

  breakdownIncorrect:
    document.getElementById("breakdownIncorrect"),

  breakdownTimeout:
    document.getElementById("breakdownTimeout"),

  breakdownTotal:
    document.getElementById("breakdownTotal"),

  resultBestScore:
    document.getElementById("resultBestScore"),

  newBestMessage:
    document.getElementById("newBestMessage"),

  performanceBar:
    document.getElementById("performanceBar"),

  performanceMessage:
    document.getElementById("performanceMessage"),

  creditsContent:
    document.getElementById("creditsContent"),

  theEnd:
    document.getElementById("theEnd")

};


/* =========================================================
   AUDIO MANAGER
   ========================================================= */

const AudioManager = {

  music: {
    menu: null,
    ending: null
  },


  init() {

    this.music.menu =
      new Audio(CONFIG.audio.menu);

    this.music.ending =
      new Audio(CONFIG.audio.ending);

    this.music.menu.loop = true;
    this.music.ending.loop = true;

    this.music.menu.preload = "auto";
    this.music.ending.preload = "auto";

    this.music.menu.volume = 0;
    this.music.ending.volume = 0;

    this.music.menu._fadeFrame = null;
    this.music.ending._fadeFrame = null;

  },


  playSfx(name) {

    const src =
      CONFIG.audio[name];

    if (!src) {
      return null;
    }

    const sound =
      new Audio(src);

    sound.preload = "auto";
    sound.volume = 1;

    const playPromise =
      sound.play();

    if (playPromise) {

      playPromise.catch(
        () => {}
      );

    }

    sound.addEventListener(
      "ended",
      () => {

        sound.removeAttribute(
          "src"
        );

        sound.load();

      },
      {
        once: true
      }
    );

    return sound;

  },


  async startMainMusic() {

    if (!this.music.menu) {
      return false;
    }

    GameState.endingStartToken++;

    this.cancelFade(
      this.music.menu
    );

    this.cancelFade(
      this.music.ending
    );

    if (
      !this.music.ending.paused
    ) {

      this.music.ending.pause();
      this.music.ending.currentTime = 0;
      this.music.ending.volume = 0;

    }

    try {

      if (
        this.music.menu.paused
      ) {

        this.music.menu.volume = 0;

        await this.music.menu.play();

      }

      this.fadeIn(
        this.music.menu,
        0.35,
        1000
      );

      GameState.audioStarted =
        true;

      return true;

    } catch (error) {

      console.warn(
        "[AUDIO] Menu music could not start.",
        error
      );

      return false;

    }

  },


  async startEndingMusic() {

    if (!this.music.ending) {
      return false;
    }

    if (
      !this.music.ending.paused
    ) {

      return true;

    }

    const token =
      ++GameState.endingStartToken;

    this.cancelFade(
      this.music.menu
    );

    this.cancelFade(
      this.music.ending
    );

    this.fadeOut(
      this.music.menu,
      500,
      true
    );

    await this.wait(500);

    if (
      token !==
      GameState.endingStartToken
    ) {
      return false;
    }

    if (
      GameState.phase !== "result" &&
      GameState.phase !== "credits"
    ) {

      return false;

    }

    try {

      this.music.ending.currentTime = 0;
      this.music.ending.volume = 0;

      await this.music.ending.play();

      if (
        token !==
        GameState.endingStartToken
      ) {

        this.music.ending.pause();
        this.music.ending.currentTime = 0;
        this.music.ending.volume = 0;

        return false;

      }

      this.fadeIn(
        this.music.ending,
        0.40,
        1000
      );

      return true;

    } catch (error) {

      console.warn(
        "[AUDIO] Ending music could not start.",
        error
      );

      return false;

    }

  },


  async returnToMenuMusic() {

    if (!this.music.menu) {
      return;
    }

    ++GameState.endingStartToken;

    this.cancelFade(
      this.music.menu
    );

    this.cancelFade(
      this.music.ending
    );

    this.fadeOut(
      this.music.ending,
      500,
      true
    );

    await this.wait(500);

    if (
      GameState.phase !== "idle"
    ) {
      return;
    }

    try {

      this.music.menu.currentTime = 0;
      this.music.menu.volume = 0;

      await this.music.menu.play();

      this.fadeIn(
        this.music.menu,
        0.35,
        800
      );

    } catch (error) {

      console.warn(
        "[AUDIO] Menu music could not resume.",
        error
      );

    }

  },


  stopAll() {

    ++GameState.endingStartToken;

    if (this.music.menu) {

      this.cancelFade(
        this.music.menu
      );

      this.music.menu.pause();
      this.music.menu.currentTime = 0;
      this.music.menu.volume = 0;

    }

    if (this.music.ending) {

      this.cancelFade(
        this.music.ending
      );

      this.music.ending.pause();
      this.music.ending.currentTime = 0;
      this.music.ending.volume = 0;

    }

    GameState.audioStarted =
      false;

  },


  fadeIn(
    audio,
    target,
    duration
  ) {

    if (!audio) {
      return;
    }

    this.cancelFade(audio);

    const start =
      Number.isFinite(audio.volume)
        ? audio.volume
        : 0;

    const difference =
      target - start;

    const startTime =
      performance.now();

    const step =
      now => {

        const progress =
          duration <= 0
            ? 1
            : Math.min(
                (now - startTime) /
                  duration,
                1
              );

        audio.volume =
          Math.max(
            0,
            Math.min(
              1,
              start +
                difference *
                progress
            )
          );

        if (
          progress < 1
        ) {

          audio._fadeFrame =
            requestAnimationFrame(
              step
            );

        } else {

          audio._fadeFrame =
            null;

        }

      };

    audio._fadeFrame =
      requestAnimationFrame(
        step
      );

  },


  fadeOut(
    audio,
    duration,
    stopAfter = true
  ) {

    if (!audio) {
      return;
    }

    this.cancelFade(audio);

    const start =
      Number.isFinite(audio.volume)
        ? audio.volume
        : 0;

    const startTime =
      performance.now();

    const step =
      now => {

        const progress =
          duration <= 0
            ? 1
            : Math.min(
                (now - startTime) /
                  duration,
                1
              );

        audio.volume =
          Math.max(
            0,
            start *
              (1 - progress)
          );

        if (
          progress < 1
        ) {

          audio._fadeFrame =
            requestAnimationFrame(
              step
            );

        } else {

          audio._fadeFrame =
            null;

          if (stopAfter) {

            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0;

          }

        }

      };

    audio._fadeFrame =
      requestAnimationFrame(
        step
      );

  },


  cancelFade(audio) {

    if (
      audio &&
      audio._fadeFrame !== null &&
      audio._fadeFrame !== undefined
    ) {

      cancelAnimationFrame(
        audio._fadeFrame
      );

      audio._fadeFrame =
        null;

    }

  },


  wait(ms) {

    return new Promise(
      resolve => {

        setTimeout(
          resolve,
          ms
        );

      }
    );

  }

};


/* =========================================================
   STORAGE MANAGER
   ========================================================= */

const StorageManager = {

  defaultData() {

    return {
      bestScore: null,
      gamesPlayed: 0,
      highestAccuracy: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      totalTimeout: 0
    };

  },


  get() {

    try {

      const raw =
        localStorage.getItem(
          CONFIG.storageKey
        );

      if (!raw) {

        return this.defaultData();

      }

      const data =
        JSON.parse(raw);

      return {
        ...this.defaultData(),
        ...data
      };

    } catch (error) {

      return this.defaultData();

    }

  },


  saveResult() {

    const data =
      this.get();

    const previousBest =
      data.bestScore;

    const isNewBest =
      previousBest === null ||
      GameState.score >
        previousBest;

    if (isNewBest) {

      data.bestScore =
        GameState.score;

    }

    data.gamesPlayed += 1;

    data.totalCorrect +=
      GameState.correct;

    data.totalIncorrect +=
      GameState.incorrect;

    data.totalTimeout +=
      GameState.timeout;

    const accuracy =
      QUESTION_BANK.length > 0
        ? (
            GameState.correct /
            QUESTION_BANK.length
          ) * 100
        : 0;

    data.highestAccuracy =
      Math.max(
        data.highestAccuracy,
        accuracy
      );

    try {

      localStorage.setItem(
        CONFIG.storageKey,
        JSON.stringify(data)
      );

    } catch (error) {

      console.warn(
        "[STORAGE] Save failed.",
        error
      );

    }

    return {
      data,
      isNewBest
    };

  },


  getBestScore() {

    return this.get().bestScore;

  }

};


/* =========================================================
   SCREEN MANAGER
   ========================================================= */

const ScreenManager = {

  show(name) {

    Object.values(
      DOM.screens
    ).forEach(
      screen => {

        if (screen) {

          screen.classList.remove(
            "active"
          );

        }

      }
    );

    const screen =
      DOM.screens[name];

    if (!screen) {
      return;
    }

    screen.classList.add(
      "active"
    );

    GameState.screen =
      name;

  }

};


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

  const container =
    document.getElementById(
      "particles"
    );

  if (!container) {
    return;
  }

  const count =
    window.innerWidth < 500
      ? 22
      : 35;

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "particle";

    particle.style.left =
      `${Math.random() * 100}%`;

    particle.style.top =
      `${70 + Math.random() * 30}%`;

    particle.style.animationDuration =
      `${7 + Math.random() * 9}s`;

    particle.style.animationDelay =
      `${Math.random() * 8}s`;

    container.appendChild(
      particle
    );

  }

}


/* =========================================================
   SHUFFLE
   ========================================================= */

function shuffle(array) {

  const copy = [
    ...array
  ];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
          (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];

  }

  return copy;

}


/* =========================================================
   QUESTION RANDOMIZER
   ========================================================= */

function createGameQuestions() {

  return shuffle(
    QUESTION_BANK.map(
      question => {

        const answerObjects =
          question.answers.map(
            (text, index) => ({

              text,

              correct:
                index ===
                question.correct

            })
          );

        return {

          difficulty:
            question.difficulty,

          question:
            question.question,

          answers:
            shuffle(
              answerObjects
            )

        };

      }
    )
  );

}


/* =========================================================
   START GAME
   ========================================================= */

function startGame(
  editorMode = false
) {

  if (
    GameState.phase !== "idle" &&
    !editorMode
  ) {

    return;

  }

  clearCreditsTimers();

  hideEditorReturnButtons();

  AudioManager.playSfx(
    "click"
  );

  AudioManager.startMainMusic();

  GameState.questions =
    createGameQuestions();

  GameState.currentIndex =
    0;

  GameState.score =
    0;

  GameState.correct =
    0;

  GameState.incorrect =
    0;

  GameState.timeout =
    0;

  GameState.selectedAnswer =
    null;

  GameState.gameRunning =
    true;

  GameState.editorMode =
    editorMode;

  GameState.editorTestResult =
    false;

  GameState.editorTestCredits =
    false;

  GameState.phase =
    "transition";

  ScreenManager.show(
    "quiz"
  );

  DOM.totalQuestions.textContent =
    GameState.questions.length;

  DOM.liveScore.textContent =
    "0";

  DOM.timerText.textContent =
    CONFIG.timerSeconds;

  updateTimerDisplay();

  if (
    GameState.editorMode
  ) {

    DOM.editorQuizControls
      .classList
      .add("show");

  } else {

    DOM.editorQuizControls
      .classList
      .remove("show");

  }

  setTimeout(
    () => {

      if (
        !GameState.gameRunning
      ) {

        return;

      }

      showQuestion();

    },
    650
  );

}


/* =========================================================
   SHOW QUESTION
   ========================================================= */

function showQuestion() {

  stopTimer();

  GameState.phase =
    "entrance";

  GameState.answerLocked =
    false;

  GameState.entranceLocked =
    true;

  GameState.selectedAnswer =
    null;

  GameState.warningPlayed =
    false;

  const question =
    GameState.questions[
      GameState.currentIndex
    ];

  if (!question) {

    finishGame();

    return;

  }

  DOM.currentQuestion.textContent =
    String(
      GameState.currentIndex + 1
    ).padStart(
      2,
      "0"
    );

  DOM.difficultyLabel.textContent =
    question.difficulty;

  DOM.questionText.textContent =
    question.question;

  DOM.progressBar.style.width =
    `${
      (
        GameState.currentIndex /
        GameState.questions.length
      ) * 100
    }%`;

  DOM.answersContainer.innerHTML =
    "";

  DOM.answerFeedback
    .classList
    .remove("show");

  DOM.feedbackIcon.textContent =
    "";

  DOM.feedbackTitle.textContent =
    "";

  DOM.feedbackPoints.textContent =
    "";

  DOM.timerText.textContent =
    CONFIG.timerSeconds;

  updateTimerDisplay();

  question.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "answer-btn";

      button.dataset.index =
        index;

      const letter =
        document.createElement(
          "span"
        );

      letter.className =
        "answer-letter";

      letter.textContent =
        String.fromCharCode(
          65 + index
        );

      const text =
        document.createElement(
          "span"
        );

      text.textContent =
        answer.text;

      button.appendChild(
        letter
      );

      button.appendChild(
        text
      );

      button.addEventListener(
        "click",
        () => {

          selectAnswer(index);

        }
      );

      DOM.answersContainer
        .appendChild(
          button
        );

    }
  );

  setTimeout(
    () => {

      if (
        GameState.phase !==
        "entrance"
      ) {

        return;

      }

      if (
        !GameState.gameRunning
      ) {

        return;

      }

      GameState.entranceLocked =
        false;

      GameState.phase =
        "playing";

      startTimer();

    },
    1650
  );

}


/* =========================================================
   SELECT ANSWER
   ========================================================= */

function selectAnswer(index) {

  if (
    GameState.phase !== "playing" ||
    GameState.entranceLocked ||
    GameState.answerLocked
  ) {

    return;

  }

  GameState.answerLocked =
    true;

  GameState.selectedAnswer =
    index;

  stopTimer();

  AudioManager.playSfx(
    "click"
  );

  const buttons =
    DOM.answersContainer
      .querySelectorAll(
        ".answer-btn"
      );

  buttons.forEach(
    button => {

      button.disabled =
        true;

    }
  );

  const selectedButton =
    buttons[index];

  if (selectedButton) {

    selectedButton
      .classList
      .add("selected");

  }

  setTimeout(
    () => {

      revealAnswer();

    },
    350
  );

}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {

  stopTimer();

  GameState.timerRemaining =
    CONFIG.timerSeconds;

  GameState.timerStartedAt =
    performance.now();

  GameState.warningPlayed =
    false;

  updateTimerDisplay();

  GameState.timerId =
    setInterval(
      () => {

        if (
          GameState.phase !==
          "playing"
        ) {

          return;

        }

        const elapsed =
          (
            performance.now() -
            GameState.timerStartedAt
          ) / 1000;

        const remaining =
          Math.max(
            0,
            CONFIG.timerSeconds -
              elapsed
          );

        GameState.timerRemaining =
          remaining;

        updateTimerDisplay();

        if (
          remaining <= 5 &&
          remaining > 0 &&
          !GameState.warningPlayed
        ) {

          GameState.warningPlayed =
            true;

          AudioManager.playSfx(
            "warning"
          );

        }

        if (
          remaining <= 0
        ) {

          stopTimer();

          revealAnswer();

        }

      },
      50
    );

}


function stopTimer() {

  if (
    GameState.timerId !== null
  ) {

    clearInterval(
      GameState.timerId
    );

    GameState.timerId =
      null;

  }

}


function updateTimerDisplay() {

  if (
    !DOM.timerText ||
    !DOM.timerCircle
  ) {

    return;

  }

  const remaining =
    Math.max(
      0,
      GameState.timerRemaining
    );

  DOM.timerText.textContent =
    Math.ceil(
      remaining
    );

  const circumference =
    276.46;

  const percentage =
    CONFIG.timerSeconds > 0
      ? remaining /
        CONFIG.timerSeconds
      : 0;

  DOM.timerCircle.style
    .strokeDashoffset =
      circumference -
      circumference *
        percentage;

  if (
    remaining <= 5
  ) {

    DOM.timerCircle.style.stroke =
      "var(--danger)";

    DOM.timerText.style.color =
      "var(--danger)";

  } else {

    DOM.timerCircle.style.stroke =
      "var(--yellow)";

    DOM.timerText.style.color =
      "var(--text)";

  }

}


/* =========================================================
   REVEAL ANSWER
   ========================================================= */

function revealAnswer() {

  if (
    GameState.phase !==
    "playing"
  ) {

    return;

  }

  GameState.phase =
    "revealing";

  GameState.answerLocked =
    true;

  stopTimer();

  const question =
    GameState.questions[
      GameState.currentIndex
    ];

  if (!question) {

    finishGame();

    return;

  }

  const buttons =
    DOM.answersContainer
      .querySelectorAll(
        ".answer-btn"
      );

  const correctIndex =
    question.answers.findIndex(
      answer =>
        answer.correct
    );

  const hasAnswer =
    GameState.selectedAnswer !==
    null;

  let resultType;

  if (!hasAnswer) {

    GameState.score +=
      CONFIG.score.timeout;

    GameState.timeout +=
      1;

    resultType =
      "timeout";

  } else if (
    GameState.selectedAnswer ===
    correctIndex
  ) {

    GameState.score +=
      CONFIG.score.correct;

    GameState.correct +=
      1;

    resultType =
      "correct";

  } else {

    GameState.score +=
      CONFIG.score.incorrect;

    GameState.incorrect +=
      1;

    resultType =
      "incorrect";

  }

  if (
    buttons[correctIndex]
  ) {

    buttons[correctIndex]
      .classList
      .add("reveal-correct");

  }

  if (
    hasAnswer &&
    GameState.selectedAnswer !==
    correctIndex
  ) {

    const selected =
      buttons[
        GameState.selectedAnswer
      ];

    if (selected) {

      selected.classList
        .remove("selected");

      selected.classList
        .add("wrong");

    }

  }

  if (
    hasAnswer &&
    GameState.selectedAnswer ===
    correctIndex
  ) {

    const selected =
      buttons[
        GameState.selectedAnswer
      ];

    if (selected) {

      selected.classList
        .remove("selected");

      selected.classList
        .add("correct");

    }

  }

  buttons.forEach(
    button => {

      button.disabled =
        true;

    }
  );

  showFeedback(
    resultType
  );

  DOM.liveScore.textContent =
    GameState.score.toString();

  DOM.progressBar.style.width =
    `${
      (
        (
          GameState.currentIndex +
          1
        ) /
        GameState.questions.length
      ) * 100
    }%`;

  setTimeout(
    () => {

      if (
        GameState.currentIndex <
        GameState.questions.length - 1
      ) {

        GameState.currentIndex +=
          1;

        showQuestion();

      } else {

        finishGame();

      }

    },
    1900
  );

}


/* =========================================================
   FEEDBACK
   ========================================================= */

function showFeedback(type) {

  DOM.answerFeedback
    .classList
    .remove("show");

  void DOM.answerFeedback
    .offsetWidth;

  if (
    type === "correct"
  ) {

    DOM.feedbackIcon.textContent =
      "✓";

    DOM.feedbackTitle.textContent =
      "CORRECT!";

    DOM.feedbackPoints.textContent =
      `+${CONFIG.score.correct} POINTS`;

    AudioManager.playSfx(
      "correct"
    );

  } else if (
    type === "incorrect"
  ) {

    DOM.feedbackIcon.textContent =
      "✕";

    DOM.feedbackTitle.textContent =
      "INCORRECT";

    DOM.feedbackPoints.textContent =
      `${CONFIG.score.incorrect} POINTS`;

    AudioManager.playSfx(
      "wrong"
    );

  } else {

    DOM.feedbackIcon.textContent =
      "⌛";

    DOM.feedbackTitle.textContent =
      "TIME'S UP";

    DOM.feedbackPoints.textContent =
      `${CONFIG.score.timeout} POINTS`;

    AudioManager.playSfx(
      "timeout"
    );

  }

  DOM.answerFeedback
    .classList
    .add("show");

}


/* =========================================================
   FINISH GAME
   ========================================================= */

function finishGame() {

  GameState.gameRunning =
    false;

  GameState.phase =
    "result";

  GameState.editorTestResult =
    false;

  GameState.editorTestCredits =
    false;

  stopTimer();

  DOM.editorQuizControls
    .classList
    .remove("show");

  hideEditorReturnButtons();

  const storageResult =
    StorageManager.saveResult();

  prepareResult(
    storageResult.isNewBest,
    storageResult.data
  );

  ScreenManager.show(
    "result"
  );

  animateFinalScore();

  AudioManager.startEndingMusic();

}


/* =========================================================
   RESULT
   ========================================================= */

function prepareResult(
  isNewBest,
  storageData
) {

  DOM.resultQuestions.textContent =
    QUESTION_BANK.length;

  DOM.resultCorrect.textContent =
    GameState.correct;

  DOM.resultIncorrect.textContent =
    GameState.incorrect;

  DOM.resultTimeout.textContent =
    GameState.timeout;

  const accuracy =
    QUESTION_BANK.length > 0
      ? (
          GameState.correct /
          QUESTION_BANK.length
        ) * 100
      : 0;

  DOM.resultAccuracy.textContent =
    `${accuracy.toFixed(1)}%`;

  DOM.breakdownCorrect.textContent =
    `+${
      GameState.correct *
      CONFIG.score.correct
    }`;

  DOM.breakdownIncorrect.textContent =
    `${
      GameState.incorrect *
      CONFIG.score.incorrect
    }`;

  DOM.breakdownTimeout.textContent =
    `${
      GameState.timeout *
      CONFIG.score.timeout
    }`;

  DOM.breakdownTotal.textContent =
    GameState.score;

  DOM.resultBestScore.textContent =
    storageData.bestScore ??
    "----";

  DOM.newBestMessage.textContent =
    isNewBest
      ? "NEW BEST SCORE!"
      : "";

  DOM.rankText.textContent =
    getRank(
      GameState.score
    );

  DOM.performanceBar.style.width =
    "0%";

  setTimeout(
    () => {

      if (
        GameState.phase !==
        "result"
      ) {

        return;

      }

      DOM.performanceBar.style.width =
        `${
          Math.max(
            0,
            Math.min(
              100,
              accuracy
            )
          )
        }%`;

    },
    1000
  );

  DOM.performanceMessage.textContent =
    getPerformanceMessage(
      accuracy
    );

}


function animateFinalScore() {

  const target =
    GameState.score;

  const duration =
    1400;

  const startTime =
    performance.now();

  DOM.finalScore.textContent =
    "0";

  const animate =
    now => {

      const progress =
        Math.min(
          (
            now -
            startTime
          ) /
            duration,
          1
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      DOM.finalScore.textContent =
        Math.round(
          target *
          eased
        );

      if (
        progress < 1
      ) {

        requestAnimationFrame(
          animate
        );

      }

    };

  requestAnimationFrame(
    animate
  );

}


/* =========================================================
   RANK
   ========================================================= */

function getRank(score) {

  if (score >= 1200) {
    return "LEGEND";
  }

  if (score >= 900) {
    return "MASTER";
  }

  if (score >= 600) {
    return "EXPERT";
  }

  if (score >= 300) {
    return "ADVANCED";
  }

  if (score >= 0) {
    return "ROOKIE";
  }

  return "TRY AGAIN";

}


/* =========================================================
   PERFORMANCE
   ========================================================= */

function getPerformanceMessage(
  accuracy
) {

  if (accuracy >= 90) {
    return "OUTSTANDING";
  }

  if (accuracy >= 75) {
    return "GREAT PERFORMANCE";
  }

  if (accuracy >= 60) {
    return "GOOD JOB";
  }

  if (accuracy >= 40) {
    return "KEEP PRACTICING";
  }

  return "BETTER LUCK NEXT TIME";

}


/* =========================================================
   EDITOR LOGIN
   ========================================================= */

function openEditorLogin() {

  if (
    GameState.phase !==
    "idle"
  ) {

    return;

  }

  AudioManager.playSfx(
    "click"
  );

  DOM.editorPassword.value =
    "";

  DOM.editorLoginMessage.textContent =
    "";

  ScreenManager.show(
    "editorLogin"
  );

  setTimeout(
    () => {

      DOM.editorPassword.focus();

    },
    150
  );

}


function authenticateEditor() {

  const password =
    DOM.editorPassword.value;

  if (
    password ===
    CONFIG.editorPassword
  ) {

    GameState.editorAuthenticated =
      true;

    GameState.editorMode =
      true;

    GameState.editorTestResult =
      false;

    GameState.editorTestCredits =
      false;

    GameState.phase =
      "editor";

    AudioManager.playSfx(
      "correct"
    );

    ScreenManager.show(
      "editor"
    );

    DOM.editorPassword.value =
      "";

    DOM.editorLoginMessage.textContent =
      "";

  } else {

    GameState.editorAuthenticated =
      false;

    AudioManager.playSfx(
      "wrong"
    );

    DOM.editorLoginMessage.textContent =
      "INVALID PASSWORD";

    DOM.editorPassword.value =
      "";

    DOM.editorPassword.focus();

  }

}


/* =========================================================
   EDITOR RETURN BUTTONS
   ========================================================= */

function hideEditorReturnButtons() {

  if (
    DOM.resultBackToEditorBtn
  ) {

    DOM.resultBackToEditorBtn
      .classList
      .remove("show");

  }

  if (
    DOM.creditsBackToEditorBtn
  ) {

    DOM.creditsBackToEditorBtn
      .classList
      .remove("show");

  }

}


/* =========================================================
   BACK TO EDITOR FROM TEST RESULT
   ========================================================= */

function backToEditorFromTest() {

  if (
    !GameState.editorAuthenticated
  ) {

    return;

  }

  AudioManager.playSfx(
    "click"
  );

  clearCreditsTimers();

  stopTimer();

  GameState.gameRunning =
    false;

  GameState.phase =
    "editor";

  GameState.editorMode =
    true;

  GameState.editorTestResult =
    false;

  GameState.editorTestCredits =
    false;

  hideEditorReturnButtons();

  DOM.editorQuizControls
    .classList
    .remove("show");

  AudioManager.stopAll();

  ScreenManager.show(
    "editor"
  );

}


/* =========================================================
   EDITOR EXIT
   ========================================================= */

function exitEditor() {

  clearCreditsTimers();

  stopTimer();

  GameState.gameRunning =
    false;

  GameState.editorMode =
    false;

  GameState.editorAuthenticated =
    false;

  GameState.editorTestResult =
    false;

  GameState.editorTestCredits =
    false;

  GameState.phase =
    "idle";

  hideEditorReturnButtons();

  DOM.editorQuizControls
    .classList
    .remove("show");

  AudioManager.stopAll();

  AudioManager.playSfx(
    "click"
  );

  ScreenManager.show(
    "menu"
  );

  updateMenuBestScore();

}


/* =========================================================
   EDITOR QUIZ
   ========================================================= */

function startEditorQuiz() {

  if (
    !GameState.editorAuthenticated
  ) {

    return;

  }

  startGame(true);

}


function editorSkipQuestion() {

  if (
    !GameState.editorMode ||
    !GameState.gameRunning
  ) {

    return;

  }

  if (
    GameState.phase !==
    "playing"
  ) {

    return;

  }

  AudioManager.playSfx(
    "click"
  );

  stopTimer();

  GameState.phase =
    "revealing";

  GameState.answerLocked =
    true;

  if (
    GameState.currentIndex <
    GameState.questions.length - 1
  ) {

    GameState.currentIndex +=
      1;

    showQuestion();

  } else {

    finishGame();

  }

}


function editorSkipTimer() {

  if (
    !GameState.editorMode ||
    !GameState.gameRunning
  ) {

    return;

  }

  if (
    GameState.phase !==
    "playing"
  ) {

    return;

  }

  AudioManager.playSfx(
    "click"
  );

  stopTimer();

  GameState.selectedAnswer =
    null;

  revealAnswer();

}


function editorExitQuiz() {

  if (
    !GameState.editorMode
  ) {

    return;

  }

  GameState.gameRunning =
    false;

  stopTimer();

  GameState.phase =
    "editor";

  GameState.editorTestResult =
    false;

  GameState.editorTestCredits =
    false;

  DOM.editorQuizControls
    .classList
    .remove("show");

  AudioManager.stopAll();

  AudioManager.playSfx(
    "click"
  );

  ScreenManager.show(
    "editor"
  );

}


/* =========================================================
   EDITOR AUDIO TEST
   ========================================================= */

function testAudio(name) {

  AudioManager.playSfx(
    name
  );

}


function testMenuMusic() {

  AudioManager.startMainMusic();

}


function testEndingMusic() {

  if (
    !GameState.editorAuthenticated
  ) {

    return;

  }

  const previousPhase =
    GameState.phase;

  GameState.phase =
    "credits";

  AudioManager.startEndingMusic();

  setTimeout(
    () => {

      if (
        GameState.screen ===
        "editor" &&
        GameState.phase ===
        "credits"
      ) {

        GameState.phase =
          previousPhase === "editor"
            ? "editor"
            : previousPhase;

      }

    },
    650
  );

}


function stopTestAudio() {

  AudioManager.stopAll();

}


/* =========================================================
   EDITOR RESULT TEST
   ========================================================= */

function testResult() {

  if (
    !GameState.editorAuthenticated
  ) {

    return;

  }

  clearCreditsTimers();

  stopTimer();

  GameState.gameRunning =
    false;

  GameState.editorMode =
    true;

  GameState.editorTestResult =
    true;

  GameState.editorTestCredits =
    false;

  GameState.phase =
    "result";

  const fakeScore =
    800;

  const fakeCorrect =
    10;

  const fakeIncorrect =
    3;

  const fakeTimeout =
    2;

  const fakeAccuracy =
    fakeCorrect /
    QUESTION_BANK.length *
    100;

  DOM.resultQuestions.textContent =
    QUESTION_BANK.length;

  DOM.resultCorrect.textContent =
    fakeCorrect;

  DOM.resultIncorrect.textContent =
    fakeIncorrect;

  DOM.resultTimeout.textContent =
    fakeTimeout;

  DOM.resultAccuracy.textContent =
    `${fakeAccuracy.toFixed(1)}%`;

  DOM.breakdownCorrect.textContent =
    `+${
      fakeCorrect *
      CONFIG.score.correct
    }`;

  DOM.breakdownIncorrect.textContent =
    `${
      fakeIncorrect *
      CONFIG.score.incorrect
    }`;

  DOM.breakdownTimeout.textContent =
    `${
      fakeTimeout *
      CONFIG.score.timeout
    }`;

  DOM.breakdownTotal.textContent =
    fakeScore;

  DOM.resultBestScore.textContent =
    StorageManager.getBestScore() ??
    "----";

  DOM.newBestMessage.textContent =
    "EDITOR TEST";

  DOM.rankText.textContent =
    getRank(fakeScore);

  DOM.performanceBar.style.width =
    "0%";

  DOM.performanceMessage.textContent =
    getPerformanceMessage(
      fakeAccuracy
    );

  hideEditorReturnButtons();

  if (
    DOM.resultBackToEditorBtn
  ) {

    DOM.resultBackToEditorBtn
      .classList
      .add("show");

  }

  ScreenManager.show(
    "result"
  );

  AudioManager.startEndingMusic();

  animateTestScore(
    fakeScore
  );

}


/* =========================================================
   TEST SCORE
   ========================================================= */

function animateTestScore(
  target
) {

  const duration =
    1200;

  const start =
    performance.now();

  DOM.finalScore.textContent =
    "0";

  const animate =
    now => {

      const progress =
        Math.min(
          (
            now -
            start
          ) /
            duration,
          1
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      DOM.finalScore.textContent =
        Math.round(
          target *
          eased
        );

      if (
        progress < 1
      ) {

        requestAnimationFrame(
          animate
        );

      }

    };

  requestAnimationFrame(
    animate
  );

  setTimeout(
    () => {

      if (
        GameState.phase ===
        "result"
      ) {

        DOM.performanceBar.style.width =
          "53%";

      }

    },
    700
  );

}


/* =========================================================
   CREDITS
   ========================================================= */


/*
  LOCKED ENDING CREDIT TEXT

  Cinematic movie-style ending.
*/

const ENDING_CREDITS = [

  [
    "KHAS MALAYSIA",
    "EDITION"
  ],

  [
    "CREATED BY:",
    "AKEEMZ"
  ],

  [
    "GAME DESIGN:",
    "AKEEMZ"
  ],

  [
    "DEVELOPMENT:",
    "AKEEMZ"
  ],

  [
    "BUILT WITH:",
    "HTML",
    "CSS",
    "JAVASCRIPT"
  ],

  [
    "QUESTIONS & CONTENT:",
    "KHAS MALAYSIA",
    "EDITION"
  ],

  [
    "MUSIC 1:",
    "RAHSIA NUSA"
  ],

  [
    "MUSIC 2:",
    "PERMATA KHATULISTIWA"
  ],

  [
    "ORIGINAL MUSIC BY:",
    "AKEEMZ",
    "GENERATED WITH SUNO"
  ],

  [
    "PLAYTESTER:",
    "AMIR NAJMI",
    "(KUJA)"
  ],

  [
    "SPECIAL THANKS:",
    "TO EVERYONE",
    "WHO PLAYED THIS GAME",
    "",
    "AND SUPPORTED",
    "THIS PROJECT"
  ],

  [
    "MADE WITH PASSION",
    "FOR MALAYSIA"
  ],

  [
    "THANK YOU",
    "FOR PLAYING",
    "KHAS MALAYSIA EDITION"
  ]

];


/* =========================================================
   CLEAR CREDIT TIMERS
   ========================================================= */

function clearCreditsTimers() {

  GameState.creditsTimeouts
    .forEach(
      timer => {

        clearTimeout(
          timer
        );

      }
    );

  GameState.creditsTimeouts =
    [];

}


/* =========================================================
   PREPARE ENDING CREDITS
   ========================================================= */

function prepareEndingCredits() {

  if (!DOM.creditsContent) {
    return;
  }

  let blocks =
    Array.from(
      DOM.creditsContent
        .querySelectorAll(
          ".credit-block"
        )
    );


  /*
    Reuse existing blocks.
    Create missing blocks only
    when necessary.
  */

  while (
    blocks.length <
    ENDING_CREDITS.length
  ) {

    const block =
      document.createElement(
        "div"
      );

    block.className =
      "credit-block";

    DOM.creditsContent
      .appendChild(
        block
      );

    blocks.push(
      block
    );

  }


  /*
    Apply the locked text.
    Old text is completely replaced.
  */

  blocks.forEach(
    (block, index) => {

      block.classList.remove(
        "active"
      );

      if (
        index >=
        ENDING_CREDITS.length
      ) {

        block.style.display =
          "none";

        return;

      }

      block.style.display =
        "";

      const lines =
        ENDING_CREDITS[index];


      block.innerHTML =
        lines
          .map(
            line =>
              `<div>${line}</div>`
          )
          .join("");

    }
  );

}


/* =========================================================
   RESET CREDIT VISUALS
   ========================================================= */

function resetCreditsVisuals() {

  if (!DOM.creditsContent) {
    return;
  }

  const blocks =
    DOM.creditsContent
      .querySelectorAll(
        ".credit-block"
      );

  blocks.forEach(
    block => {

      block.classList.remove(
        "active"
      );

    }
  );

  if (DOM.theEnd) {

    DOM.theEnd
      .classList
      .remove("active");

  }

}


/* =========================================================
   START CREDITS
   ========================================================= */

function startCredits() {

  clearCreditsTimers();

  stopTimer();

  GameState.phase =
    "credits";

  GameState.gameRunning =
    false;


  /*
    Prepare the final text.
  */

  prepareEndingCredits();

  resetCreditsVisuals();

  ScreenManager.show(
    "credits"
  );


  /*
    Ending music continues
    through the complete credits.
  */

  AudioManager.startEndingMusic();

  hideEditorReturnButtons();


  /*
    Editor test credits only.
  */

  if (
    GameState.editorTestCredits &&
    GameState.editorAuthenticated &&
    DOM.creditsBackToEditorBtn
  ) {

    DOM.creditsBackToEditorBtn
      .classList
      .add("show");

  }


  const blocks =
    Array.from(
      DOM.creditsContent
        .querySelectorAll(
          ".credit-block"
        )
    )
    .filter(
      block =>
        block.style.display !==
        "none"
    );


  /*
    MOVIE CINEMATIC TIMING

    Fade In:
      1600ms

    Hold:
      2600ms

    Fade Out:
      1600ms

    Gap:
      300ms
  */

  const fadeIn =
    1600;

  const hold =
    2600;

  const fadeOut =
    1600;

  const gap =
    300;

  const blockDuration =
    fadeIn +
    hold +
    fadeOut +
    gap;


  /*
    Each credit appears
    individually.
  */

  blocks.forEach(
    (block, index) => {

      const startTime =
        index *
        blockDuration;


      /*
        Fade IN
      */

      const showTimer =
        setTimeout(
          () => {

            if (
              GameState.phase !==
              "credits"
            ) {

              return;

            }

            block.classList.add(
              "active"
            );

          },
          startTime
        );


      /*
        Fade OUT
      */

      const hideTimer =
        setTimeout(
          () => {

            if (
              GameState.phase !==
              "credits"
            ) {

              return;

            }

            block.classList.remove(
              "active"
            );

          },
          startTime +
            fadeIn +
            hold
        );


      GameState.creditsTimeouts
        .push(
          showTimer
        );

      GameState.creditsTimeouts
        .push(
          hideTimer
        );

    }
  );


  /*
    THE END
    gets its own final moment.
  */

  const endStart =
    blocks.length *
      blockDuration +
    600;


  const theEndTimer =
    setTimeout(
      () => {

        if (
          GameState.phase !==
          "credits"
        ) {

          return;

        }

        if (DOM.theEnd) {

          DOM.theEnd.classList.add(
            "active"
          );

        }

      },
      endStart
    );


  GameState.creditsTimeouts
    .push(
      theEndTimer
    );


  /*
    THE END stays longer
    than the normal credits.
  */

  const endFinish =
    endStart +
    4500;


  const endTimer =
    setTimeout(
      () => {

        if (
          DOM.theEnd
        ) {

          DOM.theEnd
            .classList
            .remove("active");

        }

      },
      endFinish
    );


  GameState.creditsTimeouts
    .push(
      endTimer
    );


  /*
    Normal game:
      return to menu.

    Editor test:
      remain on credits.
  */

  if (
    !GameState.editorTestCredits
  ) {

    const returnTimer =
      setTimeout(
        () => {

          if (
            GameState.phase ===
            "credits"
          ) {

            returnToMenu();

          }

        },
        endFinish + 1200
      );


    GameState.creditsTimeouts
      .push(
        returnTimer
      );

  }

}


/* =========================================================
   RETURN TO EDITOR FROM TEST CREDITS
   ========================================================= */

function editorCreditsBack() {

  if (
    !GameState.editorAuthenticated
  ) {

    return;

  }

  AudioManager.playSfx(
    "click"
  );

  clearCreditsTimers();

  stopTimer();

  GameState.gameRunning =
    false;

  GameState.phase =
    "editor";

  GameState.editorMode =
    true;

  GameState.editorTestResult =
    false;

  GameState.editorTestCredits =
    false;

  resetCreditsVisuals();

  hideEditorReturnButtons();

  AudioManager.stopAll();

  ScreenManager.show(
    "editor"
  );

}


/* =========================================================
   RETURN TO MENU
   ========================================================= */

function returnToMenu() {

  clearCreditsTimers();

  GameState.phase =
    "idle";

  GameState.gameRunning =
    false;

  GameState.editorMode =
    false;

  GameState.editorTestResult =
    false;

  GameState.editorTestCredits =
    false;

  stopTimer();

  resetCreditsVisuals();

  hideEditorReturnButtons();

  ScreenManager.show(
    "menu"
  );

  AudioManager.returnToMenuMusic();

  updateMenuBestScore();

}


/* =========================================================
   BEST SCORE
   ========================================================= */

function updateMenuBestScore() {

  if (!DOM.menuBestScore) {
    return;
  }

  const best =
    StorageManager.getBestScore();

  DOM.menuBestScore.textContent =
    best === null
      ? "----"
      : best.toString();

}


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

function setupEvents() {


  /* ================= START ================= */

  DOM.startBtn.addEventListener(
    "click",
    () => {

      if (
        GameState.phase !==
        "idle"
      ) {

        return;

      }

      startGame(false);

    }
  );


  /* ================= HOW ================= */

  DOM.howBtn.addEventListener(
    "click",
    () => {

      if (
        GameState.phase !==
        "idle"
      ) {

        return;

      }

      AudioManager.playSfx(
        "click"
      );

      ScreenManager.show(
        "how"
      );

    }
  );


  /* ================= ABOUT ================= */

  DOM.aboutBtn.addEventListener(
    "click",
    () => {

      if (
        GameState.phase !==
        "idle"
      ) {

        return;

      }

      AudioManager.playSfx(
        "click"
      );

      ScreenManager.show(
        "about"
      );

    }
  );


  /* ================= EDITOR ================= */

  DOM.editorBtn.addEventListener(
    "click",
    () => {

      openEditorLogin();

    }
  );


  /* ================= HOW BACK ================= */

  DOM.howBackBtn.addEventListener(
    "click",
    () => {

      if (
        GameState.phase !==
        "idle"
      ) {

        return;

      }

      AudioManager.playSfx(
        "click"
      );

      ScreenManager.show(
        "menu"
      );

    }
  );


  /* ================= ABOUT BACK ================= */

  DOM.aboutBackBtn.addEventListener(
    "click",
    () => {

      if (
        GameState.phase !==
        "idle"
      ) {

        return;

      }

      AudioManager.playSfx(
        "click"
      );

      ScreenManager.show(
        "menu"
      );

    }
  );


  /* ================= LOGIN ================= */

  DOM.editorLoginForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      authenticateEditor();

    }
  );


  DOM.editorLoginBackBtn.addEventListener(
    "click",
    () => {

      AudioManager.playSfx(
        "click"
      );

      GameState.phase =
        "idle";

      ScreenManager.show(
        "menu"
      );

    }
  );


  /* ================= EDITOR BACK ================= */

  DOM.editorBackBtn.addEventListener(
    "click",
    () => {

      exitEditor();

    }
  );


  /* ================= AUDIO TESTS ================= */

  DOM.testClickBtn.addEventListener(
    "click",
    () => {

      testAudio("click");

    }
  );


  DOM.testCorrectBtn.addEventListener(
    "click",
    () => {

      testAudio("correct");

    }
  );


  DOM.testWrongBtn.addEventListener(
    "click",
    () => {

      testAudio("wrong");

    }
  );


  DOM.testWarningBtn.addEventListener(
    "click",
    () => {

      testAudio("warning");

    }
  );


  DOM.testTimeoutBtn.addEventListener(
    "click",
    () => {

      testAudio("timeout");

    }
  );


  DOM.testMenuMusicBtn.addEventListener(
    "click",
    () => {

      testMenuMusic();

    }
  );


  DOM.testEndingMusicBtn.addEventListener(
    "click",
    () => {

      testEndingMusic();

    }
  );


  DOM.stopAudioBtn.addEventListener(
    "click",
    () => {

      stopTestAudio();

    }
  );


  /* ================= GAME TEST ================= */

  DOM.editorQuizBtn.addEventListener(
    "click",
    () => {

      startEditorQuiz();

    }
  );


  DOM.editorResultBtn.addEventListener(
    "click",
    () => {

      testResult();

    }
  );


  DOM.editorCreditsBtn.addEventListener(
    "click",
    () => {

      if (
        !GameState.editorAuthenticated
      ) {

        return;

      }

      AudioManager.playSfx(
        "click"
      );

      GameState.editorTestCredits =
        true;

      GameState.editorTestResult =
        false;

      startCredits();

    }
  );


  /* ================= TEST RESULT BACK ================= */

  if (
    DOM.resultBackToEditorBtn
  ) {

    DOM.resultBackToEditorBtn
      .addEventListener(
        "click",
        () => {

          backToEditorFromTest();

        }
      );

  }


  /* ================= TEST CREDITS BACK ================= */

  if (
    DOM.creditsBackToEditorBtn
  ) {

    DOM.creditsBackToEditorBtn
      .addEventListener(
        "click",
        () => {

          editorCreditsBack();

        }
      );

  }


  /* ================= EDITOR QUIZ ================= */

  DOM.editorSkipBtn.addEventListener(
    "click",
    () => {

      editorSkipQuestion();

    }
  );


  DOM.editorTimerBtn.addEventListener(
    "click",
    () => {

      editorSkipTimer();

    }
  );


  DOM.editorQuizExitBtn.addEventListener(
    "click",
    () => {

      editorExitQuiz();

    }
  );


  /*
    NORMAL RESULT -> CREDITS

    Result remains visible for
    approximately 4 seconds.

    Editor TEST RESULT does NOT
    automatically enter credits.
  */

  let resultCreditsStarted =
    false;


  const resultObserver =
    new MutationObserver(
      () => {

        const active =
          DOM.screens.result
            .classList
            .contains("active");

        if (
          active &&
          !resultCreditsStarted &&
          !GameState.editorMode
        ) {

          resultCreditsStarted =
            true;

          const timer =
            setTimeout(
              () => {

                resultCreditsStarted =
                  false;

                if (
                  DOM.screens.result
                    .classList
                    .contains("active") &&
                  !GameState.editorMode
                ) {

                  startCredits();

                }

              },
              4000
            );

          GameState.creditsTimeouts
            .push(timer);

        }

        if (!active) {

          resultCreditsStarted =
            false;

        }

      }
    );


  resultObserver.observe(
    DOM.screens.result,
    {
      attributes: true,
      attributeFilter: [
        "class"
      ]
    }
  );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function init() {

  AudioManager.init();

  createParticles();

  updateMenuBestScore();

  setupEvents();

  hideEditorReturnButtons();

  ScreenManager.show(
    "menu"
  );

  GameState.phase =
    "idle";

}


init();