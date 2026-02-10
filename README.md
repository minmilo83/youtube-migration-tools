# 📺 YouTube 一鍵搬家自動化工具箱 (v2026 終極版)

這套工具能幫你把 YouTube 「喜歡的影片」或「播放清單」從舊帳號搬到新帳號。透過**擬人化腳本**，安全地恢復演算法紀錄，且支援繁、簡、英、日多國語系。

---

## 🚀 快速安裝區 (Tampermonkey Scripts)
*點擊下方連結進入檔案，點選右上角的 **[Raw]** 按鈕即可自動跳出安裝視窗。*

| 動作 | 腳本連結 | 功能說明 |
| :--- | :--- | :--- |
| **新帳號用** | [自動按讚 + 觀看紀錄恢復](./Tampermonkey-Scripts/auto-like.user.js) | 自動按讚並停留 15 秒恢復演算法。 |
| **新帳號用** | [擬人化觀看助手](./Tampermonkey-Scripts/auto-watch-history.user.js) | 單純模擬觀看紀錄，不按讚。 |
| **舊帳號用** | [自動取消按讚](./Tampermonkey-Scripts/auto-unlike.user.js) | 清理舊帳號的喜歡紀錄。 |

---

## 🛠️ 三大階段：極簡搬家教學

### 第一步：備份舊清單 (在舊帳號操作)
1. 進入你的「喜歡的影片」頁面。
2. 按下 `F12` 打開控制台 (Console)，先貼上執行 **[自動捲動工具](./Console-Tools/auto-scroll.js)** (滑到底部)。
3. 接著貼上執行 **[01-一鍵網址備份](./Console-Tools/01-export-playlist.js)**，你會得到一個 `.txt` 檔案。

### 第二步：導入新帳號 (在新帳號操作)
1. 安裝上面的 **「自動按讚 + 觀看紀錄恢復」** 腳本。
2. 使用你的 `OmniSearch` 網頁工具，一次開啟 20-30 個剛才備份的影片網址。
3. 腳本會自動執行：**「打開 -> 停留隨機時間 -> 點讚 -> 關閉」**。你只需要放著讓它跑。
4. **檢查**：跑完後執行 **[遺漏比對工具](./Console-Tools/check-missing.js)**，貼上備份內容，確認是否全部搬運成功。

### 第三步：清理舊帳號 (選配)
1. 進入舊帳號清單，執行 **[批次移除工具](./Console-Tools/batch-remove.js)** 即可自動清理。

---

## 📂 完整工具目錄

### 💻 網頁 Console 工具 (F12 專用)
* [01-一鍵導出網址](./Console-Tools/01-export-playlist.js) - 抓取全清單存成檔案。
* [02-遺漏影片檢查](./Console-Tools/check-missing.js) - 檢查哪些影片沒搬成功。
* [03-殘留影片檢查](./Console-Tools/check-remaining.js) - 清理後確認是否刪乾淨。
* [自動滑到底部](./Console-Tools/auto-scroll.js) - 暴力載入所有影片標籤。
* [批次精準移除](./Console-Tools/batch-remove.js) - 模擬點擊選單移除影片。

### 🐵 竄改猴腳本 (自動化神器)
* [自動按讚 V13](./Tampermonkey-Scripts/auto-like.user.js)
* [自動取消按讚](./Tampermonkey-Scripts/auto-unlike.user.js)
* [觀看紀錄備份](./Tampermonkey-Scripts/auto-watch-history.user.js)

---

## 💡 使用小技巧
* **不要急**：自動化腳本設有「隨機延遲」，這是為了騙過 YouTube 機器人偵測，請耐心等待分頁自動關閉。
* **分批跑**：如果你的影片有 1000 部，建議分 10 次跑，每次開 100 個分頁，電腦才不會卡死。
* **入口網站**：如果你想快速開啟網址，請使用專案根目錄的 [OmniSearch 入口](./Open_OmniSearch.html)。

---

### 🖋️ Developer Story & Credits
**Maintained by: minmilo83 & Gemini AI**

這個專案是 **Vibe Coding** 的實踐成果。最初開發的起因單純是因為開發者 **minmilo83** 自己有大量的 YouTube 播放清單搬家需求，在手動操作到心累後，決定將這些「感覺與邏輯」轉化為程式碼。

後來覺得與其自己私藏，不如將這套方法變成一個簡單、直觀的工具箱分享出來，讓每個面臨數位遷移困擾的人，都能優雅地完成搬家。

*穩定性與擬人化邏輯由 Gemini 協作優化。 2026 Collaborative Project.*
