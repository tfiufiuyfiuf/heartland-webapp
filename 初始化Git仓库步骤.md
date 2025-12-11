# 初始化 Git 仓库步骤

## 当前状态
✅ Git 已安装并可用
❌ 项目目录还没有初始化为 Git 仓库

## 完整步骤（请在您的终端中执行）

### 第一步：初始化 Git 仓库

```bash
git init
```

### 第二步：配置用户信息（首次使用需要）

```bash
git config user.name "您的名字"
git config user.email "您的邮箱@example.com"
```

例如：
```bash
git config user.name "yuetong"
git config user.email "your-email@example.com"
```

### 第三步：添加修改的文件

```bash
cd backend
git add server.js Procfile
```

### 第四步：提交代码

```bash
git commit -m "修复：添加服务器启动代码和Procfile"
```

### 第五步：查看提交记录

```bash
git log --oneline
```

## 如果您的代码需要推送到 GitHub/Render

### 选项 1：推送到 GitHub（如果已有仓库）

```bash
cd ..
git remote add origin https://github.com/您的用户名/仓库名.git
git branch -M main
git push -u origin main
```

### 选项 2：在 Render 中直接连接 GitHub

1. 在 GitHub 创建新仓库
2. 推送代码到 GitHub
3. 在 Render 中连接该仓库
4. Render 会自动部署

### 选项 3：不使用 Git，直接在 Render 中手动更新

如果不想使用 Git，可以直接：
1. 在 Render Dashboard 中
2. 使用 Shell 或文件上传功能
3. 更新 server.js 和创建 Procfile


