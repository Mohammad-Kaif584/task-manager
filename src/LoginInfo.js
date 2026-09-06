
const setLoginInfo = (data) => {
    sessionStorage.setItem("Login", JSON.stringify(data))
}
const getLoginInfo = () => {
    return JSON.parse(sessionStorage.getItem("Login"))
}
const clearLogIninfo = () => {
    return sessionStorage.clear("Login")
}
export { setLoginInfo, getLoginInfo, clearLogIninfo  }