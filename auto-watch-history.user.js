// ==UserScript==
// @name         YouTube 觀看紀錄備份助手 (高效擬人隨機版)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  隨機定時自動關閉，模擬真人觀看行為，增加紀錄留存穩定性
// @author       Gemini
// @match        *://*.youtube.com/watch?v=*
// @grant        window.close
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 隨機數產生器：取得 min 到 max 之間的隨機毫秒數
    const getRandomTime = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    // --- 設定區：擬人化時間波段 ---
    // 建議設定在 12 秒到 22 秒之間波動 (平均約 17 秒)
    // 這樣可以確保大多數情況下 YouTube 已經計算了該次觀看
    const CLOSE_MIN = 12000;
    const CLOSE_MAX = 22000;
    // ----------------------------

    const finalCloseTime = getRandomTime(CLOSE_MIN, CLOSE_MAX);

    console.log(`🚀 擬人化觀看啟動：本片預計停留 ${ (finalCloseTime / 1000).toFixed(1) } 秒...`);

    // 啟動隨機倒數計時
    setTimeout(() => {
        // 增加一個微小的隨機偏移，模擬滑鼠準備移動到關閉按鈕的 0.2~0.5 秒
        setTimeout(() => {
            console.log("⏰ 隨機觀看任務完成，關閉分頁。");
            window.close();
        }, getRandomTime(200, 500));
    }, finalCloseTime);

})();
