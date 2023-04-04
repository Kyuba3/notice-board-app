import { Routes, Route } from 'react-router-dom';
import Footer from './components/views/Footer/Footer';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import SearchResult from './components/pages/SearchResult/SearchResult';
import NotFound from './components/pages/NotFound/NotFound';
import EditAd from './components/pages/EditAd/EditAd';
import Logout from './components/pages/Logout/Logout';
import RemoveAd from './components/pages/RemoveAd/RemoveAd';
import AddAds from './components/features/AddAds/AddAds';
import AdPage from './components/pages/AdPage/AdPage';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ad/edit/:id' element={<EditAd />} />
        <Route path='/ad/:id' element={<AdPage />} />
        <Route path='/ad/add' element={<AddAds />} />
        <Route path='/ad/remove/:id' element={<RemoveAd />} />
        <Route path='/search/:searchPhrase' element={<SearchResult />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<NotFound />} /> 
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;