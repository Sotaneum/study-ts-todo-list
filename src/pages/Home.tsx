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
    <div>
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
    </div>
  );
};

export default Home;
