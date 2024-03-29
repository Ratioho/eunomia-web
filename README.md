# Eunomia-Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

This is the web version of Eunomia - a time management app powered by electron. Using create-react-app for debug ease.

## 当前进度与规划

#### 0107

1. 设计 Todo 的假数据并用 js 导入进来调试
2. Tasks 任务界面：添加任务与显示
3. 具体任务的详情界面
4. 一进来默认的详情界面：时钟、具体任务、Notes
5. Today 界面中，点击某个任务，可以关联到其详情页中

数据结构想法：

Today中分两块。上面是有时间的 todoList，下面是没有时间的 reminder。

```
todoList = [{}, {}] todoListItem = {time: 00.00 - 23.59, content = "", type = "task/category/deadline/default", value = "work/default"}

state: type: category/task; value:work/app development/...
category: {
	work: {}
	fit: {}
}
task: {
	app development: {}
	calculus stream: {}
}
detailPage: render with type, value, and data
```

#### 0108

今天重新梳理已有代码并进行重构。

重构已经基本完成。接下来的任务：理清重要功能，每次都开发当下最重要的功能。

当下的重要功能：任务详情页在todo list上的开发。包括一个计时器（从零开始）、子任务栏、编辑按钮、总时长。

还是需要再去看一下 CSS 的盒模型。

#### 0110

今天要开发 default 任务详情页。

内容包括：一个表：从零计时。下面有已有任务，可以选择一个开始。

Thinking：初次进入的时候有两个选项。从任务启动和从 Todo List 启动。按照个人习惯配置。

#### 0118

今天和张导聊了聊。大概知道我们要做的是什么。现在的情况是要回归初心。

初心：就和我在 Evernote 上写计划表一样，就是一个规划今日干什么的界面。今天没完成的拖到明天。写写总结这样。

核心功能：今天要干什么。

功能实现方式：

- 每日重复的 Routine 自动添加
- 未完成的添加到第二天
- 长期计划在下面自动出现进行提示

功能交互方式：这个需要好好想。

举个例子：

```
口 十点：起床洗澡、刷牙。
口 做早饭、煮面、打个蛋吃。
口 十一点：去上班。
口 十一点到六点：上班、摸鱼写APP。
口 七点：吃晚饭、回家。
口 八点到十一点：推进APP开发。
口 十一点到一点：看电影、看书。

抽空要做的事情：制定一个比较合理的一日规划：三餐啊、健身之类的。现在三餐的时间不太对劲。
要买的东西：两节电池。三脚架。
要做的事情：收拾屋子、洗衣服、剃毛衣、整理床铺。
```

上述内容用一个编辑器，如印象笔记、苹果自带备忘录都能用。但是有一些功能缺失：

- 对于下面这些抽空做的事情，我想要标一下哪些已完成，并把没完成的搞到第二天去。
- 对于惯例、可以每天都添加，而不用我手动去改。
- 每天结束的时候自己一个个check或者搞到第二天去。类似于一个总结。
- 快速更改。比如说我八点到十点实际在玩手机，而开发APP反而在十点到十二点。类似的更改应当在归档时候得到体现。

怎么交互呢？

基本框架：有些事情是有时间节点的。比如说几点起床、几点上班。有些事情是没有时间节点的。比如说我就准备回家之后收拾屋子。不会写几点收拾屋子。有些事情是节点型事情，比如起床、去上班。有些事情是时间型，需要占用某个时间块。

怎么交互呢？

我所希望的交互方式是什么呢？

要能像这样的编辑器一样自由地撰写，但是要能方便之后的总结、添加、修改时间等等。



经过枢哥教导，我现在写个电梯宣言。

为了【目标用户】：

- 学生/自由职业者：需要每天对任务/事项进行规划的人群：拖延症患者

他们的【需求】：

- 深度拖延症患者需要将 little minor thing 明确地写出来并且有明显的完成反馈。
- 最根本的需求在于长时间的任务需要合理地切分到每一天中。我无法控制其具体时间。我可以去图书馆坐一下午，计划是写一会APP再搞一会Calculus。但我无法预计我几点开始，会搞到几点。

我们的【产品名字】：

- Eunomia

是一个【产品类型】：

- 时间管理、规划类的APP。

它可以【关键的优点，难以抗拒的使用理由】：

- 基于时间的思路。顺利地规划一整天，而不是添加任务到某一天去。
- 一整天的规划是有分类和困难的。比起任务要复杂很多。

而不像【主要的同类竞争者】：

- 滴答清单、todoist、番茄钟，等等。

我们的产品【主要不同点】：

- 比滴答清单好用：不是基于任务。一天就是添加一条条任务。它是时间管理。我把时间跪倒归到任务中去。



#### 0120

今天大概理清楚了日程页的交互。
同时也重写了 demo03. 目前聚焦于“今日日程”的交互。取消了 input box 的输入功能（暂时）。
目前的重点：为页面的state设计合理的管理方式。当前是所有事项是一个列表【】，这也是应该的。列表里是各事项元素{}，其中包含：key；type：时间点还是时间块；isChecked；isStashed；content。每个事项元素的具体内容可能后续还会有所变化，但当前应当就是这些，以后拓展也还算方便。
现在要考虑的事情是，我 check 了一个 checkbox，就需要改动深入到【{},...,{isChecked},】的某个值。用 setState 看起来就需要给每个更改单独写一个更改函数，并且重新赋值。
需要去看一下 useReducer，redux 的相关内容了。
当前日程管理的 todo list 是：
- state 管理，让 check 真正可用
  - 油管上学一下 useReducer。Note：一个叫做 Codevolution 的（似乎是）印度小哥，讲得很棒。
  - 尝试用个插件或者 prettier 的东西，规范化项目格式
  - 看一遍 redux 的 todo 怎么做的，和我们的大致一样
  - 用 useReducer 重写 state 管理
