let count = 0;
const maxTimes = 100; // 設定執行 100 次

const scrollRepeater = setInterval(() => {
  count++;
  
  // 暴力滑到底部：涵蓋 window、body 與 documentElement
  window.scrollTo(0, document.body.scrollHeight);
  document.documentElement.scrollTop = document.documentElement.scrollHeight;
  window.scrollTo(0, 9999999);
  
  console.log(`進度：${count} / ${maxTimes} 次捲動`);

  if (count >= maxTimes) {
    clearInterval(scrollRepeater);
    console.log("🏁 任務結束：已完成 100 次捲動！");
  }
}, 2000); // 每 2 秒跑一次
