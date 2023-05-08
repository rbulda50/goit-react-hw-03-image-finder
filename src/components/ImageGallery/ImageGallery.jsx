import ImageGalleryItem from "components/ImageGalleryItem";
import { Component } from "react";
import { GalleryContainer } from './ImageGallery.styled';


export default class ImageGallery extends Component {
    render() {
        const { images } = this.props;
        return (
            <GalleryContainer>
                {images.map(({ id, webformatURL, tags, largeImageURL}) => (
                    <ImageGalleryItem
                        largeImageURL={largeImageURL}
                        tags={tags}
                        key={id}
                        image={webformatURL} />
                )
                )}
            </GalleryContainer>
        );
    };
};
