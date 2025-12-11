# 📋 Render 服务检查步骤

## 第一步：进入项目详情

1. **点击项目卡片**
   - 在 Dashboard 概览页面，找到 "My project" 卡片
   - 点击进入项目详情

## 第二步：检查服务状态

在项目详情页面，您会看到：

### 如果看到服务列表：
1. **找到后端服务**（可能是 `heartland-backend` 或类似的名称）
2. **检查服务状态**：
   - ✅ **绿色 "Live"** = 服务正在运行
   - ❌ **红色 "Stopped"** = 服务已停止
   - ⏳ **黄色 "Starting"** = 服务正在启动
   - ⚠️ **灰色 "Paused"** = 服务已暂停

### 如果状态是 "Stopped" 或 "Paused"：
需要重启服务，**不需要重新部署**！

## 第三步：重启服务（如果已停止）

### 方法 1：通过 Dashboard 重启
1. 点击服务名称进入服务详情
2. 点击右上角的 **"..."** 菜单
3. 选择 **"Restart"** 或 **"Resume"**

### 方法 2：通过服务详情页
1. 在服务详情页面
2. 找到 **"Manual Deploy"** 按钮
3. 点击 **"Deploy latest commit"**

## 第四步：获取 Public URL

在服务详情页面：

1. **查找 "Public URL" 或 "URL"**
   - 通常在页面顶部或设置中
   - 格式：`https://xxx.onrender.com`

2. **复制这个 URL**

3. **测试后端**
   - 在浏览器访问：`https://您的URL.onrender.com/health`
   - 应该返回 JSON 响应

## 第五步：更新前端配置（如果需要）

如果您的 Render URL 与配置文件中的不同：

1. 打开：`heartland-webapp/frontend/config.js`
2. 找到第 16 行：
   ```javascript
   BASE_URL: 'https://heartland-backend.onrender.com/api',
   ```
3. 更新为您的实际 URL（确保以 `/api` 结尾）

## 常见情况

### ✅ 情况 1：服务状态是 "Live"
- 服务正常运行
- 直接复制 Public URL
- 测试 `/health` 端点
- 更新前端配置（如果需要）

### ⚠️ 情况 2：服务状态是 "Stopped"
- 点击 "Restart" 重启服务
- 等待 1-2 分钟服务启动
- 然后按照情况 1 操作

### ⏳ 情况 3：服务状态是 "Starting"
- 等待 1-2 分钟
- 刷新页面查看状态
- 状态变为 "Live" 后继续

### ❌ 情况 4：看不到服务
- 可能需要在项目下创建新服务
- 或者服务在不同项目中
- 检查左侧 "Projects" 下是否有其他项目

## 快速检查清单

- [ ] 进入项目详情
- [ ] 找到后端服务
- [ ] 检查服务状态（Live/Stopped/Starting）
- [ ] 如果停止，点击 Restart
- [ ] 复制 Public URL
- [ ] 测试 `/health` 端点
- [ ] 更新前端 config.js（如果 URL 不同）
- [ ] 清除浏览器缓存
- [ ] 重新测试登录

## 重要提示

**不需要重新部署！** 只需要：
- 确认服务状态
- 如果停止就重启
- 确认 URL 配置正确

服务已经在 Render 上运行，换电脑不影响服务器状态。


