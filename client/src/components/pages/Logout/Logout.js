import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };

    fetch(`${API_URL}/logout`, options)
      .then(() => {
        dispatch(logOut());
        setTimeout(() => {
          navigate('/');
        }, 2000);
      });
  }, [dispatch]);

  return (
  <Alert variant="success" className="d-block mx-auto">
    <Alert.Heading>Success! </Alert.Heading>
    <p>You have been logged out</p>
  </Alert>
  )
};

export default Logout;