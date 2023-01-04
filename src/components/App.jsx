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
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          alert('sorry image not found');
          return;
        }

        const normalizedImages = API.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setIsLoading(false);
        setError('');
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        error({ error: 'something went wrong' });
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, currentPage, error]);

  const loadMore = () => {
    setCurrentPage(prevPage => ({
      currentPage: prevPage.currentPage + 1,
    }));
  };

  const handleSubmit = query => {
    setSearchName(query);
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
  );
}

// import { Component } from 'react';
// import { GlobalStyle } from './GlobalStyle';
// import * as API from 'api';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { SearchBar } from './SearchForm/SearchBar';
// import { Loader } from './Loader/Loader';
// import { Button } from './Button/Button';

// export default class App extends Component {
//   state = {
//     searchName: '',
//     images: [],
//     currentPage: 1,
//     error: null,
//     isLoading: false,
//     totalPages: 0,
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       prevState.searchName !== this.state.searchName ||
//       prevState.currentPage !== this.state.currentPage
//     ) {
//       this.addImages();
//     }
//   }

//   loadMore = () => {
//     this.setState(prevState => ({
//       currentPage: prevState.currentPage + 1,
//     }));
//   };

//   handleSubmit = query => {
//     this.setState({
//       searchName: query,
//       images: [],
//       currentPage: 1,
//     });
//   };

//   addImages = async () => {
//     const { searchName, currentPage } = this.state;
//     try {
//       this.setState({ isLoading: true });
//       const data = await API.getImages(searchName, currentPage);

//       if (data.hits.length === 0) {
//         alert('sorry image not found');
//         return;
//       }

//       const normalizedImages = API.normalizedImages(data.hits);

//       this.setState(state => ({
//         images: [...state.images, ...normalizedImages],
//         isLoading: false,
//         error: '',
//         totalPages: Math.ceil(data.totalHits / 12),
//       }));
//     } catch (error) {
//       this.setState({ error: 'something went wrong' });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   render() {
//     const { images, isLoading, currentPage, totalPages } = this.state;

//     return (
//       <div className="App">
//         <GlobalStyle />
//         <SearchBar onSubmit={this.handleSubmit} />
//         {images.length > 0 ? (
//           <ImageGallery images={images} />
//         ) : (
//           <p style={{ padding: 10, textAlign: 'center', fontSize: 20 }}>
//             Image gallery is empty
//           </p>
//         )}
//         {isLoading && <Loader />}
//         {images.length > 0 && totalPages !== currentPage && !isLoading && (
//           <Button onClick={this.loadMore} />
//         )}
//       </div>
//     );
//   }
// }
