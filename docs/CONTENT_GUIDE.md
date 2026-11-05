# 课程内容维护指南

## 文件关系

- `index.html`：页面结构、样式、搜索、章节导航、课程详情和本地课程编辑器。
- `content.js`：全部课程数据。网站通过普通script标签加载，不需要构建步骤。
- `.github/workflows/deploy-pages.yml`：提交到main后自动发布GitHub Pages。

## 课程数据字段

每门课程是一个对象，至少包含：

```js
{
  id: "llc-13",              // 唯一ID，建议模块-两位课号
  module: "llc",             // pfc / mag / llc / flyback
  number: 13,
  title: "课程标题",
  status: "full",
  summary: "核心原理",
  formula: ["公式1", "公式2"],
  waveform: "关键波形、正常形态和异常判据",
  selection: "设计计算、器件选型和最坏工况",
  debug: "调试步骤、测量节点和故障判断",
  mistakes: "常见错误及其后果",
  interfaces: "与前级、后级和系统控制的关系",
  questions: ["复习题1", "复习题2", "复习题3"],
  source_note: "适用条件、假设和资料来源说明"
}
```

## 发布步骤

1. 修改或新增 `content.js` 中的课程对象。
2. 保持每个 `id` 唯一，`module` 必须属于四个既定模块。
3. 更新首页的模块目标课数（`content.js` 中的 `modules[].total`）。
4. 本地打开 `index.html` 检查课程、公式、搜索和章节导航。
5. 提交 `content.js` 到 `main`，查看GitHub Actions部署结果。

## 工程内容审核清单

- 公式注明适用拓扑、工作模式和近似条件。
- 波形注明测量参考点、探头类型和预期工作状态。
- 计算覆盖最低/最高输入、轻载/满载、温度和器件公差。
- 选型核对耐压、电流、损耗、热阻、降额和安规。
- 故障分析先区分真实电流/电压异常与探头接法、带宽、接地引入的测量假象。
- 市电和高压母线操作必须列出隔离、放电和防触电要求。
