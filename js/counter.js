
/**
 * KAYON STUDIO - 隱藏式瀏覽人數計數器 (肌肉藝術版)
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
        width: 200px;
        background: linear-gradient(180deg, #000 0%, #1a1a1a 100%);
        color: #fff;
        padding: 20px;
        border-radius: 15px;
        font-size: 14px;
        z-index: 9999;
        display: none;
        font-family: 'Inter', sans-serif;
        border: 1px solid #444;
        box-shadow: 0 15px 40px rgba(0,0,0,0.9);
        overflow: hidden;
        text-align: center;
    `;
    
    // 加入藝術肌肉剪影背景
    const bgImg = document.createElement('div');
    bgImg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('images/muscle-man.png') no-repeat center center;
        background-size: contain;
        opacity: 0.25;
        z-index: -1;
        pointer-events: none;
        filter: brightness(1.5);
    `;
    statsDiv.appendChild(bgImg);

    document.body.appendChild(statsDiv);

    // 檢查 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    const showStats = urlParams.get('view_stats') === 'true';

    if (showStats) {
        statsDiv.style.display = 'block';
        statsDiv.innerHTML += `
            <div style="margin-bottom:15px; color:#fff; font-weight:900; font-size:11px; text-transform:uppercase; letter-spacing:2px; opacity:0.6;">
                Admin Power Matrix
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:12px;">
                <div style="font-size:10px; color:#888; letter-spacing:1px;">TOTAL HITS</div>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                    <img src="https://count.getloli.com/get/@${counterId}?theme=moebooru" alt="count" style="filter: invert(1) contrast(1.2); transform: scale(1.3);">
                </div>
                <div style="margin-top:15px; font-size:10px; color:#fff; font-weight:700; text-shadow: 0 0 10px rgba(255,255,255,0.5);">
                    STAY STRONG. 💪
                </div>
            </div>
        `;
    } else {
        // 隱藏模式下也要計數
        const img = new Image();
        img.src = `https://count.getloli.com/get/@${counterId}?theme=moebooru`;
    }
})();
