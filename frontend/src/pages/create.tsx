import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Error from '../components/Error';
import CommonSpinner from '../components/CommonSpinner';
import { getNetwork } from '../redux/slices/networkSlice';
import useMarketplace from '../hooks/useMarketplace';

import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const CreateItem = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { chainId } = useSelector(getNetwork);
  const [createNFT] = useMarketplace(chainId);

  // const [fileUrl, setFileUrl] = useState('');
  // const [formInput, updateFormInput] = useState({
  //   price: '',
  //   name: '',
  //   description: '',
  // });
  // const router = useRouter();

  // async function onChange(e) {
  //   const file = e.target.files[0];
  //   try {
  //     const added = await client.add(file, {
  //       progress: (prog) => console.log(`received: ${prog}`),
  //     });
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  //     setFileUrl(url);
  //   } catch (error) {
  //     console.log('Error uploading file: ', error);
  //   }
  // }

  async function uploadToIPFS() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS();

    await createNFT();

    router.push('/');
  }

  const renderContent = () => (
    <>
      <div>This is the create section</div>
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
        <h1 id="create-section">Your NFTs collection</h1>
        {chainId ? renderSpinnerOrContent() : renderDefaultMessage()}
      </section>
    </Container>
  );

  // return (
  //   <div className="flex justify-center">
  //     <div className="w-1/2 flex flex-col pb-12">
  //       <input
  //         placeholder="Asset Name"
  //         className="mt-8 border rounded p-4"
  //         onChange={(e) =>
  //           updateFormInput({ ...formInput, name: e.target.value })
  //         }
  //       />
  //       <textarea
  //         placeholder="Asset Description"
  //         className="mt-2 border rounded p-4"
  //         onChange={(e) =>
  //           updateFormInput({ ...formInput, description: e.target.value })
  //         }
  //       />
  //       <input
  //         placeholder="Asset Price in Eth"
  //         className="mt-2 border rounded p-4"
  //         onChange={(e) =>
  //           updateFormInput({ ...formInput, price: e.target.value })
  //         }
  //       />
  //       <input type="file" name="Asset" className="my-4" onChange={onChange} />
  //       {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
  //       <button
  //         onClick={listNFTForSale}
  //         className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
  //       >
  //         Create NFT
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default CreateItem;
