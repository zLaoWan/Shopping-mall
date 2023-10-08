
// 封装防抖
export const debounce = (fn, dalay)=> {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, dalay)
  }
}

// 封装节流
export const throttle = (fn, delay)=> {
  let valid = true
  return function () { 
    let context = this
    let args = arguments
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(()=> {
      fn.apply(context, args)
      valid = true
    }, delay)
   }
}
