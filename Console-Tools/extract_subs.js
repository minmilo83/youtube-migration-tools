(function() {
    console.log("🚀 正在提取訂閱頻道網址...");
    
    // 選取所有頻道區塊
    const channels = document.querySelectorAll('ytd-channel-renderer, ytd-grid-channel-renderer');
    let urlList = [];
    
    channels.forEach(channel => {
        const link = channel.querySelector('a#main-link')?.href || channel.querySelector('a')?.href;
        if (link) {
            // 確保只加入唯一的網址，並去掉多餘的參數
            const cleanLink = link.split('?')[0];
            urlList.push(cleanLink);
        }
    });

    if (urlList.length > 0) {
        // 將陣列轉為換行字串
        const blob = new Blob([urlList.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "yt_subscription_urls.txt";
        document.body.appendChild(a);
        a.click();
        
        console.log(`✅ 成功提取 ${urlList.length} 個頻道網址！檔案已下載。`);
    } else {
        console.error("❌ 找不到頻道元素，請確保頁面已完全載入。");
    }
})();
