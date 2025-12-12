# ⚡ 快速修复 Vercel 部署（3步）

## 🎯 问题说明

Vercel 看不到项目，因为 Git 远程仓库地址还是占位符：
```
https://github.com/您的用户名/仓库名.git
```

需要设置为真实的 GitHub 仓库地址。

---

## ✅ 解决方案（选择一种）

### 方法 A：使用现有 GitHub 仓库 ⭐（推荐）

#### 第 1 步：找到您的 GitHub 仓库地址

1. 打开 https://github.com
2. 找到您的前端代码仓库
3. 点击仓库，复制 URL

**URL 格式**：
```
https://github.com/您的用户名/仓库名.git
```

**示例**：
```
https://github.com/yuetong/heartland-webapp.git
```

#### 第 2 步：更新 Git 地址并推送

打开 PowerShell，执行（**替换为您真实的仓库地址**）：

```powershell
# 进入项目目录
cd "C:\Users\27867\Desktop\心屿1.0"

# 更新远程地址（替换为您的真实地址）
git remote set-url origin https://github.com/您的用户名/仓库名.git

# 验证地址
git remote -v

# 添加所有文件
git add .

# 提交
git commit -m "feat: 完成所有功能"

# 推送
git push origin main
```

#### 第 3 步：在 Vercel 导入项目

1. 登录 https://vercel.com
2. 点击 **"Add New"** → **"Project"**
3. 选择 **"Import Git Repository"**
4. 找到并选择您的 GitHub 仓库
5. 点击 **"Import"**
6. **重要配置**：
   - **Root Directory**: 点击 **"Edit"**，输入 `heartland-webapp`
   - **Framework Preset**: 选择 **"Other"** 或留空
   - **Build Command**: 留空
   - **Output Directory**: 留空
7. 点击 **"Deploy"**

**等待 2-3 分钟，部署完成！**

---

### 方法 B：创建新的 GitHub 仓库

#### 第 1 步：创建新仓库

1. 访问 https://github.com/new
2. **Repository name**: `heartland-webapp`
3. 选择 **Public** 或 **Private**
4. **不要勾选** "Initialize with README"
5. 点击 **"Create repository"**

#### 第 2 步：复制仓库地址

创建后，复制显示的仓库 URL，例如：
```
https://github.com/您的用户名/heartland-webapp.git
```

#### 第 3 步：设置并推送

在 PowerShell 执行（**替换为您真实的仓库地址**）：

```powershell
cd "C:\Users\27867\Desktop\心屿1.0"

# 更新远程地址
git remote set-url origin https://github.com/您的用户名/heartland-webapp.git

# 验证
git remote -v

# 添加并提交
git add .
git commit -m "feat: 完成所有功能"

# 推送（第一次使用 -u）
git push -u origin main
```

#### 第 4 步：在 Vercel 导入

按照方法 A 的第 3 步操作。

---

## 🔑 GitHub 认证（如果推送时要求输入密码）

GitHub 现在需要 Personal Access Token，而不是密码。

### 创建 Token：

1. 访问：https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: 输入 `Vercel Deployment`
4. **Expiration**: 选择有效期（建议 90 天或 No expiration）
5. **Select scopes**: 勾选 **`repo`**（全部权限）
6. 点击 **"Generate token"**
7. **复制 Token**（只显示一次！）

### 使用 Token：

推送时提示输入密码时：
- **Username**: 您的 GitHub 用户名
- **Password**: 粘贴刚才复制的 Token（**不是 GitHub 密码**）

---

## ✅ 部署成功后

Vercel 会提供一个 URL，例如：
```
https://heartland-webapp.vercel.app
```

### 测试访问：

- 登录页：`https://heartland-webapp.vercel.app/student-login.html`
- 分院测试：`https://heartland-webapp.vercel.app/sorting-hat.html`
- 学生主页：`https://heartland-webapp.vercel.app/student-dashboard.html`

---

## 🎯 关键点

1. **后端**：已在 Render ✅（不需要 Vercel）
2. **前端**：需要在 Vercel 部署 ⏳
3. **Root Directory**：必须设置为 `heartland-webapp`（因为前端代码在这个子目录中）

---

## 🐛 常见错误

### 错误 1：`repository not found`
**原因**：仓库地址错误或没有权限

**解决**：
- 检查仓库 URL 是否正确
- 确认仓库是 Public 或您有访问权限
- 检查 Token 是否有 `repo` 权限

### 错误 2：`Vercel 部署后 404`
**原因**：Root Directory 设置错误

**解决**：
1. 进入 Vercel 项目设置
2. Settings → General → Root Directory
3. 设置为 `heartland-webapp`
4. 重新部署

---

## 📞 需要帮助？

请告诉我：
1. 您的 GitHub 用户名
2. 仓库名称
3. Vercel 中的具体错误信息

我会帮您生成准确的命令！



