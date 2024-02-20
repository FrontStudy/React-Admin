export function servicesSetStorage(name, data) {
    return localStorage.setItem(name, data);
  }
  export function servicesGetStorage(name) {
    return localStorage.getItem(name);
  }
  
  export function servicesRemoveStorage(name) {
    return localStorage.removeItem(name);
  }