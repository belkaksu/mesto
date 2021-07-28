export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers
  })
  .then(res => res.json())

}

}

// getInitialCards() {
//   return fetch(`${this._baseUrl}/cards`, {
//   method: 'GET',
//   headers: this._headers
//   })
//     .then(res => this._handleResponse(res))
// }
