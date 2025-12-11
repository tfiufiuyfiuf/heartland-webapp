# API 配置说明

## 问题修复

已修复以下问题：
1. ✅ API 基础 URL 配置（添加了 `/api` 路径）
2. ✅ 登录方法调用方式
3. ✅ 错误处理改进（更好的网络错误提示）

## 后端 URL 配置

### 当前配置

在 `frontend/config.js` 文件中，后端 URL 已设置为：
```javascript
BASE_URL: 'https://heartland-backend.onrender.com/api'
```

### 如何确认您的 Render 后端 URL

1. 登录到 [Render Dashboard](https://dashboard.render.com/)
2. 找到您的后端服务（应该是 `heartland-backend` 或类似名称）
3. 查看服务详情，找到 **URL** 或 **Public URL**
4. 确保 URL 格式为：`https://your-app-name.onrender.com`
5. 在 `frontend/config.js` 中更新为：`https://your-app-name.onrender.com/api`

### 测试后端是否正常运行

在浏览器中访问以下 URL，应该看到类似这样的响应：

```
https://your-backend-url.onrender.com/health
```

正常响应应该是：
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "心屿学院API",
  "version": "1.0.0"
}
```

### 测试登录接口

在浏览器控制台或使用 curl 测试：

```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"13800138000","password":"test123"}'
```

### CORS 配置检查

确保后端的 CORS 配置包含您的前端域名：
- 前端地址：`https://heartland-webapp.vercel.app`
- 在 Render 的环境变量中设置：`FRONTEND_URL=https://heartland-webapp.vercel.app`

## 常见错误及解决方法

### 1. ERR_CONNECTION_CLOSED

**原因**：
- Render 服务未启动或已停止
- URL 配置错误
- 网络连接问题

**解决方法**：
1. 检查 Render Dashboard 中服务状态是否为 "Live"
2. 检查 URL 是否正确（包含 `https://` 和 `.onrender.com`）
3. 确保 URL 末尾有 `/api`（在 config.js 中）

### 2. 404 错误

**原因**：
- API 路径错误（缺少 `/api`）
- 后端路由配置错误

**解决方法**：
1. 确保 `config.js` 中的 BASE_URL 以 `/api` 结尾
2. 检查后端路由是否正确配置

### 3. CORS 错误

**原因**：
- 后端 CORS 配置未包含前端域名

**解决方法**：
1. 在 Render 环境变量中设置 `FRONTEND_URL`
2. 或在后端代码中允许所有来源（开发阶段）

## 更新配置步骤

1. 打开 `heartland-webapp/frontend/config.js`
2. 找到 `BASE_URL` 配置
3. 更新为您的实际 Render 后端 URL
4. 保存文件
5. 重新部署前端（如果使用 Vercel，会自动部署）

## 验证修复

修复后，请测试：
1. ✅ 登录功能
2. ✅ 注册功能
3. ✅ 验证码发送（如果有）

如果仍有问题，请检查浏览器控制台的完整错误信息。


