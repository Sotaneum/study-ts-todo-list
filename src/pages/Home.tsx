import React, { useState } from 'react';

import AddInput from '@/components/AddInput';
import ItemList from '@/components/ItemList';

import { Item } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';

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
  const setItemTitle = (item: Item, title: string): Item => ({ ...item, title });
  const setItemIndex = (item: Item, index: number): Item => ({ ...item, idx: index });
  const setItemStatus = (item: Item, isComplete: boolean): Item => ({ ...item, isComplete });

  // Item[]
  const addItem = (targetItem: Item): Item[] => [...items, setItemIndex(targetItem, getNewIdx())];
  const removeItem = (targetItem: Item): Item[] => items.filter((item) => item.idx !== targetItem.idx);
  const replaceItem = (targetItem: Item): Item[] =>
    items.map((prevItem) => (prevItem.idx !== targetItem.idx ? prevItem : targetItem));

  // handler
  const handleClickItemRemove = (item: Item) => setItems(removeItem(item));
  const handleClickModifyItem = (item: Item) => setNewItem(item);
  const handleChangeItem: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setNewItem(setItemTitle(newItem, e.target.value));
  const handleClickItemComplete = (item: Item) =>
    setItems(replaceItem(setItemStatus(item, !item?.isComplete)));
  const handleClickAddItem: React.MouseEventHandler = () => {
    setItems(!!newItem?.idx ? replaceItem(newItem) : addItem(newItem));
    clearNewItem();
  };

  return (
    <div>
      <AddInput item={newItem} onClick={handleClickAddItem} onChange={handleChangeItem} />
      <ItemList
        items={items}
        onModify={handleClickModifyItem}
        onDelete={handleClickItemRemove}
        onComplete={handleClickItemComplete}
      />
    </div>
  );
};

export default Home;
