import React, { useRef, useState } from 'react';
import { utils } from 'ethers';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../components/Error';
import CommonSpinner from '../components/CommonSpinner';
import { getNetwork } from '../redux/slices/networkSlice';
import { getToken, setToken, setIsLoading } from '../redux/slices/tokenSlice';
import { renderSectionItem } from '../utils/utilFunctions';
import useMarketplace from '../hooks/useMarketplace';

const TokenSection: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [receiverAddress, setReceiverAddressValue] = useState<string>('');
  const [amountToSend, setAmountToSend] = useState<string>('');
  const { chainId } = useSelector(getNetwork);
  const [getContractInformation, transferToken] = useMarketplace(chainId);
  const { isLoading, name, symbol, userBalance } = useSelector(getToken);
  const dispatch = useDispatch();
  const refReceiverAddressValue = useRef<HTMLInputElement>(null);
  const refAmountToSend = useRef<HTMLInputElement>(null);

  const handleReceiverAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event?.target?.value) {
      setReceiverAddressValue(event?.target?.value);
    }
  };
  const handleAmountToSend = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event?.target?.value) {
      setAmountToSend(event?.target?.value);
    }
  };
  const handleSendToken = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    sendToken(receiverAddress, amountToSend);
  };

  const handleGetInfo = async () => {
    setErrorMessage('');
    dispatch(setIsLoading(true));

    try {
      const { balance, name, symbol } = await getContractInformation();

      dispatch(
        setToken({
          isLoading: false,
          name,
          symbol,
          userBalance: utils.formatEther(balance),
        })
      );
    } catch (reason) {
      console.error(reason);
      setErrorMessage('Error when fetching contract');
    }
    dispatch(setIsLoading(false));
  };

  const sendToken = async (receiverAddress: string, amountToSend: string) => {
    setErrorMessage('');
    dispatch(setIsLoading(true));

    try {
      await transferToken(receiverAddress, amountToSend);
    } catch (reason) {
      console.error(reason);
      setErrorMessage('Error when sending tokens');
    }
    dispatch(setIsLoading(false));
  };

  const renderContent = () => (
    <>
      <div className="m-3">
        <Button className="m-3" variant="secondary" onClick={handleGetInfo}>
          Get token info
        </Button>
        {renderSectionItem('Token name', name)}
        {renderSectionItem('Token balance', `${userBalance} ${symbol}`)}
      </div>
      <Form className="m-auto" style={{ maxWidth: '45rem' }}>
        <Form.Group className="mb-3" controlId="receiver-address">
          <Form.Label>Receiver address</Form.Label>
          <Form.Control
            onChange={handleReceiverAddress}
            placeholder=""
            ref={refReceiverAddressValue}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="amount-to-send">
          <Form.Label>Amount to send</Form.Label>
          <Form.Control
            onChange={handleAmountToSend}
            placeholder=""
            ref={refAmountToSend}
            type="number"
          />
        </Form.Group>
        <Button
          className="m-3"
          variant="primary"
          type="submit"
          onClick={handleSendToken}
        >
          Send token
        </Button>
      </Form>
      <Error errorMessage={errorMessage} />
    </>
  );

  const renderDefaultMessage = () => (
    <p className="m-3">You have to connect your wallet to see this section.</p>
  );

  const renderSpinnerOrContent = () =>
    isLoading ? <CommonSpinner /> : renderContent();

  return (
    <section aria-labelledby="token-section" className="text-center">
      <h1 id="token-section">Welcome to the Token section</h1>
      {chainId ? renderSpinnerOrContent() : renderDefaultMessage()}
    </section>
  );
};

export default TokenSection;
