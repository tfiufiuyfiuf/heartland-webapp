/**
 * 心屿学院 - 功能集成代码
 * 
 * 将这些函数添加到 index是个五.html 中，替换原有的模拟数据函数
 */

// ============= 情绪追踪功能 =============

// 保存情绪记录
async function saveMoodRecord(moodData) {
    try {
        const result = await api.createMoodRecord({
            mood_type: moodData.type || moodData.mood_type,
            mood_level: moodData.level || moodData.mood_level,
            note: moodData.note || '',
            tags: moodData.tags || [],
            weather: moodData.weather || '',
            location: moodData.location || '',
            activities: moodData.activities || []
        });
        
        if (result.success) {
            showNotification('情绪记录已保存 💝', 'success');
            loadMoodRecords(); // 重新加载列表
            return true;
        } else {
            showNotification('保存失败: ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('保存情绪记录失败:', error);
        showNotification('保存失败: ' + (error.message || '网络错误'), 'error');
        return false;
    }
}

// 加载情绪记录列表
async function loadMoodRecords(page = 1, limit = 20) {
    try {
        const result = await api.getMoodRecords({ page, limit });
        
        if (result.success) {
            renderMoodRecords(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载情绪记录失败:', error);
        showNotification('加载失败: ' + (error.message || '网络错误'), 'error');
        return [];
    }
}

// 渲染情绪记录列表
function renderMoodRecords(records) {
    const container = document.getElementById('mood-records-list');
    if (!container) return;
    
    if (!records || records.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">还没有情绪记录，快来记录第一条吧！</p>';
        return;
    }
    
    container.innerHTML = records.map(record => {
        const date = new Date(record.created_at);
        const moodEmoji = getMoodEmoji(record.mood_type);
        
        return `
            <div class="mood-record-item" data-id="${record.id}">
                <div class="mood-icon">${moodEmoji}</div>
                <div class="mood-info">
                    <div class="mood-type">${getMoodName(record.mood_type)} - 等级${record.mood_level}</div>
                    <div class="mood-note">${record.note || '无备注'}</div>
                    <div class="mood-time">${formatDate(date)}</div>
                    ${record.tags && record.tags.length > 0 ? `
                        <div class="mood-tags">
                            ${record.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// 获取情绪统计
async function loadMoodStats(days = 7) {
    try {
        const result = await api.getMoodStats(days);
        
        if (result.success) {
            renderMoodStats(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载情绪统计失败:', error);
        return null;
    }
}

// ============= 课程学习功能 =============

// 加载课程列表
async function loadCourses(category = null, page = 1) {
    try {
        const params = { page, limit: 20 };
        if (category) params.category = category;
        
        const result = await api.getCourses(params);
        
        if (result.success) {
            renderCourseList(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载课程失败:', error);
        showNotification('加载课程失败', 'error');
        return [];
    }
}

// 渲染课程列表
function renderCourseList(courses) {
    const container = document.getElementById('courses-list');
    if (!container) return;
    
    if (!courses || courses.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">暂无课程</p>';
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="course-card" onclick="loadCourseDetail('${course.id}')">
            <div class="course-cover">${course.cover_image || '📚'}</div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span>⏱️ ${course.duration}分钟</span>
                    <span>👨‍🏫 ${course.instructor}</span>
                    <span class="difficulty ${course.difficulty}">${getDifficultyName(course.difficulty)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 加载课程详情
async function loadCourseDetail(courseId) {
    try {
        const result = await api.getCourse(courseId);
        
        if (result.success) {
            renderCourseDetail(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载课程详情失败:', error);
        showNotification('加载失败', 'error');
        return null;
    }
}

// 渲染课程详情
function renderCourseDetail(course) {
    const container = document.getElementById('course-detail');
    if (!container) return;
    
    container.innerHTML = `
        <div class="course-header">
            <h2>${course.title}</h2>
            <p>${course.description}</p>
            <div class="course-meta">
                <span>⏱️ ${course.duration}分钟</span>
                <span>👨‍🏫 ${course.instructor}</span>
            </div>
        </div>
        
        <div class="course-chapters">
            <h3>课程章节</h3>
            ${course.chapters && course.chapters.length > 0 ? 
                course.chapters.map((chapter, index) => `
                    <div class="chapter-item" onclick="startLearning('${course.id}', '${chapter.id}')">
                        <div class="chapter-number">${index + 1}</div>
                        <div class="chapter-info">
                            <h4>${chapter.title}</h4>
                            <p>${chapter.content.substring(0, 100)}...</p>
                            <span>⏱️ ${chapter.duration}分钟</span>
                        </div>
                    </div>
                `).join('') 
                : '<p>暂无章节</p>'
            }
        </div>
    `;
}

// 开始学习
async function startLearning(courseId, chapterId) {
    // 显示学习内容
    showChapterContent(courseId, chapterId);
}

// 更新学习进度
async function updateLearningProgress(courseId, chapterId, progressData) {
    try {
        const result = await api.updateCourseProgress(courseId, chapterId, {
            progress_percentage: progressData.percentage || 100,
            is_completed: progressData.completed || false,
            last_position: progressData.position || 0
        });
        
        if (result.success) {
            console.log('学习进度已更新');
            return true;
        }
    } catch (error) {
        console.error('更新学习进度失败:', error);
        return false;
    }
}

// ============= 社区互动功能 =============

// 加载帖子列表
async function loadPosts(category = null, page = 1) {
    try {
        const params = { page, limit: 20 };
        if (category) params.category = category;
        
        const result = await api.getPosts(params);
        
        if (result.success) {
            renderPostList(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载帖子失败:', error);
        showNotification('加载失败', 'error');
        return [];
    }
}

// 渲染帖子列表
function renderPostList(posts) {
    const container = document.getElementById('posts-list');
    if (!container) return;
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">还没有帖子，快来发布第一条吧！</p>';
        return;
    }
    
    container.innerHTML = posts.map(post => {
        const date = new Date(post.created_at);
        const username = post.is_anonymous ? '匿名用户' : (post.user?.username || '未知用户');
        
        return `
            <div class="post-item" onclick="loadPostDetail('${post.id}')">
                <div class="post-header">
                    <span class="post-author">${username}</span>
                    <span class="post-time">${formatDate(date)}</span>
                </div>
                ${post.title ? `<h3 class="post-title">${post.title}</h3>` : ''}
                <div class="post-content">${post.content.substring(0, 200)}${post.content.length > 200 ? '...' : ''}</div>
                <div class="post-footer">
                    <span>👍 ${post.likes_count || 0}</span>
                    <span>💬 ${post.comments_count || 0}</span>
                    <span>👀 ${post.views_count || 0}</span>
                </div>
            </div>
        `;
    }).join('');
}

// 发布帖子
async function createPost(postData) {
    try {
        const result = await api.createPost({
            title: postData.title || '',
            content: postData.content,
            category: postData.category || 'discussion',
            tags: postData.tags || [],
            is_anonymous: postData.isAnonymous || false
        });
        
        if (result.success) {
            showNotification('帖子发布成功 ✨', 'success');
            loadPosts(); // 重新加载列表
            return true;
        } else {
            showNotification('发布失败: ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('发布帖子失败:', error);
        showNotification('发布失败: ' + (error.message || '网络错误'), 'error');
        return false;
    }
}

// 加载帖子详情
async function loadPostDetail(postId) {
    try {
        const result = await api.getPost(postId);
        
        if (result.success) {
            renderPostDetail(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载帖子详情失败:', error);
        showNotification('加载失败', 'error');
        return null;
    }
}

// 评论帖子
async function commentPost(postId, content, isAnonymous = false) {
    try {
        const result = await api.commentPost(postId, {
            content,
            is_anonymous: isAnonymous
        });
        
        if (result.success) {
            showNotification('评论成功 💬', 'success');
            loadPostDetail(postId); // 重新加载帖子详情
            return true;
        } else {
            showNotification('评论失败: ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('评论失败:', error);
        showNotification('评论失败: ' + (error.message || '网络错误'), 'error');
        return false;
    }
}

// 点赞帖子
async function toggleLikePost(postId) {
    try {
        const result = await api.toggleLike(postId);
        
        if (result.success) {
            return result.liked;
        }
    } catch (error) {
        console.error('点赞操作失败:', error);
        return null;
    }
}

// ============= 树洞功能 =============

// 加载树洞消息
async function loadTreeholeMessages(page = 1) {
    try {
        const result = await api.getTreeholeMessages({ page, limit: 20 });
        
        if (result.success) {
            renderTreeholeMessages(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载树洞消息失败:', error);
        return [];
    }
}

// 渲染树洞消息
function renderTreeholeMessages(messages) {
    const container = document.getElementById('treehole-list');
    if (!container) return;
    
    if (!messages || messages.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">树洞里还很安静...</p>';
        return;
    }
    
    container.innerHTML = messages.map(msg => {
        const date = new Date(msg.created_at);
        
        return `
            <div class="treehole-item" onclick="loadTreeholeDetail('${msg.id}')">
                <div class="treehole-content">${msg.content}</div>
                <div class="treehole-footer">
                    <span>${formatDate(date)}</span>
                    <span>💬 ${msg.replies_count || 0} 回复</span>
                </div>
            </div>
        `;
    }).join('');
}

// 发送树洞消息
async function sendTreeholeMessage(content, mood = null) {
    try {
        const result = await api.createTreeholeMessage({
            content,
            mood
        });
        
        if (result.success) {
            showNotification('消息已发送到树洞 🌳', 'success');
            loadTreeholeMessages(); // 重新加载列表
            return true;
        } else {
            showNotification('发送失败: ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('发送树洞消息失败:', error);
        showNotification('发送失败: ' + (error.message || '网络错误'), 'error');
        return false;
    }
}

// ============= 预约咨询功能 =============

// 加载咨询师列表
async function loadCounselors() {
    try {
        const result = await api.getCounselors();
        
        if (result.success) {
            renderCounselorList(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载咨询师列表失败:', error);
        return [];
    }
}

// 渲染咨询师列表
function renderCounselorList(counselors) {
    const container = document.getElementById('counselors-list');
    if (!container) return;
    
    if (!counselors || counselors.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">暂无咨询师</p>';
        return;
    }
    
    container.innerHTML = counselors.map(counselor => `
        <div class="counselor-card" onclick="showAppointmentModal('${counselor.id}')">
            <div class="counselor-avatar">${counselor.avatar || '👨‍⚕️'}</div>
            <div class="counselor-info">
                <h3>${counselor.name}</h3>
                <p class="counselor-title">${counselor.title}</p>
                <div class="counselor-specialties">
                    ${counselor.specialties.map(s => `<span class="specialty-tag">${s}</span>`).join('')}
                </div>
                <p class="counselor-bio">${counselor.bio.substring(0, 100)}...</p>
                <div class="counselor-rating">⭐ ${counselor.rating}</div>
            </div>
        </div>
    `).join('');
}

// 创建预约
async function createAppointment(appointmentData) {
    try {
        const result = await api.createAppointment({
            counselor_id: appointmentData.counselorId,
            appointment_date: appointmentData.date,
            appointment_time: appointmentData.time,
            topic: appointmentData.topic || '',
            note: appointmentData.note || ''
        });
        
        if (result.success) {
            showNotification('预约成功 ✅', 'success');
            loadMyAppointments(); // 重新加载预约列表
            return true;
        } else {
            showNotification('预约失败: ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('创建预约失败:', error);
        showNotification('预约失败: ' + (error.message || '网络错误'), 'error');
        return false;
    }
}

// 加载我的预约
async function loadMyAppointments() {
    try {
        const result = await api.getMyAppointments();
        
        if (result.success) {
            renderMyAppointments(result.data);
            return result.data;
        }
    } catch (error) {
        console.error('加载预约列表失败:', error);
        return [];
    }
}

// ============= 辅助函数 =============

function getMoodEmoji(moodType) {
    const emojis = {
        happy: '😊',
        sad: '😢',
        anxious: '😰',
        angry: '😠',
        calm: '😌',
        excited: '🤩',
        tired: '😴',
        stressed: '😣'
    };
    return emojis[moodType] || '😐';
}

function getMoodName(moodType) {
    const names = {
        happy: '开心',
        sad: '难过',
        anxious: '焦虑',
        angry: '生气',
        calm: '平静',
        excited: '兴奋',
        tired: '疲惫',
        stressed: '压力'
    };
    return names[moodType] || '未知';
}

function getDifficultyName(difficulty) {
    const names = {
        beginner: '入门',
        intermediate: '进阶',
        advanced: '高级'
    };
    return names[difficulty] || '入门';
}

function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    
    return date.toLocaleDateString('zh-CN');
}
























