import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/slices/userSlice';
import { getNetwork } from '../redux/slices/networkSlice';
import _truncate from 'lodash.truncate';

export interface IItem {
  description: string;
  handleClick: () => void;
  image: string;
  name: string;
  owner: string;
  price: string;
  seller: string;
  tokenId: string;
}

const Item: FC<IItem> = ({
  description,
  handleClick,
  image,
  name,
  price,
  tokenId,
  owner,
  seller,
  ...rest
}) => {
  const { address } = useSelector(getUser);
  const { symbol } = useSelector(getNetwork);
  const truncatedName = _truncate(name, { length: 15 });
  const truncatedDescription = _truncate(description, { length: 60 });

  const isButtonDisabled = address === owner || address === seller;
  let buttonText;
  switch (address) {
    case owner:
      buttonText = 'You are the owner';
      break;
    case seller:
      buttonText = 'You are the seller';
      break;
    default:
      buttonText = 'BUY';
  }

  return (
    <Card
      style={{ width: '18rem', margin: '1rem', overflow: 'hidden' }}
      id={tokenId}
      {...rest}
    >
      <div
        className="d-flex align-items-center"
        style={{ width: '285px', height: '285px', overflow: 'hidden' }}
      >
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{truncatedName}</Card.Title>
        <Card.Text>{truncatedDescription}</Card.Text>
        <Card.Text>
          {price} {symbol}
        </Card.Text>
        <Button
          variant="primary"
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Item;
