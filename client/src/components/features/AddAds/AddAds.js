import React from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { addAd, updateAds } from '../../../redux/adsRedux';
import AdForm from '../AdForm/AdForm';

const AddAds = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (ad) => {

    const fd = new FormData();
    fd.append('title',ad.title);
    fd.append('description', ad.description);
    fd.append('date', ad.date);
    fd.append('price', ad.price);
    fd.append('localization', ad.localization);
    fd.append('image', ad.image);
    fd.append('user', ad.user);
    fd.append('phoneNumber', ad.phoneNumber);

    const options = {
      method: 'POST',
      body: fd,
      credentials: 'include'
    };

    fetch(`${API_URL}/api/ads`, options)
    .then(res => {
      if (res.status === 200) {
        dispatch(addAd(ad));
        dispatch(updateAds())
        navigate('/')
      }
    });
  };

  return <AdForm action={handleSubmit} actionText="Add" />;
};

export default AddAds;