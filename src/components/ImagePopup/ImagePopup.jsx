import React from "react";
import Popup from "../Popup/Popup";

export default function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
    <Popup title='' onClose={onClose} isImagePopup={true}>
      <button
        className='popup__close'
        type='button'
        aria-label='Fechar popup'
        onClick={onClose}
      />
      <img
        className='popup__image'
        src={card.link}
        alt={card.name}
        style={{
          maxWidth: "100%",
          maxHeight: "75vh",
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
        }}
      />
      <p className='popup__caption'>{card.name}</p>
    </Popup>
  );
}
