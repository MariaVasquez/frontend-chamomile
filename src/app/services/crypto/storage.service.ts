import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { DOCUMENT } from '@angular/common';

declare var require: any;

const SecureStorage = require('secure-web-storage');

const SECRET_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  secureStorage: typeof SecureStorage | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem('key');

      const secureStorageConfig = {
        hash: function hash(key: any) {
          key = CryptoJS.SHA256(key);
          return key.toString();
        },
        encrypt: function encrypt(data: any) {
          data = CryptoJS.AES.encrypt(data, SECRET_KEY);
          data = data.toString();
          return data;
        },
        decrypt: function decrypt(data: any) {
          data = CryptoJS.AES.decrypt(data, SECRET_KEY);
          data = data.toString(CryptoJS.enc.Utf8);
          return data;
        }
      };

      this.secureStorage = new SecureStorage(window.localStorage, secureStorageConfig);
    } else {
      console.error('localStorage no está disponible');
      this.secureStorage = null;
    }
  }

  // Ejemplo de método para guardar un valor en secureStorage
  saveValue(key: string, value: any): void {
    if (this.secureStorage) {
      this.secureStorage.setItem(key, value);
    } else {
      console.error('No se pudo guardar el valor: secureStorage no está disponible');
    }
  }

  // Ejemplo de método para obtener un valor de secureStorage
  getValue(key: string): any {
    if (this.secureStorage) {
      return this.secureStorage.getItem(key);
    } else {
      console.error('No se pudo obtener el valor: secureStorage no está disponible');
      return null;
    }
  }
}

