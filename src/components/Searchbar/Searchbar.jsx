import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onHandleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.info('Please, use search field!');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={onHandleSubmit}>
        <button type="submit" className={styles.Button}>
          <span className={styles.label}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
