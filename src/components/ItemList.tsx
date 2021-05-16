import { Item } from '@/types';
import React from 'react';

type ItemListProps = {
  items?: Item[];
  onDelete?: (idx: number) => void;
  onModify?: (item: Item) => void;
};

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onModify }) => {
  return (
    <div>
      {items.map((item) => {
        const handleClickModify: React.MouseEventHandler = () => onModify(item);
        const handleClickDelete: React.MouseEventHandler = () => onDelete(item.idx);
        return (
          <div key={item.idx}>
            {item.title} <button onClick={handleClickDelete}>삭제</button>
            <button onClick={handleClickModify}>수정</button>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
