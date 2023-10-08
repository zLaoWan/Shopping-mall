// vue插件一定暴露一个对象
let myPlugins = {}

myPlugins.install = function(Vue, options) {
  // console.log(Vue)
  // console.log(options)
  // Vue.prototype.$bus
  // Vue.directive
  // Vue.component
  // Vue.filter...
  Vue.directive(options.name, (element,params)=> {
    element.innerHTML = params.value.toUpperCase()
  })

}

export default myPlugins
