# 心屿学院 - 快速开始指南

本指南将帮助你在10分钟内启动项目。

## 📋 前置条件

确保你已安装：
- [x] Node.js 18+ （运行 `node --version` 检查）
- [x] npm 9+ （运行 `npm --version` 检查）
- [x] Git （运行 `git --version` 检查）

## 🚀 三步启动

### 第一步：配置Supabase（5分钟）

1. **注册Supabase账号**
   - 访问 https://supabase.com
   - 点击 "Start your project"
   - 使用GitHub或邮箱注册

2. **创建新项目**
   - 点击 "New Project"
   - 项目名称：`heartland-academy`
   - 数据库密码：设置一个强密码（记住它！）
   - 区域：选择 `Singapore` (亚洲最快)
   - 点击 "Create new project"，等待2分钟

3. **初始化数据库**
   - 在Supabase控制台，点击左侧 "SQL Editor"
   - 点击 "New query"
   - 复制 `backend/config/supabase-schema.sql` 全部内容
   - 粘贴到编辑器，点击 "Run"
   - 等待执行完成（看到 "Success"）
   - 重复以上步骤，执行 `backend/config/supabase-functions.sql`

4. **获取API密钥**
   - 点击左侧齿轮图标 ⚙️ "Settings"
   - 点击 "API"
   - 复制以下信息：
     - **URL**: `https://xxxxx.supabase.co`
     - **anon public**: `eyJhbG...` (点击眼睛图标显示)
     - **service_role**: `eyJhbG...` (在下方，点击眼睛图标)

### 第二步：启动后端（2分钟）

1. **安装依赖**
```bash
cd backend
npm install
```

2. **配置环境变量**
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

3. **编辑 .env 文件**

用记事本或任何编辑器打开 `backend/.env`，填入刚才复制的信息：

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbG...你的anon key
SUPABASE_SERVICE_KEY=eyJhbG...你的service_role key

# JWT密钥（随机字符串，至少32位）
JWT_SECRET=your_super_secret_key_change_this_in_production_123456

JWT_EXPIRE=7d
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5500
```

💡 **生成JWT密钥**：
```bash
# 在命令行运行
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. **启动后端服务器**
```bash
npm run dev
```

看到以下输出表示成功：
```
✓ Supabase数据库连接成功
🌐 服务地址: http://localhost:3000
```

### 第三步：启动前端（2分钟）

1. **配置API地址**

打开 `frontend/config.js`，确认API地址正确：

```javascript
BASE_URL: 'http://localhost:3000/api'
```

2. **启动前端服务器**

打开新的命令行窗口，在项目根目录运行：

```bash
# 方法1：使用Python（如果已安装）
python -m http.server 5500

# 方法2：使用Node.js
npx http-server -p 5500

# 方法3：使用VS Code的Live Server扩展
# 右键点击index是个五.html -> Open with Live Server
```

3. **访问应用**

打开浏览器访问：http://localhost:5500

---

## ✅ 验证安装

### 检查后端是否正常

访问：http://localhost:3000/health

应该看到：
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T10:00:00.000Z",
  "service": "心屿学院API",
  "version": "1.0.0"
}
```

### 检查前端是否正常

1. 打开 http://localhost:5500
2. 你应该看到心屿学院的主页
3. 点击"开始探索"或"登录"按钮

### 测试注册和登录

1. **注册新用户**
   - 点击"还没有账号？立即注册"
   - 手机号：输入任意11位数字（如：13800138000）
   - 点击"获取验证码"
   - 验证码自动填充：`123456`（开发环境）
   - 用户名：输入你的昵称
   - 密码：至少6位
   - 点击"注册"

2. **登录**
   - 使用刚才注册的手机号和密码
   - 点击"登录"
   - 登录成功后会跳转到主界面

3. **测试功能**
   - 点击"情绪追踪"，记录一条情绪
   - 点击"学习课程"，浏览课程
   - 点击"心理小岛"，查看社区

---

## 🎉 完成！

恭喜你成功启动了心屿学院！

### 下一步做什么？

1. **探索功能**
   - 记录你的第一条情绪记录
   - 发布第一个帖子
   - 使用番茄钟专注学习

2. **添加测试数据**
   
   在Supabase SQL编辑器中执行：

```sql
-- 添加测试课程
INSERT INTO courses (title, description, category, difficulty, is_published) VALUES
('情绪管理基础', '学习如何识别和管理自己的情绪', 'emotion', 'beginner', true),
('压力应对技巧', '掌握有效的压力缓解方法', 'stress', 'intermediate', true),
('人际关系处理', '建立健康的人际关系', 'relationship', 'beginner', true);

