export class User {
  constructor({ name = '', username = '', email = '', isLogged = false, token = '' } = {}) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.isLogged = isLogged;
    this.token = token;
  }
}
