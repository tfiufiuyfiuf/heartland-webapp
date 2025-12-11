# 🔧 Supabase 连接失败修复指南

## 问题诊断

错误信息显示：`getaddrinfo ENOTFOUND asteuoyegsxirqdhuavk.supabase.co`

**问题**：无法解析 Supabase 域名，说明：
- ❌ Supabase URL 配置错误，或
- ❌ Supabase 项目被暂停/删除，或
- ❌ 环境变量未正确设置

## 修复步骤

### 第一步：检查 Supabase 项目状态

1. **登录 Supabase**
   - 访问：https://supabase.com/dashboard
   - 登录您的账户

2. **检查项目列表**
   - 查看是否有项目名为 "heartland" 或类似的项目
   - 检查项目状态是否为 **"Active"**（活跃）

3. **如果项目不存在或被暂停**
   - 需要创建新项目或恢复项目
   - 或者使用现有的 Supabase 项目

### 第二步：获取 Supabase 配置信息

如果项目存在且为活跃状态：

1. **进入项目**
   - 点击项目进入详情页

2. **获取配置信息**
   - 点击左侧 **"Settings"** (设置)
   - 点击 **"API"** 子菜单
   - 找到以下信息：
     - **Project URL**（项目 URL）
       - 格式：`https://xxxxxxxxxxxxx.supabase.co`
     - **anon public** key（公共匿名密钥）
       - 在 "Project API keys" 部分
     - **service_role** key（服务角色密钥）
       - ⚠️ 这个密钥很重要，可以绕过RLS

3. **复制这些值**
   - 保存到一个临时文件（稍后需要）

### 第三步：在 Render 中配置环境变量

1. **回到 Render Dashboard**
   - 在 `heartland-backend` 服务详情页

2. **进入环境变量设置**
   - 点击左侧 **"Settings"**
   - 找到 **"Environment"** 或 **"Environment Variables"** 部分
   - 点击 **"Add Environment Variable"** 或编辑现有变量

3. **添加/更新以下环境变量**

   ```
   SUPABASE_URL=https://您的项目ID.supabase.co
   SUPABASE_ANON_KEY=您的anon public密钥
   SUPABASE_SERVICE_KEY=您的service_role密钥
   JWT_SECRET=一个随机的长字符串（用于JWT加密）
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://heartland-webapp.vercel.app
   ```

4. **填写示例**（请替换为您的实际值）：
   ```
   SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   JWT_SECRET=my_very_secure_random_secret_key_123456789
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://heartland-webapp.vercel.app
   ```

### 第四步：生成 JWT_SECRET（如果还没有）

在终端运行以下命令生成随机密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

或者使用在线工具生成一个长随机字符串。

### 第五步：保存并重新部署

1. **保存环境变量**
   - 点击 **"Save Changes"** 或确认保存

2. **重新部署服务**
   - 点击 **"Manual Deploy"**
   - 选择 **"Deploy latest commit"**
   - 或点击 **"Restart"**

3. **等待部署完成**
   - 等待 1-2 分钟
   - 查看状态是否变为 "Live"

### 第六步：验证修复

1. **查看日志**
   - 切换到 **"Logs"** 标签
   - 应该看到：`✓ Supabase数据库连接成功`

2. **测试健康检查**
   - 在浏览器访问：`https://您的RenderURL.onrender.com/health`
   - 应该返回 JSON 响应

## 如果没有 Supabase 项目

### 创建新 Supabase 项目

1. **访问 Supabase**
   - https://supabase.com/dashboard
   - 点击 **"New Project"**

2. **填写项目信息**
   - Project Name: `heartland` 或您喜欢的名称
   - Database Password: 设置一个强密码（保存好）
   - Region: 选择离您最近的区域
   - Pricing Plan: Free tier（免费版）

3. **等待项目创建**
   - 通常需要 1-2 分钟

4. **执行数据库初始化**
   - 进入项目后，点击 **"SQL Editor"**
   - 执行 `backend/config/supabase-schema.sql` 中的SQL
   - 如果需要，也执行 `backend/config/supabase-functions.sql`

5. **获取配置信息**
   - 按照第二步获取配置

## 快速检查清单

- [ ] Supabase 项目存在且为 Active 状态
- [ ] 已获取 Project URL
- [ ] 已获取 anon public key
- [ ] 已获取 service_role key
- [ ] 已在 Render 中设置 SUPABASE_URL
- [ ] 已在 Render 中设置 SUPABASE_ANON_KEY
- [ ] 已在 Render 中设置 SUPABASE_SERVICE_KEY
- [ ] 已在 Render 中设置 JWT_SECRET
- [ ] 已在 Render 中设置 PORT=10000
- [ ] 已在 Render 中设置 NODE_ENV=production
- [ ] 已保存环境变量
- [ ] 已重新部署服务
- [ ] 日志显示数据库连接成功
- [ ] /health 端点返回正常

## 常见错误

### 错误 1：仍然显示 ENOTFOUND
- ✅ 检查 SUPABASE_URL 是否正确（包含 https://）
- ✅ 确认 Supabase 项目为 Active 状态
- ✅ 检查是否有拼写错误

### 错误 2：认证失败
- ✅ 检查 SUPABASE_ANON_KEY 是否正确
- ✅ 检查 SUPABASE_SERVICE_KEY 是否正确
- ✅ 确认密钥没有多余的空格

### 错误 3：表不存在
- ✅ 需要在 Supabase SQL Editor 中执行 schema.sql
- ✅ 检查数据库表是否已创建

## 需要帮助？

如果仍然失败，请提供：
1. ✅ Supabase 项目状态（Active/Inactive）
2. ✅ Render 环境变量列表（隐藏敏感信息）
3. ✅ 最新的错误日志


