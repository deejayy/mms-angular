import { storageMock } from './jestGlobalMocks';

describe('JestMocks', () => {
  it('localStorage must be empty', () => {
    const localStorage = storageMock();
    expect(localStorage.length).toEqual(0);
  });

  it('localStorage set item / get item', () => {
    const localStorage = storageMock();

    localStorage.setItem('key-empty');
    localStorage.setItem('key-number', 1);
    localStorage.setItem('key-string', 'value');
    localStorage.setItem('key-array', [ 2 ]);
    localStorage.setItem('key-object', { a: 'b' });

    expect(localStorage.getItem('key-not-found')).toEqual(null);
    expect(localStorage.getItem('key-empty')).toEqual('');
    expect(localStorage.getItem('key-number')).toEqual(1);
    expect(localStorage.getItem('key-string')).toEqual('value');
    expect(localStorage.getItem('key-array')).toEqual([ 2 ]);
    expect(localStorage.getItem('key-object')).toEqual({ a: 'b' });
  });

  it('localStorage set item / remove item', () => {
    const localStorage = storageMock();

    localStorage.setItem('key-number', 1);
    expect(localStorage.getItem('key-number')).toEqual(1);
    localStorage.removeItem('key-number');
    expect(localStorage.getItem('key-number')).toEqual(null);
  });

  it('localStorage set item / key', () => {
    const localStorage = storageMock();

    localStorage.setItem('key-number', 1);
    expect(localStorage.key(0)).toEqual('key-number');
    expect(localStorage.key(1)).toEqual(null);
  });
});
