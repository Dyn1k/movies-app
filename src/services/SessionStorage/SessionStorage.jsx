/* eslint-disable class-methods-use-this */

class SessionStorage {
  setItem(name, value) {
    sessionStorage.setItem(name, JSON.stringify(value));
  }

  getItem(name) {
    const value = sessionStorage.getItem(name);
    return JSON.parse(value);
  }
}

export default SessionStorage;
