<template>
  <div class="board">
    <div v-for="(guess, rowIndex) in guesses" :key="rowIndex" class="row">
      <div
        v-for="(char, colIndex) in guess.word"
        :key="colIndex"
        :class="['tile', guess.statuses[colIndex]]"
      >
        {{ char }}
      </div>
    </div>

    <div v-if="guesses.length < maxTurns" class="row">
      <div
        v-for="(char, colIndex) in currentGuess.split('')"
        :key="'current-' + colIndex"
        class="tile filled"
      >
        {{ char }}
      </div>
      <div
        v-for="i in solutionLength - currentGuess.length"
        :key="'empty-' + i"
        class="tile empty"
      ></div>
    </div>

    <div
      v-for="i in maxTurns - guesses.length - (guesses.length < maxTurns ? 1 : 0)"
      :key="'empty-row-' + i"
      class="row"
    >
      <div
        v-for="j in solutionLength"
        :key="'empty-tile-' + j"
        class="tile empty"
      ></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';
import type { Guess } from '../types/game';

defineProps<{
  guesses: Guess[];
  currentGuess: string;
  solutionLength: number;
  maxTurns: number;
}>();
</script>

<style scoped>
.board {
display: flex;
flex-direction: column;
align-items: center;
gap: 0.5rem;
width: 100%;
max-width: 350px;
}

.row {
display: flex;
justify-content: center;
gap: 0.5rem;
width: 100%;
}

.tile {
flex: 1 1 0;
aspect-ratio: 1 / 1;
max-width: 60px;
font-size: 1.5rem;
font-weight: bold;
display: flex;
align-items: center;
justify-content: center;
border: 2px solid #3a3a3c;
text-transform: uppercase;
transition: transform 0.2s, background-color 0.2s;
user-select: none;
}

.tile.correct {
background-color: #6aaa64;
color: white;
border-color: #6aaa64;
}

.tile.present {
background-color: #c9b458;
color: white;
border-color: #c9b458;
}

.tile.absent {
background-color: #787c7e;
color: white;
border-color: #787c7e;
}

.tile.filled {
border-color: #565758;
}

.tile.empty {
background-color: #121213;
color: #121213;
border-color: #3a3a3c;
}

@media (max-width: 350px) {
.board {
max-width: 90vw;
}
}
</style>