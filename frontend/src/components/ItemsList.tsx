import React, { FC } from 'react';
import Item, { IItem } from './Item';

interface IItemsList {
  items: IItem[];
}

const ItemsList: FC<IItemsList> = ({ items }) => (
  <div className="d-flex align-center">
    {items.map((item: IItem) => (
      <Item
        description={item.description}
        handleClick={item.handleClick}
        image={item.image}
        key={item.tokenId}
        name={item.name}
        owner={item.owner}
        price={item.price}
        seller={item.seller}
        tokenId={item.tokenId}
      />
    ))}
  </div>
);

export default ItemsList;
