/* eslint-disable */
import fetch from 'isomorphic-unfetch';

export class Http {
  static async get(options) {
    return await this.fetch({ method: 'GET', ...options });
  }

  static async post(options) {
    return await this.fetch({ method: 'POST', ...options });
  }

  static async put(options) {
    return await this.fetch({ method: 'PUT', ...options });
  }

  static async patch(options) {
    return await this.fetch({ method: 'PATCH', ...options });
  }

  static async delete(options) {
    return await this.fetch({ method: 'DELETE', ...options });
  }

  static async fetch(options) {
    const { url, method, headers, body } = options;

    const req = {
      method,
      headers: this.getHeaders(headers)
    };

    if (body) {
      req.body = JSON.stringify(body);
    }

    return fetch(url, req)
      .then(async res => {
        const data = await res.json();
        return { ...res, data, ok: res.ok };
      })
      .catch(error => {
        return error;
      });
  }

  static getHeaders(headers) {
    const options = {
      'Content-Type': 'application/json',
      ...headers
    };

    return options;
  }
}
