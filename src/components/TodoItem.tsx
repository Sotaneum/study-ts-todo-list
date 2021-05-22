import React, { useRef } from 'react';
import { Item } from '@/types';

type TextItemProps = {
  item?: Item;
  onDelete?: (item: Item) => void;
  onModify?: (item: Item) => void;
  onComplete?: (item: Item) => void;
};

const style: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 'calc(100vw - 608px)',
};

const optionStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const TextItem: React.FC<TextItemProps> = ({ item, onDelete, onModify, onComplete }) => {
  const completeButton = useRef(null);
  const deleteButton = useRef(null);
  const handleClickModify: React.MouseEventHandler = (e): void => {
    if ([completeButton.current, deleteButton.current].includes(e.target)) {
      return;
    }
    onModify(item);
  };
  const handleClickDelete: React.MouseEventHandler = (): void => onDelete(item);
  const handleClickComplete: React.MouseEventHandler = (): void => onComplete(item);
  return (
    <li style={style} onDoubleClick={handleClickModify}>
      <h4 style={{ textDecoration: item?.isComplete ? 'line-through' : 'none' }}>{item.title}</h4>
      <div style={optionStyle}>
        <button ref={completeButton} onClick={handleClickComplete}>
          {item?.isComplete ? '취소' : '완료'}
        </button>
        <button ref={deleteButton} onClick={handleClickDelete}>
          삭제
        </button>
      </div>
    </li>
  );
};
