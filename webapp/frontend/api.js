// 心屿学院 - API请求封装

class API {
  constructor() {
    this.baseURL = CONFIG.API.BASE_URL;
    this.timeout = CONFIG.API.TIMEOUT;
    this.token = localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
  }

  // 获取请求头
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // 设置Token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
    }
  }

  // 通用请求方法
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: options.method || 'GET',
      headers: this.getHeaders(options.auth !== false),
      ...options
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || CONFIG.MESSAGES.ERROR.SERVER_ERROR,
          data
        };
      }

      return data;
    } catch (error) {
      if (error.status === 401) {
        // Token过期，清除登录状态
        this.setToken(null);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        window.location.reload();
      }

      if (CONFIG.DEBUG) {
        console.error('API请求错误:', error);
      }

      throw error;
    }
  }

  // GET请求
  get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST请求
  post(endpoint, body, auth = true) {
    return this.request(endpoint, {
      method: 'POST',
      body,
      auth
    });
  }

  // PUT请求
  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body
    });
  }

  // DELETE请求
  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // ========== 认证相关 ==========

  // 发送验证码
  sendCode(phone) {
    return this.post('/auth/send-code', { phone }, false);
  }

  // 用户注册
  register(data) {
    return this.post('/auth/register', data, false);
  }

  // 用户登录
  login(phone, password) {
    return this.post('/auth/login', { phone, password }, false);
  }

  // 验证Token
  verifyToken() {
    return this.get('/auth/verify');
  }

  // ========== 用户相关 ==========

  // 获取当前用户信息
  getCurrentUser() {
    return this.get('/users/me');
  }

  // 更新用户信息
  updateUser(data) {
    return this.put('/users/me', data);
  }

  // 更新个人资料
  updateProfile(data) {
    return this.put('/users/profile', data);
  }

  // 获取用户统计
  getUserStats() {
    return this.get('/users/stats');
  }

  // 记录专注时长
  recordFocus(data) {
    return this.post('/users/focus', data);
  }

  // 获取通知列表
  getNotifications(params = {}) {
    return this.get('/users/notifications', params);
  }

  // 标记通知已读
  markNotificationRead(id) {
    return this.put(`/users/notifications/${id}/read`);
  }

  // 标记所有通知已读
  markAllNotificationsRead() {
    return this.put('/users/notifications/read-all');
  }

  // ========== 情绪追踪 ==========

  // 创建情绪记录
  createMoodRecord(data) {
    return this.post('/mood', data);
  }

  // 获取情绪记录列表
  getMoodRecords(params = {}) {
    return this.get('/mood', params);
  }

  // 获取情绪统计
  getMoodStats(days = 7) {
    return this.get('/mood/stats', { days });
  }

  // 删除情绪记录
  deleteMoodRecord(id) {
    return this.delete(`/mood/${id}`);
  }

  // ========== 课程相关 ==========

  // 获取课程列表
  getCourses(params = {}) {
    return this.get('/courses', params);
  }

  // 获取课程详情
  getCourse(id) {
    return this.get(`/courses/${id}`);
  }

  // 更新学习进度
  updateCourseProgress(courseId, chapterId, data) {
    return this.post(`/courses/${courseId}/chapters/${chapterId}/progress`, data);
  }

  // 获取我的学习进度
  getMyProgress() {
    return this.get('/courses/my/progress');
  }

  // ========== 社区相关 ==========

  // 获取帖子列表
  getPosts(params = {}) {
    return this.get('/posts', params);
  }

  // 获取帖子详情
  getPost(id) {
    return this.get(`/posts/${id}`);
  }

  // 发布帖子
  createPost(data) {
    return this.post('/posts', data);
  }

  // 评论帖子
  commentPost(postId, data) {
    return this.post(`/posts/${postId}/comments`, data);
  }

  // 点赞/取消点赞
  toggleLike(postId) {
    return this.post(`/posts/${postId}/like`);
  }

  // 删除帖子
  deletePost(id) {
    return this.delete(`/posts/${id}`);
  }

  // ========== 树洞相关 ==========

  // 获取树洞消息列表
  getTreeholeMessages(params = {}) {
    return this.get('/treehole', params);
  }

  // 获取树洞消息详情
  getTreeholeMessage(id) {
    return this.get(`/treehole/${id}`);
  }

  // 发送树洞消息
  createTreeholeMessage(data) {
    return this.post('/treehole', data);
  }

  // 回复树洞消息
  replyTreeholeMessage(id, data) {
    return this.post(`/treehole/${id}/replies`, data);
  }

  // ========== 预约咨询 ==========

  // 获取咨询师列表
  getCounselors() {
    return this.get('/appointments/counselors');
  }

  // 获取咨询师详情
  getCounselor(id) {
    return this.get(`/appointments/counselors/${id}`);
  }

  // 创建预约
  createAppointment(data) {
    return this.post('/appointments', data);
  }

  // 获取我的预约列表
  getMyAppointments(params = {}) {
    return this.get('/appointments/my', params);
  }

  // 取消预约
  cancelAppointment(id) {
    return this.put(`/appointments/${id}/cancel`);
  }
}

// 创建全局API实例
const api = new API();

// 导出API实例
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
}

