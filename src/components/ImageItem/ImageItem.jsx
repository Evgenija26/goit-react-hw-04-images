import { useState } from 'react';
import css from './ImageItem.module.css';
import Modal from 'components/Modal';

export default function ImageItem({ image }) {
  // state = {
  //   showModal: false,
  // }
  const [showModal, setShoModal] = useState(false);

  const toggleModal = () => {
    setShoModal(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  // const { showModal } = this.state;
  // const { image } = this.props;

  return (
    <>
      <li className={css.ImageItem}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          onClick={toggleModal}
          className={css.ImageGalleryItem__image}
        />
        {showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </li>
    </>
  );
}
