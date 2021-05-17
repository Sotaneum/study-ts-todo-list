import React from 'react';
import { Item } from '@/types';

type AddInputProps = {
  item?: Item;
  onClick?: React.MouseEventHandler;
  onChange?: React.ChangeEventHandler;
};

const AddInput: React.FC<AddInputProps> = ({ item, onClick, onChange }) => {
  const isModify: boolean = !!item?.idx;
  return (
    <div>
      <input value={item?.title || ''} onChange={onChange} />
      <button onClick={onClick}>{isModify ? '저장' : '추가'}</button>
    </div>
  );
};

export default AddInput;
