<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div v-if="type === 'endgame'">
        <p>Hasło: <strong>{{ solution }}</strong></p>
        <p v-if="isWin">Odgadnięto w turze: <strong>{{ turn }}</strong></p>
        <p>Czas gry: <strong>{{ formattedTime }}</strong></p>
        <button @click="$emit('play-again')">Zagraj ponownie</button>
      </div>
      <div v-else-if="type === 'info'">
        <button @click="$emit('close')">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  type: 'endgame' | 'info';
  title: string;
  message: string;
  isWin?: boolean;
  solution?: string;
  turn?: number;
  timeInSeconds?: number;
}>();

defineEmits(['play-again', 'close']);

const formattedTime = computed<string>(() => {
  if (props.timeInSeconds === undefined) return '';
  const minutes = Math.floor(props.timeInSeconds / 60);
  const seconds = props.timeInSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 1000;
}

.modal-content {
  background: #1e1e1e;
  color: #d7dadc;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #d7dadc;
}

.modal-content p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.modal-content button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #6aaa64;
  color: white;
  font-weight: bold;
  transition: background-color 0.2s;
}

.modal-content button:hover {
  background-color: #5d9e54;
}

@media (min-width: 600px) {
  .modal-content {
    padding: 2rem;
  }
}

@media (min-width: 900px) {
  .modal-content {
    max-width: 500px;
  }
}
</style>