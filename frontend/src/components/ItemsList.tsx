import React, { FC } from 'react';
import Item, { IItem } from './Item';

interface IItemsList {
  items: IItem[];
}

const ItemsList: FC<IItemsList> = ({ items }) => (
  <div className="d-flex align-center">
    {items.map((item: IItem) => (
      <Item
        key={item.tokenId}
        description={item.description}
        handleClick={item.handleClick}
        image={item.image}
        name={item.name}
        price={item.price}
        tokenId={item.tokenId}
      />
    ))}
  </div>
);

export default ItemsList;
