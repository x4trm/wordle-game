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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}
button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}
</style>