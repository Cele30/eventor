import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

function Navbar() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setAuth(false);
    navigate("/");
  };

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Eventor
        </Menu.Item>

        <Menu.Item name="Events" as={NavLink} to="/events" />
        {auth && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button positive inverted content="Create Event" />
          </Menu.Item>
        )}
        {auth ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu setAuth={setAuth} />
        )}
      </Container>
    </Menu>
  );
}

export default Navbar;
