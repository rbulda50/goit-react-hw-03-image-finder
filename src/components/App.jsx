import { Component } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import { Dna } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled.jsx';
import API from '../service/imageAPI';

export class App extends Component {
  state = {
    value: '',
    images: [],
    page: 1,
    loadedHits: 0,
    totalHits: 500,
    error: null,
    status: 'idle',
  };

    componentDidUpdate(_, prevState) {
      const prevValue = prevState.value;
      const { value, page } = this.state;

      if (prevValue !== value) {
        this.setState({ status: 'pending' });

        API.imageAPI(value, page)
              .then(images => {
                if (images.total === 0) {
                  this.setState({ status: 'rejected' });
                  return;
                }
              this.setState({ images: images.hits, status: 'resolved' });
              this.setState(({page, loadedHits}) => ({ page: page + 1, loadedHits: loadedHits + images.hits.length }))
            })
            .catch(error => this.setState({ error, status: 'rejected' }))
      }
  };

  onSubmitForm = (value) => {
    this.setState({ value, status: 'pending', page: 1, loadedHits: 0 })
  };

  loadMore = () => {
    const { loadedHits, value, page } = this.state;

    if (loadedHits > 500) {
      toast.error('Картинки закінчились :(');
      return;
    };

    this.setState({ status: 'pending' });
    API.imageAPI(value, page)
      .then(images => {
        this.setState({ images: [...this.state.images, ...images.hits], status: 'resolved' })
        this.setState(({page, loadedHits}) => ({ page: page + 1, loadedHits: loadedHits + images.hits.length }))
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
  };

  render() {
    const { status, images } = this.state;

    if (status === 'idle') {
      return <Container>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ToastContainer autoClose={2000} />
      </Container>
    };
    
    if (status === 'pending') {
      return <Container>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery images={images} />
        <Dna  visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{ margin: 'auto'}}
              wrapperClass="dna-wrapper"/>
        <ToastContainer autoClose={2000} />
      </Container>
    };

    if (status === 'rejected') {
      return <Searchbar onSubmit={this.onSubmitForm} />
    };

    if (status === 'resolved') {
      return <Container>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery images={images} />
        <Button onClick={this.loadMore} />
        <ToastContainer autoClose={2000} />
      </Container>
    };
  };
};
