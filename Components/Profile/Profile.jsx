import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import { YouTube, Twitter, Instagram, GitHub, FormSVG } from "../SVG";
import Style from "./Profile.module.css";
import images from "../Image/client/index"

const Profile = ({ setOpenProfile, userBalance, address }) => {
  return (
    <>
      <div className={Style.card}>
        <div className={Style.img}>
          <Image
            className="avatar_img"
            src={images.client1}
            width={80}
            height={80}
            onClick={() => setOpenProfile(true)}
          />
        </div>

        {/* <span>{address.slice(0, 25)}</span> */}
        <span>0xsdfji34r434hihfd43fe..</span>
        <p className={Style.info}>
          {userBalance} Welcome to NFT Gallery. Our products help you securely distribute any type of media at scale-freeing you from restrictive platforms, middlemen, and algorithms that limit your creative agency.
        </p>

        <div className={Style.share}>
          <a href="">
            <GitHub />
          </a>
          <a href="">
            <Twitter />
          </a>
          <a href="">
            <Instagram />
          </a>
          <a href="">
            <YouTube />
          </a>
        </div>

        <button onClick={() => setOpenProfile(false)}>Close</button>
      </div>
    </>
  );
};

export default Profile;
