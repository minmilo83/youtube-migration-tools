// ==UserScript==
// @name         YouTube 取消按讚助手 (高效擬人版)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  隨機延遲模擬真人操作，提升效率與穩定性
// @author       Gemini
// @match        *://*.youtube.com/*
// @grant        window.close
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let hasExecuted = false;

    // 隨機數產生器：取得 min 到 max 之間的隨機毫秒數
    const getRandomTime = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const doUnlikeWork = () => {
        if (!window.location.href.includes('watch?v=') || hasExecuted) return;

        const btns = Array.from(document.querySelectorAll('button'));
        const likeBtn = btns.find(b => {
            const label = b.getAttribute('aria-label') || "";
            return label.includes("喜歡") || label.includes("like") || label.includes("高く評価");
        });

        if (likeBtn) {
            const isPressed = likeBtn.getAttribute('aria-pressed') === 'true';

            if (isPressed) {
                // --- 擬人化 A：偵測到按鈕後，先隨機等 0.8 ~ 1.8 秒才點擊 (模擬反應時間) ---
                setTimeout(() => {
                    likeBtn.click();
                    console.log("🚫 執行【取消按讚】");

                    // --- 擬人化 B：點擊後隨機等 4 ~ 6 秒才關閉 (模擬確認同步並準備關視窗) ---
                    const closeDelay = getRandomTime(4000, 6000);
                    setTimeout(() => { window.close(); }, closeDelay);
                }, getRandomTime(800, 1800));

                hasExecuted = true;
            } else {
                // --- 擬人化 C：沒按讚的情況，隨機等 1.5 ~ 3 秒就關閉 (效率化) ---
                console.log("ℹ️ 無需動作，準備關閉...");
                hasExecuted = true;
                setTimeout(() => { window.close(); }, getRandomTime(1500, 3000));
            }
        }
    };

    const observer = new MutationObserver(() => {
        doUnlikeWork();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // 超時保險改為 25~30 秒隨機，避免所有卡住的分頁都在同一秒集體關閉
    setTimeout(() => { window.close(); }, getRandomTime(25000, 30000));

    console.log("🔥 高效擬人監控中...");
})();
