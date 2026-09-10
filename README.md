# 星空视觉前端资产库

为“自然银河入口 → 点击进入 → 可探索 Agent 星群”保存真实参考、交互证据和许可明确的静态源码。第二轮已归档并经独立执行者复核，**未开发前端、未运行下载项目、未部署**。

- [资产选用与观看秒数](recipes/SELECTION.md) · [独立内容复核](reviews/ROUND2.md)
- [旧缺口—新证据—当前结论](catalog/round2-gaps.json)
- [文件资产索引](catalog/assets.json) · [仅链接记录](catalog/links.json) · [覆盖统计](catalog/coverage.json)
- [完整性验收](catalog/validation.json) · [视频解码](catalog/video-validation-round2.json) · [固定源码核对](catalog/source-integrity-round2.json)
- [唯一任务看板](TASKS.md) · [采集规格](CAPTURE_SPEC.md) · [实际模型与用量范围](catalog/budget.json)

当前索引有 **152 个实际文件路径、139 个不同字节哈希、5 条仅链接记录**；其中媒体原件30个文件（28个不同哈希）、派生媒体44个文件、Git静态源码/配置/许可11个文件，其余67条为页面或元数据证据。失败材料与重复字节不代表新增视觉覆盖。全部91条上轮原件记录仍存在且哈希未变。

|视觉需要|选用证据|实际范围|
|---|---|---|
|自然入口|`.local-captures/REF-01/hero-original.png`，1672×941|保留用户确认的银河与微小山脊人物原图；底层第三方权利仍未核清|
|主交互参考|cosmos.gl 官方 Actions 原片 **32.463–43.476秒**|节点3091点击、移开仍保持、再选3568；官方引擎补位，不是商业Cosmograph运行成功|
|细点细线与局部高亮|Obsidian 官方图 `.local-captures/REF-02-obsidian-graph.png`|间接视觉参考，无实际Obsidian应用会话|
|自然群落、疏密与缩放|上轮 Cosmograph AI Model Atlas 已加载图及 `INT-02/cosmograph-zoom-15s.webm`|原片77–92秒；借聚类/留白，不借重黄线；旧DOM仅加载态|
|上仰动作|Stellarium 原片 **28–36秒**|地平线退出的真实操作分段；终点日间天体，不证明夜空接管|
|源码入口|[固定源码地图](references/cosmos-gl/parts/R2-SRC/SOURCE_MAP.md)|固定 `ce35edacf94dba1f02ef2b47957e937e4c9acf17`；从 `src/index.ts`、`src/config.ts` 和两份 `src/stories/` 辅助文件开始|

新内部联系表：`.local-captures/R2-INT/reference-contact-sheet.png`。主交互原片：`.local-captures/R2-COS/enginefallback/actions-run-20260911-i/video/page@ada5412c81a79e3ffeb5909431c534f0.webm`。上仰原片：`.local-captures/R2-MOT/ground/page@3838c13202d197df037180fd89e59408.webm`。

仍缺：商业Cosmograph本轮有效运行态及对应DOM/CSS、空白点击清除选择、Star Atlas有效进入过程、完整“地面退出→夜空接管”单段镜头、实际项目兼容性及依赖许可核验。悬停单独视觉效果也未完整归因；引擎CSS仅涵盖观察到的容器，标签/详情样式未完整取得。官方DEPT/Hello Monday案例只补制作来源；未观察到其演示视频，亮核封面已排除。上仰与星群尺度是分段参考，两者之间需后续原创衔接。

公开仓库保存原创观察、元数据、采集小脚本和MIT允许的静态源码。未获再分发许可的图片、视频、DOM等均留在主库稳定忽略目录 `.local-captures/`，**不会随Git clone提供，也未上传外部备份**。原件与派生件分开，旧失败证据保留。根LICENSE不覆盖第三方素材；源码遵循 `reusable/cosmos-gl/LICENCE`，商业产品、依赖、数据、字体及媒体不自动获许可。Git检出的CRLF字节与上游LF原件分开核对，11份文件内容一致。

离线检查：`python catalog/assemble.py`、`python catalog/verify.py`；10份不同字节的视频全部FFmpeg解码通过，4份采集脚本通过 `node --check`。这不代表浏览器渲染fps或产品构建/运行通过。所有Token与余额百分比停工线已按v0.4取消；实际任务Token与精确归属未知，无自动购买、额度重置或账号切换。
