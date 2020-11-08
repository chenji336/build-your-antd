# 构建自己的 antd 组件库

## 构建自己的样式

文件包含下划线：
- 代表是 partial(部分)，不会被编译成 css
- 只有在被 @import 时候才会被编译
- 被 @import 时候，需要去掉下划线

测试一下： `npx sass src/styles/_variables.scss var.css`，发现 var.css 是空文件

