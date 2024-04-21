# 脚手架构建





## 前端脚手架构建

### 1.项目初始化

构建前端项目，搭建基于react的ant design pro项目脚手架，注意项目版本依赖问题（如果nodejs版本不兼容则适当调整即可）

```powershell
# 使用 npm 加载脚手架
npm i @ant-design/pro-cli -g
# 创建前端项目
pro create noob-frontend

# 选择umi版本（可以尝试umi4踩新坑,umi3提示选择简单还是全量脚手架），原使用umi3 simple

# 进入指定项目安装项目依赖
cd noob-frontend
tyarn 或者 npm install

# 脚手架初始完成，进入开发状态
npm run start

# 项目启动完成访问http://localhost:8000/,第一次初始化加载会比较慢

```

​	查看package.json文件，对照相应的启动命令看其配置，如果执行`npm run dev`命令本质上执行的是`start：dev`，可以看其指令配置中MOCK=none，由于此时还没有接入后台数据接口，因此需要借助MOCK模拟数据接口实现访问。重启项目`npm run start`访问，然后登录访问主页（start以模拟数据方式运行，dev命令禁用了MOCK调用自己定义的后端）

​	项目构建完成，引入git仓库做版本管理



### 2.项目瘦身

 框架本身生成的东西有很多，但实际上一些小型项目中不需要引用这么复杂的内容，为了优化代码结构，此处通过清理项目一些可能不会用到的东西给项目瘦身

#### （1）国际化移除：/src/locales

​	国际化：集成了多种语言：中文、英文... ，考虑项目主要在国内访问，去除国际化配置；如果要使用国际化，还要去配置不同语言的引用

