# fed-e-task-02-01

## 简答题
### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

- 前端工程化是遵循一定的标准和规范，通过工具去提高效率和降低成本，保证项目质量的一种手段。
一切重复的工作都可以被自动化。工程化的一切归咎于node，让javascript有了更大的舞台。工程化包括了几个方面：脚手架工具开发，自动化构建系统，模块化打包，项目代码规范化，及自动化部署。

- 主要表现如下：
1. 在创建项目阶段，可以利用脚手架工具创建项目结构，创建特定类型的文件
2. 在编码环节，可以借助工程化工具对代码进行格式化，代码风格校验，确保项目代码质量，同时可以借助编译工具对代码进行编译，构建及打包，从而提高代码开发的效率
3. 预览环境，可以提供热更新，source map定位源代码，使用mock
4. 代码提交环节，可以使用git hooks lint-staged，可以整体检查代码风格及质量，有利于持续集成
5. 部署环节，可以使用命令自动发布
工程化常见的工程化集成 create-react-app vue-cli angular-cli gatsby-cli
工程化的常用脚手架工具 grunt gulp fis 等


- 工程化能够解决的问题：
1. 浏览器不支持es6+新特性
2. 用less/sass等提高css的编程性，运行环境不能直接支持
3. 想要使用模块化的方式提高项目的可维护性，不能直接被支持
4. 部署上线前的手动压缩代码及资源文件，手动上传代码到服务器
5. 多人协作开发，无法硬性统一大家的代码风格，从仓库中pull回来的代码质量无法保证
6. 部分功能开发时需要等待后端服务接口提前完成

### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

脚手架除了为我们创建项目结构，还提供了项目的规范和约定，相同的模块依赖，工具配置及基础代码，可以让我们在开发新项目的时候从大量的重复工作中解放出来，将精力和时间能更好的投入在项目开发上

## 编程题
### 1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具
```
大部分脚手架的启用时自动询问一些预设问题，将回答的结果结合模板文件生成一些项目的结构，脚手架应用实际上是一个node cli应用。

代码见 code / 01
```
### 2、尝试使用 Gulp 完成 项目 的自动化构建

```
代码见 code / 02
```
### 3、使用 Grunt 完成 项目 的自动化构建

```
代码见 code / 03
这块作业没有认真实现，主要写完作业我还要加班，哭，老师，我后面会补的

```

2-3 题基础代码下载地址：https://raw.githubusercontent.com/lagoufed/fed-e-001/master/tasks/02-01-base-code.zip

说明：
本次作业的中的编程题要求大家完成相应代码过后，录制一个小视频简单介绍一下实现思路，演示一下相应功能。最终将录制的视频和代码统一提交至作业仓库。

