import React, { FC, useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import ToastCustom from './ToastCustom';
import { getToast, setToast, resetToast } from '../redux/slices/toastSlice';
import { resetUser, setUser } from '../redux/slices/userSlice';
import useNetwork from '../hooks/useNetwork';
import { resetNetwork, setNetwork } from '../redux/slices/networkSlice';
import { getNetworkName, getNetworkSymbol } from '../utils/constants';

const NavbarCustom: FC = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [{ web3 }, handleNetwork] = useNetwork();
  const { message: toastMessage, type: toastType } = useSelector(getToast);
  const dispatch = useDispatch();
  const resetFields = () => {
    dispatch(resetUser());
    dispatch(resetNetwork());
    dispatch(resetToast());
  };

  useEffect(() => {
    if (typeof web3 === 'undefined') {
      resetFields();
    } else {
      setNetworkAccount(web3);
    }
  }, [web3]);

  useEffect(() => {
    if (toastMessage) {
      setIsToastOpen(true);
    }
  }, [toastMessage]);

  const setNetworkAccount = async (web3: providers.Web3Provider) => {
    web3
      .detectNetwork()
      .then(({ chainId }) => {
        dispatch(
          setNetwork({
            chainId,
            name: getNetworkName(chainId),
            symbol: getNetworkSymbol(chainId),
          })
        );
      })
      .catch((reason) => {
        dispatch(
          setToast({
            message: reason,
            type: 'danger',
          })
        );
      });
    const accounts = await web3.listAccounts();
    const { _hex } = await web3.getBalance(accounts[0]);

    dispatch(
      setUser({
        address: accounts[0],
        balance: utils.formatEther(_hex),
      })
    );
  };

  const handleConnect = () => {
    handleNetwork().catch((reason) => {
      dispatch(
        setToast({
          message: reason,
          type: 'danger',
        })
      );
    });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">My ERC-20 dApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="network">Network info</Nav.Link>
              <Nav.Link href="token">Token info</Nav.Link>
            </Nav>
            <Button
              onClick={handleConnect}
              variant={web3 ? 'outline-primary' : 'primary'}
            >
              {web3 ? 'Disconnect' : 'Connect'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastCustom
        body={toastMessage}
        onClose={() => setIsToastOpen(false)}
        show={isToastOpen}
        type={toastType}
      />
    </>
  );
};

export default NavbarCustom;
