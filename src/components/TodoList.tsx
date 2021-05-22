import { Item } from '@/types';
import React from 'react';

import { TextItem } from '@/components/TodoItem';

type TodoListProps = {
  items?: Item[];
  onDelete?: (item: Item) => void;
  onModify?: (item: Item) => void;
  onComplete?: (item: Item) => void;
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBlock: '0px',
  paddingInlineStart: '0px',
  maxHeight: 'calc(100vh - 600px)',
  overflow: 'scroll',
  width: 'calc(100vw - 590px)',
};

const style: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

const TodoList: React.FC<TodoListProps> = ({ items = [], onDelete, onModify, onComplete }) => {
  return (
    <div style={style}>
      <ul style={listStyle}>
        {items.map((item) => (
          <TextItem
            item={item}
            key={item.idx}
            onDelete={onDelete}
            onModify={onModify}
            onComplete={onComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
