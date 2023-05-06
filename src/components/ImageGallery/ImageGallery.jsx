import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import css from './ImageGallery.module.css';

function ImageGallery({ items }) {
  return (
    <>
      <ul className={css.List}>
        {items.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.array,
};
