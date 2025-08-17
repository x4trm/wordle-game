<template>
  <div class="keyboard">
    <div v-for="(row, index) in keyboardRows" :key="index" class="keyboard-row">
      <button
        v-for="key in row"
        :key="key"
        :class="['key-button', keyStatus[key], { 'long-key': key === 'Enter' || key === 'Backspace' }]"
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
  margin-top: 1rem;
  width: 100%;
  padding: 0 0.5rem;
  box-sizing: border-box;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
  width: 100%;
}

.key-button {
  flex: 1;
  aspect-ratio: 1.5 / 1;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: #818384;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  user-select: none;
  transition: background-color 0.2s, transform 0.1s;
}

.key-button.correct {
  background-color: #6aaa64;
}

.key-button.present {
  background-color: #c9b458;
}

.key-button.absent {
  background-color: #3a3a3c;
}

.key-button:active {
  transform: scale(0.95);
}

.key-button.long-key {
  flex: 1.5;
  font-size: 0.8rem;
}

@media (min-width: 600px) {
  .keyboard {
    max-width: 500px;
    margin-top: 2rem;
  }

  .keyboard-row {
    gap: 0.4rem;
    margin-bottom: 0.6rem;
  }

  .key-button {
    font-size: 1.2rem;
  }

  .key-button.long-key {
    font-size: 1rem;
  }
}

@media (min-width: 900px) {
  .keyboard {
    max-width: 600px;
  }
}
</style>