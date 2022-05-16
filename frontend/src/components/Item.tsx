import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/slices/userSlice';

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
    <Card style={{ width: '18rem', margin: '1rem' }} id={tokenId} {...rest}>
      <div
        className="d-flex align-items-center"
        style={{ width: '285px', height: '285px', overflow: 'hidden' }}
      >
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{price} ETH</Card.Text>
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
