import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { toast } from "react-toastify";
import { signOutFromFirebase } from "../../app/services/firebaseService";

function SignedInMenu() {
  const { currentUserProfile } = useSelector(state => state.profile);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutFromFirebase();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUserProfile?.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUserProfile?.username}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create event"
            icon="plus"
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile?.id}`}
            text="My profile"
            icon="user"
          />
          <Dropdown.Item
            as={Link}
            to="/account"
            text="My account"
            icon="settings"
          />
          <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
