(function() {
    // --- 【請在此處貼上您要移除的網址】 ---
    const rawDataToRemove = `
https://www.youtube.com/watch?v=2TZKpZvZxpM
https://www.youtube.com/watch?v=maUUVgwbIpE
`;

    const extractId = (str) => {
        const match = str.match(/v=([^&?\s]+)/);
        return match ? match[1] : null;
    };

    const targetIds = new Set();
    rawDataToRemove.split('\n').map(l => l.trim()).filter(l => l !== "").forEach(line => {
        const id = extractId(line);
        if (id) targetIds.add(id);
    });

    const N = targetIds.size;
    const removeKeywords = ["移除", "Remove", "削除", "から削除"]; 

    console.log(`🚀 開始執行強化版移除任務，目標：${N} 筆`);

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const startRemoval = async () => {
        // 重新抓取頁面上所有的影片列
        const videoElements = document.querySelectorAll('ytd-playlist-video-renderer');
        let processedCount = 0;

        for (const el of videoElements) {
            const linkEl = el.querySelector('#video-title');
            if (!linkEl) continue;

            const currentId = extractId(linkEl.getAttribute('href') || "");
            
            if (targetIds.has(currentId)) {
                console.log(`🎯 匹配到目標 ID: ${currentId}，準備操作...`);
                
                // 1. 找到「三個點」按鈕並捲動到視線內（避免點不到）
                const menuBtn = el.querySelector('button[aria-label*="選單"], button[aria-label*="menu"], button[aria-label*="メニュー"]');
                if (menuBtn) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await sleep(500); 
                    menuBtn.click();
                    
                    // 2. 等待選單出現（YouTube 選單是動態生成的）
                    await sleep(800); 
                    
                    // 3. 暴力搜尋全網頁的選單項（YouTube 選單有時會掛在 body 下方）
                    const allMenuItems = Array.from(document.querySelectorAll('ytd-menu-service-item-renderer, tp-yt-paper-item'));
                    const removeBtn = allMenuItems.find(item => {
                        const text = item.innerText || "";
                        return removeKeywords.some(kw => text.includes(kw));
                    });

                    if (removeBtn) {
                        removeBtn.click();
                        processedCount++;
                        console.log(`✅ 已成功移除 (${processedCount}/${N})`);
                        // 移除後等待網頁反應，避免過快導致下一個找不到
                        await sleep(1500); 
                    } else {
                        console.log(`❌ 找不到「移除」按鈕，請檢查語系是否匹配。`);
                    }
                }
            }
        }

        console.log("-----------------------------------------");
        console.log(`📊 任務結束：預期 ${N} 筆，實際成功執行 ${processedCount} 筆。`);
        if (processedCount < N) console.log("💡 提示：如果數量不符，請先向下滑動頁面載入更多影片後再執行。");
    };

    startRemoval();
})();
