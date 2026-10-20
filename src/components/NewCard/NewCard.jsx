import React, { useState } from "react";

export default function NewCard({ onAddPlaceSubmit, isLoading }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  // Estados locais para controle de erros de validação
  const [errors, setErrors] = useState({ cardName: "", cardLink: "" });
  const [isFormValid, setIsFormValid] = useState(false);

  // Controla o input e roda a validação nativa do formulário
  const handleChange = (event, setter, fieldName) => {
    const { value, validationMessage } = event.target;
    setter(value);
    setErrors((prev) => ({ ...prev, [fieldName]: validationMessage }));
    setIsFormValid(event.target.form.checkValidity());
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid) return;

    onAddPlaceSubmit({
      name: cardName,
      link: cardLink,
    });

    // Limpa os estados locais após a submissão para preparar o próximo reset
    setCardName("");
    setCardLink("");
    setIsFormValid(false);
  }

  return (
    <form
      className='popup__form'
      name='card-form'
      id='new-card-form'
      noValidate
      onSubmit={handleSubmit}
    >
      <label className='popup__field'>
        <input
          className={`popup__input popup__input_type_card-name ${errors.cardName ? "popup__input_type_error" : ""}`}
          id='card-name'
          maxLength='30'
          minLength='2'
          name='card-name'
          placeholder='Título'
          required
          type='text'
          value={cardName}
          onChange={(e) => handleChange(e, setCardName, "cardName")}
        />
        <span
          className={`popup__error ${errors.cardName ? "popup__error_visible" : ""}`}
          id='card-name-error'
        >
          {errors.cardName}
        </span>
      </label>

      <label className='popup__field'>
        <input
          className={`popup__input popup__input_type_url ${errors.cardLink ? "popup__input_type_error" : ""}`}
          id='card-link'
          name='link'
          placeholder='Link da imagem'
          required
          type='url'
          value={cardLink}
          onChange={(e) => handleChange(e, setCardLink, "cardLink")}
        />
        <span
          className={`popup__error ${errors.cardLink ? "popup__error_visible" : ""}`}
          id='card-link-error'
        >
          {errors.cardLink}
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
