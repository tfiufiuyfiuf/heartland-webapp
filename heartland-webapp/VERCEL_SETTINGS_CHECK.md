# 🔍 Vercel 项目设置检查清单

## ⚠️ 重要：必须检查这些设置

### 1. 检查 Root Directory（根目录）

1. 登录 Vercel：https://vercel.com/dashboard
2. 找到你的项目：`heartland-webapp`
3. 点击项目进入设置
4. 点击 **Settings** 标签
5. 找到 **Root Directory** 设置
6. **必须设置为空** 或 **留空**（不要填写任何路径）

   ❌ 错误示例：
   - `heartland-webapp`
   - `./heartland-webapp`
   - `frontend`

   ✅ 正确设置：
   - **留空**（什么都不填）

### 2. 检查 Framework Preset（框架预设）

1. 在同一个 Settings 页面
2. 找到 **Framework Preset**
3. 应该设置为：**Other** 或 **None**
4. 如果不是，请改为 **Other**

### 3. 检查 Build Settings（构建设置）

1. 在 Settings 页面找到 **Build & Development Settings**
2. **Build Command**：应该**留空**或删除
3. **Output Directory**：应该**留空**或删除
4. **Install Command**：可以留空

### 4. 手动触发重新部署

1. 点击 **Deployments** 标签
2. 找到最新的部署（应该显示 "Building" 或 "Ready"）
3. 如果显示 "Error"，点击 **Redeploy** 按钮
4. 或者点击右上角的 **...** 菜单 > **Redeploy**

### 5. 等待部署完成

- 部署通常需要 1-2 分钟
- 看到绿色的 "Ready" 状态后，再测试

---

## 🧪 测试步骤

### 1. 清除浏览器缓存
- 按 `Ctrl + Shift + Delete`
- 选择"全部时间"
- 清除所有缓存

### 2. 使用无痕模式
- 按 `Ctrl + Shift + N`（Chrome）
- 访问：`https://heartland-webapp-29df.vercel.app/student-login.html`

### 3. 检查文件是否可访问
尝试直接访问这些文件：
- `https://heartland-webapp-29df.vercel.app/index.html`
- `https://heartland-webapp-29df.vercel.app/student-login.html`
- `https://heartland-webapp-29df.vercel.app/frontend/config.js`
- `https://heartland-webapp-29df.vercel.app/frontend/api.js`

如果这些文件都能访问，说明部署成功！

---

## 🚨 如果还是 404

### 方案 A：重新连接 GitHub 仓库

1. 在 Vercel 项目设置中
2. 找到 **Git** 设置
3. 点击 **Disconnect**
4. 然后点击 **Connect Git Repository**
5. 重新选择你的仓库：`tfiufiuyfiuf/heartland-webapp`
6. 确保 **Root Directory** 留空
7. 点击 **Deploy**

### 方案 B：检查 GitHub 仓库文件

访问你的 GitHub 仓库：
```
https://github.com/tfiufiuyfiuf/heartland-webapp
```

确认这些文件存在：
- ✅ `index.html`
- ✅ `student-login.html`
- ✅ `frontend/config.js`
- ✅ `frontend/api.js`
- ✅ `vercel.json`
- ✅ `package.json`

如果文件都在，但 Vercel 还是 404，可能是 Vercel 缓存问题。

### 方案 C：删除并重新创建项目

如果以上都不行：
1. 在 Vercel 中删除当前项目
2. 重新导入 GitHub 仓库
3. **重要**：Root Directory 必须留空
4. 部署

---

## 📝 当前配置

- ✅ `vercel.json`：已简化为 `{"version": 2}`
- ✅ `package.json`：已配置为静态站点
- ✅ 所有 HTML 文件的脚本路径已修复
- ✅ `.vercelignore`：已配置忽略 backend 目录

---

**请先检查 Root Directory 设置，这是最常见的 404 原因！**