- 添加 stash、postpone 的 button，让 stash 可用
- input 输入框：添加事项
- 对某个事项的修改：
  - 事项内容：contentEditable 或者 draftJS
  - 事项时间：想想办法
- 文件存储：从文件当中 load 开始状态、添加存储功能与存储案件，保存内容
- postpone（拖一天）真正可用
- consider：replica（明日也这样）
- 块状时间的适配与样式调整：左侧纵向时间指示轴、是否按时间比例显示，等等。

这些写好了，日程管理就大抵可用。之后：任务链接的功能

- 日程管理页面，如果有没有具体时间的输入，自动添加到右侧任务列表当中
- 日程管理页面，如果有 @ 的具体任务，点击会链接到相应任务具体页面
- 具体任务页面应当提供：目前进度、用时、描述、子任务等信息。应结合一个番茄钟。
- 右侧任务列表里的每个小任务，应当可以便捷地标记完成并且自动添加到今日任务当中。
上述内容是核心功能。这些做好了，可以考虑：
- 日历/甘特图
- 统计数据/分析
- 笔记归类等功能



#### 0122

已完成：state管理、stash可用、input输入框添加事项可用。

当前要完成：修改事项（事项时间/事项具体内容）；文件存储；postpone（拖一天）可用。上述完成，则todo list基本可用。

优化方案：优化样式、块状时间的适配；时间比例显示；修改时间/事项的按钮样式与交互；是否按时间比例显示，等等。

任务链接：任务列表与链接，日后再说，好吧。



#### 0123

今天修改了一下时间块的样式，大致搞通了时间块的写法。现在先用默认的input。以后想优化了考虑换 Antd。

接下来大致需要重构一下 pageMain。重构之后，为 input 输入框添加时间逻辑。则 todo list 基本可用。

剩余工作：文件存储。

今日完成：初步完成 pageMain 的重构。接下来要尝试用 grid 重新为 agenda item 布局，并对时间块的指针样式进行细致修正。



#### 0127

今日把时间块基本写好。Agenda布局、指针样式修正基本搞定。

todo：

- input 输入框添加事项可用
- items 按时间排序
- input 部分的 Styling
- 主页面整个模块的重构、构成稳定版、发布到 master
- 可以开始搞任务链接了

#### 0129

今天开始动手任务链接了。初步添加了相关 Tab。发现了一个问题：我需要理清楚交互逻辑，以及 Task Tab 有哪些功能，如何设计、怎么交互。

先理清楚这些。

一个 task 应当包含如下信息：

题目

描述

子任务

时间信息（类甘特图生成）



```json
Example Task: App Development
{
	title: 'app development',
  description: "eunomia app",
  schedule: ['2020-01-01', '2020-02-20'],
  timeEstimated: 12000(minite wise),
  timeTaken: 2000(minite wise),
}
```

先开发 Schedule Page：按理来讲，首页右侧部分就是简化版的 Schedule Page。

先直接写 Schedule Page，把首页右侧部分直接引入 Schedule Page。按照单页面逻辑来写。从 list 到具体 task。编辑功能先不搞。

```json
Example Task State:
taskState: {
	'app development': {
    title: 'app development',
    description: "eunomia app",
    schedule: ['2020-01-01', '2020-02-20'],
    timeEstimated: 12000(minite wise),
    timeTaken: 2000(minite wise),
  },
  'calculus tutorial': {
  	title: 'calculus tutorial',
  	description: "make a video tutorial of calculus based on Stewart's textbook",
  	schedule: ['2020-01-01', '2020-03-30'],
  	timeEstimated: 34 * 60 min,
  	timeTaken: 0,
  }
}
```

Navigation 基本写完了。下一步优化某个 task 的具体详情页

详情页功能：开始/结束一个番茄钟。同步记录其时间。结束的时候记录一条到今日的日程当中。刷新详情页时间。双击可编辑。

有一个带 todo 和 详情页的 main page。还有一个仅 todo。还有一个 task 管理。双 tab。左侧列表，右侧详情。还有一个 page 是甘特图/分析。管理所有的任务。自动任务排期。给出统计数据：每日任务时长，等。





关于 react 的思考。之前写一些其他的UI框架，比如 pyqt 或者 java openJFX 之类的 UI 库的时候，似乎并不涉及这样 state 与 UI component 的区别。回头可以看一下。

React 是很好的，由逻辑生成UI，是很好的东西。但是关于 state 管理是个很奇怪的事情。以前写别的 UI 似乎也没有感觉到这种事情，可以回头看一下。

理想中的情况，父组件应当能够直接操控子组件的信息，实现一个 state 与组件的双向绑定。



#### 0208

梳理一下当前任务：

1. 重写整个 project。理清楚逻辑之类的。
2. 添加保存功能。先用 Cache 写。“明天再干”的按钮要有效。
3. 为任务添加可重复事项、子任务。
4. 任务栏：可以开始某个任务，记录到 Today 当中。
5. 上述写好之后，融入 eunomia 当中，保存功能适配。发布第一版。

有一个思想在于：要游戏化每日行为。完成一个 goal，可以视作游戏升级。整合 Apple 生态系统应该更加合理。睡眠/工作的最大效率，可以有一个排名。



#### 0223

架构重整基本完成。基本理清了整体架构。需要增加的功能列表：

```
添加功能
保存功能
明日再干
任务编辑
```



