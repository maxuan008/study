 /*egg
 |──零碎知识点
 │  require('') , require出了可以引入npm包的作用， 也可以引入指定文件（如：自己写的）并传递参数，达到一定效果;例：
 │    require(path.join(routerPath, filename))(app)
 │      解：通过require引入路由文件, 并传 app 参数， 可以实现在egg启动时， 将路由按功能进行切割而不需全部放在一个router文件中
 │
 │  loadToApp , 可以自己写成对象或类(class),  在根目录下的app.js使用此方法可以将其挂载到app下
 │
 │
 │
 │
 │
 │
 │
 │
 │
 │
 ├──框架应用
 │  *egg内置着一些主要的对象: app,ctx, req,res以及一些扩展对象controller, service, helper, config, logger
 │  
 │  *app是最主要的全局的应用对象, 可以轻松的将插件(通过npm安装)或自定义扩展应用（extend）挂载在app下。
 │   框架在运行时可以设置监听app事件(app.js):  server  error   request  response.
 │  
 │  *ctx是一个请求级的实例化对象,继承自 Koa.Context.每当受到一个请求时,框架会实例化一个ctx对象,这个对象封装了这次
 │   用户请求的信息,并提供了许多便捷的方法来获取请求参数或者设置响应信息.
 │   最常见的 Context 实例获取方式是在 Middleware, Controller 以及 Service 中
 │   -->重点：此时,框架会将所有的Service挂载在ctx上
 │   -->重点: 在有些非用户请求的场景下(比如我们自定义的对象中)我们需要访问 service / model 等 Context 实例上的对象,
 │            可以通过app全局对象创建一个匿名的ctx实例,方法如下：
 │             const ctx = app.createAnonymousContext(); await ctx.service.mx.fun();
 │
 │  *Request & Response 都是一个请求级的对象，封装了 Node.js 原生的 HTTP 对象，提供了一系列辅助方法获取 HTTP 请求常用参数。
 │   -->重点, 参数获取:  get --> ctx.request.query.id  , post --> ctx.request.body
 │
 │  *Controller & Service 框架约定对应目录下自定义对象都继承于这2个的基类， 基类有如下属性：
 │     ctx , app, config, service, logger, 自定义的对象中都可以使用  this.  方式直接获取这些属性
 │
 │  *Config 配置文件支持各个不同的运行环境使用不同的配置, 所有框架、插件和应用级别的配置都可以通过 Config 对象获取到
 │     获取方式 app.config  , 也可以在 Controller, Service, Helper 的实例上通过 this.config 获取到 config 对象
 │
 │
 │
 │
 │
 │
 │
 ├──中间件
 │  *egg的中间件是基于洋葱模型的,基于koa实现,每编写一个中间件,就相当于在外面包了一层。
 │    中间件中可以通过ctx获取http资源. 中间件中一般用于拦截用户请求， 并在它前后做一些事情,例如:鉴权，安全，访问日志。
 │    但是一些功能与请求无关的不适合用中间件去做: 定时任务， 消息订阅， 后台逻辑等等.
 │
 │
 │
 ├──插件
 │   *插件是egg的核心机制,不紧促进逻辑复用，还能构建生态圈的形成。
 │    一个插件就是一个‘迷你应用’,和应用app几乎一样。egg的插件都挂载在app全局对象上,这样可以方便使用。
 │
 │    *应用步骤如下:
 │       npm i egg-mysql --save 
 │        {
 │           "dependencies": {
 │           "egg-mysql": "^3.0.0"
 │           }
 │        }
 │
 │       // 使用 mysql 插件
 │       exports.mysql = {
 │       enable: true,
 │       package: 'egg-mysql',
 │       };
 │
 │    挂载在app下可以直接使用: app.mysql.query
 │
 │ 
 ├──定时任务
 │   *所有的定时任务都统一存放在 app/schedule 目录下，每一个文件都是一个独立的定时任务，可以配置定时任务的属性和要执行的方法。
 │    定时器中可以使用全局对象app
 │
 │
 │
 ├──框架扩展
 │   *框架提供了多种扩展自身全局对象的功能:其中包含 app  ctx  req  res helper
 │   app扩展: 框架会把 app/extend/application.js 中定义的对象与 Koa Application 的 prototype 对象进行合并，
 │   在应用启动时会基于扩展后的 prototype 生成 app 对象。
 │   
 │   方法扩展   例如, 我们要增加一个app.foo（）
 │
 │   // app/extend/application.js
 │   module.exports = {
 │    foo(param) {
 │       // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
 │    },
 |   };
 │   
 │   属性扩展
 │   const BAR = Symbol('Application#bar');
 │   
 │   module.exports = {
 │   get bar() {
 │     // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
 │     if (!this[BAR]) {
 │       // 实际情况肯定更复杂
 │       this[BAR] = this.config.xx + this.config.yy;
 │     }
 │     return this[BAR];
 │   },
 │ };
 │   
 │
 │
 ├──启动自定义
 │  在根目录下的app.js中进行启动自定义
 │  //app.js
 │    app.beforeStart(async () => {
 │   // 应用会等待这个函数执行完成才启动
 │  app.cities = await app.curl('http://example.com/city.json', {
 │     method: 'GET',
 │     dataType: 'json',
 │   });
 │   // 也可以通过以下方式来调用 Service
 │   // const ctx = app.createAnonymousContext();
 │   // app.cities = await ctx.service.cities.load();
 │ });
 │
 │ 
 │
 ├──egg启动方式
 │   1.在package.json文件中,按照命令如: npm run dev , 启动。
 │   2. dev： egg-bin dev.  系统首先会进入到node_modules\.bin目录
 │       如果系统是windows： 就会运行egg-bin.cmd
 │       如果系统是linux:  就会运行egg-bin脚本
 │   3.脚本中执行了 egg-bin/bin/egg-bin.js,  ==》require(..) ==》index.js，  然后一系列的egg框架机制开始启动。
 │   4.app启动过程中会自动加载 app/ 目录下的所有文件对象， 并依文件名 逐个挂载 ： app.server.file等。
 │       除此之外， 自定义的应用，也可以放到 app/ 目录下, 最终也会挂载到app下
 │
 │
 │
 │
 │ 
 │
 │
 │
 │
 ├──ORM框架 Sequelize ：
 │   1.egg-Sequelize安装后在config.sequelize设置好配置文件（如:mysql登录账号）, 并在plugin.js中开关打开。
 │   2.egg会自动加载 Sequelize , 并将插件挂载在app.Sequelize 
 │   重点： *** 3. 另外egg还会挂载一个 app.model 对象，并封装一些功能, 供db\目录下的 数据库表结构对象加载使用
 │
 │
 │
 │
 │
 │
 │
 │ 
 │
 │  
 │
 │
 │
*/


