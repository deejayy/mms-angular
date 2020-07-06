export function storageMock() {
  const storage = {};

  return {
    setItem: (key: string, value?: any) => {
      storage[key] = value || '';
    },
    getItem: (key: string) => {
      return key in storage ? storage[key] : null;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (index: number) => {
      const keys = Object.keys(storage);
      return keys[index] || null;
    },
  };
}

Object.defineProperty(window, 'localStorage', { value: storageMock });
Object.defineProperty(window, 'sessionStorage', { value: storageMock });
Object.defineProperty(window, 'gtag', { value: () => {} });
Object.defineProperty(window, 'ga', { value: () => {} });
