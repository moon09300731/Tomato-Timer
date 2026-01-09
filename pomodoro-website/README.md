# 番茄钟官方网站

专业的番茄钟应用官方网站，用于展示应用功能、提供下载、更新日志和支持服务。

## 目录结构

```
pomodoro-website/
├── index.html                    # 主页
├── pages/                        # 子页面目录
│   ├── features.html             # 功能特色页面
│   ├── download.html             # 下载页面
│   ├── changelog.html            # 更新日志页面
│   └── support.html              # 支持与打赏页面
├── css/                          # 样式文件目录
│   ├── style.css                 # 主样式文件
│   └── responsive.css            # 响应式样式文件
├── js/                           # JavaScript文件目录
│   ├── main.js                   # 主JavaScript文件
│   └── navigation.js             # 导航功能文件
├── images/                       # 图片资源目录
│   └── screenshots/              # 应用截图目录
├── assets/                       # 静态资源目录
│   └── favicon.ico               # 网站图标
├── docs/                         # 文档目录
│   ├── deployment.md             # 部署指南
│   ├── maintenance.md            # 维护手册
│   └── structure.md              # 目录结构说明
├── sitemap.xml                   # 网站地图
├── robots.txt                    # 搜索引擎爬虫协议
└── README.md                     # 项目说明文件
```

## 技术栈

- **HTML5**: 语义化标签，结构化数据标记
- **CSS3**: 变量系统，Flexbox，Grid布局，响应式设计
- **JavaScript**: ES6+，模块化功能，性能监控
- **第三方库**:
  - Font Awesome 6.4.0 (图标)
  - Google Fonts (Inter, Poppins字体)
  - 通过CDN加载，减少本地依赖

## 设计系统

### 颜色系统
- **主色调**: 多巴胺红色系 (#ff6b6b)
- **辅助色**: 橙色系 (#ffa94d)
- **成功色**: 绿色系 (#51cf66)
- **信息色**: 蓝色系 (#339af0)
- **文本颜色**: 高对比度，符合WCAG AA标准

### 字体系统
- **主要字体**: Inter (300-700字重)
- **标题字体**: Poppins (400-700字重)
- **字体大小**: 采用rem单位，支持响应式缩放

### 间距系统
- 使用CSS变量定义统一的间距值
- 支持响应式调整

## 功能模块

### 1. 应用介绍模块 (features.html)
- 核心功能展示（5项核心功能）
- 使用指南（分步骤教程）
- 界面展示区（支持图片缩放）
- 使用小贴士

### 2. 下载中心模块 (download.html)
- macOS应用下载按钮
- 版本信息展示
- 系统要求说明
- 历史版本下载
- 安装指南
- 常见问题解答
- 下载统计数据

### 3. 更新日志模块 (changelog.html)
- 按时间倒序排列版本记录
- 更新类型标签（新增/改进/修复）
- 版本筛选功能
- 订阅更新表单

### 4. 支持与打赏模块 (support.html)
- 微信/支付宝支付二维码
- 自定义金额输入
- 支持者名单展示
- 常见问题解答（FAQ）
- 联系支持表单

## 性能优化

### 加载性能
- 图片懒加载 (Intersection Observer API)
- 关键CSS内联（计划中）
- 字体预加载
- 第三方资源异步加载

### 资源优化
- 使用WebP格式图片（计划中）
- CSS和JavaScript压缩（构建时）
- 浏览器缓存策略
- 代码分割（按页面加载）

### 性能监控
- 页面加载时间监控
- 内存使用监控
- 用户交互性能监控

## SEO优化

### 基础优化
- 语义化HTML标签
- 唯一的title和meta description
- 规范的URL结构
- 站点地图 (sitemap.xml)
- 爬虫协议 (robots.txt)

### 结构化数据
- Schema.org标记 (JSON-LD格式)
- 网站、产品、组织等类型标记
- 支持搜索引擎富媒体展示

### 社交分享优化
- Open Graph标签（计划中）
- Twitter卡片（计划中）

## 安全措施

### 内容安全策略 (CSP)
- 限制资源加载源
- 防止XSS攻击
- 通过meta标签实现基础防护

### 其他安全措施
- 所有外部资源使用HTTPS
- 表单输入验证（前端）
- 安全的第三方资源引用

## 响应式设计

### 断点设计
- 移动设备 (<768px)
- 平板设备 (768px-1023px)
- 桌面设备 (1024px-1279px)
- 大桌面设备 (≥1280px)

### 设备优化
- 触摸设备优化（增大触摸目标）
- 横屏/竖屏适配
- 高DPI屏幕优化
- 减少动画偏好支持

## 部署指南

### 环境要求
- Web服务器 (Nginx/Apache)
- HTTPS证书 (Let's Encrypt)
- 域名解析配置

### 部署步骤
1. 将项目文件上传到服务器
2. 配置Web服务器指向项目目录
3. 设置HTTPS证书
4. 配置缓存策略
5. 验证网站功能

### 推荐托管方案
1. **阿里云OSS** + CDN (静态网站托管)
2. **GitHub Pages** (免费托管)
3. **Netlify** (自动部署)
4. **Vercel** (边缘网络)

## 维护手册

### 内容更新

#### 添加新应用截图
1. 将图片放入 `images/screenshots/` 目录
2. 在 `js/main.js` 的 `loadScreenshots()` 函数中添加新图片信息
3. 确保图片文件名正确，alt属性描述准确

#### 更新版本信息
1. 修改 `pages/download.html` 中的版本卡片
2. 更新 `pages/changelog.html` 中的更新日志
3. 同步更新 `sitemap.xml` 中的最后修改日期

#### 添加新FAQ
1. 在 `pages/support.html` 的FAQ部分添加新项目
2. 使用正确的HTML结构
3. 确保JavaScript交互功能正常

### 代码维护

#### 样式更新
1. 主要样式在 `css/style.css` 中定义
2. 响应式样式在 `css/responsive.css` 中定义
3. 使用CSS变量确保设计一致性

#### 功能更新
1. 通用功能在 `js/main.js` 中实现
2. 导航功能在 `js/navigation.js` 中实现
3. 页面特定功能在各自页面的script标签中实现

### 性能监控
1. 定期检查网站加载性能
2. 监控用户反馈和错误报告
3. 更新第三方依赖库

## 开发规范

### 代码风格
- HTML: 使用语义化标签，添加必要属性
- CSS: 使用BEM命名规范，CSS变量统一管理
- JavaScript: 使用ES6+语法，添加必要注释

### 提交规范
- feat: 新功能
- fix: 问题修复
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- perf: 性能优化

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 支持与贡献

- 问题反馈: 提交GitHub Issue
- 功能建议: 通过支持页面联系
- 代码贡献: Fork项目并提交Pull Request

## 更新记录

### v1.0.0 (2024-01-08)
- 初始版本发布
- 完成所有核心功能模块
- 实现响应式设计
- 完成SEO优化
- 添加性能和安全措施