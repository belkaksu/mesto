export default class UserInfo {
  constructor(userNameElement, userJobElement) {
    this._userNameElement = userNameElement;
    this._userJobElement = userJobElement;
  }
getUserInfo() {
  this._userInfo = {};
  this._userInfo.userName = this._userNameElement.textContent;
  this._userInfo.userJob = this._userJobElement.textContent;
  return this._userInfo
}
setUserInfo(item) {
  this._userNameElement.textContent = item.userName;
  this._userJobElement.textContent = item.userJob;

}

}
