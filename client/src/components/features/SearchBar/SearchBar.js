import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const SearchBar = () => {
  const user = useSelector(getUser);
  const [searchPhrase, setSearchPhrase] = useState();

  return (
    <div className={styles.container}>
      <div>
        <input className={styles.input} type="text" value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} />
        <Link to={"/search/" + searchPhrase}>
          <button className="btn btn-dark">Search</button>
        </Link>
      </div>
      {user && (
        <div>
          <Link to="/ad/add">
            <button className="btn btn-dark">Add Ads</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchBar;