import { Component } from "react";
import { toast } from 'react-toastify';
import { FormInput, Header, SearchForm, SearchFormBtn, ButtonLabel } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

class Searchbar extends Component {
    state = {
        value: '',
    };

    handleChange = e => {
        this.setState({value: e.currentTarget.value})
    };

    handleSubmit = e => {
        const { value } = this.state;

        if (value.trim() === '') {
            e.preventDefault();
            toast.error('Введіть назву картинки!');
            return;
        } 
            e.preventDefault();
            this.props.onSubmit(value)
            this.setState({value: ''})
    };

    render() {
        return (
            <Header>
                <SearchForm
                    onSubmit={this.handleSubmit}>
                    <SearchFormBtn
                        type="submit">
                        <FcSearch style={{ width: 30, height: 30 }}/>
                        <ButtonLabel>Search</ButtonLabel>
                    </SearchFormBtn>
                    <FormInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </SearchForm>
            </Header>
        );
    }
}

export default Searchbar;