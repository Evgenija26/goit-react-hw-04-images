import { useState } from 'react';
import css from './ImageItem.module.css';
import Modal from 'components/Modal';

export default function ImageItem({ image }) {
  const [showModal, setShoModal] = useState(false);

  const toggleModal = () => {
    setShoModal(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

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
            onClose={setShoModal}
          />
        )}
      </li>
    </>
  );
}
