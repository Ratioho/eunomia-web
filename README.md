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









