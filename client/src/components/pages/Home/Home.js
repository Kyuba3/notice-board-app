import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../config';
import { getUser } from '../../../redux/usersRedux';
import { Container, Spinner } from 'react-bootstrap';
import { updateAds } from '../../../redux/adsRedux';
import SearchBar from '../../features/SearchBar/SearchBar';
import AllAds from '../../features/AllAds/AllAds';



const Home = () => {

 const [waiting, setWaiting] = useState(false);
 const dispatch = useDispatch();
 const user = useSelector(getUser);

 useEffect(() => {
  handleUpdate();
  
  if(user){
    fetch(`${API_URL}/auth/user/${user.login}`).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          dispatch(getUser(data));
        });
      }
    });
  }
 }, []);

 const handleUpdate = () => {
  setWaiting(true);
  fetch(`${API_URL}/api/ads`)
    .then((res) => {
      if(res.status === 200) {
        return res.json()
        .then((ads) => {
          dispatch(updateAds(ads));
          setWaiting(false);
        });
      }
    });
 }
 return (
  <Container>
    <SearchBar />
    {waiting && <Spinner />}
    {!waiting && <AllAds />}
  </Container>
 );
}


export default Home;