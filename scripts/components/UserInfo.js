export default class UserInfo {
  constructor(userNameElement, userJobElement, userAvatarElement) {
    this._userNameElement = userNameElement;
    this._userJobElement = userJobElement;
    this._userAvatarElement = userAvatarElement;
  }
  getUserInfo() {
    return {
    userName: this._userNameElement.textContent,
    userJob: this._userJobElement.textContent,
    userAvatar: this._userAvatarElement.src,
    }


  }
  setUserInfo(userName, userJob) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
  }

  setUserAvatar(userAvatar) {
    this._userAvatarElement.src = userAvatar;

  }
}
