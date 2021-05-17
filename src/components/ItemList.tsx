import { Item } from '@/types';
import React from 'react';

type ItemListProps = {
  items?: Item[];
  onDelete?: (item: Item) => void;
  onModify?: (item: Item) => void;
  onComplete?: (item: Item) => void;
};

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onModify, onComplete }) => {
  return (
    <div>
      {items.map((item) => {
        const handleClickModify: React.MouseEventHandler = () => onModify(item);
        const handleClickDelete: React.MouseEventHandler = () => onDelete(item);
        const handleClickComplete: React.MouseEventHandler = () => onComplete(item);

        return (
          <div key={item.idx}>
            <h4 style={{ textDecoration: item?.isComplete ? 'line-through' : 'none' }}>{item.title}</h4>
            <button onClick={handleClickDelete}>삭제</button>
            <button onClick={handleClickModify}>수정</button>
            <button onClick={handleClickComplete}>{item?.isComplete ? '복원' : '완료'}</button>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
