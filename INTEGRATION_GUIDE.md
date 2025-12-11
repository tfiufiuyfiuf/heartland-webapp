# 心屿学院 - 前端API集成指南

这个指南将帮助你一步步将前端连接到真实的后端API。

## 📋 准备工作

确保你已经：
- ✅ 后端服务器正在运行（`npm run dev`）
- ✅ 可以访问 http://localhost:3000/health
- ✅ 前端服务器正在运行（`npx http-server -p 5500`）

---

## 🎯 第一步：添加API配置文件

### 1. 在HTML中引入配置

打开 `index是个五.html`，找到 `<head>` 部分，在 `</head>` 标签**之前**添加：

```html
<!-- API配置和封装 -->
<script src="frontend/config.js"></script>
<script src="frontend/api.js"></script>
```

**位置参考：**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>心屿学院 - 青少年心理健康学习平台</title>
    <link rel="stylesheet" href="...">
    
    <!-- 在这里添加 ↓ -->
    <script src="frontend/config.js"></script>
    <script src="frontend/api.js"></script>
</head>
```

---

## 🔧 第二步：替换UserManager类

### 1. 找到UserManager类

在 `index是个五.html` 中按 `Ctrl+F` 搜索：
```
class UserManager {
```

应该在大约 **第6333行**。

### 2. 选中整个类

从 `class UserManager {` 开始，一直选到对应的 `}` 结束（大约到第6483行）。

### 3. 替换为新代码

打开 `frontend/api-integration-patch.js`，复制 "替换 UserManager 类" 部分的代码，粘贴替换。

**或者直接复制这段：**

```javascript
class UserManager {
    constructor() {
        this.currentUser = null;
        this.token = localStorage.getItem('heartland_token');
    }
    
    async login(phone, password) {
        try {
            const result = await api.login(phone, password);
            
            if (result.success) {
                this.currentUser = result.data.user;
                this.token = result.data.token;
                api.setToken(this.token);
                localStorage.setItem('heartland_token', this.token);
                localStorage.setItem('heartland_user', JSON.stringify(result.data.user));
                this.updateUI();
                return true;
            }
            
            showNotification('登录失败: ' + result.message, 'error');
            return false;
        } catch (error) {
            console.error('登录失败:', error);
            showNotification('登录失败: ' + (error.message || '网络错误'), 'error');
            return false;
        }
    }
    
    async register(phone, username, password, verificationCode) {
        try {
            const result = await api.register({
                phone,
                username,
                password,
                verificationCode
            });
            
            if (result.success) {
                this.currentUser = result.data.user;
                this.token = result.data.token;
                api.setToken(this.token);
                localStorage.setItem('heartland_token', this.token);
                localStorage.setItem('heartland_user', JSON.stringify(result.data.user));
                this.updateUI();
                return { success: true, message: result.message };
            }
            
            return { success: false, message: result.message || '注册失败' };
        } catch (error) {
            console.error('注册失败:', error);
            return { success: false, message: error.message || '注册失败，请稍后重试' };
        }
    }
    
    async checkLoginStatus() {
        if (!this.token) {
            return false;
        }
        
        try {
            const result = await api.verifyToken();
            if (result.success) {
                this.currentUser = result.data.user;
                localStorage.setItem('heartland_user', JSON.stringify(result.data.user));
                this.updateUI();
                return true;
            }
        } catch (error) {
            console.error('验证登录状态失败:', error);
            this.logout();
        }
        
        return false;
    }
    
    logout() {
        this.currentUser = null;
        this.token = null;
        api.setToken(null);
        localStorage.removeItem('heartland_token');
        localStorage.removeItem('heartland_user');
        window.location.reload();
    }
    
    getRandomHouse() {
        const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
        return houses[Math.floor(Math.random() * houses.length)];
    }
    
    updateUI() {
        if (this.currentUser) {
            const userProfile = this.getUserProfile();
            const username = userProfile.username || this.currentUser.username || '朋友';
            const avatar = userProfile.avatar || this.currentUser.avatar || '👤';
            
            const welcomeMessages = [
                `欢迎回来，${username}！今天也要好好照顾自己哦 🌸`,
                `${username}，很高兴见到你！你比想象中更坚强 💪`,
                `你好，${username}！慢慢来，你已经很棒了 ✨`,
                `${username}，欢迎回来！每一步都是成长 🌟`,
                `你好，${username}！今天也要给自己一些温柔 💕`
            ];
            const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
            
            const welcomeElement = document.getElementById('welcome-user');
            if (welcomeElement) {
                welcomeElement.textContent = randomWelcome;
            }
            
            const focusTimeElement = document.getElementById('focus-time');
            if (focusTimeElement) {
                focusTimeElement.textContent = Math.floor((this.currentUser.focus_time || 0) / 60);
            }
            
            const avatarIcon = document.getElementById('user-avatar-icon');
            if (avatarIcon) {
                avatarIcon.textContent = avatar;
            }
            
            const houseBadge = document.querySelector('.house-badge');
            if (houseBadge) {
                const houseIcon = houseBadge.querySelector('.house-icon');
                const houseName = houseBadge.querySelector('span');
                
                if (houseIcon && houseName) {
                    const house = this.currentUser.house || 'gryffindor';
                    houseIcon.textContent = house.charAt(0).toUpperCase();
                    houseIcon.style.background = this.getHouseColor(house);
                    houseName.textContent = this.getHouseName(house);
                }
            }
            
            const authModal = document.getElementById('auth-modal');
            if (authModal) {
                authModal.style.display = 'none';
            }
        }
    }

