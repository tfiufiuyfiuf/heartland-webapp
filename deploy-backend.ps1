# CORS 修复 - 后端部署脚本
# 使用方法: 右键点击此文件 -> 使用 PowerShell 运行

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  心屿学院后端部署脚本 - CORS 修复版" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 获取脚本所在目录
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "当前目录: $ScriptDir" -ForegroundColor Yellow
Write-Host ""

# 进入 backend 目录
$BackendDir = Join-Path $ScriptDir "backend"
if (Test-Path $BackendDir) {
    Write-Host "✓ 找到 backend 目录" -ForegroundColor Green
    Set-Location $BackendDir
    Write-Host "✓ 已进入 backend 目录" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✗ 错误: 找不到 backend 目录" -ForegroundColor Red
    Write-Host "请确保此脚本位于项目根目录" -ForegroundColor Red
    Write-Host ""
    Write-Host "按任意键退出..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# 检查 Vercel CLI
Write-Host "检查 Vercel CLI..." -ForegroundColor Yellow
$VercelVersion = vercel --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Vercel CLI 已安装: $VercelVersion" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✗ 错误: 未安装 Vercel CLI" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先安装 Vercel CLI:" -ForegroundColor Yellow
    Write-Host "  npm install -g vercel" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "按任意键退出..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# 显示即将修改的文件
Write-Host "本次部署包含以下 CORS 修复:" -ForegroundColor Yellow
Write-Host "  1. backend/vercel.json - 添加 CORS 路由配置" -ForegroundColor White
Write-Host "  2. backend/api/index.js - 修复 Express app 导出" -ForegroundColor White
Write-Host "  3. backend/server.js - 清理重复代码" -ForegroundColor White
Write-Host "  4. backend/api/auth/login.js - 清理重复代码" -ForegroundColor White
Write-Host "  5. backend/api/auth/register.js - 清理重复代码" -ForegroundColor White
Write-Host ""

# 确认部署
Write-Host "是否开始部署到 Vercel 生产环境? (Y/N): " -ForegroundColor Yellow -NoNewline
$Confirmation = Read-Host
if ($Confirmation -ne 'Y' -and $Confirmation -ne 'y') {
    Write-Host ""
    Write-Host "部署已取消" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "按任意键退出..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 0
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  开始部署..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 执行部署
try {
    Write-Host "正在部署到 Vercel..." -ForegroundColor Yellow
    Write-Host ""
    
    # 运行 vercel 部署命令
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✓ 部署成功!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "下一步:" -ForegroundColor Yellow
        Write-Host "  1. 清除浏览器缓存 (Ctrl + Shift + Delete)" -ForegroundColor White
        Write-Host "  2. 访问您的前端应用并测试登录功能" -ForegroundColor White
        Write-Host "  3. 检查浏览器开发者工具，确认没有 CORS 错误" -ForegroundColor White
        Write-Host ""
        Write-Host "如果仍有问题，请查看 'CORS修复部署指南.md'" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Red
        Write-Host "  ✗ 部署失败" -ForegroundColor Red
        Write-Host "========================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "请检查:" -ForegroundColor Yellow
        Write-Host "  1. 您是否已登录 Vercel (运行: vercel login)" -ForegroundColor White
        Write-Host "  2. 您是否有部署权限" -ForegroundColor White
        Write-Host "  3. 网络连接是否正常" -ForegroundColor White
    }
} catch {
    Write-Host ""
    Write-Host "✗ 发生错误: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
