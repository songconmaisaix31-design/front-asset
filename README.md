# 星空视觉前端资产库

为“自然星空入口 → 点击进入 → 可探索 Agent 星群”收集的静态源码、真实视觉与操作证据。**本轮只交付资产库，没有开发或部署前端。**

- [选用说明](recipes/SELECTION.md)：首图、点线、群落、操作参考与源码入口。
- [资产总索引](catalog/assets.json) · [覆盖与重复](catalog/coverage.json) · [文件完整性](catalog/file-inventory.json)
- [验收结论](reviews/REVIEW.md) · [限制与运行记录](catalog/CLOSEOUT.md)
- [任务看板](TASKS.md) · [采集规格](CAPTURE_SPEC.md) · [当前模型/余额规则](catalog/budget.json)

现有 91 条实际资产记录（82 个不同字节哈希，含原件、派生帧、元数据及备份），覆盖用户首图和 5 个外部来源，其中 Star Atlas 为阻塞证据。浏览器配置与缓存不计作资产。

|用途|推荐材料|范围|
|---|---|---|
|自然入口|用户原图，1672×941|用户确认视觉，原件未改、本地保存|
|细点细线、局部高亮|Obsidian 官方图，1989×1331|官方间接图片，不是本次应用交互|
|群落、疏密和留白|Cosmograph AI Model Atlas 实际加载/放大画面|借分布特征，不借重黄线/大节点风格|
|真实图谱放大|cosmograph-zoom-15s.webm|原录屏 [77,92) 秒节选|
|星空入口进入探索界面|stars-entry-to-ui-18s.webm|原录屏 [33,51) 秒；滚轮因果未证实|
|静态源码|cosmos.gl 的 src/index.ts、src/config.ts、docs/picking/README.md|固定 ce35edacf94dba1f02ef2b47957e937e4c9acf17，MIT 文件文本，部分源码|

推荐短片、联系表位于主库 `.local-captures/INT-02/`，首图位于 `.local-captures/REF-01/hero-original.png`。这些材料不随公开 Git clone 提供，完整定位见索引。

公开仓库只发布原创观察、元数据、小型采集工具和许可允许的静态源码；未核清再分发权的截图、视频、页面快照留在忽略区。根 LICENSE 不覆盖第三方材料；源码遵循 `reusable/cosmos-gl/LICENCE`，依赖和链接素材需另行核查。

仍缺 Star Atlas 有效场景、地面升入天空镜头、已证明的节点选择、窄屏观察与加载完成状态的 Cosmograph DOM/CSS。Canvas 容器不是图谱实现。本库没有源码运行、产品 API 或部署验收。

离线检查：`python catalog/assemble.py`、`python catalog/verify.py`（需现有 Pillow）；采集工具仅做 `node --check`，未再次执行采集。用户已取消固定 Token 数量限制，按任务难度选模型；第二轮 v0.4 同时取消余额百分比停工线；本页资产结论待本轮复核更新。
