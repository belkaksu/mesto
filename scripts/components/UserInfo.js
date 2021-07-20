export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameElement = userNameSelector;
    this._userJobElement = userJobSelector;
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

// function setProfileData() {
//   profileNameElement.textContent = profileNameInput.value;
//   profileJobElement.textContent = profileJobInput.value;
// }


// // Класс UserInfo отвечает за управление отображением
// информации о пользователе на странице. Этот класс:
// // Принимает в конструктор объект с селекторами двух элементов:
// элемента имени пользователя и элемента информации о себе.
// // Содержит публичный метод getUserInfo, который возвращает
// объект с данными пользователя. Этот метод пригодится когда
// данные пользователя нужно будет подставить в форму при открытии.
// // Содержит публичный метод setUserInfo, который принимает новые
// данные пользователя и добавляет их на страницу.
