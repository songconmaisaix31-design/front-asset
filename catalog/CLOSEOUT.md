# 资产库交付与限制

本轮完成真实材料采集和带缺口归档，未开发前端。原先固定 Token 上限中止记录见 Git 历史及 token-budget-history.json；用户取消数量管控后已恢复采集。按难度选择模型，并保留余额百分比保护。

## 实际覆盖

已保留用户原图、Obsidian 官方间接图、Cosmograph 已加载/放大图与真实缩放短片、100,000 Stars 星空进入探索界面的短片，以及固定版本 cosmos.gl 静态源码。Star Atlas 一直加载，归为 blocked。未启动 Stellarium 补位。

Cosmograph 的 HTML/DOM/CSS 属于加载阶段，不得与成功图谱画面配成同状态证据。100,000 Stars 的 CSS 只覆盖 body，不能代表 WebGL 布局或相机。资源 URL 查询参数被采集助手统一去掉，资源索引不保证完整复现。没有已证实的节点选择、地面升入天空镜头或窄屏采样；滚轮输入与引导动画不能建立确定因果。

## 许可与保全

首图由用户提供并确认，但底层第三方权利尚未核清。截图、视频和网页快照仅存主库忽略目录。没有清理原工作树；原件不会因 Git 合并消失。浏览器 profile/cache 不计入资产。

固定源码提交 ce35edacf94dba1f02ef2b47957e937e4c9acf17，包元数据 3.4.1，8 个源码/文档/配置文件及 MIT LICENCE。8/8 与保留原件一致（归一化 Git 换行后）。允许范围是原文件文本附 MIT 声明，不包含依赖、引用图片或完整可运行产品。没有安装/运行该项目。首次源码推送漏许可证正文，已用 84f801f 补正，未重写历史。

推荐片来自真实录屏：Cosmograph [77,92) 秒、100,000 Stars [33,51) 秒。没有生成帧，源/产物哈希及方法见对应 .provenance.json。内部参考联系表与时间点审查表在 .local-captures/INT-02/。Worker 阶段交接以最终 catalog/assets.json 和 reviews/REVIEW.md 修正为准。

## 编排与模型

Run run_d2f85b9f41de。恢复后 REF-02 为 Luna low，CAP-02 为 Terra medium，MOT-01 为 Terra low，INT-02 为 Terra medium，均核对过实际设置。主控既有会话仍为 Astra high，没有宣称成功降档。

Orca 多次把已粘贴任务报为 agent_prompt_stalled 并撤销 Dispatch；核实实际状态后在同一终端补交输入，没有重复创建采集 Worker。CAP-02/MOT-01 按普通状态消息及 Git/文件证据对账，不是原生生命周期全绿。REF-02 曾误在主库创建成果分支，已保留提交、恢复 main 并把该分支放回专属 worktree。

INT-02 创建独立 worktree/task 后，其默认沙箱阻止共享 Git 元数据写入；取消命令后 Orca 仍拒绝后续输入。主控执行已授权的合并与最终验收，INT-02 终端已确认 ptyKilled=true；不宣称独立验收通过。其他部分终端释放返回 release_unknown，保留此限制；CAP-02 独立 Chrome 已按唯一任务 profile 核实并关闭。没有改 Kernel、全局认证/权限，没有新付费 API、账号或重置额度。

完整检查及数量见 coverage.json、file-inventory.json、source-integrity.json、video-validation.json 和 reviews/REVIEW.md。停止新增采集，等待下一条指令。
