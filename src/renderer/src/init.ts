window.onerror = function (message, source, lineno, colno, error) {
  if (window.logger) {
    window.logger.error({ message, source, lineno, colno, error })
  }
}

window.addEventListener('unhandledrejection', function (event) {
  const error = event.reason

  if (window.logger) {
    window.logger.error(error)
  }
  // 阻止console输出错误信息
  //event.preventDefault()
})
