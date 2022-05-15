import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Error from '../components/Error';
import CommonSpinner from '../components/CommonSpinner';
import { getNetwork } from '../redux/slices/networkSlice';
import {
  getMarketplace,
  setItemsOwned,
  setItemsListed,
  setIsLoading,
} from '../redux/slices/marketplaceSlice';
import useMarketplace from '../hooks/useMarketplace';
import ItemsList from '../components/ItemsList';
import { IItem } from '../components/Item';

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { chainId } = useSelector(getNetwork);
  const { fetchMyNFTs, fetchItemsListed } = useMarketplace(chainId);
  const { isLoading, itemsOwned, itemsListed } = useSelector(getMarketplace);
  const dispatch = useDispatch();

  const handleGetMarketItems = async () => {
    setErrorMessage('');
    dispatch(setIsLoading(true));

    try {
      const itemsOwned: IItem[] = await fetchMyNFTs();
      const itemsListed: IItem[] = await fetchItemsListed();

      dispatch(setItemsOwned(itemsOwned));
      dispatch(setItemsListed(itemsListed));
    } catch (reason) {
      console.error(reason);
      setErrorMessage('Error when fetching contract');
    }
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    handleGetMarketItems();
  }, []);

  useEffect(() => {
    if (!chainId) {
      setErrorMessage('');
    }
    handleGetMarketItems();
  }, [chainId]);

  const renderContent = () => (
    <>
      <h2>Items Owned</h2>
      {itemsOwned.length ? (
        <ItemsList items={itemsOwned} />
      ) : (
        <div>There are no NFTs here</div>
      )}
      <hr className="w-50 text-center my-3 mx-auto" />
      <h2>Items Listed</h2>
      {itemsListed.length ? (
        <ItemsList items={itemsListed} />
      ) : (
        <div>There are no NFTs here</div>
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
