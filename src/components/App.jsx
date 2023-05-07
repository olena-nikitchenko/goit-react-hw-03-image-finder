import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { ImageApi } from '../sarvices/ImageApi';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import './App.css';

class App extends Component {
  state = {
    inputData: '',
    items: [],
    status: 'idle',
    totalHits: 0,
    page: 1,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { inputData, page } = this.state;
    if (prevState.inputData !== inputData || prevState.page !== page) {
      if (inputData.trim() === '') {
        Notiflix.Notify.info('You cannot search by empty field, try again.');
        return;
      }
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await ImageApi(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          const newHits = hits.map(({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          }));
          this.setState({
            items: [...this.state.items, ...newHits],
            totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }
  handleSubmit = inputData => {
    this.setState({ inputData, page: 1 });
  };

  handleNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { totalHits, status, items } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'resolved' && (
          <>
            <ImageGallery items={items} />
            {totalHits > items.length && (
              <Button onClick={this.handleNextPage}>Load more</Button>
            )}
          </>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <p>Something went wrong, please try again later</p>
        )}
      </div>
    );
  }
}

export default App;
