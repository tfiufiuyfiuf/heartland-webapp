# 🔧 Vercel 部署修复指南

## 问题：Vercel 看不到项目

**原因**：Git 远程仓库 URL 是占位符，还没有设置真实的 GitHub 仓库地址。

---

## ✅ 解决方案

### 方法 1：如果您已经有 GitHub 仓库

#### 步骤 1：找到您的 GitHub 仓库
1. 登录 https://github.com
2. 找到您的前端代码仓库（例如：`heartland-webapp` 或类似的名称）
3. 点击仓库，复制仓库 URL
   - 格式：`https://github.com/您的用户名/仓库名.git`
   - 例如：`https://github.com/yuetong/heartland-webapp.git`

#### 步骤 2：更新 Git 远程地址
在 PowerShell 中执行：

```powershell
# 进入项目目录
cd "C:\Users\27867\Desktop\心屿1.0"

# 更新远程仓库地址（替换为您的真实地址）
git remote set-url origin https://github.com/您的用户名/仓库名.git

# 验证
git remote -v
```

#### 步骤 3：提交并推送代码
```powershell
# 添加所有文件
git add .

# 提交
git commit -m "feat: 完成所有功能 - 分院测试、AI助教、情绪日记、学生主页、自习室、呼吸训练"

# 推送到 GitHub
git push origin main
```

#### 步骤 4：在 Vercel 中导入项目
1. 登录 https://vercel.com
2. 点击 "Add New" → "Project"
3. 选择 "Import Git Repository"
4. 找到并选择您的 GitHub 仓库
5. 点击 "Import"
6. 配置：
   - **Framework Preset**: Other（或者不选）
   - **Root Directory**: `heartland-webapp`（如果前端代码在子目录中）
   - **Build Command**: 留空（纯 HTML，无需构建）
   - **Output Directory**: `.` 或留空
7. 点击 "Deploy"

---

### 方法 2：创建新的 GitHub 仓库

#### 步骤 1：在 GitHub 创建新仓库
1. 访问 https://github.com/new
2. 仓库名称：`heartland-webapp`（或您喜欢的名称）
3. 选择 **Public** 或 **Private**
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

#### 步骤 2：复制仓库 URL
创建后，GitHub 会显示仓库 URL，类似：
```
https://github.com/您的用户名/heartland-webapp.git
```

#### 步骤 3：设置 Git 远程并推送
在 PowerShell 中执行：

```powershell
# 进入项目目录
cd "C:\Users\27867\Desktop\心屿1.0"

# 更新远程仓库地址
git remote set-url origin https://github.com/您的用户名/仓库名.git

# 验证
git remote -v

# 添加所有文件
git add .

# 提交
git commit -m "feat: 完成所有功能 - 分院测试、AI助教、情绪日记、学生主页、自习室、呼吸训练"

# 推送到 GitHub
git push -u origin main
```

#### 步骤 4：在 Vercel 中导入项目
按照方法 1 的步骤 4 操作。

---

## 🎯 关键配置

### Vercel 项目设置

**如果前端代码在 `heartland-webapp` 子目录中：**

1. 在 Vercel 项目设置中：
   - **Root Directory**: `heartland-webapp`
   - **Framework Preset**: Other
   - **Build Command**: （留空）
   - **Output Directory**: `.`（留空也可以）

2. 环境变量（如果需要）：
   - 在 Vercel 项目设置 → Environment Variables 中添加

### 如果前端代码在根目录
- **Root Directory**: `.` 或留空
- 其他配置同上

---

## 🧪 验证部署

部署完成后：

1. Vercel 会提供部署 URL，例如：
   ```
   https://heartland-webapp.vercel.app
   ```

2. 测试访问：
   - 登录页：`https://heartland-webapp.vercel.app/student-login.html`
   - 分院测试：`https://heartland-webapp.vercel.app/sorting-hat.html`
   - 学生主页：`https://heartland-webapp.vercel.app/student-dashboard.html`

---

## 🐛 常见问题

### 问题 1：push 时提示需要认证

**解决**：
```powershell
# 使用 GitHub Personal Access Token
# 创建 Token：https://github.com/settings/tokens
# 选择权限：repo（全部权限）

# 推送时会提示输入用户名和密码
# 用户名：您的 GitHub 用户名
# 密码：使用 Personal Access Token（不是 GitHub 密码）
```

### 问题 2：Vercel 找不到 `index.html`

**解决**：
1. 确保 `heartland-webapp/index.html` 存在
2. 在 Vercel 设置中检查 **Root Directory** 是否正确
3. 如果前端代码在根目录，Root Directory 设为 `.`

### 问题 3：页面 404

**解决**：
1. 检查文件是否已推送到 GitHub
2. 检查 Vercel 构建日志
3. 确认文件路径正确

---

## 📝 快速检查清单

- [ ] GitHub 仓库已创建或已存在
- [ ] Git 远程地址已更新为真实仓库
- [ ] 代码已推送到 GitHub
- [ ] Vercel 已导入 GitHub 仓库
- [ ] Vercel Root Directory 设置正确
- [ ] 部署成功
- [ ] 可以访问网站

---

## 💡 提示

**关于后端**：
- ✅ 后端已在 Render 部署（不需要 Vercel）
- ⏳ 前端需要在 Vercel 部署
- 🔗 前端通过 `frontend/config.js` 中的 `BASE_URL` 连接后端

**两个服务**：
- **Render**：运行后端 API（Node.js）
- **Vercel**：托管前端静态文件（HTML/CSS/JS）

---

## 📞 需要帮助？

如果还有问题，请提供：
1. GitHub 仓库 URL
2. Vercel 中的错误信息
3. 浏览器控制台的错误（如果有）


