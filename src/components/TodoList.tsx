import { Item } from '@/types';
import React from 'react';

import { TextItem } from '@/components/TodoItem';

type TodoListProps = {
  items?: Item[];
  onDelete?: (item: Item) => void;
  onModify?: (item: Item) => void;
  onComplete?: (item: Item) => void;
};

const TodoList: React.FC<TodoListProps> = ({ items = [], onDelete, onModify, onComplete }) => {
  return (
    <div>
      {items.map((item) => (
        <TextItem
          item={item}
          key={item.idx}
          onDelete={onDelete}
          onModify={onModify}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
