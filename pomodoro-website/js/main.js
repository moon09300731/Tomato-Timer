/* 番茄钟网站主JavaScript文件 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('番茄钟网站已加载');
    
    // 初始化功能
    initDynamicContent();
    initAnalytics();
    initPerformanceMonitoring();
});

/**
 * 初始化动态内容
 */
function initDynamicContent() {
    // 加载应用截图
    loadScreenshots();
    
    // 初始化进度环动画
    initProgressAnimation();
    
    // 初始化按钮交互效果
    initButtonEffects();
    
    // 初始化懒加载
    initLazyLoading();
    
    // 初始化更新日志筛选
    initChangelogFilters();
}

/**
 * 加载应用截图
 */
function loadScreenshots() {
    const screenshotsGrid = document.querySelector('.screenshots-grid');
    if (!screenshotsGrid) return;
    
    // 8张不同功能界面的截图数据
    const screenshots = [
        {
            id: 1,
            title: '主计时器界面',
            description: '简洁美观的计时器界面，显示工作/休息状态和圆形进度条',
            url: 'https://via.placeholder.com/600x450/ff6b6b/ffffff?text=主计时器界面',
            alt: '番茄钟主计时器界面'
        },
        {
            id: 2,
            title: '深色主题模式',
            description: '夜间模式，保护眼睛，减少蓝光对睡眠的影响',
            url: 'https://via.placeholder.com/600x450/2e2e2e/ffffff?text=深色主题界面',
            alt: '番茄钟深色主题界面'
        },
        {
            id: 3,
            title: '统计仪表板',
            description: '详细的工作时间统计和效率分析，可视化图表展示',
            url: 'https://via.placeholder.com/600x450/339af0/ffffff?text=统计仪表板',
            alt: '番茄钟统计仪表板'
        },
        {
            id: 4,
            title: '设置页面',
            description: '自定义工作和休息时间设置，通知偏好调整',
            url: 'https://via.placeholder.com/600x450/51cf66/ffffff?text=设置页面',
            alt: '番茄钟设置页面'
        },
        {
            id: 5,
            title: '任务管理界面',
            description: '创建和管理待办任务，分配番茄钟数量',
            url: 'https://via.placeholder.com/600x450/ffa94d/000000?text=任务管理',
            alt: '番茄钟任务管理界面'
        },
        {
            id: 6,
            title: '历史记录页面',
            description: '查看历史工作记录，按日/周/月统计工作效率',
            url: 'https://via.placeholder.com/600x450/845ef7/ffffff?text=历史记录',
            alt: '番茄钟历史记录页面'
        },
        {
            id: 7,
            title: '通知提醒界面',
            description: '工作/休息结束时的桌面通知和声音提醒',
            url: 'https://via.placeholder.com/600x450/ff8787/000000?text=通知提醒',
            alt: '番茄钟通知提醒界面'
        },
        {
            id: 8,
            title: '数据导出功能',
            description: '导出统计数据为CSV/JSON格式，方便进一步分析',
            url: 'https://via.placeholder.com/600x450/20c997/ffffff?text=数据导出',
            alt: '番茄钟数据导出功能'
        }
    ];
    
    // 创建截图卡片
    let html = '';
    screenshots.forEach(screenshot => {
        html += `
            <div class="screenshot-card">
                <div class="screenshot-image">
                    <img src="${screenshot.url}" alt="${screenshot.alt}" loading="lazy">
                    <div class="screenshot-overlay">
                        <button class="zoom-btn" data-image="${screenshot.url}" data-title="${screenshot.title}">
                            <i class="fas fa-search-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="screenshot-info">
                    <h4>${screenshot.title}</h4>
                    <p>${screenshot.description}</p>
                </div>
            </div>
        `;
    });
    
    screenshotsGrid.innerHTML = html;
    
    // 初始化图片缩放功能
    initImageZoom();
}

/**
 * 初始化图片缩放功能
 */
function initImageZoom() {
    const zoomButtons = document.querySelectorAll('.zoom-btn');
    const modal = createZoomModal();
    
    zoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            
            showZoomModal(modal, imageUrl, title);
        });
    });
}

/**
 * 创建图片缩放模态框
 */
