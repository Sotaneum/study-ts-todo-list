import React from 'react';
import { Item } from '@/types';

type TextItemProps = {
  item?: Item;
  onDelete?: (item: Item) => void;
  onModify?: (item: Item) => void;
  onComplete?: (item: Item) => void;
};

export const TextItem: React.FC<TextItemProps> = ({ item, onDelete, onModify, onComplete }) => {
  const handleClickModify: React.MouseEventHandler = () => onModify(item);
  const handleClickDelete: React.MouseEventHandler = () => onDelete(item);
  const handleClickComplete: React.MouseEventHandler = () => onComplete(item);

  return (
    <>
      <h4 style={{ textDecoration: item?.isComplete ? 'line-through' : 'none' }}>{item.title}</h4>
      <button onClick={handleClickDelete}>삭제</button>
      <button onClick={handleClickModify}>수정</button>
      <button onClick={handleClickComplete}>{item?.isComplete ? '복원' : '완료'}</button>
    </>
  );
};
