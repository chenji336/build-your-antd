# 构建自己的 antd 组件库

## 构建自己的样式

文件包含下划线：
- 代表是 partial(部分)，不会被编译成 css
- 只有在被 @import 时候才会被编译
- 被 @import 时候，需要去掉下划线

测试一下： `npx sass src/styles/_variables.scss var.css`，发现 var.css 是空文件

## story book

react-docgen 可以自动生成文档， react-docgen-typescript-loader 用于 typescript 格式

遇到的问题：stories 中没有自动生成文档的一些内容，比如注释、control 中的类型

解答：react-docgen-typescript-loader Limitations: https://github.com/strothj/react-docgen-typescript-loader#limitations
- React.xxx 中的 xxx 都需要 import 引入，然后使用
- export Names

