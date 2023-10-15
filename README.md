### 安装bun
```bash
# bun包管理器是一个快到飞起的包管理器
# 可以快速安装依赖，快速运行项目，快速打包项目，快速检查代码，快速发布项目
npm i -g bun
or
sudo npm i -g bun # mac或linux系统需要权限
```

### 安装依赖
```bash
# bun包管理器需要lockfile-version升级到3版本，frozen-lockfile参数锁定依赖版本
npm i --lockfile-version 3 --frozen-lockfile
bun install
```

### 运行
```bash
bun run dev:dev # 运行开发环境
bun run dev:prod # 运行生产环境
bun run dev:test # 运行测试环境
```

### 打包
```bash
bun run build:dev # 打包开发环境
bun run build:prod # 打包生产环境
bun run build:test # 打包测试环境
bun run build:analy # 打包生产环境并分析
```

### 代码检查
```bash
bun run lint:prettier # 检查代码格式
bun run lint:js # 检查代码
bun run lint:style # 检查样式
```

### 注意事项：
建议在项目中使用css变量（方便以后用js更改）     
eslint的东西不要乱改，不然会报错，如果有需要可以在.eslintrc.js中添加规则

### 参考文档
[react](https://react.docschina.org/)

[eact-router](https://reacttraining.com/react-router/web/guides/quick-start)

[redux](https://redux.js.org/)

[axios](https://www.axios-http.cn/docs/intro)

[prettier](https://prettier.io/)

[eslint](https://eslint.org/)

[webpack](https://webpack.js.org/)

[webpack-dev-server](https://webpack.js.org/configuration/dev-server/)

[TypeScript](https://www.tslang.cn/docs/home.html)

[postcss](https://www.postcss.com.cn/)

