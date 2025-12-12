# 🚀 推送前端代码到 GitHub

## 您的信息
- GitHub 用户名：`tfiufiuyfiuf`
- 后端仓库：`heartland-backend` ✅（已有）
- 前端仓库：`heartland-webapp` ⏳（需要创建）

---

## 第 1 步：创建前端 GitHub 仓库

1. 访问：https://github.com/new
2. **Repository name**: `heartland-webapp`
3. 选择 **Public**
4. **不要勾选** "Add a README file"
5. 点击 **"Create repository"**

**仓库地址**：
```
https://github.com/tfiufiuyfiuf/heartland-webapp.git
```

---

## 第 2 步：初始化前端代码仓库

打开 PowerShell，执行以下命令：

```powershell
# 进入前端目录
cd "C:\Users\27867\Desktop\心屿1.0\heartland-webapp"

# 初始化 Git（如果还没初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: 心屿学院前端 - 完成所有功能"

# 添加远程仓库
git remote add origin https://github.com/tfiufiuyfiuf/heartland-webapp.git

# 推送到 GitHub（第一次推送使用 -u）
git push -u origin main
```

---

## 第 3 步：如果出现认证要求

### 创建 GitHub Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: 输入 `Vercel Deployment`
4. **Expiration**: 选择 **No expiration**（或 90 days）
5. **Select scopes**: 勾选 **`repo`**（全部权限）
6. 点击 **"Generate token"**
7. **复制 Token**（只显示一次，保存好！）

### 使用 Token 推送

推送时如果要求输入密码：
- **Username**: `tfiufiuyfiuf`
- **Password**: 粘贴刚才复制的 Token（**不是 GitHub 密码**）

---

## 第 4 步：在 Vercel 导入项目

1. 登录 https://vercel.com
2. 点击 **"Add New"** → **"Project"**
3. 选择 **"Import Git Repository"**
4. 点击 **"Adjust GitHub App Permissions"**（如果需要）
5. 找到并选择 **`tfiufiuyfiuf/heartland-webapp`**
6. 点击 **"Import"**

### 重要配置：

**如果前端文件在根目录**：
- **Root Directory**: 留空或 `.`
- **Framework Preset**: Other
- **Build Command**: 留空
- **Output Directory**: 留空

**如果需要设置环境变量**（可选）：
- 在 "Environment Variables" 中添加（一般不需要）

7. 点击 **"Deploy"**

等待 2-3 分钟，部署完成！

---

## ✅ 部署完成后

Vercel 会提供 URL，例如：
```
https://heartland-webapp.vercel.app
```

### 测试访问：

- 登录页：https://heartland-webapp.vercel.app/student-login.html
- 分院测试：https://heartland-webapp.vercel.app/sorting-hat.html
- 学生主页：https://heartland-webapp.vercel.app/student-dashboard.html
- 情绪日记：https://heartland-webapp.vercel.app/mood-diary.html
- 自习室：https://heartland-webapp.vercel.app/study-room.html
- 呼吸训练：https://heartland-webapp.vercel.app/breathing-exercise.html

---

## 🔗 两个服务

现在您有两个部署：

1. **后端（Render）**：
   - 仓库：https://github.com/tfiufiuyfiuf/heartland-backend
   - API：https://heartland-backend.onrender.com/api

2. **前端（Vercel）**：
   - 仓库：https://github.com/tfiufiuyfiuf/heartland-webapp
   - 网站：https://heartland-webapp.vercel.app

前端通过 `frontend/config.js` 中的配置连接后端 API。

---

## 🐛 可能的错误

### 错误 1：git init 提示已存在 .git

**解决**：跳过 `git init`，直接执行后面的命令

### 错误 2：推送时提示 "src refspec main does not exist"

**原因**：当前分支不是 main

**解决**：
```powershell
# 查看当前分支
git branch

# 如果是 master，重命名为 main
git branch -M main

# 再推送
git push -u origin main
```

### 错误 3：Vercel 部署后 404

**原因**：文件路径问题

**解决**：
1. 确认 GitHub 上已有所有 HTML 文件
2. 检查 Vercel Root Directory 设置
3. 查看 Vercel 部署日志

---

## 📞 需要帮助？

如果遇到问题，请提供：
1. 执行命令后的错误信息
2. Vercel 部署日志
3. 浏览器控制台错误

---

## 🎉 完成后

您就拥有了完整的系统：
- ✅ 后端 API（Render）
- ✅ 前端网站（Vercel）
- ✅ 数据库（Supabase）

可以开始注册测试了！



