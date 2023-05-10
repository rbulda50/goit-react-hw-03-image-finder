import { Component } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import { Dna } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled.jsx';
import API from '../service/imageAPI';

export class App extends Component {
  state = {
    value: '',
    images: [],
    page: 1,
    totalHits: 1,
    error: null,
    status: 'idle',
  };

    componentDidUpdate(_, prevState) {
      const prevValue = prevState.value;
      const { value, page } = this.state;

      if (prevValue !== value || prevState.page !== page) {
        this.setState({ status: 'pending' });

        API.imageAPI(value, page)
          .then(images => {
            if (images.total === 0) {
              this.setState({ status: 'rejected' });
              return;
            };
            this.setState({
              images: page === 1 ? images.hits : [...this.state.images, ...images.hits],
              totalHits: images.totalHits,
              status: 'resolved',
            });
          })
          .catch(error => this.setState({
            error,
            status: 'rejected'
          }))
      }
  };

  onSubmitForm = (value) => {
    this.setState({
      value,
      status: 'pending',
      page: 1,
    })
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending'
    }));
  };

  render() {
    const { status, images, totalHits } = this.state;

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
      return <Container>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery images={images} /> 
      </Container>
    };

    if (status === 'resolved') {
      return <Container>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery images={images} />
        {images.length !== totalHits && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={2000} />
      </Container>
    };
  };
};
