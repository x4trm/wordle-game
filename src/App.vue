<template>
  <div class="wordle-app">
    <h1>Wordle</h1>
    <Timer ref="timerRef" :is-running="isTimerRunning" />
    <Board
      :solution-length="solution.length"
      :guesses="guesses"
      :current-guess="currentGuess"
      :max-turns="maxTurns"
    />
    <Keyboard @key-press="handleKeyPress" :key-status="keyStatus" />
    
    <ResultsModal
      :is-open="showEndgameModal"
      type="endgame"
      :title="endgameTitle"
      :message="endgameMessage"
      :is-win="isWin"
      :solution="solution"
      :turn="guesses.length"
      :time-in-seconds="timerRef?.timerValue || 0"
      @play-again="startGame"
    />

    <ResultsModal
      :is-open="showInfoModal"
      type="info"
      :title="infoModalTitle"
      :message="infoModalMessage"
      @close="showInfoModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { words } from './assets/words';
import Board from './components/Board.vue';
import Keyboard from './components/Keyboard.vue';
import Timer from './components/Timer.vue';
import ResultsModal from './components/ResultsModal.vue';
import type { Guess, LetterStatus } from './types/game';

const timerRef = ref<InstanceType<typeof Timer> | null>(null);
const isTimerRunning = ref<boolean>(false);

const solution = ref<string>('');
const guesses = ref<Guess[]>([]);
const currentGuess = ref<string>('');
const maxTurns: number = 6;
const isWin = ref<boolean>(false);

const showEndgameModal = ref<boolean>(false); 
const showInfoModal = ref<boolean>(false);
const infoModalTitle = ref<string>('');
const infoModalMessage = ref<string>('');

const endgameTitle = computed(() => isWin.value ? 'Gratulacje, wygrałeś!' : 'Niestety, przegrałeś!');
const endgameMessage = computed(() => isWin.value ? '' : `Poprawne hasło to: ${solution.value}`);

const keyStatus = computed<Record<string, LetterStatus>>(() => {
  const status: Record<string, LetterStatus> = {};
  guesses.value.forEach((guess) => {
    guess.word.split('').forEach((char, index) => {
      if (guess.statuses[index] === 'correct') {
        status[char] = 'correct';
      } else if (guess.statuses[index] === 'present' && status[char] !== 'correct') {
        status[char] = 'present';
      } else if (guess.statuses[index] === 'absent' && !status[char]) {
        status[char] = 'absent';
      }
    });
  });
  return status;
});

const startGame = (): void => {
  const filteredWords = words.filter(w => w.length >= 5 && w.length <= 8);
  const randomIndex: number = Math.floor(Math.random() * filteredWords.length);
  solution.value = filteredWords[randomIndex];
  guesses.value = [];
  currentGuess.value = '';
  isWin.value = false;
  showEndgameModal.value = false;
  showInfoModal.value = false;
  timerRef.value?.resetTimer();
  isTimerRunning.value = true;
};

const handleKeyupEvent = (event: KeyboardEvent): void => {
  const key = event.key;
  handleKeyPress(key);
};

const handleKeyPress = (key: string): void => {
  if (showEndgameModal.value) return;

  const char = key.toLowerCase();
  
  if (char === 'enter') {
    submitGuess();
  } else if (char === 'backspace') {
    currentGuess.value = currentGuess.value.slice(0, -1);
  } else if (currentGuess.value.length < solution.value.length && /^[a-ząęłńśźżćóu]$/.test(char)) {
    currentGuess.value += char;
  }
};

const submitGuess = (): void => {
  if (showInfoModal.value) return;

  if (currentGuess.value.length !== solution.value.length) {
    infoModalTitle.value = 'Za krótkie słowo';
    infoModalMessage.value = `Hasło ma ${solution.value.length} liter.`;
    showInfoModal.value = true;
    return;
  }
  
  if (!words.includes(currentGuess.value)) {
    infoModalTitle.value = 'Słowo nieznane';
    infoModalMessage.value = 'Tego słowa nie ma w bazie danych.';
    showInfoModal.value = true;
    currentGuess.value = '';
    return;
  }

  const guessWord = currentGuess.value.toLowerCase();
  const solutionChars = solution.value.split('');
  const statuses: LetterStatus[] = Array(solution.value.length).fill('');
  const usedSolutionChars = Array(solution.value.length).fill(false);

  for (let i = 0; i < solution.value.length; i++) {
    if (guessWord[i] === solutionChars[i]) {
      statuses[i] = 'correct';
      usedSolutionChars[i] = true;
    }
  }

  for (let i = 0; i < solution.value.length; i++) {
    if (statuses[i] === 'correct') continue;

    const char = guessWord[i];
    const indexInSolution = solutionChars.findIndex((sChar, sIndex) => {
      return sChar === char && !usedSolutionChars[sIndex];
    });

    if (indexInSolution !== -1) {
      statuses[i] = 'present';
      usedSolutionChars[indexInSolution] = true;
    } else {
      statuses[i] = 'absent';
    }
  }

  guesses.value.push({ word: guessWord, statuses });
  currentGuess.value = '';

  if (guessWord === solution.value) {
    isWin.value = true;
    endGame();
  } else if (guesses.value.length >= maxTurns) {
    isWin.value = false;
    endGame();
  }
};

const endGame = (): void => {
  isTimerRunning.value = false;
  showEndgameModal.value = true;
};

onMounted(() => {
  startGame();
  window.addEventListener('keyup', handleKeyupEvent);
});

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyupEvent);
});
</script>

<style>
.wordle-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #121213;
  color: #d7dadc;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  border-bottom: 1px solid #3a3a3c;
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
}
</style>
