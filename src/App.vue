<script setup>
import { ref } from 'vue'
import { astro } from 'iztro'
import AstrologyForm from './components/AstrologyForm.vue'
import AstrologyChart from './components/AstrologyChart.vue'

const astrolabe = ref(null)
const userName = ref('')

const handleFormSubmit = (data) => {
  try {
    const genderText = data.gender === 'male' ? '男' : '女'
    const result = astro.bySolar(data.date, parseInt(data.timeIndex), genderText, true)
    
    if (result) {
      astrolabe.value = result
      userName.value = data.name
    }
  } catch (error) {
    console.error('Calculation error:', error)
    alert('計算發生錯誤，請檢查輸入格式')
  }
}
</script>

<template>
  <div class="app-container">
    <header>
      <h1>紫微斗數排盤系統</h1>
    </header>
    
    <AstrologyForm @submit="handleFormSubmit" />
    
    <main v-if="astrolabe">
      <AstrologyChart :astrolabe="astrolabe" />
    </main>
    <div v-else class="empty-state">
      請輸入生辰開始排盤
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

header {
  padding: 0.5rem;
  background: #f1f5f9;
  border-bottom: 1px solid #cbd5e1;
  flex-shrink: 0;
}

.empty-state {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

main {
  flex-grow: 1;
  width: 100%;
  overflow: hidden; /* Chart takes care of its own sizing */
  padding: 4px;
  box-sizing: border-box;
}
</style>
