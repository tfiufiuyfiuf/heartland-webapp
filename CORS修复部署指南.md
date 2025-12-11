# CORS 修复部署指南

## 问题描述
您的前端 (https://heartland-webapp.vercel.app) 无法访问后端 API (https://heartland-backend.vercel.app)，因为 CORS 配置问题。

## 已修复的问题

### 1. 修复了 `backend/vercel.json`
- 添加了正确的 Vercel 配置
- 在路由级别添加了 CORS 头部
- 配置了正确的构建和路由规则

### 2. 修复了 `backend/api/index.js`
- 正确导出 Express app 给 Vercel serverless 函数使用

### 3. 清理了重复代码
- 清理了 `backend/server.js` 中的重复代码
- 清理了 `backend/api/auth/login.js` 中的重复代码
- 清理了 `backend/api/auth/register.js` 中的重复代码

## 部署步骤

### 方法 1: 使用 Vercel CLI（推荐）

1. **打开命令提示符（CMD）或 PowerShell**

2. **导航到后端目录**
   ```bash
   cd "C:\Users\hong\Desktop\新建文件夹 (4)\backend"
   ```

3. **部署到 Vercel**
   ```bash
   vercel --prod
   ```

4. **等待部署完成**
   - 部署成功后，您会看到部署的 URL

### 方法 2: 使用 Git + Vercel 自动部署

1. **提交更改到 Git**
   ```bash
   cd "C:\Users\hong\Desktop\新建文件夹 (4)\backend"
   git add .
   git commit -m "修复 CORS 配置问题"
   git push
   ```

2. **Vercel 会自动检测到更改并部署**
   - 访问 https://vercel.com/dashboard 查看部署状态

### 方法 3: 使用 Vercel Dashboard

1. **访问 Vercel Dashboard**
   - 打开 https://vercel.com/dashboard

2. **找到您的 backend 项目**
   - 点击项目名称

3. **点击 "Redeploy"**
   - 选择最新的部署
   - 点击右上角的三个点 (...) 菜单
   - 选择 "Redeploy"

## 验证修复

部署完成后，请测试以下内容：

1. **测试健康检查**
   ```bash
   curl https://heartland-backend.vercel.app/api/health
   ```

2. **测试登录接口（使用浏览器开发者工具）**
   - 打开 https://heartland-webapp.vercel.app/student-login.html
   - 打开浏览器开发者工具（F12）
   - 尝试登录
   - 检查网络标签，应该不再有 CORS 错误

3. **检查响应头**
   - 在网络标签中，点击登录请求
   - 查看响应头，应该包含：
     - `Access-Control-Allow-Origin: *`
     - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH`
     - `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin`

## 如果仍有问题

### 检查 1: 清除浏览器缓存
```
1. 按 Ctrl + Shift + Delete
2. 选择 "缓存的图像和文件"
3. 清除数据
4. 刷新页面（Ctrl + F5）
```

### 检查 2: 验证 Vercel 环境变量
确保在 Vercel Dashboard 中设置了以下环境变量：
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_SERVICE_KEY`
- `JWT_SECRET`

### 检查 3: 查看 Vercel 日志
1. 访问 https://vercel.com/dashboard
2. 点击您的后端项目
3. 点击 "Deployments"
4. 点击最新部署
5. 查看 "Functions" 日志查找错误

## 主要修改内容

### backend/vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js",
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept, Origin",
        "Access-Control-Max-Age": "86400"
      }
    }
  ]
}
```

### backend/api/index.js
```javascript
// Vercel Serverless Function 入口文件
import app from '../server.js';

export default app;
```

## 联系支持

如果按照以上步骤操作后仍然遇到问题，请提供：
1. 浏览器开发者工具中的完整错误信息
2. Vercel 部署日志
3. 网络请求的详细信息（Headers、Response）

---

**修复时间**: 2025-11-23
**状态**: ✅ 代码已修复，等待部署



