import React from "react";

// INTERNAL IMPORTS
import {
  Button,
  Card,
  CheckBox,
  Donate,
  Filter,
  Footer,
  Form,
  Header,
  Login,
  Logo,
  Notification,
  Profile,
} from "../Components";

const layout = () => {
  return (
    <div className="home">
      <p>HEADER</p>
      <Header />

      <p>LOGO</p>
      <Logo />

      <p>BUTTON</p>
      <Button />

      <p>Notification</p>
      <Notification />

      <p>FILTER</p>
      <Filter />

      <p>CARD</p>
      <Card />

      <p>DONATE</p>
      <Donate />

      <p>FORM</p>
      <Form />

      <p>LOGIN</p>
      <Login />

      <p>Profile</p>
      <Profile />

      <p>CHECKBOX</p>
      <CheckBox />

      <p>FOOTER</p>
      <Footer />
    </div>
  );
};

export default layout;