-- 添加测试咨询师
INSERT INTO counselors (name, title, specialties, bio, is_available) VALUES
('李心理', '国家二级心理咨询师', ARRAY['青少年心理', '情绪管理'], '拥有10年青少年心理咨询经验，擅长情绪管理和青少年成长问题。', true),
('王老师', '心理学硕士', ARRAY['学习压力', '人际关系'], '专注青少年发展心理学，帮助学生应对学习压力。', true);

-- 添加测试课程章节
INSERT INTO course_chapters (course_id, title, content, duration, order_index)
SELECT id, '第1章：认识情绪', '情绪是什么？为什么我们会有情绪？', 15, 1
FROM courses WHERE title = '情绪管理基础';
```

3. **阅读文档**
   - [完整文档](README.md)
   - [API文档](backend/README.md)
   - [部署指南](DEPLOYMENT.md)

---

## 🐛 常见问题

### 问题1：后端无法连接数据库

**错误信息**: `数据库连接测试失败`

**解决方法**:
1. 检查 `.env` 文件中的 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 是否正确
2. 确认Supabase项目没有暂停
3. 检查网络连接

### 问题2：前端无法连接后端

**错误信息**: `Network Error` 或 `Failed to fetch`

**解决方法**:
1. 确认后端服务器正在运行（http://localhost:3000/health 可访问）
2. 检查 `frontend/config.js` 中的API地址
3. 检查浏览器控制台的CORS错误
4. 确认防火墙没有拦截3000端口

### 问题3：验证码收不到

**说明**: 开发环境使用固定验证码

**解决方法**:
- 直接输入 `123456` 即可
- 如需真实短信，需要配置短信服务（见部署文档）

### 问题4：JWT验证失败

**错误信息**: `令牌无效或已过期`

**解决方法**:
1. 清除浏览器localStorage：
   - 按F12打开开发者工具
   - 切换到 "Application" 或 "存储" 标签
   - 点击 "Local Storage"
   - 删除所有 `heartland_` 开头的项
2. 重新登录

### 问题5：数据库表不存在

**错误信息**: `relation "users" does not exist`

**解决方法**:
1. 确认已执行 `supabase-schema.sql`
2. 在Supabase控制台 "Table Editor" 中检查表是否存在
3. 如果不存在，重新执行SQL脚本

---

## 💡 开发技巧

### 1. 热重载

后端使用 `nodemon` 支持热重载，修改代码后自动重启。

### 2. 调试模式

在浏览器控制台输入：
```javascript
localStorage.setItem('debug', 'true');
```
将显示详细的API调用日志。

### 3. 快速测试账号

```javascript
// 在浏览器控制台执行
const testUser = {
  phone: '13800138000',
  password: 'test123',
  verificationCode: '123456'
};
```

### 4. VS Code推荐扩展

- **ES7+ React/Redux/React-Native snippets** - 代码片段
- **Live Server** - 实时预览
- **REST Client** - API测试
- **Prettier** - 代码格式化

---

## 📞 获取帮助

遇到问题？

1. **查看文档**: [README.md](README.md)
2. **搜索Issues**: [GitHub Issues](https://github.com/your-repo/issues)
3. **提交问题**: [New Issue](https://github.com/your-repo/issues/new)
4. **联系我们**: contact@heartland.com

---

## 🎓 学习资源

- [Express.js官方文档](https://expressjs.com/)
- [Supabase文档](https://supabase.com/docs)
- [JWT介绍](https://jwt.io/introduction)
- [PostgreSQL教程](https://www.postgresql.org/docs/)

---

<div align="center">

**祝你开发愉快！** 🚀

[返回主文档](README.md) | [查看部署指南](DEPLOYMENT.md)

</div>

