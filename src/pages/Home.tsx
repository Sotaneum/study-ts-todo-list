import React, { useEffect, useState } from 'react';

import AddInput from '@/components/AddInput';
import ItemList from '@/components/ItemList';

import { Item } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';

const Home: React.FC = () => {
  const toItems = (value: string) => {
    return Array.from<Item>(JSON.parse(value));
  };
  const toLastIdx = (value: string) => {
    return Number(value);
  };

  const [lastIdx, setLastIdx] = useLocalStorage<number>('lastIdx', 0, toLastIdx, JSON.stringify);
  const [items, setItems] = useLocalStorage<Item[]>('items', [], toItems, JSON.stringify);
  const [newItem, setNewItem] = useState<Item>({});

  const handleChangeItem: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setNewItem({ ...newItem, title: e.target.value });
  const handleClickItemRemove = (idx: number) => setItems(items.filter((item) => item.idx !== idx));
  const handleClickModifyItem = (item: Item) => setNewItem(item);
  const handleClickAddItem: React.MouseEventHandler = () => {
    if (!!newItem?.idx) {
      setItems(items.map((item) => (item.idx === newItem.idx ? newItem : item)));
      setNewItem({});
      return;
    }
    setItems([...items, { ...newItem, idx: lastIdx }]);
    setLastIdx(lastIdx + 1);
    setNewItem({});
  };

  return (
    <div>
      <AddInput item={newItem} onClick={handleClickAddItem} onChange={handleChangeItem} />
      <ItemList items={items} onModify={handleClickModifyItem} onDelete={handleClickItemRemove} />
    </div>
  );
};

export default Home;
