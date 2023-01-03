// import React, { Component } from 'react';
// import css from './ImageItem.module.css';
// import Modal from 'components/Modal';

// export default class ImageItem extends Component {
//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { showModal } = this.state;
//     const { image } = this.props;

//     return (
//       <>
//         <li className={css.ImageItem}>
//           <img
//             src={image.webformatURL}
//             alt={image.tags}
//             onClick={this.toggleModal}
//             className={css.ImageGalleryItem__image}
//           />
//           {showModal && (
//             <Modal
//               largeImageURL={image.largeImageURL}
//               tags={image.tags}
//               onClose={this.toggleModal}
//             />
//           )}
//         </li>
//       </>
//     );
//   }
// }

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
            onClick={toggleModal}
          />
        )}
      </li>
    </>
  );
}
