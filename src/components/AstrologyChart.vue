<script setup>
import { computed, ref, watch } from 'vue'
import { toTraditional } from '../utils/trad-chinese'
import PalaceDetail from './PalaceDetail.vue'

const props = defineProps({
  astrolabe: {
    type: Object,
    required: true
  }
})

const selectedPalaceIndex = ref(-1) // Start with invalid index

const palaces = computed(() => {
  if (!props.astrolabe) return []
  return props.astrolabe.palaces.map(p => ({
    ...p,
    name: toTraditional(p.name),
    majorStars: p.majorStars.map(s => ({ ...s, name: toTraditional(s.name), brightness: toTraditional(s.brightness), mutagen: toTraditional(s.mutagen) })),
    minorStars: p.minorStars.map(s => ({ ...s, name: toTraditional(s.name) })),
    adjectiveStars: p.adjectiveStars.map(s => ({ ...s, name: toTraditional(s.name) })),
    changsheng12: toTraditional(p.changsheng12),
    boshi12: toTraditional(p.boshi12),
    jiangqian12: toTraditional(p.jiangqian12),
    suiqian12: toTraditional(p.suiqian12),
    heavenlyStem: toTraditional(p.heavenlyStem),
    earthlyBranch: toTraditional(p.earthlyBranch)
  }))
})

const selectedPalace = computed(() => {
  return palaces.value.find(p => p.index === selectedPalaceIndex.value) || null
})

// Set default to Ming Palace whenever astrolabe changes
watch(() => props.astrolabe, (newVal) => {
  if (newVal && palaces.value.length > 0) {
    const ming = palaces.value.find(p => p.isOriginalPalace)
    if (ming) {
      selectedPalaceIndex.value = ming.index
    } else {
      selectedPalaceIndex.value = palaces.value[0].index
    }
  }
}, { immediate: true, deep: true }) // Add deep watcher to ensure nested change triggers

const selectPalace = (index) => {
  selectedPalaceIndex.value = index
}

const centerInfo = computed(() => {
    if(!props.astrolabe) return {};

    // Extract SiHua
    const sihuaMap = { '祿': '', '權': '', '科': '', '忌': '' };
    props.astrolabe.palaces.forEach(p => {
        p.majorStars.forEach(s => {
            if (s.mutagen) {
                const tradMutagen = toTraditional(s.mutagen);
                if (['祿', '權', '科', '忌'].includes(tradMutagen)) {
                    sihuaMap[tradMutagen] = toTraditional(s.name) + '化' + tradMutagen;
                }
            }
        });
        p.minorStars.forEach(s => { // sometimes minor stars have mutagen too
             if (s.mutagen) {
                const tradMutagen = toTraditional(s.mutagen);
                if (['祿', '權', '科', '忌'].includes(tradMutagen)) {
                    sihuaMap[tradMutagen] = toTraditional(s.name) + '化' + tradMutagen;
                }
            }
        });
    });
    
    // Order: Lu, Quan, Ke, Ji
    const sihuaString = [sihuaMap['祿'], sihuaMap['權'], sihuaMap['科'], sihuaMap['忌']].filter(Boolean).join(',');

    // BaZi: Year, Month, Day, Hour
    const baziParts = props.astrolabe.chineseDate.split(' ');

    return {
        solarDate: toTraditional(props.astrolabe.solarDate),
        lunarDate: toTraditional(props.astrolabe.lunarDate),
        chineseDate: toTraditional(props.astrolabe.chineseDate),
        gender: toTraditional(props.astrolabe.gender),
        fiveElementsClass: toTraditional(props.astrolabe.fiveElementsClass),
        soul: toTraditional(props.astrolabe.soul),
        body: toTraditional(props.astrolabe.body),
        sihua: sihuaString,
        bazi: baziParts
    }
})

</script>

