export function getToken(){
    return localStorage.getItem("token");
}
export function getRole(){
    return localStorage.getItem("role");
}
export function getUserId() {
    return localStorage.getItem("userId");
}
export function getUserName() {
    return localStorage.getItem("name");
}
export function isLoggedIn() {
    return !!localStorage.getItem("token");
}
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
}