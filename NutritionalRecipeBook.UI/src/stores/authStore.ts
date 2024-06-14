class AuthStore {
  private subscribers: (() => void)[] = [];

  isAuth = false;
  token = '';
  userId = '';

  constructor() {
    const storedToken = localStorage.getItem('token');
    const storedIsAuth = localStorage.getItem('isAuth');
    const userId = localStorage.getItem('userId');

    if (storedToken) {
      this.token = storedToken;
    }

    if (storedIsAuth === 'true') {
      this.isAuth = true;
    }

    if (userId) {
      this.userId = userId;
    }
  }

  geToken() {
    this.token = localStorage.getItem('token') || '';

    return this.token;
  }

  getIsAuth() {
    const storedIsAuth = localStorage.getItem('isAuth');

    if (storedIsAuth === 'true') {
      this.isAuth = true;
    }

    return this.isAuth;
  }

  getUserId() {
    this.userId = localStorage.getItem('userId') || '';

    return this.userId;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this.notifySubscribers();
  }

  isAuthed() {
    this.isAuth = true;
    localStorage.setItem('isAuth', 'true');
    this.notifySubscribers();
  }

  isNotAuthed() {
    this.isAuth = false;
    localStorage.setItem('isAuth', 'false');
    this.notifySubscribers();
  }

  setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
    this.notifySubscribers();
  }

  removeToken() {
    this.token = '';
    localStorage.removeItem('token');
    this.isAuth = false;
    localStorage.setItem('isAuth', 'false');
    this.userId = '';
    localStorage.removeItem('userId');
    this.notifySubscribers();
  }

  subscribe(subscriber: () => void) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: () => void) {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  private notifySubscribers() {
    this.subscribers.forEach((subscriber) => subscriber());
  }
}

const authStore = new AuthStore();
export default authStore;
