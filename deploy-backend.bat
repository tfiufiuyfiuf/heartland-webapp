5@echo off
chcp 65001 >nul
echo ========================================
echo   心屿学院后端部署脚本 - CORS 修复版
echo ========================================
echo.

cd /d "%~dp0backend"
if errorlevel 1 (
    echo [错误] 找不到 backend 目录
    echo 请确保此脚本位于项目根目录
    pause
    exit /b 1
)

echo [信息] 已进入 backend 目录
echo.

vercel --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未安装 Vercel CLI
    echo.
    echo 请先安装 Vercel CLI:
    echo   npm install -g vercel
    echo.
    pause
    exit /b 1
)

echo [信息] Vercel CLI 已安装
echo.

echo 本次部署包含以下 CORS 修复:
echo   1. backend/vercel.json - 添加 CORS 路由配置
echo   2. backend/api/index.js - 修复 Express app 导出
echo   3. backend/server.js - 清理重复代码
echo   4. backend/api/auth/login.js - 清理重复代码
echo   5. backend/api/auth/register.js - 清理重复代码
echo.

set /p CONFIRM="是否开始部署到 Vercel 生产环境? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
    echo.
    echo 部署已取消
    pause
    exit /b 0
)

echo.
echo ========================================
echo   开始部署...
echo ========================================
echo.

vercel --prod

if errorlevel 1 (
    echo.
    echo ========================================
    echo   [失败] 部署失败
    echo ========================================
    echo.
    echo 请检查:
    echo   1. 您是否已登录 Vercel (运行: vercel login)
    echo   2. 您是否有部署权限
    echo   3. 网络连接是否正常
) else (
    echo.
    echo ========================================
    echo   [成功] 部署成功!
    echo ========================================
    echo.
    echo 下一步:
    echo   1. 清除浏览器缓存 (Ctrl + Shift + Delete)
    echo   2. 访问您的前端应用并测试登录功能
    echo   3. 检查浏览器开发者工具，确认没有 CORS 错误
    echo.
    echo 如果仍有问题，请查看 'CORS修复部署指南.md'
)

echo.
pause



