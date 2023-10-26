import React from "react";

// INTERNAL IMPORTS
import { Button, Card, Footer, Logo } from "../Components";

const layout = () => {
  return (
    <div className="home">
      <Logo />
      <p>BUTTON</p>
      <Button />
      <p>CARD</p>
      <Card />
      <p>FOOTER</p>
      <Footer />
    </div>
  );
};

export default layout;
