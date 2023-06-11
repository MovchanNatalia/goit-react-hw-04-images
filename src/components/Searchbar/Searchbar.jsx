import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { Component } from 'react';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    query: '',
  };

  onHandleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;

    if (!query.trim()) {
      this.props.value();
      return toast.info(
        'The search input can not be empty. Please enter a search query'
      );
    }

    onSubmit(query);
    this.resetInput();
  };

  resetInput = () => {
    this.setState({ query: '' });
  };

  handleInput = e => {
    this.setState({ query: e.currentTarget.value.trim().toLowerCase() });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.onHandleSubmit}>
          <button type="submit" className={styles.Button}>
            <span className={styles.label}>Search</span>
          </button>

          <input
            className={styles.input}
            type="text"
            value={this.state.query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
