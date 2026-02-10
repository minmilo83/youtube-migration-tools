(function() {
    // --- 請在此處貼上您要檢查的網址清單 ---
    const rawBackupData = `
https://www.youtube.com/watch?v=2TZKpZvZxpM
https://www.youtube.com/watch?v=maUUVgwbIpE
`;

    // 提取影片 ID 的函數
    const extractId = (str) => {
        const match = str.match(/v=([^&?\s]+)/);
        return match ? match[1] : null;
    };

    // 1. 解析備份清單中的 ID 並「自動計數」
    const backupIds = new Set();
    const lines = rawBackupData.split('\n').map(l => l.trim()).filter(l => l !== "");
    
    lines.forEach(line => {
        const id = extractId(line);
        if (id) backupIds.add(id);
    });

    // 自動獲取本次運行中的總網址數 (對應您的 【N】)
    const N = backupIds.size;

    console.log(`🔍 開始進行 ${N} 筆資料大規模比對...`);

    // 2. 抓取網頁上現有的影片 (ID)
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

    // 3. 找出漏掉的
    const missing = [];
    backupIds.forEach(id => {
        if (!currentIds.has(id)) {
            missing.push(`https://www.youtube.com/watch?v=${id}`);
        }
    });

    // 4. 輸出報告 (將原本的 【N】 全部替換成變數 N)
    console.clear();
    console.log(`📊 掃描報告 (共 ${N} 筆對象)：`);
    console.log(`- 預期比對筆數: ${N}`);
    console.log(`- 網頁目前偵測到筆數: ${currentIds.size}`);
    console.log("-----------------------------------------");

    if (missing.length === 0) {
        console.log(`✅ 完美！這 ${N} 筆連結全部都已經成功存入清單了。`);
    } else {
        console.log(`❌ 發現遺漏！共有 ${missing.length} 筆尚未偵測到：`);
        console.log(missing.join('\n'));
        console.log("-----------------------------------------");
        console.log("💡 小提醒：如果漏掉筆數過多，請檢查網頁是否已「捲動到底」讓全部影片顯示出來。");
    }
})();
