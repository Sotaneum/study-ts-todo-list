import React, { useRef, useEffect, useState } from 'react';
import { Item } from '@/types';

type AddInputProps = {
  item?: Item;
  onChange?: React.ChangeEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
};

const inputStyle: React.CSSProperties = {
  width: '600px',
  height: '60px',
  fontSize: '40px',
  textAlign: 'center',
  borderRadius: '5px',
};

const style: React.CSSProperties = {};

const AddInput: React.FC<AddInputProps> = ({ item, onChange, onKeyUp }) => {
  const ref = useRef(null);

  const [placeholder, setPlaceholder] = useState('어떤 계획을 가지고 있나요?');

  useEffect(() => {
    const handleKeyPress = () => ref?.current?.focus();
    window.addEventListener('keyup', handleKeyPress);
    window.addEventListener('focus', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
      window.removeEventListener('focus', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const text = [
      '어떤 일을 하려고 하나요?',
      '어떤 계획을 가지고 있나요?',
      '해야하는 일은 어떤 것이 있나요?',
      '혹시 청소를 해야하지 않나요?',
      '혹시 운동을 해야하지 않나요?',
      '어디에 전화를 해야하지 않나요?',
    ];
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * text.length);
      setPlaceholder(text[idx]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={style}>
      <input
        ref={ref}
        style={inputStyle}
        value={item?.title || ''}
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        onChange={onChange}
      />
    </div>
  );
};

export default AddInput;