<template>
  <div class="chart-wrapper">
    <div class="chart-container" v-if="astrolabe">
      <div class="grid-12">
        <!-- Center Area -->
        <div class="center-area">
          <div class="info-content">
            <div class="info-row left-align">
              <span>陽曆︰{{ centerInfo.solarDate }}</span>
              <span class="gender">{{ centerInfo.gender }}</span>
            </div>
            <div class="info-row left-align">
              <span>農曆︰{{ centerInfo.lunarDate }}</span>
            </div>
            
            <!-- BaZi Section -->
            <div class="bazi-section" v-if="centerInfo.bazi && centerInfo.bazi.length === 4">
                <div class="bazi-column">
                    <span class="bazi-label">年柱</span>
                    <span class="bazi-value">{{ centerInfo.bazi[0] }}</span>
                </div>
                <div class="bazi-column">
                    <span class="bazi-label">月柱</span>
                    <span class="bazi-value">{{ centerInfo.bazi[1] }}</span>
                </div>
                <div class="bazi-column">
                    <span class="bazi-label">日柱</span>
                    <span class="bazi-value">{{ centerInfo.bazi[2] }}</span>
                </div>
                <div class="bazi-column">
                    <span class="bazi-label">時柱</span>
                    <span class="bazi-value">{{ centerInfo.bazi[3] }}</span>
                </div>
            </div>

            <div class="info-row left-align">
              <span>五行局: {{ centerInfo.fiveElementsClass }}</span>
            </div>
            <div class="info-row left-align text-wrap">
              <span>生年四化: {{ centerInfo.sihua }}</span>
            </div>
             <div class="info-row left-align">
              <span>命主: {{ centerInfo.soul }}, 身主: {{ centerInfo.body }}</span>
            </div>
          </div>
        </div>

        <div 
          v-for="palace in palaces" 
          :key="palace.index"
          class="palace-card"
          :class="['pos-' + palace.earthlyBranch, { 'is-selected': palace.index === selectedPalaceIndex }]"
          @click="selectPalace(palace.index)"
        >
          <div class="palace-header">
            <span class="palace-stem-branch">{{ palace.heavenlyStem }}{{ palace.earthlyBranch }}</span>
            <span class="palace-name">【{{ palace.name }}】</span>
          </div>
          
          <div class="palace-body">
            <div class="stars-col">
              <!-- Major Stars -->
              <div 
                v-for="star in palace.majorStars" 
                :key="star.name" 
                class="star major"
              >
                <span class="star-name">{{ star.name }}</span>
                <span class="brightness" v-if="star.brightness">{{ star.brightness }}</span>
                <span class="mutagen" v-if="star.mutagen">{{ star.mutagen }}</span>
              </div>
            </div>
            
            <div class="stars-col">
              <!-- Minor Stars -->
              <div 
                v-for="star in palace.minorStars" 
                :key="star.name" 
                class="star minor"
              >
                {{ star.name }}
              </div>
              <!-- Adjective Stars + Xun Kung if manually added? -->
              <!-- iztro puts many in adjectiveStars. -->
              <div 
                v-for="star in palace.adjectiveStars" 
                :key="star.name" 
                class="star adj"
              >
                {{ star.name }}
              </div>
            </div>
            
            <div class="stars-col right-aligned">
               <!-- Small Stars Section (Doctor, JiangQian, SuiQian) -->
               <div class="small-stars-group">
                 <span class="small-star">{{ palace.boshi12 }}</span>
                 <span class="small-star">{{ palace.jiangqian12 }}</span>
                 <span class="small-star">{{ palace.suiqian12 }}</span>
               </div>
               
               <!-- Decadal / Years -->
               <div class="decadal-limit">{{ palace.decadal.range[0] }}-{{ palace.decadal.range[1] }}</div>
               <div class="age-limit">{{ palace.ages.join(' ') }}</div>
               
               <!-- ChangSheng 12 (Life Stage) -->
               <div class="changsheng-star">{{ palace.changsheng12 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Detail Panel -->
    <div class="detail-container">
      <PalaceDetail v-if="selectedPalace" :palace="selectedPalace" />
    </div>
  </div>
</template>

<style scoped>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.chart-container {
  width: 100%;
  /* Use aspect-ratio to keep it square-ish or just auto height */
  aspect-ratio: 1 / 1; 
  max-width: 800px; /* Limit max width for large screens */
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #fff;
  border: 2px solid #000;
  font-family: "PMingLiU", "MingLiU", serif;
  flex-shrink: 0;
}

.detail-container {
  width: 100%;
  margin-top: 1rem;
  overflow: visible;
  border: 2px solid #000;
}

.grid-12 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: 100%;
  width: 100%;
  gap: 0;
}

/* Center Area */
.center-area {
  grid-column: 2 / span 2;
  grid-row: 2 / span 2;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcfcfc;
  padding: 0.5rem;
}

.info-content {
  font-size: 1rem;
  line-height: 1.4;
}

.info-row {
  margin-bottom: 0.2rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.info-row.left-align {
  justify-content: flex-start;
  width: 100%;
  padding-left: 5%;
  box-sizing: border-box;
}

.info-row.text-wrap {
  white-space: normal;
  word-wrap: break-word; /* Ensure text wraps */
  overflow-wrap: break-word;
}

.bazi-section {
  display: flex;
  justify-content: space-around;
  width: 95%;
  margin: 0.5rem auto;
  padding: 0.5rem 0;
  background-color: #fff1f2; /* Light accent */
  border-radius: 4px;
}

.bazi-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bazi-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 2px;
}

.bazi-value {
  font-weight: bold;
  color: #000;
  font-size: 1.1rem;
}

/* Palace Card */
.palace-card {
  border: 1px solid #000;
  padding: 2px 4px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.2s;
}

.palace-card:hover {
  background-color: #f0f9ff;
}

.palace-card.is-selected {
  background-color: #fff7ed;
  box-shadow: inset 0 0 0 2px #f59e0b;
}

/* Positioning */
.pos-巳 { grid-column: 1; grid-row: 1; }
.pos-午 { grid-column: 2; grid-row: 1; }
.pos-未 { grid-column: 3; grid-row: 1; }
.pos-申 { grid-column: 4; grid-row: 1; }
.pos-酉 { grid-column: 4; grid-row: 2; }
.pos-戌 { grid-column: 4; grid-row: 3; }
.pos-亥 { grid-column: 4; grid-row: 4; }
.pos-子 { grid-column: 3; grid-row: 4; }
.pos-丑 { grid-column: 2; grid-row: 4; }
.pos-寅 { grid-column: 1; grid-row: 4; }
.pos-卯 { grid-column: 1; grid-row: 3; }
.pos-辰 { grid-column: 1; grid-row: 2; }


/* Header */
.palace-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1px;
  margin-bottom: 1px;
  flex-shrink: 0;
}
.palace-stem-branch {
  font-weight: bold;
  font-size: 0.9rem;
}
.palace-name {
  font-weight: 900;
  color: #0000cc;
  font-size: 0.9rem;
  background: #eef2ff;
  padding: 0 2px;
}

