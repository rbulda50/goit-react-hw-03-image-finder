import { Component } from "react";
import Modal from "components/Modal";
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };

    onToggleModal = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal
        }))
    };

    render() {
        const { image, largeImageURL, tags } = this.props;

        return (
            <>
                <GalleryItem>
                    <GalleryImage
                        onClick={this.onToggleModal}
                        src={image}
                        alt={tags} />
                </GalleryItem>

                {this.state.showModal && <Modal
                    onCloseModal={this.onToggleModal}
                    url={largeImageURL}
                    alt={tags}
                />}
            </>
        );
    }
};


