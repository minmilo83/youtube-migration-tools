(function() {
    // --- 【請在此處貼上您要移除的頻道網址】 ---
    const rawDataToRemove = `
https://www.youtube.com/@ChannelName1
https://www.youtube.com/channel/UCxxxxxxxxxxxx
`;

    const extractChannelId = (url) => {
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1] || parts[parts.length - 2];
        return lastPart ? lastPart.split('?')[0] : null;
    };

    const targetIds = new Set();
    rawDataToRemove.split('\n').map(l => l.trim()).filter(l => l !== "").forEach(line => {
        const id = extractChannelId(line);
        if (id) targetIds.add(id);
    });

    const N = targetIds.size;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // 語系關鍵字定義
    const kw = {
        step1: ["已訂閱", "Subscribed", "登録済み", "退訂"], // 觸發選單
        step2: ["取消訂閱", "Unsubscribe", "登録解除"], // 選單內的選項
        step3: ["取消訂閱", "Unsubscribe", "解除"]  // 最後確認對話框的按鈕
    };

    console.log(`🚀 [minmilo83] 強化版移除任務啟動，目標：${N} 筆`);

    const startRemoval = async () => {
        const channelElements = document.querySelectorAll('ytd-channel-renderer, ytd-grid-channel-renderer');
        let processedCount = 0;

        for (const el of channelElements) {
            const linkEl = el.querySelector('a#main-link, a#channel-info, a');
            if (!linkEl) continue;

            const currentId = extractChannelId(linkEl.href || "");
            
            if (targetIds.has(currentId)) {
                console.log(`🎯 匹配到頻道: ${currentId}，開始三段式移除...`);
                
                // --- 第一階段：點擊「已訂閱」按鈕 ---
                const allBtns = Array.from(el.querySelectorAll('button'));
                const subBtn = allBtns.find(b => {
                    const t = (b.innerText || b.getAttribute('aria-label') || "").toLowerCase();
                    return kw.step1.some(k => t.includes(k.toLowerCase()));
                });

                if (subBtn) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await sleep(600);
                    subBtn.click();
                    console.log("  1. 已打開訂閱選單");
                    
                    // --- 第二階段：點擊選單中的「取消訂閱」選項 ---
                    await sleep(1000); // 等待選單動畫
                    const menuItems = Array.from(document.querySelectorAll('ytd-menu-service-item-renderer, tp-yt-paper-item'));
                    const menuOpt = menuItems.find(item => {
                        const t = (item.innerText || "").toLowerCase();
                        return kw.step2.some(k => t.includes(k.toLowerCase()));
                    });

                    if (menuOpt) {
                        menuOpt.click();
                        console.log("  2. 已選擇取消訂閱選項");

                        // --- 第三階段：點擊最後確認對話框的「取消訂閱」 ---
                        await sleep(1200); // 等待彈出對話框
                        const dialogBtns = Array.from(document.querySelectorAll('yt-confirm-dialog-renderer #confirm-button button'));
                        const confirmBtn = dialogBtns.find(b => {
                            const t = (b.innerText || "").toLowerCase();
                            return kw.step3.some(k => t.includes(k.toLowerCase()));
                        });

                        if (confirmBtn) {
                            confirmBtn.click();
                            processedCount++;
                            console.log(`✅ 3. 移除完成 (${processedCount}/${N})`);
                            await sleep(2500); // 給予頁面緩衝，避免過快崩潰
                        } else {
                            console.log("  ❌ 找不到最後確認按鈕");
                        }
                    } else {
                        console.log("  ❌ 找不到選單中的取消選項");
                        // 如果找不到選單選項，可能是按鈕直接觸發了對話框，嘗試直接找對話框按鈕
                        const directConfirm = Array.from(document.querySelectorAll('yt-confirm-dialog-renderer #confirm-button button')).find(b => {
                            const t = (b.innerText || "").toLowerCase();
                            return kw.step3.some(k => t.includes(k.toLowerCase()));
                        });
                        if (directConfirm) {
                            directConfirm.click();
                            processedCount++;
                            console.log(`✅ 3. 直接移除完成 (${processedCount}/${N})`);
                            await sleep(2500);
                        }
                    }
                }
            }
        }

        console.log("-----------------------------------------");
        console.log(`📊 任務結束：成功執行 ${processedCount} 筆。`);
        console.log("Developer: minmilo83");
    };

    startRemoval();
})();
