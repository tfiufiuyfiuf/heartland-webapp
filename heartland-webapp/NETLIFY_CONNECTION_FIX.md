# 🔧 Netlify 连接问题修复指南

## 问题：ERR_CONNECTION_CLOSED

这个错误通常是因为 Netlify 的免费实例在空闲时会自动休眠（spin down）。

---

## ✅ 解决方案

### 方法 1：唤醒 Netlify 实例（推荐）

1. **访问 Netlify 项目页面**
   - 登录：https://app.netlify.com/
   - 找到项目：`delicate-taiyaki-0893e7`

2. **手动触发部署**
   - 点击 "Deploys" 标签
   - 点击 "Trigger deploy" 按钮
   - 选择 "Deploy site"
   - 等待 1-2 分钟

3. **重新访问网站**
   - 等待部署完成后，刷新浏览器
   - 访问：`https://delicate-taiyaki-0893e7.netlify.app/student-login.html`

---

### 方法 2：检查 Netlify 部署状态

1. **在 Netlify Dashboard 中**
   - 查看项目状态
   - 如果显示 "Published"，说明部署正常
   - 如果显示其他状态，可能需要重新部署

2. **查看部署日志**
   - 点击最新的部署
   - 查看是否有错误信息

---

### 方法 3：重新使用 Netlify Drop（如果方法1不行）

1. **访问 Netlify Drop**
   - 打开：https://app.netlify.com/drop

2. **重新拖拽文件夹**
   - 将 `heartland-webapp` 文件夹拖拽到页面上
   - 等待部署完成

3. **获取新域名**
   - 部署完成后会显示新域名
   - 使用新域名访问

---

## 🔍 诊断步骤

### 1. 检查网站是否真的无法访问

尝试：
- 清除浏览器缓存（`Ctrl + Shift + Delete`）
- 使用无痕模式（`Ctrl + Shift + N`）
- 尝试访问：`https://delicate-taiyaki-0893e7.netlify.app/`（不带路径）

### 2. 检查 Netlify 状态

在 Netlify Dashboard 中：
- 查看项目是否显示为 "Published"
- 查看最新部署是否成功

### 3. 检查网络连接

- 尝试访问其他网站，确认网络正常
- 尝试使用手机热点，排除网络问题

---

## 💡 预防措施

### 升级到付费计划（可选）

Netlify 的免费计划会在空闲时休眠，付费计划不会。

### 使用 Keep-Alive 服务（免费）

可以使用第三方服务定期访问你的网站，保持实例活跃：
- UptimeRobot（免费）
- Pingdom（免费版）

---

## 🚀 立即操作

**最快的方法：**
1. 登录 Netlify
2. 找到项目
3. 点击 "Trigger deploy"
4. 等待 1-2 分钟
5. 重新访问网站

