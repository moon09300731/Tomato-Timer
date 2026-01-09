# 维护手册

本文档提供了番茄钟官方网站的维护指南，包括内容更新、代码维护、性能监控和故障排除。

## 内容更新

### 应用截图更新

#### 添加新截图
1. 准备截图文件，建议使用WebP格式，尺寸不超过1920x1080像素
2. 将文件放入 `images/screenshots/` 目录
3. 编辑 `js/main.js` 文件中的 `loadScreenshots()` 函数：

```javascript
const screenshots = [
    // 现有截图...
    {
        id: 5,
        title: '新功能界面',
        description: '新功能的详细描述',
        url: 'images/screenshots/new-feature.webp',
        alt: '番茄钟新功能界面'
    }
];
```

4. 确保图片文件名和路径正确
5. 为图片添加合适的alt文本，便于SEO和可访问性

#### 截图要求
- 格式: WebP (首选) 或 PNG
- 尺寸: 宽度不超过1920px，高度按比例
- 质量: 压缩优化，文件大小不超过500KB
- 命名: 使用小写字母、连字符分隔，如 `timer-dark.webp`

### 版本信息更新

#### 发布新版本
1. 更新 `pages/download.html`：
   - 修改最新版本信息卡片
   - 更新下载链接和文件大小
   - 添加新的历史版本卡片

2. 更新 `pages/changelog.html`：
   - 在顶部添加新版本条目
   - 详细列出新功能、改进和修复
   - 更新版本统计数字

3. 更新 `sitemap.xml`：
   - 更新所有页面的 `<lastmod>` 日期
   - 确保URL正确

4. 更新主页的版本信息（如果需要）

#### 版本卡片模板
```html
<div class="version-card">
    <div class="version-header">
        <h3 class="version-title">v1.1.0</h3>
        <span class="version-badge current">当前版本</span>
    </div>
    <div class="version-info">
        <div class="version-date">2024-02-01</div>
        <div class="version-size">16.5 MB</div>
    </div>
    <ul class="version-changes">
        <li>新增功能1描述</li>
        <li>改进项目1描述</li>
        <li>修复问题1描述</li>
    </ul>
    <div class="version-actions">
        <a href="#" class="btn btn-outline">下载</a>
        <a href="changelog.html#v1.1.0" class="btn btn-text">更新日志</a>
    </div>
</div>
```

### FAQ更新

#### 添加新问题
1. 编辑 `pages/support.html` 中的FAQ部分
2. 使用以下结构添加新项目：

```html
<div class="faq-item">
    <div class="faq-question">
        <h3>新问题标题？</h3>
        <button class="faq-toggle">
            <i class="fas fa-chevron-down"></i>
        </button>
    </div>
    <div class="faq-answer">
        <p>详细的问题解答内容。</p>
        <p>可以包含多个段落、列表或链接。</p>
        <ul>
            <li>列表项1</li>
            <li>列表项2</li>
        </ul>
    </div>
</div>
```

3. 测试JavaScript交互功能是否正常

### 支持者名单更新

#### 添加新支持者
1. 编辑 `pages/support.html` 中的支持者列表
2. 在列表顶部添加新支持者：

```html
<div class="supporter">
    <div class="supporter-avatar">🎁</div>
    <div class="supporter-info">
        <div class="supporter-name">新支持者</div>
        <div class="supporter-amount">¥100</div>
    </div>
    <div class="supporter-date">2024-01-09</div>
</div>
```

3. 可以自定义头像emoji
4. 支持者可以选择匿名显示

## 代码维护

### CSS样式更新

#### 添加新样式
1. 主要样式在 `css/style.css` 中定义
2. 响应式样式在 `css/responsive.css` 中定义
3. 使用CSS变量确保设计一致性

#### CSS变量使用
```css
/* 使用现有变量 */
.my-element {
    color: var(--color-primary);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
}

/* 添加新变量（如果需要） */
:root {
    --color-new: #ff6b6b;
    --spacing-new: 48px;
}
```

#### 响应式样式
- 移动设备 (<768px): 在 `responsive.css` 的对应媒体查询中添加样式
- 平板设备 (768px-1023px): 使用相应的断点
- 确保样式按正确的顺序添加

### JavaScript功能更新

#### 通用功能
通用功能在 `js/main.js` 中实现，包括：
- 动态内容加载
- 图片懒加载
- 性能监控
- 基础工具函数

#### 导航功能
导航相关功能在 `js/navigation.js` 中实现，包括：
- 移动端菜单切换
- 当前页面高亮
- 平滑滚动

#### 页面特定功能
每个页面的特定功能在各自页面的 `<script>` 标签中实现。

#### 添加新功能
1. 确定功能属于通用功能还是页面特定功能
2. 在相应文件中添加代码
3. 添加必要的注释
4. 测试功能在所有设备和浏览器上的表现

### 第三方依赖更新

