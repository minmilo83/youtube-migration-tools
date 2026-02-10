# 📺 YouTube 播放清單搬家自動化工具組

這是一個專門為了 YouTube 帳號遷移（Migration）而設計的腳本集合。包含網址提取、自動比對、批次移除以及擬人化的自動操作腳本。

---

## 📂 專案目錄與工具介紹

### 🐵 竄改猴腳本 (Tampermonkey Scripts)
*需安裝 [Tampermonkey](https://www.tampermonkey.net/) 擴充功能，開啟網頁後自動執行。*
- **[自動按讚助手](./Tampermonkey-Scripts/auto-like.user.js)**：在新帳號自動點擊「喜歡」並關閉分頁。
- **[取消按讚助手](./Tampermonkey-Scripts/auto-unlike.user.js)**：在舊帳號自動撤回按讚紀錄。
- **[觀看紀錄恢復](./Tampermonkey-Scripts/auto-watch-history.user.js)**：模擬真人觀看 (12-22秒)，恢復演算法與觀看紀錄。

### 💻 Console 輔助工具 (Console Tools)
*手動複製腳本內容，在 YouTube 頁面按 `F12` -> `Console` 貼上執行。*
- **[強力自動捲動](./Console-Tools/auto-scroll.js)**：暴力滑到底部，確保所有影片都載入 HTML。
- **[批次移除工具](./Console-Tools/batch-remove.js)**：根據網址清單，自動從播放清單中移除影片。
- **[遺漏影片檢查](./Console-Tools/check-missing.js)**：比對備份檔，找出新帳號漏掉的影片。
- **[殘留影片檢查](./Console-Tools/check-remaining.js)**：清理後檢查舊帳號是否還有沒刪掉的影片。

---

## 🛠 必備工具
1. **瀏覽器**：Google Chrome 或 Edge。
2. **擴充功能**：[Tampermonkey](https://www.tampermonkey.net/) (用於執行 `.user.js` 腳本)。
3. **文字編輯器**：Notepad++ 或 VS Code (用於存放備份的網址清單)。

---

## 📝 搬家與備份標準步驟 (SOP)

### 第一階段：原帳號備份與提取
1. 進入舊帳號的「喜歡的影片」或「播放清單」頁面。
2. 先執行 **`auto-scroll.js`**，確保網頁加載了上千部影片的標籤。
3. 執行 **`01-export-playlist.js`** (或手動複製)，將網址存成 `backup.txt`。

### 第二階段：新帳號導入與恢復
1. 開啟新帳號，安裝並啟用 **`auto-like.user.js`** 或 **`auto-watch-history.user.js`**。
2. 使用批量開啟工具（如 OmniSearch）開啟 `backup.txt` 中的網址。
3. 腳本會自動點擊喜歡並在隨機時間後自動關閉分頁。
4. **檢查**：開啟新帳號清單，跑 **`check-missing.js`** 比對 `backup.txt`，確認是否有漏掉的。

### 第三階段：舊帳號清理
1. 回到舊帳號清單頁面。
2. 先跑 **`auto-scroll.js`** 載入全部影片。
3. 貼上要刪除的名單到 **`batch-remove.js`** 並執行。
4. **複查**：執行 **`check-remaining.js`**，確保舊帳號已清理乾淨。

---

## ⚠️ 注意事項
- **延遲設定**：自動化腳本皆設有隨機延遲（擬人化），請勿自行將時間縮得太短，以防觸發 YouTube 的機器人偵測機制。
- **分批執行**：建議每次批量開啟 20-30 個分頁，避免電腦記憶體 (RAM) 溢出。

---
*Created by Gemini & User - 2026*
