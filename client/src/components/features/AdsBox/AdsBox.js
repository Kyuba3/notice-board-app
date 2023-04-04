import styles from './AdsBox.module.scss';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const AdsBox = ({ title, price, localization, image, _id, user }) => {
  const loggedUser = useSelector(getUser);

  return (
    <Card className={styles.card_wrapper}>
      <Card.Img
        variant='top'
        src={IMGS_URL + image}
        className={styles.card_photo}
      />
      <Card.Body>
        <div className={styles.body}>
          <Card.Title>Price: {price}$</Card.Title>
          <Card.Subtitle className='my-3'>
            <b>Title: {title}</b>
          </Card.Subtitle>
          <Card.Text className='mb-3'>
            <b>Localization: {localization}</b>
          </Card.Text>
        </div>
        <Row>
          <Col>
            <Link to={'/ad/' + _id}>
              <Button className={styles.button} variant='dark'>
                Read more
              </Button>
            </Link>
          </Col>
          {loggedUser !== null && loggedUser.login === user && (
            <Col>
              <p>It's yours Ad</p>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AdsBox;