# Koa RESTful API

## 流程

### JWT 流程

```mermaid
sequenceDiagram
    client->>server:发送数据
    note right of server: 接收数据，生成 token<br/>设置过期时间
    server->>client:返回 token
    note left of client: 存储 token
    loop token 有效期间
        client->>server:携带 token 发送数据
        note right of server: 验证 token
        server->>client:响应
    end
```

### 测试流程

```mermaid
graph LR
postman --导出 JSON<br/>至项目下--> newman --读取 JSON 文件<br/>自动测试接口-->terminal
```

### 接口设计流程

```mermaid
graph TB
    subgraph 3.routes
    r1[确定请求方法]-->r2[确定请求路由 URL]-->r3[选择控制器方法]
    end
    subgraph 2.controllers
    c1[校验参数]--根据参数<br/>对 model 增删改查--> c2[其他逻辑]
    end
    subgraph 1.models
    m1[创建 schema] --选择数据结构<br/>建立关系模型<br/>确定数据显隐 -->m2[生成 model]
    end
```

## mermaid 初印象

### 使用体验
目前使用 vscode 写 mermaid，使用 markdown preview mermaid support 提供实时预览，简单体验了流程图、时序图、饼图、甘特图。优点，能够快速完成一些简单的流程图，且基于文本，方便管理版本。缺点：
+ github 不支持 mermaid 预览
+ 没有错误提示，难以定位错误
+ 流程图自动排版效果差，容易出现节点连线歪斜，节点大小各异的情况
+ 编辑体验糟糕。编写过程中，编辑区和预览区均会上下抖动

### 总结
+ mermaid 适合快速出图，结合文字辅助说明一些复杂逻辑，或者单独说明一些简单逻辑
+ 不推荐 mermaid 制作复杂流程图，一旦出错，很难定位
+ 推荐使用 mermain 制作时序图、饼图，两者样式变化少，不会出现流程图歪斜、大小异常的情况，甘特图书写起来文本量太大，也不推荐使用