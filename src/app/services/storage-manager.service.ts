import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  constructor() { }

  // JSON "set" example
async setObject(key, object) {
  await Storage.set({
    key: key,
    value: JSON.stringify(
      object
    )
  });
}

// JSON "get" example
async getObject(key) {
  const ret = await Storage.get({ key: key});
  const response = JSON.parse(ret.value);

  return response
}

  async setItem(key, value) {
    await Storage.set({
      key: key,
      value: value
    });
  }

  async getItem(key) {
    const response = await Storage.get({ key: key });
    return response;
  }
  
  async removeItem(key) {
    await Storage.remove({ key: key });
  }
  
  async keys() {
    const keys = await Storage.keys();
    
    return keys;
  }
  
  async clear() {
    await Storage.clear();
  }
}
