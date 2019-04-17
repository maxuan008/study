 /*react
 ├──概述
 │  *react是一套JS的库，主要用于构建UI
 │  *ReactDOM应该是框架中最常用的全局对象,
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
 │
 │
 │
 │
 │
 ├──安装使用
 │  *与webpack结合使用, webpack是什么
 │    
 │ 
 │
 │
 │
 ├──元素渲染与组件
 │   *元素是构成react应用的最小单位，用于描述UI上的内容。元素也是一个实例化的对象或(实例).
 │   *页面的渲染是使用了ReactDOM的render方法, render方法参数：
 │     参一:  元素对象, 可以是html字符串,也可以是函数,也可是对象.一般采用面向对象方式可以提高代码复用.
 │     参二:  document.getElementById('ID标签名')
 │   *更新元素渲染
 │     react元素都是不可变的， 当元素创建之后，是无法改变其内容或属性的。唯一的办法是创建一个
 │     元素然后重新渲染.  
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
 │
 │ 
 ├──JSX
 │    *JSX很像XML的JS语法库。 代码中不一定需要使用JSX， 但它有优势，建设使用
 │      1.JSX执行更快， 因为它在编译为JS代码后进行了优化.
 │      2.编译过程中就能发现错误
 │      3.使用JSX编写模板更简单快速
 │            ReactDOM.render(
 │                <h1>Hello, world!</h1>,
 │                document.getElementById('example')
 │           );
 │
 │    * React JSX 代码可以放在一个独立文件上，例如我们创建一个 helloworld_react.js 文件，
 │       然后在 HTML 文件中引入该 JS 文件
 │    
 │    *JavaScript 表达式
 │       在JSX中JS的表达式写在{ }中，如下：
 |           const myStyle={fontSize:100, color:'#ff0000'}
 │           ReactDOM.render(
 │               <div>
 │                  <h1 style = {myStyle}>{i == 1 ? 'True!' : 'False'}</h1>
 │               </div> 
 |                   { /*注释...*/}   
/*      
 │               ,
 │               document.getElementById('example')
 │           );       
 │       JSX中不能使用if else，但可以使用conditional(三元运算)
 │       样式,React推荐使用内联样式,如上示例代码
 │       JSX允许插入数组
 │        
 │
 │     
 │        
 │
 │     
 │        
 │  
 ├──组件
 │    *react组件就是上面提到的元素中, 实例化的对象或函数
 │      组件编写可以是对象也可以是函数,一般约定对象名以大写开头。下面以对象举例:
 │      class Welcome extends React.Component {   //继承React方式,可以继承对象的props方法
 │           render() {
 │              return{  <div>
 │                       <h1> Hello , {this.props.name} </h1>  //实例化过程中，猜测构造函数自动将传入参数挂载在props下
 │                      </div>
 │               }
 │           }
 │       }
 │   
 │
 │
 │   
 │
 ├──React State:状态
 │   *类中的state使用哨兵机制， 实例对象中this.setState的变动,都将被react监听到,并触发render() 相应的渲染用到使用state数据的地方。
 │      每个组件在应用中都是实例化的对象，因此组件之间相互对立，state状态也将独立。
 │   *组件中有时会使用子组件，实质是主类render()方法中,实例化其它对象.将主类中的参数传递到引用的实力对象中，
 │      因此，react在渲染时遵循原则: 一：各种组件相对独立，互不影响。 二:数据自父组件向子组件自顶向下‘单向’流动.
 │   *----->this.setState(prevState=>({x})) ,更深理解待实践, 改变state参数数据.  │ 
 │         -->  this.setState似乎是一个数据监听的函数， 当传入的数据发送改变就会直接渲染到页面上.
 │              this.setState会触发实例的render() , 故会重新渲染页面.
 │ 
 │   
 │
 │    
 ├──React Props
 │      * 字段props作为对象的重要属性, 实例化过程中传入的参数都挂载props上, 用法: this.props.X
 │      *----->更深的理解待实践 
 │
 │
 │
 │
 ├──React 事件处理
 │      *直接解析官网demo:
           class LikeButton extends React.Component{
               constructor(){ //构造器
                    super();   //待研究
                    this.state = {liked: false}     //动态数据
               //这里就是事件的绑定,最主要的作用是: 当对象实例化后函数体中需获取实例本身即(this),
               //以便获取上下文数据
               this.handleClick = this.handleClick.bind(this)
               }

               //相比prevState方式获取state数据,个人更倾向下面这种写法(通过this获取)
               handleClick() {
                   this.setState({liked: !this.state.liked})
               }

               render(){ //渲染方法
                 const text = this.state.liked ? 'liked': 'haven\'t liked'
               }
           }

           ReacDom.render(  //开始渲染页面
             <LikeButton /> , // 实例化对象
             document.getElementById('example')  //指定Dom
           ) 
    --or--  在es6中也有箭头函数的写法=> ， 可以在render方法中绑定this
           ReacDom.render(  //开始渲染页面
             <LikeButton onClick={()=>this.bandleClick() } /> , // 实例化对象
             document.getElementById('example')  //指定Dom
           ) 
 │        
 │
 │  
 │
 │
 ├──条件渲染
 │
 │ 
 ├──列表 & keys
 │
 │
 │
 │
 │
 │
 │
 │
 ├──React 组件API
 │
 │    设置状态：setState
 │
 │ 
 │
 │
 │
 │
 │
 │    替换状态：replaceState
 │
 │
 │
 │
 │
 │    设置属性：setProps
 │
 │
 │
 │
 │
 │    替换属性：replaceProps
 │    
 │    
 │    
 │    强制更新：forceUpdate
 │ 
 │
 │    获取DOM节点：findDOMNode
 │
 │    判断组件挂载状态：isMounted
 │
 │
 │
 │
 │
 │
 │
 │
 ├──React 组件生命周期
 │
 │ 
 │
 │
 │
 │ 
 │
 ├──React Refs
 │ 
 │
 │
 │
 │ 
 │
 │ 
 ├──React 组件生命周期   React Refs
 │
 │ 
 │
 │ 
 │
*/


