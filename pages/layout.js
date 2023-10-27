import React from "react";

// INTERNAL IMPORTS
import {
  Button,
  Card,
  CheckBox,
  Donate,
  Filter,
  Footer,
  Logo,
} from "../Components";

const layout = () => {
  return (
    <div className="home">
      <Logo />

      <p>BUTTON</p>
      <Button />

      <p>FILTER</p>
      <Filter />

      <p>CARD</p>
      <Card />

      <p>DONATE</p>
      <Donate />

      <p>CHECKBOX</p>
      <CheckBox />

      <p>FOOTER</p>
      <Footer />
    </div>
  );
};

export default layout;
