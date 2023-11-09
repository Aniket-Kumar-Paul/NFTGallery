import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import {
  Card,
  Header,
  Footer,
  Notification,
  Logo,
  Product,
} from "../../Components";
import { useStateContext } from "../../Context/NFTs";

const imageDetail = () => {
  const {
    address,
    contract,
    getUploadedNfts,
    setLoading,
    loading,
    donateFund,
    singleNft,
  } = useStateContext();

  // URL QUERY
  const router = useRouter();
  const { query } = router; // get the query from the url (has the image id)
  console.log("query:", query);

  const [allImages, setAllImages] = useState([]);
  const [notification, setNotification] = useState("");
  const [support, setSupport] = useState("");
  const [image, setImage] = useState();

  const fetchImages = async () => {
    const oneImage = await singleNft(query.image * 1); // passing the id as a number
    const images = await getUploadedNfts();
    setAllImages(images);
    setImage(oneImage);
    console.log("oneImage:", oneImage);
  };
  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract]);

  const donateAmount = async () => {
    setLoading(true);
    await donateFund({
      amount: ethers.utils.parseUnits(support, 18),
      id: query.image,
    });
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />

      {image == undefined ? (
        <Logo />
      ) : (
        <Product
          setLoading={setLoading}
          donateAmount={donateAmount}
          setNotification={setNotification}
          setSupport={setSupport}
          image={image}
        />
      )}

      <div className="card">
        {allImages
          .map((image, i) => (
            <Card
              key={i + 1}
              index={i}
              image={image}
              setNotification={setNotification}
            />
          ))
          .slice(0, 8)}
        {/* Display only 8 images */}
      </div>

      {/* FOOTER */}
      <Footer />

      {/* NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {/* LOADER */}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default imageDetail;
