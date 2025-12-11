# 📋 在 Supabase 中创建数据库表

## 问题
错误信息：`Could not find the table 'public.users' in the schema cache`

这意味着 Supabase 数据库中还没有创建表结构。

## 解决步骤

### 步骤 1：打开 Supabase SQL Editor

1. **登录 Supabase Dashboard**
   - 访问：https://supabase.com/dashboard
   - 登录您的账户

2. **进入项目**
   - 点击您的 Supabase 项目（应该是 `asteuoyegsxirqdhuavk` 或类似）

3. **打开 SQL Editor**
   - 点击左侧边栏的 **"SQL Editor"** 图标
   - 或直接访问：您的项目 → SQL Editor

### 步骤 2：执行 SQL 脚本

1. **点击 "New query"**（新建查询）

2. **复制完整的 SQL 脚本**

   打开文件 `backend/config/supabase-schema.sql`，**完整复制**所有内容（从第 1 行到最后一行）

   或者，我已经为您准备了完整的 SQL 脚本，见下方：

3. **粘贴到 SQL Editor**

4. **点击 "Run" 或按 `Ctrl + Enter`** 执行脚本

5. **等待执行完成**
   - 应该看到 "Success. No rows returned" 或类似的成功消息
   - 如果看到错误，请复制错误信息告诉我

### 步骤 3：验证表是否创建成功

在 SQL Editor 中运行以下查询来验证：

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

应该看到以下表：
- users
- user_profiles
- courses
- mood_records
- posts
- comments
- 等等...

### 步骤 4：重新部署 Render 服务

表创建成功后：

1. **回到 Render Dashboard**
   - 进入 `heartland-backend` 服务

2. **重新部署**
   - 点击 "Manual Deploy" → "Deploy latest commit"
   - 或等待自动重新部署

3. **查看日志**
   - 应该看到：
     ```
     正在连接数据库...
     ✓ Supabase数据库连接成功
     ✓ 服务器启动成功
     ```

## 完整的 SQL 脚本位置

SQL 脚本文件位置：
- `backend/config/supabase-schema.sql`

这个文件包含了所有需要创建的表和索引。

## 重要提醒

⚠️ **如果您之前有数据**：
- 执行这个脚本不会删除现有数据（使用了 `CREATE TABLE IF NOT EXISTS`）
- 但如果表结构不同，可能需要先清理旧表

⚠️ **如果是新项目**：
- 直接执行脚本即可
- 所有表都会被创建

## 如果执行出错

如果执行 SQL 时遇到错误，请：
1. 复制完整的错误信息
2. 告诉我具体的错误内容
3. 我会帮您解决

## 快速检查清单

- [ ] 已登录 Supabase Dashboard
- [ ] 已进入正确的项目
- [ ] 已打开 SQL Editor
- [ ] 已创建新查询
- [ ] 已复制完整的 SQL 脚本
- [ ] 已粘贴到 SQL Editor
- [ ] 已执行脚本（Run）
- [ ] 看到成功消息
- [ ] 已验证表是否创建（运行验证查询）
- [ ] 已重新部署 Render 服务
- [ ] 部署日志显示数据库连接成功


