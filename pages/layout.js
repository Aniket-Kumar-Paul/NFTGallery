import React from "react";

// INTERNAL IMPORTS
import { Button, Card, CheckBox, Footer, Logo } from "../Components";

const layout = () => {
  return (
    <div className="home">
      <Logo />

      <p>BUTTON</p>
      <Button />

      <p>CARD</p>
      <Card />

      <p>CHECKBOX</p>
      <CheckBox />

      <p>FOOTER</p>
      <Footer />
    </div>
  );
};

export default layout;
