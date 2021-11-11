import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { signOutUser } from "../auth/authSlice";

function SignedInMenu() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create event"
            icon="plus"
          />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item
            text="Sign out"
            icon="power"
            onClick={() => {
              dispatch(signOutUser());
              navigate("/");
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
