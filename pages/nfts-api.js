import React, { useState } from "react";

// INTERNAL IMPORT
import { Header, Footer, Notification, Logo } from "../Components";
import { useStateContext } from "../Context/NFTs";

const nftsAPI = () => {
  // STATE VARIABLE
  const { loading } = useStateContext();
  const [notification, setNotification] = useState("");

  const apiEndpoint = [
    {
      title: "Get All NFTs",
      description:
        "Welcome to NFTs API, Access all the NFTs uploaded to IPFS, by following the mentioned steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/nfts",
    },
    {
      title: "Get Single NFT",
      description:
        "Single NFTs API endpoint, get access to single nft uploaded to IPFS, by following the mentioned steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/nfts/id",
    },
    {
      title: "Create Image Upload",
      description:
        "This endpoint will allow you to make post request on the server to upload the Image",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/nfts",
    },
    {
      title: "Login Endpoint",
      description:
        "Allow API user to use the NFTs API authentication, to log user in",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/users/login",
    },
    {
      title: "SignUp Endpoint",
      description:
        "Allow API user to use the NFTs API for creating account, to signup user",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/users/signup",
    },
  ];

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />

      <div className="header">
        <h1>How to use NFTs API</h1>
      </div>

      <div className="api-body">
        {apiEndpoint.map((api, i) => (
          <div className="api-left">
            <h3 className="api-title">{api.title}</h3>
            <p>{api.description}</p>
            <p>Method: {api.method}</p>
            <p>Endpoint: {api.endpoint}</p>
          </div>
        ))}
      </div>

      <Footer />

      {notification != "" && (
        <Notification
          message={notification}
          setNotification={setNotification}
        />
      )}

      {loading && (
        <div className="loading">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default nftsAPI;
