# 通用 sku 组件

## 先渲染静态模板

    - 数据结构 


## 点击规格，更新选中状态

选中和取消选中实现

核心思路: 

  1. 如果当前已经激活了，就取消激活
  2. 如果当前未激活，**就把和自己同排的其他规格取消激活，**再把自己激活

响应式数据设计：
  每一个规格项都添加一个 `selected` 字段来决定是否激活，`true` 为激活，`false`为为激活

样式处理：
  使用selected 配合动态 class 属性， selected 为true 就显示对应激活类名

## 点击规格更新禁用状态 - 生成有效路径字典

## 点击规格更新禁用状态 - 初始化规格禁用

  

