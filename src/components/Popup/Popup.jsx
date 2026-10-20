import React, { useEffect } from "react";

export default function Popup(props) {
  const { onClose, title, children, isConfirmation, isImagePopup } = props;

  // Gerencia o fechamento da janela ao pressionar a tecla Escape (ESC)
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    // Limpa o ouvinte ao desmontar o componente para evitar vazamento de memória
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  // Fecha o popup se o usuário clicar na área escura (overlay) de fundo
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='popup' onClick={handleOverlayClick}>
      <div
        className={`popup__content 
          ${isImagePopup ? "popup__content_content_image" : ""} 
          ${isConfirmation ? "popup__content_type_confirmation" : ""}`}
      >
        {!isImagePopup && (
          <button
            aria-label='Close modal'
            className='popup__close'
            type='button'
            onClick={onClose}
          />
        )}
        {title && <h2 className='popup__title'>{title}</h2>}
        {children}
      </div>
    </div>
  );
}
