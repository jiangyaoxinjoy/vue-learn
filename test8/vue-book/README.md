###vuex功能
- 组件之间交互，代替eventBus
- 借鉴了(flux，redux)，vuex只能在vue中使用
- vuex为了大型项目，只要是状态管理，将数据统一管理

###安装
```
cnpm i vuex -S
```
###vuex特点
- 单向数据流

###修改vuex的state数据
- state的值可以直接渲染组件
- 但不能组件直接修改state的值(单向数据流)
- 通过mutations(突变) -> state
  - 如果有后台接口通过Action提交一个mutation，
  - 不是后台接口可以直接通过组件提交一个mutation
###mutations
- 修改state
- `this.$store.commit('xx'，param)`;
   - 提交一个命名为xx的mutation
   - param 载荷,传入额外的参数,可选
###mutations-type.js
- 使用常量替代 Mutation 事件类型  
```
mutations-type.js
export const SOME_MUTATION = 'SOME_MUTATION'
```
```
mutation.js
import { SOME_MUTATION } from './mutation-types'
 [SOME_MUTATION] (state) {
      // mutate state
    }
```
- 这样写我们使用mutation方法就会有提示，不会敲错。
   
###vuex的logger插件
- 在控制台打印日志   

###getters
- state相当于自己的data，mutations相当于自己methods
- getters相当于组件的computed

###辅助函数 语法糖
`import {mapState} from 'vuex'`
- 在我们使用state数据时，this.$store.state.xxx太长了
