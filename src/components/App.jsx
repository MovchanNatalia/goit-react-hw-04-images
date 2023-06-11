import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Container/Container';
import ImageGallary from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from './api/Fetch.jsx';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) return;

    const searchImages = async () => {
      try {
        const request = await fetchImages(query, page);
        const { hits, totalHits } = request.data;

        if (!hits.length) {
          return toast.info('Sorry, no images found. Please, try again!');
        }
        setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
        setShowBtn(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError('Oops! Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    searchImages();
  }, [page, query]);

  const handleSubmit = newSearch => {
    if (newSearch === query) return;
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(false);
    setShowBtn(false);
    setShowModal(false);
    setLargeImageURL('');
  };

  const onLoadMore = () => {
    // setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = evt => {
    setLargeImageURL(evt.target.dataset.source);
    toggleModal(!isLoading);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />

      {isLoading && <Loader />}

      <ImageGallary images={images} error={error} onOpenModal={onOpenModal} />

      {showBtn && !error && <Button onLoadMore={onLoadMore} />}

      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}

      <ToastContainer autoClose={2500} />
    </Container>
  );
}

export default App;
