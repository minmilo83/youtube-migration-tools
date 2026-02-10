/**
 * YouTube 播放清單網址提取器 (自動下載版)
 * 用途：一鍵抓取頁面上所有影片連結，並自動存成 .txt 檔。
 * 使用方式：在播放清單頁面按 F12 -> Console -> 貼上並執行。
 */
(function() {
    // 1. 自動抓取清單名稱作為檔名
    const playlistName = document.querySelector('yt-formatted-string.title.style-scope.ytd-playlist-header-renderer, #header-description h3')?.innerText || "YouTube_Playlist";
    const dateStr = new Date().toISOString().slice(0,10).replace(/-/g,"");

    // 2. 抓取所有影片元素
    const videoElements = document.querySelectorAll('ytd-playlist-video-renderer, ytd-grid-video-renderer');
    const urlSet = new Set(); // 使用 Set 避免重複

    videoElements.forEach(el => {
        const linkEl = el.querySelector('#video-title');
        const href = linkEl?.getAttribute('href');
        if (href) {
            // 格式化網址，只保留 v=ID 部分
            const videoId = href.match(/v=([^&?\s]+)/);
            if (videoId) {
                urlSet.add(`https://www.youtube.com/watch?v=${videoId[1]}`);
            }
        }
    });

    const content = Array.from(urlSet).join('\n');
    const fileName = `${playlistName}_${dateStr}.txt`;

    if (urlSet.size === 0) {
        console.error("❌ 找不到影片網址，請確認是否在播放清單頁面，或是否已向下滑動載入影片。");
        return;
    }

    // 3. 建立下載連結並自動點擊
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    console.log(`✅ 成功提取 ${urlSet.size} 筆網址！`);
    console.log(`存檔名稱：${fileName}`);
})();
