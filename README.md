# 星空视觉前端资产库

**预算中止归档；核心视觉/交互采集未完成。没有开发前端。**

- [交付范围、许可与缺口](catalog/CLOSEOUT.md)
- [纠正后的资产总索引](catalog/assets.json) · [文件与哈希](catalog/file-inventory.json)
- [预算及实际模型记录](catalog/budget.json) · [原件保全记录](catalog/preservation.json)
- [唯一任务看板](TASKS.md) · [采集规格](CAPTURE_SPEC.md)

推荐入口：用户提供的原图 `.local-captures/REF-01/hero-original.png`，1672×941，原件未改；只在本机保留。星点/细线/标签目前只有 Obsidian 官方文字间接参考，没有图谱截图。缩放/选择/进入镜头没有成功录屏，不能用于运动还原。

源码起点：`reusable/cosmos-gl/src/index.ts`、`src/config.ts` 和 `docs/picking/README.md`；固定官方提交 `ce35edacf94dba1f02ef2b47957e937e4c9acf17`，MIT 正文见同目录 LICENCE。这是静态局部摘录，依赖与示例缺文件，未运行，不是可直接启动的项目。

公开仓库原有 LICENSE 保留，仅覆盖本库原创内容；第三方按自身许可。未确认可再分发的首图与网页原件留在忽略区，不随 clone 提供。共保留 28 份来源材料/片段文件，其中 12 份本地原件（含 8 份源码备份）；有效图像仅用户首图 1 张，网页截图与真实录屏均为 0。详情见清单。

验证：`python catalog/verify.py`（需现有 Pillow）；标准 JSON/图片解码通过，原始 JSONC 不作严格 JSON 校验。源码未执行，交互未验收。后续等待新的采集或前端指令，本轮已经停止。
