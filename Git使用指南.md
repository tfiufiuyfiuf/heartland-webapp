# Git 使用指南

## 第一步：配置 Git（首次使用）

### 如果刚刚安装 Git：

1. **重启 PowerShell**
   - 关闭当前 PowerShell 窗口
   - 重新打开一个新的 PowerShell 窗口

2. **配置用户信息**（首次使用需要）
   ```powershell
   git config --global user.name "您的名字"
   git config --global user.email "您的邮箱"
   ```

## 第二步：初始化 Git 仓库（如果还没有）

```powershell
cd "C:\Users\27867\Desktop\心屿1.0"
git init
```

## 第三步：添加修改的文件

```powershell
cd backend
git add server.js Procfile
```

## 第四步：提交代码

```powershell
git commit -m "修复：添加服务器启动代码和Procfile"
```

## 第五步：推送到远程仓库

如果您的项目已经连接到 GitHub/GitLab：

```powershell
# 查看远程仓库
git remote -v

# 如果有远程仓库，推送代码
git push origin main
```

## 如果项目还没有连接到远程仓库

### 方法 1：使用 Render 的 Web 界面手动部署

**不需要 Git！** 可以直接：
1. 在 Render Dashboard 中
2. 点击服务 → Settings
3. 找到 "Build & Deploy"
4. 上传代码或使用其他方式

### 方法 2：创建 GitHub 仓库并连接

1. 在 GitHub 上创建新仓库
2. 连接到本地项目：
   ```powershell
   git remote add origin https://github.com/您的用户名/仓库名.git
   git branch -M main
   git push -u origin main
   ```

## 快速检查 Git 是否可用

在 PowerShell 中运行：
```powershell
git --version
```

如果显示版本号（如 `git version 2.x.x`），说明 Git 已配置成功！

## 如果 Git 仍然不可用

可能需要手动添加 Git 到 PATH：

1. 找到 Git 安装目录（通常是 `C:\Program Files\Git\bin\`）
2. 添加到系统环境变量 PATH
3. 重启 PowerShell

或者使用 Git Bash（Git 安装时自带的终端）。


