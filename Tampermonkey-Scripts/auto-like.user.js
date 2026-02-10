// ==UserScript==
// @name         YouTube_Move_Final_V13_Hybrid
// @namespace    http://tampermonkey.net/
// @version      13.0
// @description  隨機化反應與關閉時間，模擬真人按讚行為，提升效率與安全性
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
        if (!window.location.href.includes('watch?v=') || hasExecuted) return;

        const btns = Array.from(document.querySelectorAll('button'));
        const likeBtn = btns.find(b => {
            const label = b.getAttribute('aria-label') || "";
            return label.includes("喜歡") || label.includes("like") || label.includes("高く評価");
        });

        if (likeBtn) {
            hasExecuted = true; // 鎖定狀態，避免重複觸發

            const isPressed = likeBtn.getAttribute('aria-pressed') === 'true';

            if (!isPressed) {
                // --- 擬人化 A：偵測到按鈕後，隨機等 0.7 ~ 2.0 秒才點擊 (模擬思考反應) ---
                setTimeout(() => {
                    likeBtn.click();
                    console.log("✅ 成功點擊【喜歡】！");

                    // --- 擬人化 B：點擊後隨機等 4.5 ~ 6.5 秒才關閉 (確保同步) ---
                    const closeDelay = getRandomTime(4500, 6500);
                    setTimeout(() => { window.close(); }, closeDelay);
                }, getRandomTime(700, 2000));
            } else {
                // --- 擬人化 C：若已按讚，縮短等待時間，隨機 2 ~ 3.5 秒關閉 ---
                console.log("ℹ️ 已按過讚，準備跳過...");
                setTimeout(() => { window.close(); }, getRandomTime(2000, 3500));
            }
        }
    };

    const observer = new MutationObserver(() => {
        doWork();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // 超時保險：隨機 25~32 秒關閉，避免集體超時造成的系統壓力
    setTimeout(() => { window.close(); }, getRandomTime(25000, 32000));

    console.log("🔥 高效擬人按讚監控中...");
})();
