import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { API_URL, IMGS_URL} from '../../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById, updateAds } from '../../../redux/adsRedux';
import styles from './AdPage.module.scss';
import { Link } from 'react-router-dom';
import RemoveAd from '../RemoveAd/RemoveAd';
import { getUser } from '../../../redux/usersRedux';


const AdPage = () => {
  const navigate = useNavigate();

  const adId = useParams();
  const id = adId.id;
  const adData = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);
  console.log(adData);


  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = (e) => {
    e.preventDefault();
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(`${API_URL}/api/ads/${id}`, options);
    updateAds();
    navigate('/');
  };
  if(user === null) return (<h2 className='d-flex justify-content-center'>You must be logged to see more details</h2>)
  else return (
    <div>
      <Row className="d-flex justify-content-center mt-5">
        {showModal && (
          <RemoveAd
            showModal={showModal}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        )}
        <Col xs="12" lg="5">
          <Card className={styles.card_wrapper}>
            <Card.Img variant="top" src={IMGS_URL + adData.image} />
            <Card.Body>
              <Card.Title className="mb-3">Price: {adData.price}$</Card.Title>
              <Card.Subtitle className="mb-3">
                <b>Title: {adData.title}</b>
              </Card.Subtitle>
              <Card.Text className="mb-3">
                <b>Localization: {adData.localization}</b>
              </Card.Text>
              <Card.Text>{adData.description}</Card.Text>
              <Card.Text>Published: {adData.date}</Card.Text>
              <Card.Text>Author: {adData.user}</Card.Text>
              <Card.Text>
                Avatar:{' '}
                <img
                  className={styles.avatar}
                  src={IMGS_URL + adData.image}
                  alt="user avatar"
                />
              </Card.Text>
              <Card.Text>Phone number: {adData.phoneNumber}</Card.Text>
            </Card.Body>
            <Col className={styles.button} xs="12" lg="4">
              <Link to={'/ad/edit/' + id}>
                <Button variant="info" className="m-2">
                  Edit
                </Button>
              </Link>
              <Button variant="danger" onClick={handleShow}>
                Delete
              </Button>
            </Col>  
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdPage;