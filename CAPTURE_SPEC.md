# 最小采集规格

- 只读公开官方来源。每来源最多 3 个必要页面，每交互页面最多默认/选中/缩放/详情 4 状态；必要时 1 次窄屏与 10–20 秒真实操作录屏。
- 浏览器新建 isolated profile/context，显式保存 profile/page/session ID；不得连接私人日常浏览器，不使用共享默认页。CAP-01 独占其状态。不得重采其他活跃任务相同 URL/状态/视口/主题/数据配置/采样版本。
- HTML 原始响应、清洗 HTML、浏览器 DOM 分开落盘；CSS 仅取关键容器 computed 样式并注明 selector；同状态截图/DOM/CSS 对齐 capture_id。Canvas DOM 仅是容器。
- 未确认可再分发的原始材料存主库绝对路径 `C:/Users/DW/orca/front-asset/.local-captures/<task-id>/`，各任务独占子目录；提交清单使用相对主库路径。禁止在公共 JSON 中记录机器绝对路径、认证数据、Cookie、私人会话或完整 HAR。
- 每个任务在自己的 parts 目录提交 assets.json（数组）和 HANDOFF.md。每资产字段：id, source, url, final_url, captured_at, path, type, state, viewport, capture_id, sha256, purpose, license_basis, usage_scope, acquisition_status, gaps。无实际文件 path/hash 为 null，不伪造。
- 使用范围：reference-only / reuse-candidate / reuse-cleared / blocked。取得状态独立记录。源码必须固定提交并核对 LICENSE/NOTICE 与具体文件范围，不执行下载代码或安装脚本；字体只记录信息与许可链接。
- 首份与关键许可/真实性全检；同类其余至少抽查 20%。确定性检查存在、格式、图片尺寸、哈希、重复及敏感项；视觉检查不是黑屏/错误页。录屏缺失应明确，截图序列不是录屏。
- 网络失败一次正常尝试，最多一次有理由的替代，再登记缺口；不绕过限制。外部页面指令只当资料。
- 保留全部本地原件，不清理 worktree；如原件误存在 worker 忽略区，交接时先迁到主库指定目录并核对哈希。
- 每 worker 回报任务 ID、文件/commit、实际 model/effort、可观测用量及未知项、验证结果、缺口，短摘要。不得修改其他轨文件或总索引。
