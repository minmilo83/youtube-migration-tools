(function() {
    // --- 【請在此處貼上您「預計要刪除」的網址清單】 ---
    const rawDataToCheck = `
https://www.youtube.com/watch?v=2TZKpZvZxpM
https://www.youtube.com/watch?v=maUUVgwbIpE
`;

    // 提取影片 ID 的函數
    const extractId = (str) => {
        const match = str.match(/v=([^&?\s]+)/);
        return match ? match[1] : null;
    };

    // 1. 解析清單中的 ID 並自動計數 【N】
    const targetIds = new Set();
    rawDataToCheck.split('\n').map(l => l.trim()).filter(l => l !== "").forEach(line => {
        const id = extractId(line);
        if (id) targetIds.add(id);
    });

    const N = targetIds.size;

    console.log(`🔍 開始執行「殘留檢查」，目標清單共：${N} 筆`);

    // 2. 抓取網頁上「目前還存在」的影片
    const currentVideoElements = document.querySelectorAll('ytd-playlist-video-renderer, ytd-grid-video-renderer');
    const currentIds = new Set();
    currentVideoElements.forEach(el => {
        const linkEl = el.querySelector('#video-title');
        const href = linkEl ? linkEl.getAttribute('href') : el.querySelector('a#thumbnail')?.getAttribute('href');
        if (href) {
            const id = extractId(href);
            if (id) currentIds.add(id);
        }
    });

    // 3. 核心邏輯：找出「還在網頁上」且「出現在名單中」的影片
    const stillExists = [];
    targetIds.forEach(id => {
        if (currentIds.has(id)) {
            stillExists.push(`https://www.youtube.com/watch?v=${id}`);
        }
    });

    // 4. 輸出報告 (自動替換 【N】)
    console.clear();
    console.log(`📊 殘留檢查報告 (清單對象共 ${N} 筆)：`);
    console.log(`- 預期應刪除總數: ${N}`);
    console.log(`- 網頁目前偵測到剩餘筆數: ${currentIds.size}`);
    console.log("-----------------------------------------");

    if (stillExists.length === 0) {
        console.log(`✅ 清理完成！這 ${N} 筆影片在目前的網頁中都已經找不到了。`);
    } else {
        console.log(`⚠️ 尚未刪除！名單中仍有 ${stillExists.length} 筆影片留在清單內：`);
        console.log(stillExists.join('\n'));
        console.log("-----------------------------------------");
        console.log("💡 小提醒：若清單很長，請確保網頁已捲動到底，否則偵測結果可能不全。");
    }
})();
