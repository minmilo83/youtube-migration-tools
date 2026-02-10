// ==UserScript==
// @name         YouTube_Auto_Subscribe_V3.3_Hybrid
// @namespace    http://tampermonkey.net/
// @version      3.3
// @description  模仿 V13 結構：暴力遍歷所有按鈕並偵測中英日訂閱字詞
// @author       minmilo83
// @match        *://*.youtube.com/*
// @grant        window.close
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let hasExecuted = false;

    // 隨機數產生器
    const getRandomTime = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const doWork = () => {
        // 1. 偵測網址特徵：必須是頻道首頁 (@名稱 或 /channel/ 或 /user/)
        const isChannelPage = window.location.href.includes('/@') || 
                              window.location.href.includes('/channel/') || 
                              window.location.href.includes('/user/');
        
        if (!isChannelPage || hasExecuted) return;

        // 2. 暴力掃描：把畫面上所有 button 變成陣列來找
        const btns = Array.from(document.querySelectorAll('button'));
        
        // 尋找「訂閱」按鈕 (支援中英日文)
        const subBtn = btns.find(b => {
            const label = (b.getAttribute('aria-label') || "").toLowerCase();
            const text = (b.innerText || "").toLowerCase();
            // 偵測關鍵字
            return label.includes("訂閱") || label.includes("subscribe") || label.includes("購読") || label.includes("登録") ||
                   text.includes("訂閱") || text.includes("subscribe") || text.includes("購読") || text.includes("登録");
        });

        if (subBtn) {
            // 判斷是否已經是「已訂閱」狀態
            const label = (subBtn.getAttribute('aria-label') || "").toLowerCase();
            const text = (subBtn.innerText || "").toLowerCase();
            const isSubscribed = label.includes("退訂") || label.includes("unsubscribe") || label.includes("解除") ||
                                 text.includes("已訂閱") || text.includes("subscribed") || text.includes("済み");

            if (!isSubscribed) {
                hasExecuted = true; // 鎖定狀態，避免重複觸發

                // --- 擬人化 A：偵測到後，隨機等 1.0 ~ 2.5 秒才點擊 ---
                setTimeout(() => {
                    subBtn.click();
                    console.log("✅ [V3.3] 成功點擊【訂閱】！");

                    // --- 擬人化 B：點擊後隨機等 4.0 ~ 6.0 秒才關閉 ---
                    const closeDelay = getRandomTime(4000, 6000);
                    setTimeout(() => { window.close(); }, closeDelay);
                }, getRandomTime(1000, 2500));
            } else {
                // --- 擬人化 C：若已訂閱，隨機 2 ~ 3.5 秒關閉 ---
                hasExecuted = true;
                console.log("ℹ️ [V3.3] 已訂閱過，準備跳過...");
                setTimeout(() => { window.close(); }, getRandomTime(2000, 3500));
            }
        }
    };

    // 完全沿用 V13 的觀察器模式
    const observer = new MutationObserver(() => {
        doWork();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // 超時保險：隨機 25~32 秒關閉
    setTimeout(() => { window.close(); }, getRandomTime(25000, 32000));

    console.log("🔥 [V3.3] 訂閱監控中 (Hybrid Mode)...");
})();
