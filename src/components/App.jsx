import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Container/Container';
import ImageGallary from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from './api/Fetch.jsx';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    images: [],
    largeImageURL: '',
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    showBtn: false,
  };

  async componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      await this.setState({
        isLoading: true,
      });
      this.searchImages();
    }
  }

  searchImages = async () => {
    const { query, page } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const request = await fetchImages(query, page);
      const { hits, totalHits } = request.data;
      if (!hits.length) {
        this.setState({
          isLoading: false,
        });
        return toast.info('Sorry, no images found. Please, try again!');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isLoading: false,
        showBtn: page < Math.ceil(totalHits / 12),
      }));

      if (request.length === 0) {
        this.setState({ error: `No found ${query}` });
      }
    } catch (error) {
      this.setState({ error: 'Oops! Something went wrong' });
    }
  };

  onHandleQuery = query => {
    if (query === this.state.query) {
      return toast.info(`Images of ${query} have already been displayed.`);
    }

    this.setState({ images: [], page: 1, error: null, query });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = e => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  errorString = async () => {
    await this.setState({
      isLoading: false,
      images: [],
      error: [],
    });
  };

  render() {
    const { images, largeImageURL, isLoading, showModal, error, showBtn } =
      this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onHandleQuery} value={this.errorString} />

        {isLoading && <Loader />}

        <ImageGallary
          images={images}
          error={error}
          onOpenModal={this.onOpenModal}
        />

        {showBtn && !error && <Button onLoadMore={this.onLoadMore} />}

        {showModal && (
          <Modal
            onToggleModal={this.toggleModal}
            largeImageURL={largeImageURL}
          />
        )}

        <ToastContainer autoClose={2500} />
      </Container>
    );
  }
}

export default App;
