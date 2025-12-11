# 心屿学院 - 故障排查指南

## 🔴 常见错误及解决方案

### 错误1: "column 'phone' does not exist"

**完整错误信息：**
```
Error: Failed to run sql query: ERROR: 42703: column "phone" does not exist
```

**原因分析：**
1. Supabase中已经存在旧的表结构
2. SQL脚本没有完整执行
3. 表结构与代码不匹配

**解决方案：**

#### 方案A：完全重建数据库（推荐，适合第一次安装）

1. **在Supabase SQL编辑器中执行清理脚本**

打开 `backend/config/supabase-fix.sql`，复制全部内容到Supabase SQL编辑器执行。

2. **重新执行建表脚本**

打开 `backend/config/supabase-schema.sql`，复制全部内容到Supabase SQL编辑器执行。

3. **执行函数脚本**

打开 `backend/config/supabase-functions.sql`，复制全部内容到Supabase SQL编辑器执行。

4. **验证表结构**

在SQL编辑器中执行：
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
```

应该看到 `phone` 列存在。

#### 方案B：手动检查和修复

1. **检查现有表结构**

在Supabase控制台：
- 点击左侧 "Table Editor"
- 查看 `users` 表
- 检查列名

2. **如果列名不同**

比如如果是 `phone_number` 而不是 `phone`，你需要：

**选项1：修改数据库列名**
```sql
ALTER TABLE users RENAME COLUMN phone_number TO phone;
```

**选项2：修改后端代码**

在所有后端文件中，将 `phone` 替换为 `phone_number`。

#### 方案C：使用Supabase的Table Editor创建

如果SQL执行有问题，可以手动创建表：

1. 在Supabase控制台，点击 "Table Editor"
2. 点击 "New table"
3. 按照 `supabase-schema.sql` 中的定义手动创建

---

### 错误2: "relation 'users' does not exist"

**原因：** 表还没有创建

**解决方案：**
1. 确认已执行 `supabase-schema.sql`
2. 在Table Editor中检查表是否存在
3. 重新执行建表脚本

---

### 错误3: "permission denied for table users"

**原因：** Row Level Security (RLS) 策略过于严格

**解决方案：**

**临时方案（开发环境）：**
```sql
-- 禁用RLS（仅用于开发测试）
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```

**正式方案：**
检查并重新创建RLS策略（在 `supabase-schema.sql` 底部）

---

### 错误4: "JWT verification failed"

**原因：** Token无效或JWT_SECRET不匹配

**解决方案：**
1. 检查 `.env` 文件中的 `JWT_SECRET`
2. 清除浏览器localStorage：
   ```javascript
   localStorage.clear();
   ```
3. 重新登录

---

### 错误5: "CORS policy blocked"

**原因：** 跨域请求被阻止

**解决方案：**

1. **检查后端CORS配置**

在 `backend/server.js` 中：
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
};
```

2. **检查环境变量**

确保 `.env` 中的 `FRONTEND_URL` 正确：
```env
FRONTEND_URL=http://localhost:5500
```

3. **开发环境临时方案**

将 `origin` 改为 `'*'`（仅开发环境）：
```javascript
const corsOptions = {
  origin: '*',
  credentials: true
};
```

---

### 错误6: "Cannot connect to Supabase"

**原因：** 数据库连接配置错误

**解决方案：**

1. **检查环境变量**

