/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = 'https://lifetech.asia'

export default class BaseRequest {
  baseUrl: string;
  customToken?: string;
  constructor(baseUrl?: string, customToken?: string) {
    this.baseUrl = baseUrl || BASE_URL;
    this.customToken = customToken;
    this.setAuth();
  }

  setAuth() {
    axios.interceptors.request.use(
      (config) => {
        const lang = localStorage.getItem("language") || "en-US";
        // Nếu có customToken thì ưu tiên, không thì lấy access_token như cũ
        const accessToken =
          this.customToken || localStorage.getItem("access_token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJhdmF0YXIiOiJodHRwczovL2V4YW1wbGUuY29tL2F2YXRhcjMuanBnIiwibG9jYXRpb24iOiJIYW5vaSwgVmlldG5hbSIsInN0YXR1cyI6IkFDVElWRSIsInRlYW1JZCI6MSwibGV2ZWwiOiJUQUxFTlRfQyIsImlhdCI6MTc2Mjg0NjU5OSwiZXhwIjoxNzkyODQ2NTk5fQ.sCPBweEIi4_KIvRyBkJ3necF17hFhR1O4E-8un3gdT8";
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        config.headers["lang"] = lang;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async get(path = "", params = {}): Promise<any> {
    try {
      return await axios.get(this.baseUrl + `${path}`, {
        params: params,
      });
    } catch (error) {
      return this._errorHandler(error);
    }
  }
  async post(path = "", data = {}): Promise<any> {
    try {
      return await axios.post(this.baseUrl + path, data);
    } catch (error) {
      return this._errorHandler(error);
    }
  }
  async put(path = "", data = {}): Promise<any> {
    try {
      return await axios.put(this.baseUrl + path, data);
    } catch (error) {
      return this._errorHandler(error);
    }
  }
  async delete(path = "", params = {}): Promise<any> {
    try {
      return await axios.delete(this.baseUrl + path, params);
    } catch (error) {
      return this._errorHandler(error);
    }
  }
  async patch(path = "", data = {}): Promise<any> {
    try {
      return await axios.patch(this.baseUrl + path, data);
    } catch (error) {
      return this._errorHandler(error);
    }
  }
  async _errorHandler(err: any) {
 

    throw err;
  }
}