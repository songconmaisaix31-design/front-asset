# 唯一任务看板

## 当前执行规则（用户更新，优先于下方历史）

用户已取消固定 Token 数量管控；不再按总输入、总输出、E1/E2/E3 Token 配额暂停任务。按难度选模型，确定性处理优先工具。余额百分比保留规则未取消；最新周额度剩余 22%（Orca updatedAt 1789049637651）。

恢复轨道：CAP-02 Terra medium（Cosmograph 实际首包，references/cosmograph/parts/CAP-02/）；REF-02 Luna low（Obsidian 官方图与来源许可复核，references/obsidian/parts/REF-02/、references/cosmos-gl/parts/REF-02/）；首包通过后 MOT-01 Terra low（镜头采集，独立来源 parts/MOT-01/）；最后 INT-02 Terra low（合并、reviews/、recipes/）。各轨独立 worktree/branch 与本地原件目录，不重复采集已有首图/源码。禁止产品开发规则不变。

下方是上一轮历史，Token 预留与中止阈值已失效；不会删除或改写历史提交。

目标：自然星空入口 → 点击进入 → 可探索 Agent 星群的证据资产库。

|任务|责任/写域|执行与预算|状态|
|---|---|---|---|
|CONTROL|主控；根文件、catalog/、最终选用索引|当前主控模型未核实，保守计 E3；不宣称降档；软预留 4000|初始化|
|CAP-01|Cosmograph 首份浏览器包；references/cosmograph/parts/CAP-01/；独占隔离浏览器与 .local-captures/CAP-01/|E2 gpt-5.6-terra low；软预占 3000|待派发/配置验证|
|SRC-01|cosmos.gl 固定源码与许可；references/cosmos-gl/parts/SRC-01/、reusable/cosmos-gl/；.local-captures/SRC-01/|E1 gpt-5.6-luna low；软预占 2000|待派发|
|REF-01|自有首图与 Obsidian 官方间接证据；owned/hero/、references/obsidian/parts/REF-01/；.local-captures/REF-01/|E1 gpt-5.6-luna low；软预占 2000|待派发|
|INT-01|独立整合 worktree 合并、确定性检查、reviews/ 与 recipes/；不改来源内容|E2 gpt-5.6-terra low；后续预占 2000|依赖以上完成|

首批 Worker 生成预占 7000，属于全任务共享总账，不是硬限额。根文件由主控唯一维护。Worker 独立 worktree/branch，实际 ID 与 SHA 后续补记。最多一次有新依据的返修。不递归拆分。镜头任务只在首包通过及额度允许后追加。

顺序：基线提交 → CAP-01 实际模型验证 → 独立任务并行 → 首包审查 → 必要补缺 → INT-01 → 主控总索引与推送。每轨只提交已审查可公开材料；普通 push 已由用户总协议授权，原件永不推送；不创建远端、不改可见性。


## 最终状态：预算中止

|任务|实际分支 / Commit|结果|
|---|---|---|
|CAP-01|songconmaisaix31-design/asset-cap-01 / aab6beaeaa8f70598c6a4810e1d356eeeccb28e9|仅失败/缺口元数据，无视觉包|
|SRC-01|songconmaisaix31-design/asset-src-01 / 84f801f（前序 58df384）|8 个静态文件 + MIT；修正首轮漏许可证问题|
|REF-01|songconmaisaix31-design/asset-ref-01 / b6e552e5e4bfac357c0966bb5e60f6f919232722|首图与官方文本；Orca 完成回执被拒绝|
|INT-01|未派发|预算上限禁止新增；主控仅保全/合并/许可补正/总索引|
|镜头/补位|未派发|预算停止|

基线 2c9904b561e0704d7360a8ed327be8b9b6c7cf05。全部 Worker worktree 保留于 Orca 的 front-asset 工作树目录，主库 .local-captures 已核对复制 12 原件。预算记录以 catalog/budget.json 为准；原定预留不等于实际使用。主控发现遥测过晚，超出输入上限；收尾额外消耗亦计入，不能声称预算合规。未创建独立 Kernel、新调度器或产品代码。


## 本轮最终交付（恢复采集后）

- CAP-02：0e915281f95031fd20118fd3eab4221bed81f098，已归档；主控后续复核恢复有效放大帧与视频。
- REF-02：cf36c50d587b5ec4b660cefb1a259f13ef53ff3a，已归档；实际成果分支 asset-ref-02，已移回专属 worktree。
- MOT-01：924b19cca1fcaf338cccda6d905ab00ca851c022，Stars 成功进入场景，Star Atlas 阻塞。
- INT-02：独立工作树已合并三个来源至 f2895ca；终端沙箱/投递受阻，主控完成最终验收和提交，非独立审查通过。
- 91 条资产记录，2 段推荐短片，内部参考联系表；具体范围和差异以 catalog/CLOSEOUT.md、reviews/REVIEW.md、catalog/assets.json 为准。
- 固定 Token 管控已取消。最新可见周余额 19%，数据可能延迟；停止新增采集和模型任务，未开发前端。
