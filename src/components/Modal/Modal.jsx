import { Component } from "react";
import { createPortal } from 'react-dom';
import {Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    };

    handleKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onCloseModal()
        };
    };

    clickOnBackdrop = e => {
        if (e.target === e.currentTarget) {
            this.props.onCloseModal();
        };
    };

    render() {
        const { url, alt } = this.props;
        
        return createPortal(
            <Overlay onClick={this.clickOnBackdrop}>
                <ModalContainer>
                    <img src={url} alt={alt} />
                </ModalContainer>
            </Overlay>,
            modalRoot
        )
    };
}
