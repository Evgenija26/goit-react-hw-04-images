import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import * as API from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchForm/SearchBar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages] = useState(0);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    {
      async function addImages() {
        // const { searchName, currentPage } = this.state;
        try {
          setIsLoading({ isLoading: true });
          const data = await API.getImages(searchName, currentPage);

          if (data.hits.length === 0) {
            alert('sorry image not found');
            return;
          }

          const normalizedImages = API.normalizedImages(data.hits);

          setImages(state => ({
            images: [...state.images, ...normalizedImages],
            isLoading: false,
            error: '',
            totalPages: Math.ceil(data.totalHits / 12),
          }));
        } catch {
          error({ error: 'something went wrong' });
        } finally {
          setIsLoading({ isLoading: false });
        }
      }
      addImages();
    }

    return () => {};
  }, [searchName, currentPage, error]);

  const loadMore = () => {
    setCurrentPage(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  const handleSubmit = () => {
    // if (searchName === '') {
    //   error('Please input search query!');
    //   return;
    // }

    setSearchName(searchName);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <GlobalStyle />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p style={{ padding: 10, textAlign: 'center', fontSize: 20 }}>
          Image gallery is empty
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </div>

    // <Loader />
  );
}
// const { images, isLoading, currentPage, totalPages } = this.state;