    getUserProfile() {
        const profile = localStorage.getItem('user_profile');
        if (profile) {
            return JSON.parse(profile);
        }
        return { username: this.currentUser?.username, avatar: '👤' };
    }

    saveUserProfile(profile) {
        localStorage.setItem('user_profile', JSON.stringify(profile));
        if (this.currentUser) {
            this.currentUser.username = profile.username;
            this.updateUI();
        }
    }
    
    getHouseColor(house) {
        const colors = {
            gryffindor: '#740001',
            slytherin: '#1A472A',
            ravenclaw: '#0E1A40',
            hufflepuff: '#FFDB00',
            none: '#999999'
        };
        return colors[house] || '#740001';
    }
    
    getHouseName(house) {
        const names = {
            gryffindor: '格兰芬多',
            slytherin: '斯莱特林',
            ravenclaw: '拉文克劳',
            hufflepuff: '赫奇帕奇',
            none: '未分院'
        };
        return names[house] || '格兰芬多';
    }
}
```

---

## 🔑 第三步：修改登录注册事件

### 1. 修改登录表单

搜索 `document.getElementById('login-form')` 或 `login-form`

找到登录表单的提交事件监听器，替换为：

```javascript
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('login-phone').value;
    const password = document.getElementById('login-password').value;
    
    if (!phone || !password) {
        showNotification('请输入手机号和密码', 'error');
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '登录中...';
    submitBtn.disabled = true;
    
    try {
        const success = await userManager.login(phone, password);
        
        if (success) {
            showNotification('登录成功！', 'success');
        }
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
```

### 2. 修改注册表单

搜索 `document.getElementById('register-form')` 或 `register-form`

替换为：

```javascript
document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('register-phone').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const verificationCode = document.getElementById('verification-code').value;
    
    if (!phone || !username || !password || !verificationCode) {
        showNotification('请填写完整信息', 'error');
        return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        showNotification('请输入正确的手机号', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('密码长度至少为6位', 'error');
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '注册中...';
    submitBtn.disabled = true;
    
    try {
        const result = await userManager.register(phone, username, password, verificationCode);
        
        if (result.success) {
            showNotification('注册成功！', 'success');
        } else {
            showNotification(result.message || '注册失败', 'error');
        }
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
```

### 3. 修改发送验证码

搜索 `send-code-btn` 或 `获取验证码`

替换为：

```javascript
document.getElementById('send-code-btn').addEventListener('click', async function() {
    const phone = document.getElementById('register-phone').value;
    
    if (!phone) {
        showNotification('请先输入手机号', 'error');
        return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        showNotification('请输入正确的手机号', 'error');
        return;
    }
    
    const btn = this;
    const originalText = btn.textContent;
    btn.textContent = '发送中...';
    btn.disabled = true;
    
    try {
        const result = await api.sendCode(phone);
        
        if (result.success) {
            showNotification('验证码已发送（开发环境：123456）', 'success');
            
            let countdown = 60;
            const timer = setInterval(() => {
                countdown--;
                btn.textContent = `${countdown}秒后重试`;
                
                if (countdown <= 0) {
                    clearInterval(timer);
                    btn.disabled = false;
                    btn.textContent = originalText;
                }
            }, 1000);
        } else {
            btn.textContent = originalText;
            btn.disabled = false;
            showNotification('发送失败: ' + result.message, 'error');
        }
    } catch (error) {
        btn.textContent = originalText;
        btn.disabled = false;
        showNotification('发送失败: ' + (error.message || '网络错误'), 'error');
    }
});
```

---

## ✅ 第四步：测试

### 1. 保存文件

保存 `index是个五.html`

### 2. 刷新浏览器

按 `Ctrl+F5` 强制刷新页面

### 3. 打开浏览器控制台

按 `F12`，切换到 Console 标签

### 4. 测试注册

- 手机号：`13800138000`
- 用户名：`测试用户`
- 点击"获取验证码"
- 验证码：`123456`
- 密码：`test123`
- 点击"注册"

**期望结果：**
- Console中显示API请求
- 注册成功提示
- 自动登录并跳转到主界面

### 5. 测试登录

- 使用刚才注册的账号登录
- 应该能成功登录

---

## 🐛 常见问题

### 问题1：提示"api is not defined"

**原因：** 没有正确引入 `config.js` 和 `api.js`

**解决：**
1. 检查 `<head>` 中是否添加了两个 `<script>` 标签
2. 检查文件路径是否正确
3. 按 `F12` 查看 Network 标签，确认文件已加载

### 问题2：提示"Network Error"

**原因：** 后端没有运行

**解决：**
1. 确认后端正在运行：`cd backend && npm run dev`
2. 访问 http://localhost:3000/health 确认后端正常
3. 检查 `frontend/config.js` 中的API地址

### 问题3：注册后没有反应

**原因：** 可能是数据库问题

**解决：**
1. 检查后端控制台的错误信息
2. 确认Supabase数据库表已创建
3. 检查浏览器Console的错误信息

---

## 📊 验证成功的标志

✅ 浏览器Console没有红色错误  
✅ Network标签显示API请求返回200  
✅ 注册成功后能看到用户信息  
✅ 登录成功后能看到主界面  
✅ 用户名和头像正确显示  

---

## 🎉 完成！

恭喜！你已经成功将前端连接到后端API了！

### 下一步

现在你可以：
1. 测试其他功能（情绪记录、课程等）
2. 添加更多内容
3. 准备部署上线

需要帮助随时告诉我！💪
