function createZoomModal() {
    const modal = document.createElement('div');
    modal.className = 'zoom-modal';
    modal.innerHTML = `
        <div class="zoom-modal-content">
            <button class="zoom-modal-close">&times;</button>
            <div class="zoom-modal-header">
                <h3></h3>
            </div>
            <div class="zoom-modal-body">
                <img src="" alt="">
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.zoom-modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // 点击外部区域关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    return modal;
}

/**
 * 显示图片缩放模态框
 */
function showZoomModal(modal, imageUrl, title) {
    const img = modal.querySelector('img');
    const header = modal.querySelector('h3');
    
    img.src = imageUrl;
    img.alt = title;
    header.textContent = title;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 预加载图片
    const preloadImage = new Image();
    preloadImage.src = imageUrl;
}

/**
 * 初始化进度环动画
 */
function initProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    // 模拟进度动画
    let progress = 0;
    const duration = 2000; // 2秒
    const interval = 50; // 50ms更新一次
    const steps = duration / interval;
    const increment = 345.575 / steps; // 周长 / 步数
    
    const animateProgress = () => {
        progress += increment;
        if (progress > 345.575 * 0.8) { // 80%进度
            progress = 345.575 * 0.8;
            progressFill.style.strokeDashoffset = 345.575 - progress;
            return;
        }
        
        progressFill.style.strokeDashoffset = 345.575 - progress;
        setTimeout(animateProgress, interval);
    };
    
    // 延迟开始动画
    setTimeout(animateProgress, 1000);
}

/**
 * 初始化按钮交互效果
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .mockup-btn');
    
    buttons.forEach(button => {
        // 点击涟漪效果
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
        
        // 触摸设备优化
        if ('ontouchstart' in window) {
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            button.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        }
    });
}

/**
 * 创建按钮点击涟漪效果
 */
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // 移除旧的涟漪
    const oldRipple = button.querySelector('.ripple');
    if (oldRipple) {
        oldRipple.remove();
    }
    
    button.appendChild(ripple);
    
    // 动画结束后移除
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * 初始化懒加载
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            // 保存原始src到data-src
            if (!img.dataset.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
            imageObserver.observe(img);
        });
    }
}

/**
 * 初始化分析（隐私友好型）
 */
function initAnalytics() {
    // 仅跟踪基本页面访问，不收集个人信息
    if (window.location.hostname !== 'localhost') {
        try {
            // 发送页面浏览事件（简化版）
            const data = {
                page: window.location.pathname,
                referrer: document.referrer,
                timestamp: new Date().toISOString()
            };
            
            // 在实际项目中，这里会发送到分析服务器
            console.log('Analytics:', data);
            
            // 保存到本地存储用于基本统计
            savePageView(data);
        } catch (error) {
            console.warn('Analytics disabled:', error);
        }
    }
}

/**
 * 保存页面浏览数据
 */
function savePageView(data) {
    try {
        const views = JSON.parse(localStorage.getItem('page_views') || '[]');
        views.push(data);
        
        // 只保留最近100条记录
        if (views.length > 100) {
            views.shift();
        }
        
        localStorage.setItem('page_views', JSON.stringify(views));
    } catch (error) {
        // 忽略存储错误
    }
}

/**
 * 初始化性能监控
 */
function initPerformanceMonitoring() {
    // 监控关键性能指标
    window.addEventListener('load', () => {
        // 测量加载页面时间
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        console.log(`页面加载时间: ${loadTime}ms`);
        
        // 如果加载时间过长，记录警告
        if (loadTime > 3000) {
            console.warn('页面加载时间较长，建议优化');
        }
    });
    
    // 监控内存使用（如果浏览器支持）
    if (performance.memory) {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = memory.usedJSHeapSize / 1048576;
            const totalMB = memory.totalJSHeapSize / 1048576;
            
            // 如果内存使用超过80%，记录警告
            if (usedMB / totalMB > 0.8) {
                console.warn(`高内存使用: ${usedMB.toFixed(1)}MB / ${totalMB.toFixed(1)}MB`);
            }
        }, 30000); // 每30秒检查一次
    }
}

/**
 * 工具函数：防抖
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 工具函数：节流
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 初始化更新日志筛选功能
 */
function initChangelogFilters() {
    const filterButtons = document.querySelectorAll('.changelog-filters .filter-btn[data-filter]');
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    const dateApplyBtn = document.querySelector('.date-apply');
    const dateClearBtn = document.querySelector('.date-clear');
    const resetBtn = document.querySelector('.filter-reset');
    const versionItems = document.querySelectorAll('.changelog-version');
    const changeItems = document.querySelectorAll('.change-item');
    const visibleCountEl = document.getElementById('visible-count');
    const filteredCountEl = document.getElementById('filtered-count');
    
    if (!filterButtons.length || !versionItems.length) return;
    
    // 初始化可见数量
    const totalVersions = versionItems.length;
    visibleCountEl.textContent = totalVersions;
    filteredCountEl.textContent = totalVersions;
    
    // 当前筛选状态
    let currentFilter = 'all';
    let dateFrom = null;
    let dateTo = null;
    
    // 设置日期输入默认值（最近3个月）
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const today = new Date().toISOString().split('T')[0];
    
    if (dateFromInput) {
        dateFromInput.value = threeMonthsAgo.toISOString().split('T')[0];
        dateFromInput.max = today;
    }
    
    if (dateToInput) {
        dateToInput.value = today;
        dateToInput.max = today;
    }
    
    // 筛选按钮点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新筛选器
            currentFilter = this.getAttribute('data-filter');
            applyFilters();
        });
    });
    
    // 日期筛选应用
    if (dateApplyBtn) {
        dateApplyBtn.addEventListener('click', () => {
            dateFrom = dateFromInput.value;
            dateTo = dateToInput.value;
            applyFilters();
        });
    }
    
    // 日期筛选清除
    if (dateClearBtn) {
        dateClearBtn.addEventListener('click', () => {
            dateFromInput.value = threeMonthsAgo.toISOString().split('T')[0];
            dateToInput.value = today;
            dateFrom = null;
            dateTo = null;
            applyFilters();
        });
    }
    
    // 重置筛选
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // 重置筛选按钮
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === 'all') {
                    btn.classList.add('active');
                }
            });
            
            // 重置日期
            if (dateFromInput && dateToInput) {
                dateFromInput.value = threeMonthsAgo.toISOString().split('T')[0];
                dateToInput.value = today;
            }
            
            // 重置筛选状态
            currentFilter = 'all';
            dateFrom = null;
            dateTo = null;
            
            applyFilters();
        });
    }
    
    /**
     * 应用所有筛选条件
     */
    function applyFilters() {
        let visibleVersions = 0;
        
        versionItems.forEach(version => {
            let shouldShow = true;
            
            // 应用类型筛选
            if (currentFilter !== 'all') {
                const hasMatchingChanges = version.querySelectorAll(`.change-item.${currentFilter}`).length > 0;
                if (!hasMatchingChanges) {
                    shouldShow = false;
                }
            }
            
            // 应用日期筛选
            if (dateFrom || dateTo) {
                const versionDate = version.querySelector('.version-date')?.textContent;
                if (versionDate) {
                    const versionDateObj = new Date(versionDate);
                    
                    if (dateFrom) {
                        const fromDate = new Date(dateFrom);
                        if (versionDateObj < fromDate) {
                            shouldShow = false;
                        }
                    }
                    
                    if (dateTo) {
                        const toDate = new Date(dateTo);
                        toDate.setHours(23, 59, 59, 999); // 包含整天
                        if (versionDateObj > toDate) {
                            shouldShow = false;
                        }
                    }
                }
            }
            
            // 显示/隐藏版本
            if (shouldShow) {
                version.style.display = 'block';
                visibleVersions++;
                
                // 高亮匹配的变更项
                if (currentFilter !== 'all') {
                    highlightMatchingChanges(version, currentFilter);
                } else {
                    resetHighlight(version);
                }
            } else {
                version.style.display = 'none';
            }
        });
        
        // 更新计数
        filteredCountEl.textContent = visibleVersions;
    }
    
    /**
     * 高亮匹配的变更项
     */
    function highlightMatchingChanges(version, filterType) {
        const allChanges = version.querySelectorAll('.change-item');
        allChanges.forEach(change => {
            if (change.classList.contains(filterType)) {
                change.classList.add('highlighted');
            } else {
                change.classList.add('dimmed');
            }
        });
    }
    
    /**
     * 重置高亮
     */
    function resetHighlight(version) {
        const allChanges = version.querySelectorAll('.change-item');
        allChanges.forEach(change => {
            change.classList.remove('highlighted', 'dimmed');
        });
    }
    
    // 初始应用筛选
    applyFilters();
}

// 导出函数供其他模块使用（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDynamicContent,
        initAnalytics,
        initPerformanceMonitoring,
        initChangelogFilters
    };
}