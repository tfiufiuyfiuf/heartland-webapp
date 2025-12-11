# 🚀 Render 部署步骤

## ✅ 当前状态
- ✅ 代码已成功推送到 GitHub
- ✅ `server.js` 已包含启动代码
- ✅ `Procfile` 已创建

## 下一步：在 Render 中部署

### 步骤 1：检查 Render 服务状态

1. **登录 Render Dashboard**
   - 访问：https://dashboard.render.com/
   - 进入 `heartland-backend` 服务

2. **查看服务状态**
   - 如果显示 "Live"（绿色）- 服务正在运行
   - 如果显示 "Failed"（红色）- 需要部署
   - 如果有部署进度 - 正在部署中

### 步骤 2：检查服务是否连接到 GitHub

1. **进入服务设置**
   - 点击左侧 **"Settings"**

2. **查看 "Build & Deploy" 部分**
   - 检查 **"GitHub Repository"** 是否显示：
     - `tfiufiuyfiuf/heartland-backend`
   - 检查 **"Auto-Deploy"** 是否为 **"Yes"**

### 情况 A：如果已连接到 GitHub

**手动触发部署**：
1. 回到服务主页
2. 点击 **"Manual Deploy"** 按钮
3. 选择 **"Deploy latest commit"**
4. 等待 1-2 分钟

### 情况 B：如果没有连接到 GitHub

**需要重新连接**：

1. **删除旧服务**（可选，如果允许）
   - 或者创建新服务

2. **创建新 Web Service**
   - 点击 **"+ New"** → **"Web Service"**
   - 选择 **"Connect GitHub"**
   - 授权 Render 访问您的 GitHub
   - 选择仓库：`tfiufiuyfiuf/heartland-backend`

3. **配置服务**
   - **Name**: `heartland-backend`
   - **Region**: 选择离您最近的（如 Singapore）
   - **Branch**: `main`
   - **Root Directory**: 留空（因为代码在仓库根目录）
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **点击 "Create Web Service"**

### 步骤 3：设置环境变量（关键！）

无论使用哪种方式，**必须设置环境变量**：

1. **进入服务设置**
   - 点击左侧 **"Settings"**
   - 找到 **"Environment"** 或 **"Environment Variables"** 部分

2. **添加以下环境变量**：

   ```
   SUPABASE_URL=https://您的项目ID.supabase.co
   SUPABASE_ANON_KEY=您的anon密钥
   SUPABASE_SERVICE_KEY=您的service_role密钥
   JWT_SECRET=随机长字符串（至少32位）
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://heartland-webapp.vercel.app
   ```

3. **获取 Supabase 配置**（如果还没有）
   - 登录：https://supabase.com/dashboard
   - 进入项目 → Settings → API
   - 复制 Project URL、anon key、service_role key

4. **生成 JWT_SECRET**（如果没有）
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **保存环境变量**
   - 点击 **"Save Changes"**

### 步骤 4：查看部署日志

1. **切换到 "Logs" 标签**
   - 查看实时部署日志

2. **正常部署应该看到**：
   ```
   ==> Cloning repository...
   ==> Installing dependencies...
   ==> Building...
   ==> Starting...
   正在连接数据库...
   ✓ Supabase数据库连接成功
   ✓ 服务器启动成功
   ✓ 监听端口: 10000
   ```

3. **如果看到错误**：
   - 复制错误信息
   - 查看常见问题解决方案

### 步骤 5：验证部署成功

1. **服务状态变为 "Live"**（绿色）

2. **测试健康检查**
   - 在浏览器访问：`https://heartland-backend.onrender.com/health`
   - 应该返回：
     ```json
     {
       "status": "ok",
       "timestamp": "...",
       "service": "心屿学院API",
       "version": "1.0.0"
     }
     ```

3. **测试登录接口**（可选）
   - 访问前端页面
   - 尝试登录

## 常见问题

### 问题 1：部署失败 - 数据库连接失败

**原因**：环境变量未设置或 Supabase 配置错误

**解决**：
1. ✅ 检查环境变量是否全部设置
2. ✅ 验证 Supabase URL 和密钥是否正确
3. ✅ 确认 Supabase 项目状态为 "Active"

### 问题 2：端口错误

**解决**：
- 确保环境变量 `PORT=10000`
- Render 会自动使用这个端口

### 问题 3：构建失败

**解决**：
- 检查 `package.json` 依赖是否完整
- 查看构建日志中的具体错误

## 检查清单

部署前确认：
- [ ] Render 服务已连接到 GitHub 仓库
- [ ] 环境变量 SUPABASE_URL 已设置
- [ ] 环境变量 SUPABASE_ANON_KEY 已设置
- [ ] 环境变量 SUPABASE_SERVICE_KEY 已设置
- [ ] 环境变量 JWT_SECRET 已设置
- [ ] 环境变量 PORT=10000 已设置
- [ ] 环境变量 NODE_ENV=production 已设置
- [ ] 已手动触发部署或自动部署已启用
- [ ] 部署日志显示数据库连接成功
- [ ] 服务状态为 "Live"
- [ ] /health 端点返回正常

## 现在请执行

1. **登录 Render Dashboard**
2. **检查服务是否连接到 GitHub**
3. **手动触发部署**（如果需要）
4. **设置所有环境变量**（如果还没有）
5. **查看部署日志**
6. **测试健康检查端点**

告诉我执行到哪一步了，或者遇到了什么问题！


