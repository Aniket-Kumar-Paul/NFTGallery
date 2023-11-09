import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

// INTERNAL IMPORT
import {
  Card,
  Upload,
  Button,
  Profile,
  Header,
  Footer,
  Notification,
  Logo,
  Filter,
  Form,
} from "../Components";
import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/client/index";

const Home = () => {
  // STATE VARIABLE
  const {
    address,
    disconnect,
    contract,
    connect,
    userBalance,
    UploadNft,
    getUploadedNfts,
    setLoading,
    loading,

    // API
    getAllNftsAPI,
  } = useStateContext();

  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Images");
  const [imagesCopy, setImagesCopy] = useState([]);

  // GET DATA
  const oldImages = [];
  const fetchImages = async () => {
    const images = await getUploadedNfts();
    setAllImages(images);

    const apiImages = await getAllNftsAPI();
  };
  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract]);

  if (allImages.length == 0) {
    console.log("Loading all images...");
  } else {
    allImages.map((image) => {
      oldImages.push(image);
    });
  }

  // IMAGE DATA
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    email: "",
    category: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  };

  // UPLOAD TO PINATA IPFS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    setLoading(true);

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading to PINATA IPFS...")
        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "12ca8d69ae46629b3ce8",
            pinata_secret_api_key:
              "c0876a858a37fe37989b5f3513bffbbbc072389294f8e5dce3d74a8315b8b008",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(`Uploaded to PINATA IPFS! URL: https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`)


        const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log("Uploading to Smart Contract & MongoDB...")
        await UploadNft({
          ...imageInfo,
          image: image,
          category: category,
        });
        console.log("Uploaded to Smart Contract & MongoDB!")
        setFile(null);
      } catch (err) {
        console.log(err);
      }
    }
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];

    const reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  // DISPLAY IMAGE
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDisplay(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Create 1000 NFTs for Free</h1>
      </div>

      {/* UPLOAD */}
      <div className="upload">
        <Upload
          onImageChange={onImageChange}
          display={display}
          address={address}
          retrieveFile={retrieveFile}
        />

        <div className="upload-info">
          <h1>Welcome to NFTs IPFS Upload</h1>
          <p>
            Our products help you securely distribute any type of media at
            scale-freeing you from restrictive platforms, middlemen and
            algorithms that limit your creative agency.
          </p>
          <div className="avatar">
            <Button
              address={address}
              disconnect={disconnect}
              connect={connect}
              file={file}
            />

            {address && (
              <p>
                <Image
                  className="avatar_img"
                  src={images.client1}
                  width={40}
                  height={40}
                  onClick={() => setOpenProfile(true)}
                  alt="avatar"
                />
              </p>
            )}
          </div>
        </div>
      </div>

      <h1 className="subheading">All NFTs of Marketplace</h1>

      {/* CARD */}
      {allImages.length == 0 ? (
        <Logo />
      ) : allImages == undefined ? (
        <h1>No Images</h1>
      ) : (
        <>
          <Filter
            setImagesCopy={setImagesCopy}
            imagesCopy={imagesCopy}
            setAllImages={setAllImages}
            allImages={allImages}
            oldImages={oldImages}
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
          />

          <div className="card">
            {allImages.map((image, i) => (
              <Card
                key={i + 1}
                index={i}
                image={image}
                setNotification={setNotification}
              />
            ))}
          </div>
        </>
      )}

      <Footer />

      {/* NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {/* PROFILE */}
      {openProfile && (
        <div className="profile">
          <Profile
            setOpenProfile={setOpenProfile}
            userBalance={userBalance}
            address={address}
          />
        </div>
      )}

      {/* LOADER */}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}

      {/* FORM */}
      {file && closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormFieldChange}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
