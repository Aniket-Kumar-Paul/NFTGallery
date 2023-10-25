import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x35FEC4A12ce1c9B4E7DDc38B2242fB7168590DB1"
  );
  const address = useAddress();
  const connect = useMetamask();

  const disconnect = useDisconnect();
  const signer = useSigner();
  const [userBalance, setUserBalance] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      // USER BALANCE
      const balance = await signer?.getBalance();
      const userBalance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";
      setUserBalance(userBalance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SMART CONTRACT FUNCTIONS
  // Upload NFT
  const UploadNft = async (imageInfo) => {
    const { title, description, email, category, image } = imageInfo;
    try {
      // Get Listing Price & Uploading to smart contract
      const listingPrice = await contract.call("listingPrice");
      const createNFTs = await contract.call(
        "uploadIPFS",
        [address, image, title, description, email, category],
        { value: listingPrice.toString() }
      );

      // Store the NFT details in database
      const response = await axios({
        method: "POST",
        url: "/api/v1/nfts",
        data: {
          title: title,
          description: description,
          category: category,
          image: image,
          address: address,
          email: email,
        },
      });
      console.log(response);
      console.info("Contract call success", createNFTs);

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log("Contract call failure", error);
    }
  };

  // Get all NFTs
  const getUploadedNfts = async () => {
    const nfts = await contract.call("getAllNFTs");

    const totalUpload = await contract.call("nftCount");
    const listingPrice = await contract.call("listingPrice");
    const allNfts = nfts.map((nft, i) => ({
      owner: nft.creator,
      title: nft.title,
      description: nft.description,
      email: nft.email,
      category: nft.category,
      fundraised: nft.fundraised,
      image: nft.image,
      imageID: nft.id.toNumber(),
      createdAt: nft.timestamp.toNumber(),
      listedAmount: ethers.utils.formatEther(listingPrice.toString()),
      totalUpload: totalUpload.toNumber(),
    }));

    return allNfts;
  };

  // Get single NFT
  const singleNft = async (id) => {
    try {
      const data = await contract.call("getNFT", [id]);
      const nft = {
        title: data[0],
        description: data[1],
        email: data[2],
        category: data[3],
        fundraised: ethers.utils.formatEther(data[4].toString()),
        creator: data[5],
        imageURL: data[6],
        createdAt: data[7].toNumber(),
        imageId: data[8].toNumber(),
      };

      return image;
    } catch (error) {
      console.log(error);
    }
  };

  // Donate to NFT
  const donateFund = async ({ amount, id }) => {
    try {
      console.log(amount, id);
      const txn = await contract.call("donateToNFT", [id], {
        value: amount.toString(),
      });
      console.log(txn);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // GET API DATA
  const getAllNftsAPI = async () => {
    const response = await axios({
      method: "GET",
      url: "/api/v1/NFTs",
    });
    // console.log(response);
  };

  const getSingleNftAPI = async (id) => {
    const response = await axios({
      method: "GET",
      url: `/api/v1/NFTs/${id}`,
    });
    // console.log(response);
  };

  return (
    <StateContext.Provider
      value={{
        // CONTRACT
        address,
        contract,
        connect,
        disconnect,
        userBalance,
        setLoading,
        loading,

        // SMART CONTRACT FUNCTIONS
        UploadNft,
        getUploadedNfts,
        singleNft,
        donateFund,

        // API CALLS
        getAllNftsAPI,
        getSingleNftAPI,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
