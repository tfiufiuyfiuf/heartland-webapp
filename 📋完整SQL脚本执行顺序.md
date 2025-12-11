# 📋 完整 SQL 脚本执行顺序

## 必须执行的脚本（按顺序）

### 1️⃣ 第一步：创建数据库表结构

**文件**：`backend/config/supabase-schema.sql`

**作用**：创建所有数据库表（users, posts, courses 等）

**执行顺序**：**必须第一个执行**

**说明**：
- 包含所有表定义
- 包含索引
- 包含触发器
- 包含 Row Level Security (RLS) 策略

---

### 2️⃣ 第二步：创建数据库函数

**文件**：`backend/config/supabase-functions.sql`

**作用**：创建数据库函数，用于自动更新计数器（点赞数、评论数等）

**执行顺序**：**在第一步之后执行**

**说明**：
- 这些函数用于优化性能
- 当用户点赞/评论时，自动更新计数
- 虽然不是必须的，但建议执行

---

## 可选执行的脚本

### 3️⃣ 示例数据（可选）

#### 选项 A：简单示例数据
**文件**：`backend/config/sample-data.sql`

**作用**：添加一些测试数据（示例用户、课程等）

**何时使用**：
- ✅ 想要快速测试功能
- ✅ 需要示例数据来演示
- ❌ 生产环境不建议使用

#### 选项 B：完整示例数据
**文件**：`backend/config/complete-sample-data.sql`

**作用**：添加更完整的测试数据

**何时使用**：
- ✅ 需要大量测试数据
- ✅ 进行完整的功能测试
- ❌ 生产环境不建议使用

---

## 不需要执行的脚本

### ❌ 修复脚本（仅用于故障排除）

**文件**：`backend/config/supabase-fix.sql`

**作用**：清理和重建数据库表

**何时使用**：
- ❌ 正常部署不需要
- ✅ 仅在遇到表结构问题时使用
- ⚠️ 会删除所有数据！

---

### ❌ 旧版本脚本（已废弃）

**文件**：
- `backend/config/education-platform-schema.sql`
- `backend/config/education-platform-schema-fixed.sql`

**说明**：这些是旧版本的脚本，已经被 `supabase-schema.sql` 替代，不需要执行。

---

## 推荐执行顺序

### 方案 A：最小配置（仅基础功能）

1. ✅ 执行 `supabase-schema.sql`（必须）
2. ✅ 执行 `supabase-functions.sql`（推荐）

### 方案 B：包含测试数据（开发/测试环境）

1. ✅ 执行 `supabase-schema.sql`（必须）
2. ✅ 执行 `supabase-functions.sql`（推荐）
3. ⚠️ 执行 `sample-data.sql`（可选，仅测试用）

---

## 执行步骤总结

### 步骤 1：执行表结构脚本

1. 打开 Supabase SQL Editor
2. 点击 "New query"
3. 打开文件 `backend/config/supabase-schema.sql`
4. 复制全部内容并粘贴
5. 点击 "Run" 执行
6. 等待完成，应该看到成功消息

### 步骤 2：执行函数脚本

1. 在 SQL Editor 中点击 "New query"（新建查询）
2. 打开文件 `backend/config/supabase-functions.sql`
3. 复制全部内容并粘贴
4. 点击 "Run" 执行
5. 等待完成

### 步骤 3（可选）：添加测试数据

如果需要测试数据：

1. 在 SQL Editor 中点击 "New query"
2. 打开文件 `backend/config/sample-data.sql`
3. 复制全部内容并粘贴
4. 点击 "Run" 执行

---

## 验证执行结果

执行完成后，运行以下查询验证：

```sql
-- 检查表是否创建成功
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 检查函数是否创建成功
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION';

-- 检查 users 表结构
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users';
```

---

## 快速检查清单

- [ ] 已执行 `supabase-schema.sql`
- [ ] 已执行 `supabase-functions.sql`
- [ ] 已验证表创建成功
- [ ] 已验证函数创建成功
- [ ] 已重新部署 Render 服务
- [ ] 服务日志显示数据库连接成功

---

## 重要提醒

⚠️ **执行顺序很重要**：
- 必须先执行 `supabase-schema.sql`（创建表）
- 然后执行 `supabase-functions.sql`（创建函数）
- 函数依赖表，所以顺序不能颠倒

✅ **测试数据可选**：
- 如果只是想让服务运行起来，不需要执行示例数据脚本
- 示例数据仅用于开发和测试


