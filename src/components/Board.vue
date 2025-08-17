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
  gap: 8px;
}
.row {
  display: flex;
  gap: 8px;
}
.tile {
  width: 60px;
  height: 60px;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #d3d6da;
  text-transform: uppercase;
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
.tile.empty {
  background-color: #fff;
  color: #000;
}
</style>