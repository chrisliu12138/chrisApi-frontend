# Frontend



## Environment Prepare

用Webstorm打开chrisApi-frontend文件夹

1. Install yarn:
```bash
npm install --global yarn
```

问题：yarn : 无法加载文件 yarn.ps1，因为在此系统上禁止运行脚本

解决：修改安全策略：

打开``powershell``，以管理员身份打开
``set-ExecutionPolicy RemoteSigned``，选择Y
``get-ExecutionPolicy`` 查看是否为``RemoteSigned``

2. Install pnpm:
```bash
npm install pnpm -g
```

3. 加载依赖 Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project


``C:\Users\DELL\AppData\Roaming\npm\pnpm.cmd run dev``

info  - Umi v4.0.61
info  - Preparing...
```
        ╔════════════════════════════════════════════════════╗
        ║ App listening at:                                  ║
        ║  >   Local: http://localhost:8000                  ║
ready - ║  > Network: http://10.102.11.197:8000              ║
        ║                                                    ║
        ║ Now you can open browser with the above addresses↑ ║
        ╚════════════════════════════════════════════════════╝


event - [Webpack] Compiled in 6632 ms (493 modules)
info  - [MFSU] buildDeps since cacheDependency has changed
```

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
