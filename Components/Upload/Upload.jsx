import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import { Delete, UploadIcon, File } from "../SVG";
import Style from "./Upload.module.css";

const Upload = ({ onImageChange, display, retrieveFile }) => {
  return (
    <div className={Style.container}>
      <div className={Style.header}>
        {display == null ? (
          <>
            <UploadIcon />
            <p>Browse File to Upload!</p>
          </>
        ) : (
          <p>
            <Image
              className={Style.image}
              src={display}
              alt="Image"
              width={200}
              height={200}
            />
          </p>
        )}
      </div>

      <label htmlFor="file" className={Style.footer}>
        <File />
        <p>Not Selected File</p>
        <Delete />
      </label>

      <input
        id="file"
        onChange={(e) => (onImageChange(e), retrieveFile(e))}
        className={Style.file}
        type="file"
      />
    </div>
  );
};

export default Upload;
