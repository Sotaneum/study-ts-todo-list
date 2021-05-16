import React, { useState } from 'react';
import AddInput from '@/components/AddInput';
import { Item } from '@/types';
import ItemList from '@/components/ItemList';

const Home: React.FC = () => {
  const [lastIdx, setLastIdx] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
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
