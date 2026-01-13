// 番茄钟应用下载功能 - 极简版本
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('main-download-btn');
    if (!downloadBtn) return;
    
    // 静默检查文件是否存在
    checkFileExists(downloadBtn.href).then(exists => {
        if (!exists) {
            showFileWarning(downloadBtn);
        }
    }).catch(() => {
        // 忽略检查错误
    });
    
    // 添加点击反馈
    downloadBtn.addEventListener('click', function(e) {
        // 显示下载中状态
        const originalHtml = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>下载中...</span>';
        this.style.pointerEvents = 'none';
        
        // 恢复按钮状态（如果下载很快完成）
        setTimeout(() => {
            this.innerHTML = originalHtml;
            this.style.pointerEvents = '';
            showSuccessMessage();
        }, 1500);
    });
});

// 检查文件是否存在
async function checkFileExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return true; // 假设文件存在
    }
}

// 显示文件警告
function showFileWarning(button) {
    const originalText = button.querySelector('span').textContent;
    button.querySelector('span').textContent = '文件可能不存在';
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        if (button.querySelector('span')) {
            button.querySelector('span').textContent = originalText;
            button.style.opacity = '';
        }
    }, 3000);
}

// 显示成功消息
function showSuccessMessage() {
    // 移除现有消息
    const existing = document.querySelector('.download-message');
    if (existing) existing.remove();
    
    // 创建消息
    const msg = document.createElement('div');
    msg.className = 'download-message';
    msg.textContent = '下载开始！如果下载没有自动开始，请检查浏览器的下载管理器。';
    msg.style.cssText = 'background:#d4edda;border:1px solid #c3e6cb;border-radius:8px;padding:12px;margin:12px 0;color:#155724;';
    
    // 插入到按钮附近
    const container = document.querySelector('.download-action');
    if (container) container.appendChild(msg);
    
    // 5秒后移除
    setTimeout(() => {
        if (msg.parentNode) msg.remove();
    }, 5000);
}