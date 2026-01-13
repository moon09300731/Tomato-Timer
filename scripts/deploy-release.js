#!/usr/bin/env node

/**
 * 部署发布版本脚本
 * 将构建好的DMG文件复制到下载目录，并更新版本管理信息
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DOWNLOADS_DIR = path.join(PROJECT_ROOT, 'pomodoro-website', 'downloads');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const VERSIONS_FILE = path.join(DOWNLOADS_DIR, 'versions.json');
const PACKAGE_JSON = path.join(PROJECT_ROOT, 'package.json');

class ReleaseDeployer {
    constructor() {
        this.version = this.getVersion();
        this.versionDir = path.join(DOWNLOADS_DIR, `v${this.version}`);
        this.ensureDirectories();
    }

    /**
     * 从package.json获取版本号
     */
    getVersion() {
        try {
            const packageData = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
            return packageData.version;
        } catch (error) {
            console.error('无法读取package.json:', error);
            process.exit(1);
        }
    }

    /**
     * 确保目录存在
     */
    ensureDirectories() {
        if (!fs.existsSync(this.versionDir)) {
            fs.mkdirSync(this.versionDir, { recursive: true });
            console.log(`创建版本目录: ${this.versionDir}`);
        }
    }

    /**
     * 查找DMG文件
     */
    findDmgFile() {
        try {
            const files = fs.readdirSync(DIST_DIR);
            const dmgFiles = files.filter(file => 
                file.endsWith('.dmg') && 
                file.includes('TomatoTimer') &&
                file.includes(this.version)
            );

            if (dmgFiles.length > 0) {
                return path.join(DIST_DIR, dmgFiles[0]);
            }

            // 如果没有找到包含版本号的文件，查找任何dmg文件
            const anyDmg = files.find(file => file.endsWith('.dmg'));
            if (anyDmg) {
                return path.join(DIST_DIR, anyDmg);
            }

            return null;
        } catch (error) {
            console.error('查找DMG文件失败:', error);
            return null;
        }
    }

    /**
     * 生成文件SHA256校验和
     */
    generateChecksum(filePath) {
        try {
            const crypto = require('crypto');
            const fileBuffer = fs.readFileSync(filePath);
            const hashSum = crypto.createHash('sha256');
            hashSum.update(fileBuffer);
            return hashSum.digest('hex');
        } catch (error) {
            console.warn('生成校验和失败:', error);
            return null;
        }
    }

    /**
     * 获取文件大小
     */
    getFileSize(filePath) {
        try {
            const stats = fs.statSync(filePath);
            return stats.size;
        } catch (error) {
            console.warn('获取文件大小失败:', error);
            return 0;
        }
    }

    /**
     * 格式化文件大小
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * 复制文件到下载目录
     */
    copyDmgFile(sourcePath) {
        if (!sourcePath || !fs.existsSync(sourcePath)) {
            console.error('源文件不存在:', sourcePath);
            return null;
        }

        // 使用TomatoTimer作为文件名前缀（无连字符）
        const fileName = `TomatoTimer-v${this.version}.dmg`;
        const destPath = path.join(this.versionDir, fileName);

        try {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`复制文件: ${sourcePath} -> ${destPath}`);

            // 生成校验和文件
            const checksum = this.generateChecksum(destPath);
            if (checksum) {
                const checksumFile = path.join(this.versionDir, `${fileName}.sha256`);
                fs.writeFileSync(checksumFile, `${checksum}  ${fileName}\n`);
                console.log(`生成校验和文件: ${checksumFile}`);
            }

            return {
                path: destPath,
                fileName: fileName,
                size: this.getFileSize(destPath),
                checksum: checksum
            };
        } catch (error) {
            console.error('复制文件失败:', error);
            return null;
        }
    }

    /**
     * 更新版本信息文件
     */
    updateVersionsFile(fileInfo) {
        let versionsData = { current_version: this.version, versions: [] };

        try {
            if (fs.existsSync(VERSIONS_FILE)) {
                versionsData = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8'));
            }
        } catch (error) {
            console.warn('读取版本文件失败，创建新文件:', error);
        }

        // 检查是否已存在该
版本        const existingIndex = versionsData.versions.findIndex(v => v.version === this.version);
        
        const versionInfo = {
            version: this.version,
            release_date: new Date().toISOString().split('T')[0],
            file_name: fileInfo.fileName,
            file_size: this.formatFileSize(fileInfo.size),
            file_size_bytes: fileInfo.size,
            download_count: 0,
            is_stable: !this.version.includes('beta') && !this.version.includes('alpha'),
            checksum_sha256: fileInfo.checksum,
            changelog: this.getChangelog()
        };

        if (existingIndex >= 0) {
            //更新 现有版本
            versionsData.versions[existingIndex] = versionInfo;
            console.log(`更新版本 ${this.version} 信息`);
        } else {
            // 添加新版本到开头
            versionsData.versions.unshift(versionInfo);
            console.log(`添加新版本 ${this.version} 信息`);
        }

        // 更新当前版本
        versionsData.current_version = this.version;

        try {
            fs.writeFileSync(VERSIONS_FILE, JSON.stringify(versionsData, null, 2));
            console.log(`更新版本文件: ${VERSIONS_FILE}`);
        } catch (error) {
            console.error('写入版本文件失败:', error);
        }
    }

    /**
     * 获取更新日志（从CHANGELOG.md或根据版本号生成）
     */
    getChangelog() {
        // 这里可以从CHANGELOG.md文件读取
        // 暂时返回默认内容
        if (this.version === '1.0.0') {
            return ['初始发布版本', '包含所有核心功能', '修复已知问题'];
        } else if (this.version.includes('beta')) {
            return ['测试版本', '包含新功能', '可能存在已知问题'];
        } else {
            return [`版本 ${this.version} 发布`, '常规更新和bug修复'];
        }
    }

    /**
     * 清理旧版本（保留最近5个版本）
     */
    cleanupOldVersions() {
        try {
            if (!fs.existsSync(VERSIONS_FILE)) return;

            const versionsData = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8'));
            const versionsToKeep = 5;

            if (versionsData.versions.length > versionsToKeep) {
                const versionsToRemove = versionsData.versions.slice(versionsToKeep);
                versionsData.versions = versionsData.versions.slice(0, versionsToKeep);

                // 这里可以添加删除旧版本文件的逻辑
                console.log(`保留最近 ${versionsToKeep} 个版本，移除了 ${versionsToRemove.length} 个旧版本`);
                
                fs.writeFileSync(VERSIONS_FILE, JSON.stringify(versionsData, null, 2));
            }
        } catch (error) {
            console.warn('清理旧版本失败:', error);
        }
    }

    /**
     * 主执行函数
     */
    async deploy() {
        console.log(`开始部署版本 ${this.version}`);
        console.log(`版本目录: ${this.versionDir}`);

        // 1. 查找DMG文件
        const dmgSource = this.findDmgFile();
        if (!dmgSource) {
            console.error('未找到DMG文件，请在dist目录中检查构建输出');
            process.exit(1);
        }

        console.log(`找到DMG文件: ${dmgSource}`);

        // 2. 复制文件
        const fileInfo = this.copyDmgFile(dmgSource);
        if (!fileInfo) {
            console.error('复制文件失败');
            process.exit(1);
        }

        // 3. 更新版本信息
        this.updateVersionsFile(fileInfo);

        // 4. 清理旧版本
        this.cleanupOldVersions();

        console.log(`版本 ${this.version} 部署完成!`);
        console.log(`文件位置: ${fileInfo.path}`);
        console.log(`文件大小: ${this.formatFileSize(fileInfo.size)}`);
    }
}

// 主执行
if (require.main === module) {
    const deployer = new ReleaseDeployer();
    deployer.deploy().catch(error => {
        console.error('部署失败:', error);
        process.exit(1);
    });
}

module.exports = ReleaseDeployer;