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
  login(data) {
    return this.post('/auth/login', data, false);
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

  // ========== 班级管理 ==========

  // 创建班级（教师）
  createClass(data) {
    return this.post('/classes', data);
  }

  // 获取我管理的班级列表（教师）
  getMyTeachingClasses(status) {
    return this.get('/classes/my/teaching', { status });
  }

  // 获取我加入的班级列表（学生）
  getMyEnrolledClasses() {
    return this.get('/classes/my/enrolled');
  }

  // 获取班级详情
  getClassDetail(id) {
    return this.get(`/classes/${id}`);
  }

  // 更新班级信息
  updateClass(id, data) {
    return this.put(`/classes/${id}`, data);
  }

  // 添加学生到班级
  addStudentsToClass(classId, studentIds) {
    return this.post(`/classes/${classId}/students`, { student_ids: studentIds });
  }

  // 移除学生
  removeStudentFromClass(classId, studentId) {
    return this.delete(`/classes/${classId}/students/${studentId}`);
  }

  // 通过邀请码加入班级
  joinClass(classCode) {
    return this.post('/classes/join', { class_code: classCode });
  }

  // 退出班级
  leaveClass(classId) {
    return this.post(`/classes/${classId}/leave`);
  }

  // ========== 作业系统 ==========

  // 创建作业（教师）
  createAssignment(data) {
    return this.post('/assignments', data);
  }

  // 获取班级作业列表
  getClassAssignments(classId, params = {}) {
    return this.get(`/assignments/class/${classId}`, params);
  }

  // 获取作业详情
  getAssignmentDetail(id) {
    return this.get(`/assignments/${id}`);
  }

  // 获取作业的所有提交（教师）
  getAssignmentSubmissions(assignmentId, params = {}) {
    return this.get(`/assignments/${assignmentId}/submissions`, params);
  }

  // 批改作业
  gradeSubmission(submissionId, data) {
    return this.post(`/assignments/submissions/${submissionId}/grade`, data);
  }

  // 获取我的作业列表（学生）
  getMyAssignments(params = {}) {
    return this.get('/assignments/my/list', params);
  }

  // 提交作业
  submitAssignment(assignmentId, data) {
    return this.post(`/assignments/${assignmentId}/submit`, data);
  }

  // 获取我的作业提交
  getMySubmission(assignmentId) {
    return this.get(`/assignments/${assignmentId}/my-submission`);
  }

  // ========== 考试系统 ==========

  // 创建考试（教师）
  createExam(data) {
    return this.post('/exams', data);
  }

  // 添加试题
  addExamQuestions(examId, questions) {
    return this.post(`/exams/${examId}/questions`, { questions });
  }

  // 发布考试
  publishExam(examId) {
    return this.post(`/exams/${examId}/publish`);
  }

  // 获取班级考试列表
  getClassExams(classId, params = {}) {
    return this.get(`/exams/class/${classId}`, params);
  }

  // 获取考试详情
  getExamDetail(examId) {
    return this.get(`/exams/${examId}`);
  }

  // 获取考试的所有答卷（教师）
  getExamAttempts(examId, params = {}) {
    return this.get(`/exams/${examId}/attempts`, params);
  }

  // 批改主观题
  gradeExamAttempt(attemptId, data) {
    return this.post(`/exams/attempts/${attemptId}/grade`, data);
  }

  // 获取我的考试列表（学生）
  getMyExams(params = {}) {
    return this.get('/exams/my/list', params);
  }

  // 开始考试
  startExam(examId) {
    return this.post(`/exams/${examId}/start`);
  }

  // 提交答案
  submitExamAnswer(attemptId, data) {
    return this.post(`/exams/attempts/${attemptId}/answer`, data);
  }

  // 提交考试
  submitExam(attemptId) {
    return this.post(`/exams/attempts/${attemptId}/submit`);
  }

  // 获取考试成绩
  getExamResult(attemptId) {
    return this.get(`/exams/attempts/${attemptId}/result`);
  }
}

// 创建全局API实例
const api = new API();

