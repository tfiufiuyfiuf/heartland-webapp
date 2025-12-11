# 连接到 GitHub 并推送代码

## 您的 GitHub 仓库信息
- 仓库名：`tfiufiuyfiuf/heartland-backend`
- 仓库地址：`https://github.com/tfiufiuyfiuf/heartland-backend.git`

## 完整步骤（在 Git Bash 中执行）

### 第一步：进入 backend 目录并初始化 Git

```bash
cd "C:\Users\27867\Desktop\心屿1.0\backend"
git init
```

### 第二步：配置用户信息（如果还没有）

```bash
git config user.name "tfiufiuyfiuf"
git config user.email "your-email@example.com"
```

### 第三步：添加远程仓库

```bash
git remote add origin https://github.com/tfiufiuyfiuf/heartland-backend.git
```

如果提示 "remote origin already exists"，运行：
```bash
git remote set-url origin https://github.com/tfiufiuyfiuf/heartland-backend.git
```

### 第四步：添加修改的文件

```bash
git add server.js Procfile
```

### 第五步：提交代码

```bash
git commit -m "修复：添加服务器启动代码和Procfile"
```

### 第六步：推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

如果提示需要认证：
- 用户名：`tfiufiuyfiuf`
- 密码：使用 Personal Access Token（不是 GitHub 密码）

## 如果推送时要求认证

GitHub 现在要求使用 Personal Access Token：

1. **生成 Token**：
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 名称：`heartland-backend`
   - 权限：选择 `repo`
   - 点击 "Generate token"
   - **复制 token**（只显示一次）

2. **推送时使用**：
   - 用户名：`tfiufiuyfiuf`
   - 密码：粘贴刚才复制的 token

## 推送成功后

1. **刷新 GitHub 页面**
   - 应该看到新的提交记录
   - 应该看到 `server.js` 和 `Procfile` 已更新

2. **Render 自动部署**
   - 如果 Render 已连接到这个仓库
   - Render 会自动检测到新提交
   - 自动开始部署（等待几分钟）

3. **检查 Render 部署**
   - 进入 Render Dashboard
   - 查看服务状态
   - 查看部署日志

## 快速命令总结

```bash
cd "C:\Users\27867\Desktop\心屿1.0\backend"
git init
git remote add origin https://github.com/tfiufiuyfiuf/heartland-backend.git
git add server.js Procfile
git commit -m "修复：添加服务器启动代码和Procfile"
git branch -M main
git push -u origin main
```


