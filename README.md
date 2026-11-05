# 电源系统工程学习平台 · Power Electronics Academy

面向电源硬件工程师的中文知识库，按 **PFC → 高频变压器/磁性器件 → LLC → 反激 Flyback** 的顺序组织。

## 学习场景

- AC 输入：85～264Vac（具体课程会注明适用边界）
- PFC 母线：约 390～400Vdc
- 功率平台：600W～1kW PFC + LLC
- 重点：核心原理、关键电压/电流波形、公式推导、器件选型、调试方法、故障诊断、前后级关系和复习题
- 工程专题：800W 半桥 LLC（60～93V、2～8A、同步整流）及 65W 宽输入反激案例

## 课程目录

| 阶段 | 当前收录 | 说明 |
|---|---:|---|
| PFC | 22课 | CCM Boost、控制环、EMI、磁件、保护与验证 |
| 高频变压器 / 磁性器件 | 12课 | 磁路、材料、气隙、绕组、损耗与测试 |
| LLC | 12课 | 半桥LLC、FHA、ZVS、SR、数字调频与800W实例 |
| 反激 Flyback | 10课 | DCM/CCM/BCM、Lm、钳位、反馈与65W实例 |

## 本地预览

直接用浏览器打开 `index.html` 即可。网站不依赖构建工具或后端服务。

## GitHub Pages 发布

仓库已包含 `.github/workflows/deploy-pages.yml`。在 GitHub 仓库：

1. 打开 **Settings → Pages**。
2. 在 **Build and deployment → Source** 选择 **GitHub Actions**。
3. 推送 `main` 分支后，Actions 会自动构建并部署。
4. 在 **Actions** 中确认 “Deploy Power Electronics Academy” 成功。

预期网址：<https://byronHunag.github.io/power-electronics-academy/>

## 更新课程

- 页面右上角“新增课程”可录入课程八个部分。
- “保存本机课程”只保存在当前浏览器，不会自动同步到其他设备。
- 点击“导出更新文件”下载新的 `content.js`。
- 将 `content.js` 替换仓库中的同名文件并提交到 `main`，GitHub Actions 自动重新发布。
- 直接编辑 `content.js` 也可以更新课程。字段结构见 `docs/CONTENT_GUIDE.md`。

## 内容说明

课程为工程化学习讲义和设计起点。公式通常为理想化或一阶估算关系；实际设计必须按控制器数据手册、磁芯厂商曲线、器件降额、适用安规/EMC标准和样机测试复核。涉及市电和约400V直流母线的实验，必须使用合格隔离/差分测量设备并遵守实验室高压安全规范。