// 导出API实例
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
}


  }

  // 获取我加入的班级列表（学生）
  getMyEnrolledClasses() {
    return this.get('/classes/my/enrolled');
  }

  // 获取班级详情
  getClassDetail(id) {
    return this.get(`/classes/${id}`);
  }

  // 更新班级信息
  updateClass(id, data) {
    return this.put(`/classes/${id}`, data);
  }

  // 添加学生到班级
  addStudentsToClass(classId, studentIds) {
    return this.post(`/classes/${classId}/students`, { student_ids: studentIds });
  }

  // 移除学生
  removeStudentFromClass(classId, studentId) {
    return this.delete(`/classes/${classId}/students/${studentId}`);
  }

  // 通过邀请码加入班级
  joinClass(classCode) {
    return this.post('/classes/join', { class_code: classCode });
  }

  // 退出班级
  leaveClass(classId) {
    return this.post(`/classes/${classId}/leave`);
  }

  // ========== 作业系统 ==========

  // 创建作业（教师）
  createAssignment(data) {
    return this.post('/assignments', data);
  }

  // 获取班级作业列表
  getClassAssignments(classId, params = {}) {
    return this.get(`/assignments/class/${classId}`, params);
  }

  // 获取作业详情
  getAssignmentDetail(id) {
    return this.get(`/assignments/${id}`);
  }

  // 获取作业的所有提交（教师）
  getAssignmentSubmissions(assignmentId, params = {}) {
    return this.get(`/assignments/${assignmentId}/submissions`, params);
  }

  // 批改作业
  gradeSubmission(submissionId, data) {
    return this.post(`/assignments/submissions/${submissionId}/grade`, data);
  }

  // 获取我的作业列表（学生）
  getMyAssignments(params = {}) {
    return this.get('/assignments/my/list', params);
  }

  // 提交作业
  submitAssignment(assignmentId, data) {
    return this.post(`/assignments/${assignmentId}/submit`, data);
  }

  // 获取我的作业提交
  getMySubmission(assignmentId) {
    return this.get(`/assignments/${assignmentId}/my-submission`);
  }

  // ========== 考试系统 ==========

  // 创建考试（教师）
  createExam(data) {
    return this.post('/exams', data);
  }

  // 添加试题
  addExamQuestions(examId, questions) {
    return this.post(`/exams/${examId}/questions`, { questions });
  }

  // 发布考试
  publishExam(examId) {
    return this.post(`/exams/${examId}/publish`);
  }

  // 获取班级考试列表
  getClassExams(classId, params = {}) {
    return this.get(`/exams/class/${classId}`, params);
  }

  // 获取考试详情
  getExamDetail(examId) {
    return this.get(`/exams/${examId}`);
  }

  // 获取考试的所有答卷（教师）
  getExamAttempts(examId, params = {}) {
    return this.get(`/exams/${examId}/attempts`, params);
  }

  // 批改主观题
  gradeExamAttempt(attemptId, data) {
    return this.post(`/exams/attempts/${attemptId}/grade`, data);
  }

  // 获取我的考试列表（学生）
  getMyExams(params = {}) {
    return this.get('/exams/my/list', params);
  }

  // 开始考试
  startExam(examId) {
    return this.post(`/exams/${examId}/start`);
  }

  // 提交答案
  submitExamAnswer(attemptId, data) {
    return this.post(`/exams/attempts/${attemptId}/answer`, data);
  }

  // 提交考试
  submitExam(attemptId) {
    return this.post(`/exams/attempts/${attemptId}/submit`);
  }

  // 获取考试成绩
  getExamResult(attemptId) {
    return this.get(`/exams/attempts/${attemptId}/result`);
  }
}

// 创建全局API实例
const api = new API();

// 导出API实例
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
}


  }

  // 获取我加入的班级列表（学生）
  getMyEnrolledClasses() {
    return this.get('/classes/my/enrolled');
  }

  // 获取班级详情
  getClassDetail(id) {
    return this.get(`/classes/${id}`);
  }

  // 更新班级信息
  updateClass(id, data) {
    return this.put(`/classes/${id}`, data);
  }

  // 添加学生到班级
  addStudentsToClass(classId, studentIds) {
    return this.post(`/classes/${classId}/students`, { student_ids: studentIds });
  }

  // 移除学生
  removeStudentFromClass(classId, studentId) {
    return this.delete(`/classes/${classId}/students/${studentId}`);
  }

  // 通过邀请码加入班级
  joinClass(classCode) {
    return this.post('/classes/join', { class_code: classCode });
  }

  // 退出班级
  leaveClass(classId) {
    return this.post(`/classes/${classId}/leave`);
  }

  // ========== 作业系统 ==========

  // 创建作业（教师）
  createAssignment(data) {
    return this.post('/assignments', data);
  }

  // 获取班级作业列表
  getClassAssignments(classId, params = {}) {
    return this.get(`/assignments/class/${classId}`, params);
  }

  // 获取作业详情
  getAssignmentDetail(id) {
    return this.get(`/assignments/${id}`);
  }

  // 获取作业的所有提交（教师）
  getAssignmentSubmissions(assignmentId, params = {}) {
    return this.get(`/assignments/${assignmentId}/submissions`, params);
  }

  // 批改作业
  gradeSubmission(submissionId, data) {
    return this.post(`/assignments/submissions/${submissionId}/grade`, data);
  }

  // 获取我的作业列表（学生）
  getMyAssignments(params = {}) {
    return this.get('/assignments/my/list', params);
  }

  // 提交作业
  submitAssignment(assignmentId, data) {
    return this.post(`/assignments/${assignmentId}/submit`, data);
  }

  // 获取我的作业提交
  getMySubmission(assignmentId) {
    return this.get(`/assignments/${assignmentId}/my-submission`);
  }

  // ========== 考试系统 ==========

  // 创建考试（教师）
  createExam(data) {
    return this.post('/exams', data);
  }

  // 添加试题
  addExamQuestions(examId, questions) {
    return this.post(`/exams/${examId}/questions`, { questions });
  }

  // 发布考试
  publishExam(examId) {
    return this.post(`/exams/${examId}/publish`);
  }

  // 获取班级考试列表
  getClassExams(classId, params = {}) {
    return this.get(`/exams/class/${classId}`, params);
  }

  // 获取考试详情
  getExamDetail(examId) {
    return this.get(`/exams/${examId}`);
  }

  // 获取考试的所有答卷（教师）
  getExamAttempts(examId, params = {}) {
    return this.get(`/exams/${examId}/attempts`, params);
  }

  // 批改主观题
  gradeExamAttempt(attemptId, data) {
    return this.post(`/exams/attempts/${attemptId}/grade`, data);
  }

  // 获取我的考试列表（学生）
  getMyExams(params = {}) {
    return this.get('/exams/my/list', params);
  }

  // 开始考试
  startExam(examId) {
    return this.post(`/exams/${examId}/start`);
  }

  // 提交答案
  submitExamAnswer(attemptId, data) {
    return this.post(`/exams/attempts/${attemptId}/answer`, data);
  }

  // 提交考试
  submitExam(attemptId) {
    return this.post(`/exams/attempts/${attemptId}/submit`);
  }

  // 获取考试成绩
  getExamResult(attemptId) {
    return this.get(`/exams/attempts/${attemptId}/result`);
  }
}

// 创建全局API实例
const api = new API();

// 导出API实例
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
}

