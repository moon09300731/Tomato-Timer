/* 番茄钟网站导航功能 */

document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 切换aria-expanded属性
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            
            // 防止背景滚动
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // 点击导航链接关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // 点击外部区域关闭菜单
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // 高亮当前页面导航链接
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // 获取链接的href属性
            const linkPath = link.getAttribute('href');
            
            // 检查是否是当前页面
            if (currentPath.endsWith(linkPath) || 
                (currentPath.endsWith('/') && linkPath === 'index.html') ||
                (currentPath.endsWith('') && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    highlightCurrentPage();
    
    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.boxShadow = 'var(--shadow-md)';
                navbar.style.backgroundColor = 'var(--color-bg-primary)';
            } else {
                navbar.style.boxShadow = 'var(--shadow-sm)';
                navbar.style.backgroundColor = 'var(--color-bg-primary)';
            }
            
            // 隐藏/显示导航栏（移动端）
            if (window.innerWidth <= 767) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // 向下滚动
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // 向上滚动
                    navbar.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // 关闭移动端菜单
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    navToggle.setAttribute('aria-expanded', 'false');
                }
                
                // 计算目标位置
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // 平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 移动端触摸滑动关闭菜单
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!navMenu || !navMenu.classList.contains('active')) return;
        
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = Math.abs(touchEndX - touchStartX);
        const diffY = Math.abs(touchEndY - touchStartY);
        
        // 如果水平滑动距离大于垂直距离，且大于50px，则关闭菜单
        if (diffX > diffY && diffX > 50) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});