/* Body */
.palace-body {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  font-size: 0.8rem;
  overflow: hidden;
}

.stars-col {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Major Stars */
.star.major {
  display: flex;
  align-items: center;
  color: #e60000; /* Red */
  font-weight: bold;
}
.star.major .brightness {
  font-size: 0.75em;
  color: #666;
  margin-left: 2px;
  font-weight: normal;
}
.star.major .mutagen {
  font-size: 0.75em;
  background-color: #e60000;
  color: white;
  border-radius: 2px;
  padding: 0 2px;
  margin-left: 2px;
}

.star.minor {
  color: #000;
}
.star.adj {
  color: #444;
  font-size: 0.85em;
}

.right-aligned {
  align-items: flex-end;
  margin-left: auto;
}

.small-stars-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 2px;
}
.small-star {
  font-size: 0.7rem;
  color: #555;
  line-height: 1;
}

.decadal-limit {
  color: #0000cc;
  font-weight: bold;
  margin-top: auto; /* Push to bottom */
}
.age-limit {
  font-size: 0.8em;
  color: #555;
  text-align: right;
  word-break: break-all;
  max-width: 50px;
}

.changsheng-star {
  font-size: 0.8rem;
  color: #888;
  margin-top: 1px;
}

@media (max-width: 768px) {
  /* .chart-container { height: 50%; } - removed to allow auto height */
  /* .detail-container { height: 50%; } - removed to allow auto height */
  .palace-card { font-size: 0.7rem; }
  .star.major { font-size: 0.8rem; }
  .star.minor { font-size: 0.7rem; }
}
</style>