确保 `.env` 文件中有正确的配置：
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_KEY=eyJhbG...
```

2. **验证Supabase项目状态**

- 登录 https://supabase.com
- 检查项目是否暂停（免费版7天不活跃会暂停）
- 如果暂停，点击 "Restore" 恢复

3. **测试连接**

在后端目录运行：
```bash
npm run dev
```

访问 http://localhost:3000/health 应该返回成功。

---

### 错误7: "验证码错误"

**原因：** 开发环境使用固定验证码

**解决方案：**

开发环境固定验证码是 `123456`，直接输入即可。

如需真实短信验证码：
1. 注册阿里云或腾讯云短信服务
2. 配置 `.env` 中的短信相关变量
3. 修改 `backend/routes/auth.js` 中的验证码逻辑

---

### 错误8: "Network Error" 或 "Failed to fetch"

**原因：** 前端无法连接后端

**解决方案：**

1. **确认后端正在运行**

访问 http://localhost:3000/health 应该有响应

2. **检查前端API配置**

在 `frontend/config.js` 中：
```javascript
BASE_URL: 'http://localhost:3000/api'
```

3. **检查浏览器控制台**

按F12打开开发者工具，查看：
- Network标签：请求是否发送成功
- Console标签：是否有错误信息

4. **检查防火墙**

确保3000端口没有被防火墙拦截

---

## 🔍 调试技巧

### 1. 查看后端日志

后端运行时会输出详细日志：
```bash
npm run dev
```

查看终端输出的错误信息。

### 2. 查看Supabase日志

在Supabase控制台：
- 点击 "Logs"
- 选择 "Database" 或 "API"
- 查看最近的错误

### 3. 使用Postman测试API

1. 下载并安装 Postman
2. 创建新请求
3. 测试登录接口：
   ```
   POST http://localhost:3000/api/auth/login
   Body (JSON):
   {
     "phone": "13800138000",
     "password": "test123"
   }
   ```

### 4. 浏览器开发者工具

- **Console标签**: 查看JavaScript错误
- **Network标签**: 查看API请求和响应
- **Application标签**: 查看localStorage中的数据

---

## 📋 完整的重装步骤

如果遇到无法解决的问题，按照以下步骤完全重装：

### 步骤1：清理Supabase

```sql
-- 在Supabase SQL编辑器执行
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

### 步骤2：重新创建表

执行 `backend/config/supabase-schema.sql` 全部内容

### 步骤3：创建函数

执行 `backend/config/supabase-functions.sql` 全部内容

### 步骤4：清理后端

```bash
cd backend
rm -rf node_modules
rm package-lock.json
npm install
```

### 步骤5：重新配置

```bash
rm .env
cp .env.example .env
# 编辑.env填入新的配置
```

### 步骤6：清理前端

在浏览器中：
```javascript
localStorage.clear();
sessionStorage.clear();
```

刷新页面。

### 步骤7：重新启动

```bash
cd backend
npm run dev
```

---

## 🆘 仍然无法解决？

### 收集错误信息

1. **后端错误日志**（终端输出）
2. **浏览器控制台错误**（F12 > Console）
3. **Network请求详情**（F12 > Network）
4. **Supabase日志**（Supabase控制台 > Logs）

### 检查清单

- [ ] Node.js版本 >= 18
- [ ] npm install 成功执行
- [ ] .env 文件存在且配置正确
- [ ] Supabase项目未暂停
- [ ] 所有SQL脚本都执行成功
- [ ] 后端服务器正在运行（3000端口）
- [ ] 前端配置的API地址正确

### 获取帮助

提供以上信息，然后：
1. 查看项目文档
2. 搜索GitHub Issues
3. 提交新的Issue
4. 联系技术支持

---

## 💡 预防性建议

### 开发环境

1. **使用固定的端口**
   - 后端：3000
   - 前端：5500

2. **定期备份数据库**
   - Supabase控制台 > Database > Backups

3. **使用版本控制**
   ```bash
   git add .
   git commit -m "备份当前版本"
   ```

4. **环境变量模板**
   - 保持 `.env.example` 更新
   - 不要提交 `.env` 到Git

### 生产环境

1. **使用独立的Supabase项目**
   - 开发环境一个项目
   - 生产环境一个项目

2. **不同的JWT密钥**
   - 开发和生产使用不同的密钥

3. **启用监控**
   - 配置Sentry错误追踪
   - 配置服务器监控

4. **定期备份**
   - 自动每日备份
   - 定期测试恢复流程

---

## 📞 快速参考

| 问题 | 快速解决 |
|------|---------|
| column不存在 | 执行 `supabase-fix.sql` 清理后重建 |
| 连接失败 | 检查 `.env` 配置和Supabase状态 |
| CORS错误 | 检查 `FRONTEND_URL` 环境变量 |
| JWT错误 | 清除localStorage重新登录 |
| 验证码错误 | 开发环境使用 `123456` |
| Network错误 | 确认后端运行在3000端口 |

---

**记住：遇到问题不要慌，按照步骤一步步排查！** 💪
























