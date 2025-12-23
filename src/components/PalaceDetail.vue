<script setup>
import { computed } from 'vue'
import { starDescriptions } from '../utils/star-descriptions'
import { toTraditional } from '../utils/trad-chinese'

const props = defineProps({
  palace: {
    type: Object,
    required: true
  }
})

// Retrieve star static data
const getStarInfo = (starName) => {
  const tradName = toTraditional(starName)
  return starDescriptions[tradName] || null
}

const majorStarsAnalysis = computed(() => {
  if (!props.palace.majorStars) return []
  return props.palace.majorStars.map(star => {
    const info = getStarInfo(star.name)
    return {
      name: star.name,
      brightness: star.brightness,
      mutagen: star.mutagen,
      ...info
    }
  })
})

const minorStarsText = computed(() => {
  return props.palace.minorStars ? props.palace.minorStars.map(s => s.name).join('、') : ''
})

const adjectiveStarsText = computed(() => {
  return props.palace.adjectiveStars ? props.palace.adjectiveStars.map(s => s.name).join('、') : ''
})

// Simple template-based evaluation
const overallEvaluation = computed(() => {
  let goodCount = 0
  let badCount = 0
  const descriptions = []

  // Check brightness for Major Stars
  props.palace.majorStars.forEach(s => {
    if (['廟', '旺'].includes(s.brightness)) goodCount++
    if (['陷', '不'].includes(s.brightness)) badCount++
  })

  // Simple hardcoded check for lucky/unlucky stars (simplified)
  // Lucky: 左輔, 右弼, 天魁, 天鉞, 文昌, 文曲, 祿存
  // Unlucky: 擎羊, 陀羅, 火星, 鈴星, 地空, 地劫
  const lucky = ['左輔', '右弼', '天魁', '天鉞', '文昌', '文曲', '祿存']
  const unlucky = ['擎羊', '陀羅', '火星', '鈴星', '地空', '地劫']

  const allMinor = [...(props.palace.minorStars || []), ...(props.palace.adjectiveStars || [])]
  allMinor.forEach(s => {
    if (lucky.includes(toTraditional(s.name))) goodCount++
    if (unlucky.includes(toTraditional(s.name))) badCount++
  })

  if (goodCount > badCount) return '此宮位吉星拱照，整體運勢較佳，主星廟旺者更吉。'
  if (badCount > goodCount) return '此宮位煞星較多，需注意波折與挑戰，宜修身養性。'
  return '此宮位吉凶參半，運勢平穩，視主星性質而定。'
})

</script>

<template>
  <div class="palace-detail-panel">
    <div class="panel-header">
      <h3>【{{ palace.name }}】詳細解析</h3>
      <span class="stem-branch">{{ palace.heavenlyStem }}{{ palace.earthlyBranch }}位</span>
    </div>

    <div class="analysis-section">
      <h4>綜合評價</h4>
      <p class="evaluation-text">{{ overallEvaluation }}</p>
    </div>

    <div class="analysis-section" v-if="majorStarsAnalysis.length">
      <h4>主星分析</h4>
      <div v-for="star in majorStarsAnalysis" :key="star.name" class="star-card">
        <div class="star-header">
          <span class="star-title major">{{ star.name }}</span>
          <span class="star-meta" v-if="star.brightness">亮度：{{ star.brightness }}</span>
          <span class="star-meta" v-if="star.mutagen">四化：{{ star.mutagen }}</span>
        </div>
        <div class="star-desc" v-if="star.type">
          <p><strong>特質：</strong>{{ star.keywords }} ({{ star.type }})</p>
          <p><strong>說明：</strong>{{ star.description }}</p>
          <p><strong>優點：</strong>{{ star.pros }}</p>
          <p><strong>缺點：</strong>{{ star.cons }}</p>
        </div>
        <div class="star-desc" v-else>
          <p>無詳細說明資料。</p>
        </div>
      </div>
    </div>
    <div class="analysis-section" v-else>
      <h4>主星分析</h4>
      <p>此宮無主星（命無正曜），借對宮主星參考。</p>
    </div>

    <div class="analysis-section">
      <h4>輔星與雜曜</h4>
      <p><strong>輔星：</strong>{{ minorStarsText || '無' }}</p>
      <p><strong>雜曜：</strong>{{ adjectiveStarsText || '無' }}</p>
    </div>
  </div>
</template>

<style scoped>
.palace-detail-panel {
  background-color: #fff;
  border-top: 2px solid #000;
  padding: 1.5rem;
  overflow-y: auto;
  height: 100%;
  font-family: inherit;
}

.panel-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

h3 {
  margin: 0;
  color: #0000cc;
  font-size: 1.4rem;
}

.stem-branch {
  color: #666;
  font-weight: bold;
}

h4 {
  margin: 0 0 0.8rem 0;
  color: #333;
  font-size: 1.1rem;
  border-left: 4px solid #4338ca;
  padding-left: 0.5rem;
}

.analysis-section {
  margin-bottom: 1.5rem;
}

.evaluation-text {
  font-weight: 500;
  color: #444;
}

.star-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.star-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.star-title.major {
  color: #e60000;
  font-size: 1.2rem;
  font-weight: bold;
}

.star-meta {
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #555;
}

.star-desc p {
  margin: 0.4rem 0;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
}
</style>