#### 更新CDN链接
检查并更新以下CDN链接（如果需要）：
- Font Awesome: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&familyins=Pghtopp400:w500@600;700;;&display=swap`

#### 更新步骤
1. 访问CDN提供商的网站获取最新版本链接
2. 更新HTML文件中的链接
3. 测试新版本是否兼容
4. 如果出现问题，回滚到旧版本

## 性能监控

### 网站性能检查

#### 使用工具检查
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
   - 检查桌面和移动端性能
   - 获取优化建议

2. **GTmetrix**: https://gtmetrix.com/
   - 详细的性能报告
   - 瀑布图分析

3. **WebPageTest**: https://www.webpagetest.org/
   - 多地点测试
   - 详细的性能指标

#### 关键性能指标
- **首屏加载时间**: 应小于2秒
- **首次内容绘制 (FCP)**: 应小于1.5秒
- **最大内容绘制 (LCP)**: 应小于2.5秒
- **累积布局偏移 (CLS)**: 应小于0.1
- **首次输入延迟 (FID)**: 应小于100毫秒

### 用户反馈监控

#### 收集反馈渠道
1. 支持页面表单
2. 电子邮件: support@pomodoro-app.com
3. GitHub Issues
4. 社交媒体反馈

#### 反馈处理流程
1. 记录所有反馈
2. 分类整理（功能建议、问题报告、使用咨询等）
3. 评估优先级
4. 安排处理计划
5. 回复用户

### 错误监控

#### JavaScript错误监控
```javascript
// 在 js/main.js 中添加错误监控
window.addEventListener('error', function(event) {
    console.error('JavaScript错误:', event.error);
    // 可以在这里发送错误到服务器
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的Promise拒绝:', event.reason);
});
```

#### 控制台错误检查
定期检查浏览器控制台是否有错误或警告。

## 安全维护

### 安全更新

#### 定期检查
1. 检查第三方资源的安全性
2. 监控安全公告
3. 更新有安全漏洞的依赖

#### CSP策略更新
如果添加了新的第三方资源，需要更新CSP策略：
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://新的资源域名;
    style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://新的资源域名;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
">
```

### 备份策略

#### 自动备份
1. 设置每日自动备份（参见部署指南）
2. 备份内容包括：
   - 所有网站文件
   - 数据库（如果有）
   - 配置文件

#### 备份验证
每月验证一次备份的完整性和可恢复性。

## 故障排除

### 常见问题解决

#### 1. 网站布局错乱
- 检查CSS文件是否正确加载
- 检查浏览器控制台是否有CSS错误
- 验证CSS语法是否正确
- 检查是否使用了不支持的CSS特性

#### 2. JavaScript功能失效
- 检查JavaScript文件是否正确加载
- 检查控制台是否有JavaScript错误
- 验证JavaScript语法
- 检查是否与其他脚本冲突

#### 3. 图片无法显示
- 检查图片文件路径是否正确
- 检查文件权限
- 检查图片格式浏览器是否支持
- 检查CDN是否正常工作

#### 4. 移动端显示问题
- 检查响应式CSS是否正确应用
- 测试不同尺寸的设备
- 检查视口meta标签
- 验证触摸事件处理

### 性能问题解决

#### 加载速度慢
1. **优化图片**：
   - 转换为WebP格式
   - 压缩图片大小
   - 使用适当的尺寸

2. **优化CSS和JavaScript**：
   - 压缩文件
   - 移除未使用的代码
   - 使用浏览器缓存

3. **使用CDN**：
   - 静态资源使用CDN加速
   - 选择合适的CDN提供商

4. **服务器优化**：
   - 启用gzip压缩
   - 配置浏览器缓存
   - 使用HTTP/2

#### 交互响应慢
1. 优化JavaScript执行
2. 减少DOM操作
3. 使用事件委托
4. 避免强制同步布局

## 定期维护任务

### 每日检查
- [ ] 检查网站可访问性
- [ ] 检查错误日志
- [ ] 监控性能指标

### 每周检查
- [ ] 检查第三方资源更新
- [ ] 备份验证
- [ ] 用户反馈整理

### 每月检查
- [ ] 全面性能测试
- [ ] 安全扫描
- [ ] 内容更新计划

### 每季度检查
- [ ] 代码重构和优化
- [ ] 设计系统更新
- [ ] 技术栈评估

## 升级计划

### 技术升级
- 评估新CSS特性
- 评估新JavaScript特性
- 考虑新的开发工具
- 评估新的部署方案

### 功能升级
- 收集用户反馈
- 分析使用数据
- 制定功能路线图
- 优先级排序

## 联系支持

如果在维护过程中遇到无法解决的问题，请通过以下方式联系：

### 技术支持
- 电子邮件: tech-support@pomodoro-app.com
- GitHub Issues: github.com/moon09300731/Tomato-Timer/issues

### 紧急问题
- 服务中断: 联系服务器提供商
- 安全漏洞: 立即停止服务并联系安全团队

### 社区支持
- 文档: 查看README.md和部署指南
- 论坛: （如果有）
- 社交媒体: @PomodoroApp

---

**最后更新**: 2024-01-08  
**版本**: v1.0.0  
**维护团队**: 番茄钟开发团队