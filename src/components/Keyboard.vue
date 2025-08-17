<template>
  <div class="keyboard">
    <div v-for="(row, index) in keyboardRows" :key="index" class="keyboard-row">
      <button
        v-for="key in row"
        :key="key"
        :class="['key-button', keyStatus[key]]"
        @click="$emit('key-press', key)"
      >
        <span v-if="key === 'Enter'">Enter</span>
        <span v-else-if="key === 'Backspace'">⌫</span>
        <span v-else>{{ key }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { LetterStatus } from '../types/game';

defineProps<{
  keyStatus: Record<string, LetterStatus>;
}>();

defineEmits(['key-press']);

const keyboardRows: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  user-select: none;
}
.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
}
.key-button {
  color: #000000;
  background-color: #d3d6da;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  height: 48px;
  min-width: 38px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}
.key-button:hover {
  background-color: #c0c3c7;
}
.key-button.correct {
  background-color: #6aaa64;
  color: white;
}
.key-button.present {
  background-color: #c9b458;
  color: white;
}
.key-button.absent {
  background-color: #787c7e;
  color: white;
}
span {
  font-size: 0.8em;
}
</style>