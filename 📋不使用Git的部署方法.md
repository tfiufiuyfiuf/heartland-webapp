# 📋 不使用 Git 的部署方法

如果您不想使用 Git，可以直接在 Render 中手动更新文件。

## 方法 1：直接在 Render 中更新代码

### 步骤 1：下载修改后的文件

修改后的文件：
- `backend/server.js` - 已添加启动代码
- `backend/Procfile` - 新创建的文件

### 步骤 2：在 Render 中更新

1. **登录 Render Dashboard**
   - 进入 `heartland-backend` 服务

2. **使用 Shell 更新文件**
   - 点击左侧 **"Shell"**
   - 这会打开一个终端窗口

3. **编辑 server.js**
   ```bash
   # 进入项目目录
   cd /opt/render/project/src/backend
   
   # 备份原文件（可选）
   cp server.js server.js.backup
   
   # 编辑文件（使用 nano 编辑器）
   nano server.js
   ```

4. **添加启动代码**
   - 在文件末尾添加以下代码：
   ```javascript
   // ============= 启动服务器 =============

   // 启动前测试数据库连接
   async function startServer() {
     try {
       console.log('正在连接数据库...');
       const dbConnected = await testConnection();
       
       if (!dbConnected) {
         console.error('X 数据库连接失败,请检查配置');
         process.exit(1);
       }

       // 启动服务器
       app.listen(PORT, () => {
         console.log(`✓ 服务器启动成功`);
         console.log(`✓ 监听端口: ${PORT}`);
         console.log(`✓ 环境: ${process.env.NODE_ENV || 'development'}`);
         console.log(`✓ 健康检查: http://localhost:${PORT}/health`);
       });
     } catch (error) {
       console.error('启动服务器失败:', error);
       process.exit(1);
     }
   }

   // 启动服务器
   startServer();

   // 导出 app（用于 Vercel 或其他平台）
   export default app;
   ```

5. **创建 Procfile**
   ```bash
   echo "web: npm start" > Procfile
   ```

6. **保存并重启**
   - 按 `Ctrl+X`，然后 `Y`，然后 `Enter` 保存
   - 点击服务页面的 "Restart"

## 方法 2：重新连接 GitHub 并推送代码

如果您的 Render 服务原本是从 GitHub 连接的：

1. **在本地使用 Git 提交代码**（按照 Git 指南）
2. **推送到 GitHub**
3. **Render 会自动部署**（如果已连接）

或者：

1. **在 GitHub 网页上直接编辑文件**
   - 进入您的仓库
   - 点击 `backend/server.js`
   - 点击编辑按钮
   - 添加启动代码
   - 提交更改

2. **Render 会自动检测并部署**

## 推荐方案

**最简单的方式**：
1. ✅ 使用 Git 提交代码到 GitHub
2. ✅ Render 自动部署

**如果不想用 Git**：
1. ✅ 在 Render Shell 中直接编辑文件
2. ✅ 重启服务

## 重要提醒

无论使用哪种方法，**必须确保**：

1. ✅ 环境变量已设置（在 Render Settings → Environment）
2. ✅ Supabase 配置正确
3. ✅ 文件保存后重启服务


