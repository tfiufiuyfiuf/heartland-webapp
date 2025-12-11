/**
 * 心屿学院 - API集成补丁
 * 
 * 使用说明：
 * 1. 在 index是个五.html 的 <head> 部分，找到最后一个 <link> 标签后添加：
 *    <script src="frontend/config.js"></script>
 *    <script src="frontend/api.js"></script>
 * 
 * 2. 在 <script> 标签内，找到 "class UserManager" 并替换为下面的代码
 * 3. 找到登录、注册相关的事件监听器并替换为下面的代码
 */

// ============= 替换 UserManager 类 =============
// 找到 "class UserManager {" 开始到 "}" 结束的整个类定义
// 替换为以下代码：

class UserManager {
    constructor() {
        this.currentUser = null;
        this.token = localStorage.getItem('heartland_token');
        // 不再需要 apiBase，使用全局的 api 对象
    }
    
    // 登录方法 - 使用真实API
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
    
    // 注册方法 - 使用真实API
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
    
    // 验证登录状态
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
    
    // 登出
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
            // 获取用户信息
            const userProfile = this.getUserProfile();
            const username = userProfile.username || this.currentUser.username || '朋友';
            const avatar = userProfile.avatar || this.currentUser.avatar || '👤';
            
            // 更新欢迎语（带治愈话语）
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
            
            // 更新专注时长
            const focusTimeElement = document.getElementById('focus-time');
            if (focusTimeElement) {
                focusTimeElement.textContent = Math.floor((this.currentUser.focus_time || 0) / 60);
            }
            
            // 更新头像
            const avatarIcon = document.getElementById('user-avatar-icon');
            if (avatarIcon) {
                avatarIcon.textContent = avatar;
            }
            
            // 更新学院徽章
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
            
            // 关闭登录模态框
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

// ============= 登录表单事件监听器 =============
// 找到登录表单的提交事件，替换为：

document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('login-phone').value;
    const password = document.getElementById('login-password').value;
    
    if (!phone || !password) {
        showNotification('请输入手机号和密码', 'error');
        return;
    }
    
    // 显示加载状态
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '登录中...';
    submitBtn.disabled = true;
    
    try {
        const success = await userManager.login(phone, password);
        
        if (success) {
            showNotification('登录成功！', 'success');
            // 登录成功后的操作已在 updateUI 中处理
        }
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ============= 注册表单事件监听器 =============
// 找到注册表单的提交事件，替换为：

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
    
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        showNotification('请输入正确的手机号', 'error');
        return;
    }
    
    // 验证密码长度
    if (password.length < 6) {
        showNotification('密码长度至少为6位', 'error');
        return;
    }
    
    // 显示加载状态
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '注册中...';
    submitBtn.disabled = true;
    
    try {
        const result = await userManager.register(phone, username, password, verificationCode);
        
        if (result.success) {
            showNotification('注册成功！', 'success');
            // 注册成功后的操作已在 updateUI 中处理
        } else {
            showNotification(result.message || '注册失败', 'error');
        }
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ============= 发送验证码按钮 =============
// 找到发送验证码按钮的点击事件，替换为：

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
    
    // 显示加载状态
    const btn = this;
    const originalText = btn.textContent;
    btn.textContent = '发送中...';
    btn.disabled = true;
    
    try {
        const result = await api.sendCode(phone);
        
        if (result.success) {
            showNotification('验证码已发送（开发环境固定：123456）', 'success');
            
            // 开始倒计时
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

// ============= 页面加载时检查登录状态 =============
// 在 DOMContentLoaded 事件中添加：

window.addEventListener('DOMContentLoaded', async function() {
    // 创建用户管理器实例
    const userManager = new UserManager();
    
    // 检查登录状态
    if (userManager.token) {
        await userManager.checkLoginStatus();
    }
    
    // 将 userManager 设置为全局变量，方便其他地方使用
    window.userManager = userManager;
});

// ============= 登出功能 =============
// 找到登出按钮的点击事件，替换为：

// 假设你有一个登出按钮，ID为 'logout-btn'
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        if (confirm('确定要退出登录吗？')) {
            userManager.logout();
        }
    });
}

