import React from 'react';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <div className="text-center">
        <h1 className="m-3">ERC20 dApp</h1>
        <p>
          In the backend, there is an erc-20 smart contract. The owner of the
          contract gets the initial balance when deploy and can send tokens in a
          transaction. Also, anyone can get information about the token: for
          example the name, symbol and total supply.
        </p>
        <p>
          In the frontend, the user can see three pages: home, network
          information and token information.
        </p>
      </div>
    </Container>
  );
};

export default Home;
