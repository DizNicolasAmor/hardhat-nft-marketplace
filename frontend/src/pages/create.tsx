import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Button, Container, Form, Image } from 'react-bootstrap';
import CommonSpinner from '../components/CommonSpinner';
import Error from '../components/Error';
import { getNetwork } from '../redux/slices/networkSlice';
import useMarketplace from '../hooks/useMarketplace';
import { inputsConfig, IInputConfig } from '../utils/createNFT';

const CreateNFT = () => {
  const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { chainId } = useSelector(getNetwork);
  const { createToken } = useMarketplace(chainId);
  const [form, setForm] = useState({
    description: '',
    name: '',
    price: '',
  });
  const [imageURL, setImageURL] = useState<string>('');

  const handleUpdateForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ): void => {
    if (key === 'file') {
      console.log('handle upload file');
    } else if (event?.target?.value) {
      setForm({
        ...form,
        [key]: event.target.value,
      });
    }
  };

  async function uploadToIPFS(data: string) {
    const added = await client.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;

    return url;
  }

  const handleCreateNFT = async (event: Event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const { name, description, price } = form;
    const data = JSON.stringify({
      name,
      description,
      image: imageURL,
    });

    if (!name || !description || !price || !imageURL) {
      setErrorMessage('Invalid form data');
      setIsLoading(false);
      return;
    }

    try {
      const url = await uploadToIPFS(data);
      const tokenId = await createToken(url, price);
      setIsLoading(false);
      return tokenId;
    } catch (reason) {
      console.error(reason);
      setIsLoading(false);
      setErrorMessage('Error when creating your NFT');
    }
  };

  const renderContent = () => (
    <>
      <div>This is the create section</div>
      <div className="m-auto" style={{ maxWidth: '45rem' }}>
        <Form>
          {inputsConfig.map((input: IInputConfig) => (
            <Form.Group
              className="mb-3"
              controlId={input.controlId}
              key={input.controlId}
            >
              <Form.Label>{input.text}</Form.Label>
              <Form.Control
                as={input.as}
                onChange={(ev) => handleUpdateForm(ev, input.key)}
                placeholder=""
                type={input.type}
              />
            </Form.Group>
          ))}
          {Boolean(imageURL) && <Image src={imageURL} />}
          <Button
            className="m-3"
            variant="primary"
            type="submit"
            onClick={handleCreateNFT}
          >
            Create NFT
          </Button>
        </Form>
      </div>

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
      <section aria-labelledby="create-section" className="text-center">
        <h1 id="create-section">Create your NFT</h1>
        {chainId ? renderSpinnerOrContent() : renderDefaultMessage()}
      </section>
    </Container>
  );
};

export default CreateNFT;
