import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';

export interface IItem {
  description: string;
  handleClick: () => void;
  image: string;
  name: string;
  owner?: string;
  price: string;
  seller?: string;
  tokenId: string;
}

const Item: FC<IItem> = ({
  description,
  handleClick,
  image,
  name,
  price,
  tokenId,
  ...rest
}) => (
  <Card style={{ width: '18rem', margin: '1rem' }} id={tokenId} {...rest}>
    <Card.Img variant="top" src={image} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Card.Text>{price} ETH</Card.Text>
      <Button variant="primary" onClick={handleClick}>
        BUY
      </Button>
    </Card.Body>
  </Card>
);
export default Item;
