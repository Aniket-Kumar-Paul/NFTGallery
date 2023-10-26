import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./Card.module.css";
import images from "../Image/client/index"

import imagesNFT from "../Image/index"

const Card = ({ setNotification, image, index }) => {
  return (
    <div className={Style.card}>
      <div className={Style.content}>

        {/* <a href={`/image/${image.imageID}`}> */}
        <a href={`/image/1`}>
          <p>
            <Image
              className={Style.image}
              // src={image.image} 
              src={imagesNFT.img1} 
              alt="image"
              width={250}
              height={200}
            />
          </p>
        </a>

        <span className={Style.para}>
          <Image
            className="avatar_img"
            // src={images[`client${index + 1}`]}
            src={images[`client1`]}
            width={40}
            height={40}
          />
          <small
            className={Style.para_small}
            onClick={() => (
              setNotification("Successfully copied"),
              // navigator.clipboard.writeText(image.owner) // Copy to clipboard
              navigator.clipboard.writeText("x") // Copy to clipboard
            )}
          >
            {/* {image.owner.slice(0, 25)}... */}
            0xdisfjiosdfioh234fdi
          </small>
        </span>

        <span>
          {/* CreatedAt: {new Date(image.createdAt * 1000).toDateString()} */}
          Oct 26 2023
          {/* <small className={Style.number}>#{image.imageID}</small> */}
          <small className={Style.number}>#1</small>
        </span>

        <small className={Style.para}>
          {/* {image.description.slice(0, 80)}.. */}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, placeat...
        </small>

        <button
          className={Style.btn}
          onClick={() => (
            setNotification("Image URL is successfully copied."),
            // navigator.clipboard.writeText(image.image) // Copy to clipboard
            navigator.clipboard.writeText("x") // Copy to clipboard
          )}
        >
          Copy URL
        </button>
        
      </div>
    </div>
  );
};

export default Card;
