# 紫微斗數排盤系統 (Zi Wei Dou Shu Calculator)

這是一個基於 Vue 3 開發的紫微斗數排盤系統，利用 [iztro](https://github.com/SylarLong/iztro) 庫進行核心算法計算，提供直觀的命盤展示介面。

## 🛠 技術棧 (Tech Stack)

- **核心框架**: [Vue 3](https://vuejs.org/) (Script Setup)
- **建構工具**: [Vite](https://vitejs.dev/)
- **排盤算法**: [iztro](https://www.npmjs.com/package/iztro) - 專業的紫微斗數計算庫
- **時間處理**: [dayjs](https://day.js.org/)

## 📂 專案架構 (Project Architecture)

### 目錄結構
```
src/
├── components/          # UI 組件
│   ├── AstrologyForm.vue  # 用戶輸入表單 (生辰八字)
│   ├── AstrologyChart.vue # 命盤主展示區 (12宮位佈局)
│   └── PalaceDetail.vue   # 單個宮位詳細資訊展示
├── utils/               # 工具與資料
│   ├── star-descriptions.js # 星曜解釋與說明
│   └── trad-chinese.js      # 繁體中文相關處理
├── App.vue              # 主應用入口 (處理排盤邏輯)
└── main.js              # 應用掛載點
```

### 核心資料流 (Core Data Flow)

1.  **使用者輸入**: 用戶在 `AstrologyForm` 輸入出生日期、時間與性別。
2.  **觸發計算**: `App.vue` 接收表單數據，調用 `iztro` 的 `astro.bySolar` 方法進行排盤計算。
3.  **生成命盤**: 計算結果產生 `astrolabe` (星盤) 物件。
4.  **渲染視圖**: `AstrologyChart` 接收 `astrolabe` 數據，渲染 12 個 `PalaceDetail` 宮位，展示主星、輔星、地支等資訊。

## 🚀 快速開始 (Getting Started)

### 安裝依賴
```bash
npm install
```

### 啟動開發服務器
```bash
npm run dev
```

### 構建生產版本
```bash
npm run build
```

## 📝 重點邏輯說明
- **排盤機制**: 專案使用 `iztro` 庫，支援通過陽曆 (Solar Date) 進行反推排盤。
- **宮位映射**: 命盤採用標準的 12 宮位佈局，結合天干地支進行動態渲染。
- **星曜展示**: 不同級別的星曜（甲級星、乙級星等）在 UI 上有層級區分，確保閱讀體驗。