​	在package.json文件中找到`i18n-remove`，这里提供了移除国际化的脚本（ "i18n-remove": "pro i18n-remove --locale=zh-CN --write",），执行指令（如果指令执行失败，参考[官方解决方案](https://github.com/ant-design/ant-design-pro/issues/10452)）

```shell
pro i18n-remove --locale=zh-CN --write

# 指令执行出错，参考官方解决方案，此处参考引入依赖后再次尝试
yarn add eslint-config-prettier
yarn add eslint-plugin-unicorn

或者执行：yarn add eslint-config-prettier --dev yarn add eslint-plugin-unicorn --dev 

修改：
node_modules/@umijs/lint/dist/config/eslint/index.js
// es2022: true
```

​	奇奇怪怪的问题：在vscode中执行指令报错，但是通过cmd窗口执行指令正常（指令执行完毕移除了一些关联配置）



![image-20240416215904248](http://cos.holic-x.com/full-stack/_post/image-20240416215904248.png)



​	指令执行是为了移除国际化相关配置文件，需要**手动移除locales文件夹**，完成清理后重启项目检查是否正常运行

​	重启项目如果报错则进一步排查（例如移除国际化出现SyntaxError: Export 'SelectLang' is not defined，参考[官方解决方案](https://github.com/ant-design/ant-design-pro/issues/11143)：将src/components/index.js 中的 SelectLang 变量删除）

![image-20240416220911174](http://cos.holic-x.com/full-stack/_post/image-20240416220911174.png)

> 常见问题处理：左侧菜单栏不显示

​	需要修改路由配置，给config/route.ts中配置的路由都加上name属性（随后重启项目尝试访问）

### 3.前端模板优化

#### 🚀项目结构梳理

了解项目结构和内容，把一些不需要用到的东西清理掉



![image-20240417205740212](http://cos.holic-x.com/full-stack/_post/image-20240417205740212.png)



| 项目结构                                                     | 说明（❌表示可删除）                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| .husky                                                       | 检查提交的代码，是否规范（代码检验的小工具）                 |
| config                                                       | umi配置（包括路由、构建等配置）                              |
| config.ts                                                    | Ant Design Pro核心配置（整个项目所用框架配置）               |
| defaultSetting.ts                                            | Ant Design Pro默认配置                                       |
| opeapi.json                                                  | 示例数据（❌）                                                |
| proxy.ts                                                     | 代理（便于本地开发）                                         |
| router.ts                                                    | 定义网页路由（输入网址跳转页面）                             |
| mock                                                         | 本地模拟数据（❌）                                            |
| public/icons                                                 | icons目录存放页面图标（❌）可以引入自定义图标                 |
| src/.umi                                                     | 框架自动生成的隐藏文件（可不管）                             |
| src/components                                               | 业务通用组件                                                 |
| src/locales                                                  | 国际化资源（❌）搭配去除国际化指令删除                        |
| src/pages                                                    | 业务页面入口和常用模板                                       |
| src/service                                                  | 后台接口服务                                                 |
| access.ts                                                    | 控制页面访问权限                                             |
| app.tsx                                                      | Ant Design Pro框架的主要文件                                 |
| global.less                                                  | 全局样式                                                     |
| global.tsx                                                   | 全局JS                                                       |
| manifest.json                                                | 开发app或者h5网页指定多种不同配置（此处可❌）<br />例如：生成项目名称、项目图标尺寸等（打包的时候用到） |
| requestErrorConfig.js                                        | 控制前端页面发送请求的配置                                   |
| service-worker.js                                            | h5网页离线时优化页面的体验                                   |
| tests                                                        | 测试工具（❌）                                                |
| types                                                        | ❌                                                            |
| .editorconfig<br />.eslintignore<br />.eslintrc.js<br />.prettierignore<br />.prettierrc.js | 保证前端项目代码规范                                         |
| jest.config.ts                                               | 单元测试框架                                                 |
| jsconfig.json                                                | 控制语法                                                     |
| README.md                                                    | 项目默认文档                                                 |



#### 🚀图标替换

> 图标替换：[iconfont](https://www.iconfont.cn/activity/entries/all?activity_id=1)

public目录：（svg下载）logo.svg替换、（png下载）favicon.ico替换

![image-20240417211725596](http://cos.holic-x.com/full-stack/_post/image-20240417211725596.png)



> 标题替换

​	【ctrl+shift+F】将原有Ant Design Pro相关的内容替换为项目相关



#### 🚀项目文本替换

​	将原有框架的一些默认预设文本调整为自身项目所需（可以通过前端页面全局搜索替换，也可对应到文件中精准替换）

##### （1）登录页面

​	文件：`src/pages/User/Login/index.tsx`，修改登录页面组件内容

​	![image-20240421085504844](01-frontend-脚手架构建.assets/image-20240421085504844.png)











##### （2）系统主页（默认欢迎页）

文件：`src/pages/Welcome.tsx`









##### （3）底部栏定义

文件：`src/components/Footer/index.tsx`

![image-20240421085859019](01-frontend-脚手架构建.assets/image-20240421085859019.png)









#### 🚀样式替换

​	脚手架提供的页面上的样式更换按钮可以自己选择，点击设置样式，选择自己喜欢的样式配置进行更改，选择完成【拷贝样式】

​	文件：`config/defaultSettings`

![image-20240421090625132](01-frontend-脚手架构建.assets/image-20240421090625132.png)



【1】拿到自定义配置，修改：config/defaultSettings默认内容

```tsx
// 原defaultSettings默认内容
import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ant Design Pro',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;

```

```json
# 参考拷贝配置
{
  "navTheme": "light",
  "layout": "top",
  "contentWidth": "Fluid",
  "fixedHeader": false,
  "fixSiderbar": true,
  "colorPrimary": "#FAAD14",
  "splitMenus": false
}
```

![image-20240421091518525](01-frontend-脚手架构建.assets/image-20240421091518525.png)

【2】修改app.tsx文件

```
import defaultSettings from '../config/defaultSettings';
settings={defaultSettings}
```

![image-20240421091054310](01-frontend-脚手架构建.assets/image-20240421091054310.png)

![image-20240421092102679](01-frontend-脚手架构建.assets/image-20240421092102679.png)



## 前后端联调



> OpenAPI

​	使用Ant Design Pro自带的openAPI工具，根据后端swagger接口文档，自动生成对应请求的service代码

​	前端项目配置：config/config.ts配置openAPI参数：schemaPath

```tsx
openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // 或者使用在线的版本
      schemaPath: "http://localhost:8101/api/v2/api-docs",
      projectName:"noob-bi",
      // schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    }
  ],
```

​	打开package.json，执行openapi指令，生成swagger文件（在services目录多出一个noob-bi目录，里面自动生成调用后端指定接口的方法代码）（终端输入`yarn run openapi`）





### 1.登录模块



> 无用代码清理

​	删除pages/User/Login下的`_snapshots_/login.test.tsx.snap`

​	pages/User/Login/index.tsx文件中的`<Lang />`飘红，没有用到直接删除（Lang配置相关）

![image-20240417213507587](http://cos.holic-x.com/full-stack/_post/image-20240417213507587.png)

​	删除自动登录、其他登录方式、手机号登录登相关代码

![image-20240417214123121](http://cos.holic-x.com/full-stack/_post/image-20240417214123121.png)



![image-20240417214103834](http://cos.holic-x.com/full-stack/_post/image-20240417214103834.png)



​	忘记密码？调整为注册（实现注册接口）

![image-20240417214604885](http://cos.holic-x.com/full-stack/_post/image-20240417214604885.png)



​	调整完成页面参考如下所示

![image-20240417214703754](http://cos.holic-x.com/full-stack/_post/image-20240417214703754.png)

> 登录功能实现

​	关注`<LoginForm>`组件实现，将用户输入的内容（key）替换为后端对应的内容即可（查看登录接口请求参数即可）

​	name =》userAccount、password=》userPassword

​	可修改placeholder属性（输入提示）

![image-20240417215046560](http://cos.holic-x.com/full-stack/_post/image-20240417215046560.png)

​	删除错误填写验证相关

![image-20240417215400979](http://cos.holic-x.com/full-stack/_post/image-20240417215400979.png)



> 后端接口对接

定位onFinish=》当用户点击登录后执行handleSubmit方法，将LoginParams调整为后端的

![image-20240417215935916](http://cos.holic-x.com/full-stack/_post/image-20240417215935916.png)



handleSubmit&fetchUserInfo修改：

<img src="http://cos.holic-x.com/full-stack/_post/image-20240417220220507.png" alt="image-20240417220220507" style="zoom: 80%;" /><img src="http://cos.holic-x.com/full-stack/_post/image-20240417220240652.png" alt="image-20240417220240652" style="zoom: 80%;" />

```tsx
/**
   * 登陆成功后，获取用户登录信息
   */
  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGet();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  /*
  useEffect(()=>{
    listChartByPageUsingPost({}).then(res=>{
      console.error('res',res)
    })
  })
  */

  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost(values);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
```

​	如果userName、userAvatar没有显示可以在后台数据库中补充（后续再完善代码细节），完成上述步骤启动登录验证接口是否调通

> 清理未引用的内容

VSCode快捷键（shift+alt+O）

![image-20240417220912002](http://cos.holic-x.com/full-stack/_post/image-20240417220912002.png)



> 全局状态保存

​	app.tsx文件，找到getInitialState函数修改。然后按【shift+alt+O】清理无用引用

![image-20240417221303168](http://cos.holic-x.com/full-stack/_post/image-20240417221303168.png)

```tsx
export async function getInitialState(): Promise<{
  currentUser?: API.LoginUserVO;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await getLoginUserUsingGet();
      return res.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      currentUser,
    };
  }

  return {};
}
```

> 头像加载

​	登录后访问发现头像转圈圈没有加载进去，数据库中用户对应userAvatar要配置为对应头像链接

​	修改app.tsx的头像配置

![image-20240417221753950](http://cos.holic-x.com/full-stack/_post/image-20240417221753950.png)

​	修改用户名配置：src/compontents/RightContent/AvatarDropdown.tsx（头像下拉框），将name修改为userName

![image-20240417222040644](http://cos.holic-x.com/full-stack/_post/image-20240417222040644.png)

​	此处继续访问发现登录跳转页面后还是无法加载，排查**loading**组件（打印登录用户信息发现没有数据）发现还是没有登录（说明用户登录状态没有保存成功）

![image-20240417222940912](http://cos.holic-x.com/full-stack/_post/image-20240417222940912.png)

需要在app.tsx中配置`withCredentials: true`

```tsx
export const request = {
  baseURL:"http://localhost:8101",
  withCredentials: true,
  ...errorConfig,
};
```

![image-20240417223247236](http://cos.holic-x.com/full-stack/_post/image-20240417223247236.png)





> errConfig配置(requestErrorConfig.ts配置)

​	可以将requestErrorConfig.ts重命名为requestConfig.ts（这个文件中定义了请求处理、请求拦截器、响应拦截器）。（重命名需注意app.tsx的引用也要相应修改）

​	请求拦截器中给所有的请求都加上了token字段，可以将这部分注释掉，这样通过F12查看接口看起来简洁一点

![image-20240417223909992](http://cos.holic-x.com/full-stack/_post/image-20240417223909992.png)

![image-20240417223940650](http://cos.holic-x.com/full-stack/_post/image-20240417223940650.png)





​	清理TableList（前后端联调这部分的内容没有后端接口会报错）：删除page/TableList文件夹，去除路由

