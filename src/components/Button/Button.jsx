import { LoadMore } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({onClick}) => {
    return (
        <LoadMore type="button" onClick={onClick}>Load more</LoadMore>
    )
};

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired
};