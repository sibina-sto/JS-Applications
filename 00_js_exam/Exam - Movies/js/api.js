export default class API {
  constructor(appId, apiKey, beginRequest, endRequest) {
    this.appId = appId;
    this.apiKey = apiKey;
    this.endpoints = {
      REGISTER: 'users/register',
      LOGIN: 'users/login',
      LOGOUT: 'users/logout',
    };
    this.beginRequest = () => {
      if (beginRequest) beginRequest();
    };
    this.endRequest = () => {
      if (endRequest) endRequest();
    };
  }

  host(endpoint) {
    return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`;
  }

  getOptions(headers) {
    const token = sessionStorage.getItem('userToken');
    const options = { headers: headers || {} };
    if (token !== 'undefined' && token !== null) {
      Object.assign(options.headers, { 'user-token': token });
    }
    return options;
  }

  async get(endpoint) {
    this.beginRequest();
    const options = this.getOptions();
    const result = await fetch(this.host(endpoint), options);
    this.endRequest();
    try {
      return await result.json();
    } catch (x) {
      return result;
    }
  }

  async post(endpoint, body) {
    this.beginRequest();
    const options = this.getOptions({
      'Content-Type': 'application/json',
    });
    options.method = 'POST';
    options.body = JSON.stringify(body);
    const result = await fetch(this.host(endpoint), options).then((x) =>
      x.json()
    );
    this.endRequest();
    return result;
  }

  async put(endpoint, body) {
    this.beginRequest();
    const options = this.getOptions({
      'Content-Type': 'application/json',
    });
    options.method = 'PUT';
    options.body = JSON.stringify(body);
    const result = await fetch(this.host(endpoint), options).then((x) =>
      x.json()
    );
    this.endRequest();
    return result;
  }

  async delete(endpoint) {
    const options = this.getOptions();
    options.method = 'DELETE';
    this.beginRequest();
    const result = await fetch(this.host(endpoint), options).then((x) =>
      x.json()
    );
    this.endRequest();
    return result;
  }

  async register(email, password) {
    return await this.post(this.endpoints.REGISTER, {
      email,
      password,
    });
  }

  async login(email, password) {
    const result = await this.post(this.endpoints.LOGIN, {
      login: email,
      password,
    });
    sessionStorage.setItem('userToken', result['user-token']);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('userId', result.objectId);
    return result;
  }

  async logout() {
    const result = await this.get(this.endpoints.LOGOUT);
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
    return result;
  }
}
