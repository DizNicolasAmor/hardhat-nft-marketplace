import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Error from '../components/Error';
import CommonSpinner from '../components/CommonSpinner';
import { getNetwork } from '../redux/slices/networkSlice';
import {
  getMarketplace,
  setMarketplace,
  setIsLoading,
} from '../redux/slices/marketplaceSlice';
import useMarketplace from '../hooks/useMarketplace';
import ItemsList from '../components/ItemsList';
import { IItem } from '../components/Item';

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { chainId } = useSelector(getNetwork);
  const { fetchMyNFTs } = useMarketplace(chainId);
  const { isLoading, items } = useSelector(getMarketplace);
  const dispatch = useDispatch();

  const handleGetMarketItems = async () => {
    setErrorMessage('');
    dispatch(setIsLoading(true));

    try {
      const marketItems: IItem[] = await fetchMyNFTs();

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

  useEffect(() => {
    handleGetMarketItems();
  }, []);

  const renderContent = () => (
    <>
      {items.length ? (
        <ItemsList items={items} />
      ) : (
        <div>You have no NFTs so far</div>
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
    <Container>
      <section aria-labelledby="profile-section" className="text-center">
        <h1 id="profile-section">Your NFTs collection</h1>
        {chainId ? renderSpinnerOrContent() : renderDefaultMessage()}
      </section>
    </Container>
  );
};

export default Profile;
