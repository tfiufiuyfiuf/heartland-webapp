# 心屿学院 - 部署指南

完整的生产环境部署指南，包括前端和后端。

## 目录

1. [前期准备](#前期准备)
2. [Supabase数据库配置](#supabase数据库配置)
3. [后端部署](#后端部署)
4. [前端部署](#前端部署)
5. [域名和SSL配置](#域名和ssl配置)
6. [监控和维护](#监控和维护)

---

## 前期准备

### 1. 注册必要的服务账号

- [x] **Supabase** (https://supabase.com) - 数据库服务
- [x] **Vercel** (https://vercel.com) 或 **Railway** (https://railway.app) - 后端部署
- [x] **Vercel** 或 **Netlify** (https://netlify.com) - 前端部署
- [ ] **阿里云** 或 **腾讯云** - 短信服务（可选）
- [ ] **七牛云** 或 **阿里云OSS** - 图片存储（可选）

### 2. 准备域名（可选但推荐）

- 前端域名：如 `www.heartland.com`
- API域名：如 `api.heartland.com`

---

## Supabase数据库配置

### 步骤1：创建Supabase项目

1. 访问 https://supabase.com 并登录
2. 点击 "New Project"
3. 填写项目信息：
   - Name: heartland-academy
   - Database Password: 设置一个强密码
   - Region: 选择离你最近的区域（如Singapore）
4. 等待项目创建完成（约2分钟）

### 步骤2：获取连接信息

1. 进入项目设置 (Settings > API)
2. 记录以下信息：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...`
   - **service_role key**: `eyJhbG...` (在Service role中)

### 步骤3：执行数据库脚本

1. 进入SQL编辑器 (SQL Editor)
2. 创建新查询
3. 复制并执行 `backend/config/supabase-schema.sql` 的全部内容
4. 等待执行完成（显示"Success"）
5. 再创建新查询，执行 `backend/config/supabase-functions.sql`

### 步骤4：配置Row Level Security (RLS)

确认RLS策略已正确创建：
1. 进入 Authentication > Policies
2. 检查每个表的策略是否存在
3. 如有问题，重新执行schema脚本

### 步骤5：添加测试数据（可选）

```sql
-- 创建测试课程
INSERT INTO courses (title, description, category, difficulty, is_published) VALUES
('情绪管理入门', '学习如何识别和管理自己的情绪', 'emotion', 'beginner', true),
('压力应对技巧', '掌握有效的压力缓解方法', 'stress', 'intermediate', true);

-- 创建测试咨询师
INSERT INTO counselors (name, title, specialties, bio, is_available) VALUES
('李心理', '国家二级心理咨询师', ARRAY['青少年心理', '情绪管理'], '拥有10年青少年心理咨询经验', true),
('王老师', '心理学硕士', ARRAY['学习压力', '人际关系'], '专注青少年成长问题', true);
```

---

## 后端部署

### 方案A：Vercel部署（推荐）

#### 步骤1：准备vercel.json配置

在 `backend/` 目录创建 `vercel.json`：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### 步骤2：部署到Vercel

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署（在backend目录下执行）
cd backend
vercel
```

#### 步骤3：配置环境变量

在Vercel控制台中：
1. 进入项目 > Settings > Environment Variables
2. 添加以下变量：
   - `SUPABASE_URL`: 你的Supabase URL
   - `SUPABASE_ANON_KEY`: Supabase anon key
   - `SUPABASE_SERVICE_KEY`: Supabase service role key
   - `JWT_SECRET`: 随机生成的密钥（至少32位）
   - `JWT_EXPIRE`: 7d
   - `NODE_ENV`: production
   - `FRONTEND_URL`: 你的前端域名

3. 重新部署：`vercel --prod`

### 方案B：Railway部署

#### 步骤1：连接GitHub

1. 将代码推送到GitHub仓库
2. 访问 https://railway.app
3. 点击 "New Project" > "Deploy from GitHub repo"
4. 选择你的仓库

#### 步骤2：配置

1. Root Directory: 设置为 `backend`
2. Start Command: `npm start`
3. 添加环境变量（同上）

#### 步骤3：部署

Railway会自动检测Node.js项目并部署。

### 验证后端部署

访问 `https://your-api-domain.com/health`，应该返回：

```json
{
  "status": "ok",
  "timestamp": "2024-01-20T10:00:00.000Z",
  "service": "心屿学院API",
  "version": "1.0.0"
}
```

---

## 前端部署

### 步骤1：更新前端配置

修改前端HTML文件中的API地址：

```javascript
// 将原来的
this.apiBase = window.location.hostname === 'localhost' ? 
    'http://localhost:3000/api' : '/api';

// 改为
this.apiBase = 'https://your-api-domain.com/api';
```

### 步骤2：使用Vercel部署前端

```bash
# 在项目根目录
vercel

# 选择配置
# ? Set up and deploy: Yes
# ? Which scope: 你的账号
# ? Link to existing project: No
# ? Project name: heartland-frontend
# ? In which directory is your code located: ./
```

### 步骤3：配置Vercel

创建 `vercel.json` 在项目根目录：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 方案B：Netlify部署

1. 将代码推送到GitHub
2. 在Netlify中导入项目
3. Build settings:
   - Build command: (留空)
   - Publish directory: `.`
4. 点击Deploy

---

## 域名和SSL配置

### 配置自定义域名

#### Vercel:
1. 进入项目 > Settings > Domains
2. 添加你的域名
3. 按照提示配置DNS记录

#### Netlify:
1. Domain settings > Add custom domain
2. 配置DNS

### SSL证书

Vercel和Netlify都会自动配置Let's Encrypt SSL证书，无需手动配置。

### DNS配置示例

假设你的域名是 `heartland.com`：

```
类型    名称          值
A      @            76.76.21.21 (Vercel IP)
CNAME  www          cname.vercel-dns.com
CNAME  api          your-backend.vercel.app
```

---

## 环境变量管理

### 生产环境变量清单

**后端必需变量：**
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_KEY=eyJhbG...
JWT_SECRET=your_32_char_random_string_here
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://www.heartland.com
```

**可选变量（短信服务）：**
```env
SMS_PROVIDER=aliyun
SMS_ACCESS_KEY=your_key
SMS_ACCESS_SECRET=your_secret
SMS_SIGN_NAME=心屿学院
SMS_TEMPLATE_CODE=SMS_123456789
```

### 生成JWT密钥

```bash
# 使用Node.js生成
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 或使用OpenSSL
openssl rand -hex 32
```

---

## 监控和维护

### 日志监控

#### Vercel:
- 访问项目 > Deployments > 选择部署 > Runtime Logs
- 查看实时日志和错误

#### Supabase:
- 进入 Database > Logs
- 监控数据库查询和错误

### 性能监控

推荐使用：
- **Sentry**: 错误追踪 (https://sentry.io)
- **LogRocket**: 用户会话记录
- **Google Analytics**: 用户行为分析

### 备份策略

#### 数据库备份:
1. Supabase自动每天备份
2. 手动备份：Database > Backups > Create backup

#### 代码备份:
- 使用Git版本控制
- 定期推送到GitHub

### 更新部署

```bash
# 更新后端
cd backend
git pull
vercel --prod

# 更新前端
git pull
vercel --prod
```

---

## 常见问题

### 1. CORS错误

**问题**: 前端无法访问API，提示CORS错误

**解决**:
- 确认后端环境变量 `FRONTEND_URL` 设置正确
- 检查前端是否使用HTTPS（生产环境必须）

### 2. 数据库连接失败

**问题**: API返回500错误，日志显示数据库连接失败

**解决**:
- 检查Supabase项目是否已暂停（免费版7天不活跃会暂停）
- 确认 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 配置正确
- 检查Supabase项目的网络限制设置

### 3. JWT验证失败

**问题**: 登录后其他接口返回401错误

**解决**:
- 确认前端正确存储和发送token
- 检查 `JWT_SECRET` 在所有环境中是否一致
- 确认token格式：`Authorization: Bearer <token>`

### 4. 图片上传失败

**问题**: 用户头像等图片无法上传

**解决**:
- 配置Supabase Storage或第三方OSS
- 更新API接口支持文件上传
- 检查文件大小限制

---

## 成本预估

### 免费方案（适合开发和小规模使用）

- **Supabase Free Tier**: 
  - 500MB 数据库存储
  - 1GB 文件存储
  - 50,000 月活用户
  
- **Vercel Free Tier**:
  - 100GB 带宽/月
  - 无限部署
  
- **总成本**: $0/月

### 付费方案（推荐生产环境）

- **Supabase Pro**: $25/月
  - 8GB 数据库
  - 100GB 文件存储
  - 100,000 月活用户
  
- **Vercel Pro**: $20/月
  - 1TB 带宽
  - 更好的性能
  
- **总成本**: ~$45/月

---

## 检查清单

部署完成后，确认以下项目：

- [ ] 后端健康检查接口正常
- [ ] 用户注册和登录功能正常
- [ ] 数据库RLS策略正确配置
- [ ] 前端可以正常调用API
- [ ] SSL证书已配置（HTTPS）
- [ ] 环境变量已正确设置
- [ ] 错误日志监控已配置
- [ ] 数据库备份策略已启用
- [ ] 测试所有核心功能

---

## 下一步

部署完成后，建议：

1. 配置监控和告警
2. 添加自动化测试
3. 设置CI/CD流程
4. 准备用户文档
5. 进行安全审计

需要帮助？请参考 [后端README](backend/README.md) 或联系技术支持。

