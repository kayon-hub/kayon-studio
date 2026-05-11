
/**
 * KAYON STUDIO - 隱藏式瀏覽人數計數器
 * 只有在網址加上 ?view_stats=true 時才會顯示
 */
(function() {
    const namespace = "kayon-studio-official";
    const path = window.location.pathname.replace(/\//g, "_").replace(/\.html$/, "") || "index";
    const counterId = `${namespace}-${path}`;
    
    // 建立顯示容器
    const statsDiv = document.createElement('div');
    statsDiv.id = 'admin-stats-panel';
    statsDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.85);
        color: #00ff00;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 9999;
        display: none;
        font-family: 'Courier New', monospace;
        border: 1px solid #333;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(statsDiv);

    // 檢查 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    const showStats = urlParams.get('view_stats') === 'true';

    if (showStats) {
        statsDiv.style.display = 'block';
        statsDiv.innerHTML = `<div style="margin-bottom:5px; color:#aaa; font-size:10px; text-transform:uppercase;">Admin Dashboard</div>
                              <div style="display:flex; align-items:center; gap:10px;">
                                <span>Page Views:</span>
                                <img src="https://count.getloli.com/get/@${counterId}?theme=moebooru" alt="count" style="vertical-align:middle;">
                              </div>`;
    } else {
        // 隱藏模式下，也要載入一次圖片來觸發計數器增加
        const img = new Image();
        img.src = `https://count.getloli.com/get/@${counterId}?theme=moebooru`;
    }
})();
