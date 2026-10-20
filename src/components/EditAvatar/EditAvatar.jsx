import React, { useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditAvatar({ isLoading }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef(null);

  // Estados locais para validação visual do input do Avatar
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Monitora e atualiza os erros baseado nas restrições de tipo URL nativas
  const handleChange = (event) => {
    setError(event.target.validationMessage);
    setIsFormValid(event.target.form.checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className='popup__form'
      name='avatar-form'
      id='edit-avatar-form'
      noValidate
      onSubmit={handleSubmit}
    >
      <label className='popup__field'>
        <input
          className={`popup__input popup__input_type_avatar ${error ? "popup__input_type_error" : ""}`}
          id='avatar-link'
          name='avatarLink'
          placeholder='Link da imagem do avatar'
          required
          type='url'
          ref={avatarRef}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${error ? "popup__error_visible" : ""}`}
          id='avatar-link-error'
        >
          {error}
        </span>
      </label>

      <button
        className='button popup__button'
        type='submit'
        disabled={!isFormValid}
      >
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
