<template>
  <div class="timer">{{ formattedTime }}</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';

const props = defineProps<{
  isRunning: boolean;
}>();

const timerValue = ref<number>(0);
let timerInterval: number | null = null;

const formattedTime = computed<string>(() => {
  const seconds = timerValue.value;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
});

watch(
  () => props.isRunning,
  (newVal) => {
    if (newVal) {
      startTimer();
    } else {
      stopTimer();
    }
  }
);

const startTimer = () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timerValue.value++;
  }, 1000) as unknown as number;
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const resetTimer = () => {
  stopTimer();
  timerValue.value = 0;
};

onUnmounted(() => {
  stopTimer();
});

defineExpose({
  resetTimer,
  timerValue,
});
</script>

<style scoped>
.timer {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>