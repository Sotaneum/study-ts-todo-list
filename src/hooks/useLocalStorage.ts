import { useState, useEffect } from 'react';

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
  onLoad: (value: string) => T,
  onSave: (data: T) => string,
): [T, (value: T) => void] => {
  try {
    const getItem = () => localStorage.getItem(key);
    const setItem = (value: string) => localStorage.setItem(key, value);

    const loadData = () => onLoad(getItem() || JSON.stringify(defaultValue));
    const saveData = (data: T) => setItem(onSave(data));

    const [value, setValue] = useState(loadData() || defaultValue);

    const updateValue = () => setValue(loadData());

    useEffect(() => {
      updateValue();
    }, [getItem()]);

    useEffect(() => {
      // localStorage 기준으로 각 페이지 동기화 코드
      window.addEventListener('focus', updateValue);
      return () => window.removeEventListener('focus', updateValue);
    }, []);

    return [
      value,
      (data: T) => {
        saveData(data);
        updateValue();
      },
    ];
  } catch {
    const [value, setValue] = useState<T>(defaultValue);
    console.warn(
      'localStorage가 동작하지 않는 환경입니다. 다른 페이지 혹은 새로고침 했을 경우 데이터가 복원되지 않습니다.',
    );
    return [value, setValue];
  }
};

export default useLocalStorage;
