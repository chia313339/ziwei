<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const emit = defineEmits(['submit'])

const formData = ref({
  date: dayjs().format('YYYY-MM-DD'),
  timeIndex: 0,
  gender: 'male'
})

// Time options
const timeOptions = [
  { label: '早子 (00-01)', value: 0 },
  { label: '丑 (01-03)', value: 1 },
  { label: '寅 (03-05)', value: 2 },
  { label: '卯 (05-07)', value: 3 },
  { label: '辰 (07-09)', value: 4 },
  { label: '巳 (09-11)', value: 5 },
  { label: '午 (11-13)', value: 6 },
  { label: '未 (13-15)', value: 7 },
  { label: '申 (15-17)', value: 8 },
  { label: '酉 (17-19)', value: 9 },
  { label: '戌 (19-21)', value: 10 },
  { label: '亥 (21-23)', value: 11 },
  { label: '晚子 (23-00)', value: 12 }
]

const handleSubmit = () => {
  if (!formData.value.date) {
    alert('請選擇日期')
    return
  }
  emit('submit', { ...formData.value })
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" class="astro-form-inline">
      <div class="form-group-inline">
        <label>日期</label>
        <input v-model="formData.date" type="date" required />
      </div>

      <div class="form-group-inline">
        <label>時辰</label>
        <select v-model="formData.timeIndex">
          <option v-for="option in timeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="radio-group-inline">
        <label class="radio-label">
          <input type="radio" v-model="formData.gender" value="male" /> 男
        </label>
        <label class="radio-label">
          <input type="radio" v-model="formData.gender" value="female" /> 女
        </label>
      </div>

      <button type="submit" class="submit-btn">排盤</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
  padding: 1rem;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.astro-form-inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.form-group-inline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #334155;
  white-space: nowrap;
}

input[type="date"],
select {
  padding: 0.4rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
}

.radio-group-inline {
  display: flex;
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  color: #333;
}

.submit-btn {
  padding: 0.4rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
}
.submit-btn:hover {
  background-color: #2563eb;
}
</style>
