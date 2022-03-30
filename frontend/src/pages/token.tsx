import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../components/Error';
import CommonSpinner from '../components/CommonSpinner';
import { getNetwork } from '../redux/slices/networkSlice';
import {
  getMarketplace,
  setMarketplace,
  setIsLoading,
} from '../redux/slices/marketplaceSlice';
import useMarketplace from '../hooks/useMarketplace';

const TokenSection: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { chainId } = useSelector(getNetwork);
  const [fetchMarketItems] = useMarketplace(chainId);
  const { isLoading, items } = useSelector(getMarketplace);
  const dispatch = useDispatch();

  const handleGetMarketItems = async () => {
    setErrorMessage('');
    dispatch(setIsLoading(true));

    try {
      const marketItems = await fetchMarketItems();
      console.log({ marketItems });

      dispatch(
        setMarketplace({
          isLoading: false,
          items: marketItems,
        })
      );
    } catch (reason) {
      console.error(reason);
      setErrorMessage('Error when fetching contract');
    }
    dispatch(setIsLoading(false));
  };

  const renderContent = () => (
    <>
      <div className="m-3">
        <Button
          className="m-3"
          variant="secondary"
          onClick={handleGetMarketItems}
        >
          Get market items
        </Button>
      </div>
      {items.length ? (
        <div>Complete with items</div>
      ) : (
        <div>There are no items in the marketplace so far</div>
      )}
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
      <h1 id="token-section">Welcome to the NFT Marketplace</h1>
      {chainId ? renderSpinnerOrContent() : renderDefaultMessage()}
    </section>
  );
};

export default TokenSection;
