import React, { useState } from 'react';

import Logo from '@/components/Logo';
import AddInput from '@/components/AddInput';
import TodoList from '@/components/TodoList';

import { Item } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: '500px',
};

const bodyStyle: React.CSSProperties = {
  textAlign: 'center',
};

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
};

const Home: React.FC = () => {
  const toItems = (value: string) => Array.from<Item>(JSON.parse(value));

  const [newItem, setNewItem] = useState<Item>({});
  const [items, setItems] = useLocalStorage<Item[]>('items', [], toItems, JSON.stringify);
  const [lastIdx, setLastIdx] = useLocalStorage<number>('lastIdx', 0, Number, JSON.stringify);

  const clearNewItem = (): void => setNewItem({});
  const getNewIdx = (): number => {
    const newIdx = lastIdx;
    setLastIdx(newIdx + 1);
    return newIdx;
  };

  // Item
  const toTrim = (item: Item): Item => ({ ...item, title: item.title.trim() });
  const beforeSaveItem = (item: Item) => toTrim(item);
  const setItemTitle = (item: Item, title: string): Item => ({ ...item, title });
  const setItemIndex = (item: Item, index: number): Item => ({ ...item, idx: index });
  const setItemStatus = (item: Item, isComplete: boolean): Item => ({ ...item, isComplete });
  const setItemDate = (item: Item, date: string): Item => ({ ...item, date });
  const newSaveItem = (item: Item): Item =>
    setItemDate(setItemIndex(item, getNewIdx()), new Date().toString());

  // Item[]
  const addItem = (targetItem: Item): Item[] => [...items, beforeSaveItem(newSaveItem(targetItem))];
  const removeItem = (targetItem: Item): Item[] => items.filter((item) => item.idx !== targetItem.idx);
  const replaceItem = (targetItem: Item): Item[] =>
    items.map((prevItem) => (prevItem.idx !== targetItem.idx ? prevItem : beforeSaveItem(targetItem)));

  const updateItems = (): void => {
    const { title = '' } = newItem;
    if (!title.trim()) {
      return;
    }
    setItems(!!newItem?.idx ? replaceItem(newItem) : addItem(newItem));
    clearNewItem();
  };

  // handler
  const handleClickItemRemove = (item: Item) => setItems(removeItem(item));
  const handleClickModifyItem = (item: Item) => setNewItem(item);
  const handleChangeItem: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setNewItem(setItemTitle(newItem, e.target.value));
  const handleClickItemComplete = (item: Item) =>
    setItems(replaceItem(setItemStatus(item, !item?.isComplete)));
  const handleInputKeyUp: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      updateItems();
    }
  };

  return (
    <div style={bodyStyle}>
      <div style={headerStyle}>
        <Logo />
        <AddInput item={newItem} onChange={handleChangeItem} onKeyUp={handleInputKeyUp} />
      </div>
      <TodoList
        items={items}
        onModify={handleClickModifyItem}
        onDelete={handleClickItemRemove}
        onComplete={handleClickItemComplete}
      />

      <a style={footerStyle} href='https://github.com/Sotaneum/study-ts-todo-list'>
        <svg height='24' viewBox='0 0 16 16' version='1.1' width='24' aria-hidden='true'>
          <path
            fill-rule='evenodd'
            d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default Home;
