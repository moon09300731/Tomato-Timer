# 部署指南

本文档详细介绍了如何部署番茄钟官方网站到生产环境。

## 环境要求

### 服务器要求
- **操作系统**: Linux (Ubuntu 20.04+ 或 CentOS 7+)
- **Web服务器**: Nginx 1.18+ 或 Apache 2.4+
- **内存**: 至少 512MB RAM
- **存储**: 至少 100MB 可用空间

### 域名和SSL证书
- 已注册的域名
- SSL证书 (推荐使用 Let's Encrypt 免费证书)

## 部署方案选择

### 方案一：阿里云 OSS + CDN (推荐)
#### 优点
- 高可用性和可扩展性
- 自动HTTPS
- CDN加速全球访问
- 低成本

#### 部署步骤
1. 登录阿里云控制台，进入OSS服务
2. 创建Bucket，名称如 `pomodoro-website`
3. 设置Bucket为公共读权限
4. 启用静态网站托管功能
5. 设置默认首页为 `index.html`
6. 配置自定义域名并申请SSL证书
7. 启用CDN加速
8. 上传所有网站文件到Bucket

#### 配置示例
```bash
# 使用 ossutil 工具上传文件
ossutil cp -r ./ oss://pomodoro-website/ --recursive
```

### 方案二：传统服务器部署 (Nginx)

#### 安装Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install epel-release
sudo yum install nginx
```

#### 配置文件
创建 `/etc/nginx/sites-available/pomodoro`:
```nginx
server {
    listen 80;
    server_name pomodoro-app.example.com;
    root /var/www/pomodoro-website;
    index index.html;

    # 启用gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 缓存策略
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # 404页面重定向到首页
    error_page 404 /index.html;

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
    }
}
```

#### 启用网站
```bash
sudo ln -s /etc/nginx/sites-available/pomodoro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 配置HTTPS (Let's Encrypt)
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d pomodoro-app.example.com

# 自动续期测试
sudo certbot renew --dry-run
```

### 方案三：GitHub Pages (免费)
#### 部署步骤
1. 在GitHub上创建新仓库 `pomodoro-website`
2. 将代码推送到main分支
3. 进入仓库设置 → Pages
4. 选择 `main` 分支作为源
5. 等待部署完成，访问提供的URL

#### 自定义域名
1. 在域名提供商处添加CNAME记录指向GitHub Pages
2. 在仓库设置中添加自定义域名
3. 启用HTTPS

## 文件上传

### 上传所有文件
```bash
# 使用SCP上传到服务器
scp -r ./ user@your-server:/var/www/pomodoro-website

# 设置权限
ssh user@your-server
sudo chown -R www-data:www-data /var/www/pomodoro-website
sudo chmod -R 755 /var/www/pomodoro-website
```

### 验证文件结构
确保服务器上的目录结构如下：
```
/var/www/pomodoro-website/
├── index.html
├── pages/
├── css/
├── js/
├── images/
├── assets/
├── sitemap.xml
└── robots.txt
```

## 性能优化配置

### Nginx性能优化
```nginx
# /etc/nginx/nginx.conf 中的部分配置
http {
    # 启用高效文件传输
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    
    # 连接超时设置
    keepalive_timeout 65;
    
    # 压缩设置
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 缓存设置
    open_file_cache max=1000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
}
```

### 浏览器缓存策略
- HTML文件: `Cache-Control: no-cache`
- CSS/JS文件: `Cache-Control: public, max-age=31536000, immutable`
- 图片文件: `Cache-Control: public, max-age=31536000`

## 安全配置

### SSL/TLS配置
```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
```

### 安全头部
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com/ajax/libs https://fonts.googleapis.com; style-src 'self' https://cdnjs.cloudflare.com/ajax/libs https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 监控与维护

### 日志监控
```bash
# 查看Nginx访问日志
sudo tail -f /var/log/nginx/access.log

# 查看错误日志
sudo tail -f /var/log/nginx/error.log
```

### 性能监控
```bash
# 安装监控工具
sudo apt install htop

# 检查内存使用
free -h

# 检查磁盘空间
df -h
```

### 备份策略
```bash
# 创建备份脚本 /usr/local/bin/backup-website.sh
#!/bin/bash
BACKUP_DIR="/backup/pomodoro-website"
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "$BACKUP_DIR/website_$DATE.tar.gz" /var/www/pomodoro-website

# 添加到cron定时任务
# 每天凌晨2点备份
0 2 * * * /usr/local/bin/backup-website.sh
```

## 故障排除

### 常见问题

#### 1. 网站无法访问
```bash
# 检查Nginx状态
sudo systemctl status nginx

# 检查端口监听
sudo netstat -tulpn | grep :80

# 检查防火墙
sudo ufw status
```

#### 2. HTTPS证书问题
```bash
# 检查证书有效期
sudo certbot certificates

# 手动续期
sudo certbot renew
```

#### 3. 权限问题
```bash
# 检查文件权限
ls -la /var/www/pomodoro-website

# 修复权限
sudo chown -R www-data:www-data /var/www/pomodoro-website
sudo chmod -R 755 /var/www/pomodoro-website
```

### 性能问题
- 启用Nginx的gzip压缩
- 配置浏览器缓存
- 使用CDN加速静态资源
- 优化图片大小和格式

## 更新部署

### 更新网站内容
1. 在本地更新文件
2. 测试本地功能
3. 备份当前生产环境
4. 上传更新文件
5. 清除CDN缓存（如果使用CDN）

### 版本回滚
```bash
# 从备份恢复
tar -xzf /backup/pomodoro-website/website_20240108_120000.tar.gz -C /
sudo systemctl restart nginx
```

## 联系支持

如果在部署过程中遇到问题，请通过以下方式联系：
- 电子邮件: support@pomodoro-app.com
- GitHub Issues: github.com/moon09300731/Tomato-Timer

---

**最后更新**: 2024-01-08  
**版本**: v1.0.0