### 说明

-   此分支用于复现 [issue#1](https://github.com/HenryC-3/zhihu-RESTful-API/issues/1#issue-793179386) 中描述的问题

### 描述

-   预期结果: 成功连接 MongoDB Atlas 后, 发送 GET 请求, 响应状态码应为 200, 响应体应为用户数据
-   实际结果: 响应状态码为 404, 响应体为错误堆栈
