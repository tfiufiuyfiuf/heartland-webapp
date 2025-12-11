// 心屿学院 - 前端配置文件

const CONFIG = {
  // API配置
  API: {
    // 开发环境
    DEV_BASE_URL: 'http://localhost:3000/api',
    
    // 生产环境
    PROD_BASE_URL: 'https://heartland-backend.vercel.app/api',
    
    // 临时强制使用生产环境 API（测试用）
    BASE_URL: 'https://heartland-backend.onrender.com/api', 
    
    // 根据当前环境自动选择（已注释，临时使用上面的强制配置）
    // BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    //   ? 'http://localhost:3000/api'
    //   : 'https://heartland-backend.vercel.app/api',
    
    // 请求超时时间（毫秒）
    TIMEOUT: 15000,
    
    // 重试次数
    RETRY_TIMES: 3
  },

  // 本地存储键名
  STORAGE_KEYS: {
    TOKEN: 'heartland_token',
    USER: 'heartland_user',
    CURRENT_ROLE: 'current_role',
    USER_PROFILE: 'user_profile',
    MOOD_RECORDS: 'mood_records',
    FOCUS_RECORDS: 'focus_records',
    SETTINGS: 'heartland_settings'
  },

  // 应用配置
  APP: {
    NAME: '心屿学院',
    VERSION: '1.0.0',
    DESCRIPTION: '青少年心理健康学习平台',
    COPYRIGHT: '© 2024 心屿学院. All rights reserved.',
    
    // 分页配置
    PAGE_SIZE: 20,
    
    // 上传文件大小限制（MB）
    MAX_FILE_SIZE: 5,
    
    // 支持的图片格式
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    
    // 验证码长度
    VERIFICATION_CODE_LENGTH: 6,
    
    // 验证码过期时间（秒）
    VERIFICATION_CODE_EXPIRE: 300
  },

  // 学院系统
  HOUSES: {
    gryffindor: {
      name: '格兰芬多',
      color: '#740001',
      emoji: '🦁',
      traits: ['勇敢', '勇气', '骑士精神']
    },
    slytherin: {
      name: '斯莱特林',
      color: '#1A472A',
      emoji: '🐍',
      traits: ['野心', '精明', '领导力']
    },
    ravenclaw: {
      name: '拉文克劳',
      color: '#0E1A40',
      emoji: '🦅',
      traits: ['智慧', '创造力', '学识']
    },
    hufflepuff: {
      name: '赫奇帕奇',
      color: '#FFDB00',
      emoji: '🦡',
      traits: ['忠诚', '勤劳', '正直']
    }
  },

  // 情绪类型配置
  MOOD_TYPES: {
    happy: { name: '开心', emoji: '😊', color: '#FFD93D' },
    sad: { name: '难过', emoji: '😢', color: '#6B9BD1' },
    anxious: { name: '焦虑', emoji: '😰', color: '#F97068' },
    angry: { name: '生气', emoji: '😠', color: '#E63946' },
    calm: { name: '平静', emoji: '😌', color: '#A8DADC' },
    excited: { name: '兴奋', emoji: '🤩', color: '#F77F00' },
    tired: { name: '疲惫', emoji: '😴', color: '#8D99AE' },
    stressed: { name: '压力', emoji: '😣', color: '#E5989B' }
  },

  // 课程分类
  COURSE_CATEGORIES: {
    emotion: { name: '情绪管理', icon: '💝', color: '#FF6B9D' },
    stress: { name: '压力应对', icon: '🌿', color: '#A8E6CF' },
    relationship: { name: '人际关系', icon: '🤝', color: '#FFD93D' },
    growth: { name: '个人成长', icon: '🌱', color: '#95E1D3' }
  },

  // 帖子分类
  POST_CATEGORIES: {
    discussion: { name: '讨论交流', icon: '💬', color: '#4ECDC4' },
    share: { name: '分享心得', icon: '✨', color: '#FFD93D' },
    question: { name: '寻求建议', icon: '❓', color: '#FF6B9D' },
    achievement: { name: '成就分享', icon: '🏆', color: '#95E1D3' }
  },

  // 用户角色配置
  USER_ROLES: {
    student: {
      name: '学生',
      icon: 'fas fa-user-graduate',
      color: '#4ECDC4',
      permissions: ['view_courses', 'post_community', 'mood_tracking', 'book_appointment']
    },
    parent: {
      name: '家长',
      icon: 'fas fa-user-friends',
      color: '#FFD93D',
      permissions: ['view_child_data', 'view_reports', 'book_appointment']
    },
    teacher: {
      name: '教师',
      icon: 'fas fa-chalkboard-teacher',
      color: '#95E1D3',
      permissions: ['manage_class', 'view_student_data', 'group_guidance']
    },
    admin: {
      name: '管理员',
      icon: 'fas fa-user-shield',
      color: '#FF6B9D',
      permissions: ['all']
    }
  },

  // 提示消息
  MESSAGES: {
    SUCCESS: {
      LOGIN: '登录成功，欢迎回来！',
      REGISTER: '注册成功！',
      UPDATE_PROFILE: '个人信息更新成功',
      MOOD_SAVED: '情绪记录已保存',
      POST_CREATED: '帖子发布成功',
      COMMENT_ADDED: '评论成功',
      APPOINTMENT_CREATED: '预约成功'
    },
    ERROR: {
      NETWORK: '网络连接失败，请检查网络',
      UNAUTHORIZED: '请先登录',
      FORBIDDEN: '权限不足',
      NOT_FOUND: '请求的资源不存在',
      SERVER_ERROR: '服务器错误，请稍后重试',
      VALIDATION_FAILED: '输入数据验证失败'
    },
    WARNING: {
      UNSAVED_CHANGES: '有未保存的更改，确定要离开吗？',
      DELETE_CONFIRM: '确定要删除吗？此操作无法撤销'
    }
  },

  // 正则表达式
  REGEX: {
    PHONE: /^1[3-9]\d{9}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^.{6,}$/,
    USERNAME: /^[\u4e00-\u9fa5a-zA-Z0-9_]{2,20}$/
  },

  // 开发模式配置
  DEBUG: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  
  // 显示详细错误信息
  SHOW_DETAILED_ERRORS: window.location.hostname === 'localhost',

  // 验证码自动填充（仅开发环境）
  AUTO_FILL_CODE: window.location.hostname === 'localhost' ? '123456' : null
};

// 冻结配置对象，防止被修改
Object.freeze(CONFIG);

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

