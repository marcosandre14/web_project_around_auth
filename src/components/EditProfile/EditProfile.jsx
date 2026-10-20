import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfile({ isLoading }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Estados para gerenciar as mensagens de erro de validação por campo
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [isFormValid, setIsFormValid] = useState(true);

  // Sincroniza os estados locais com as informações do contexto global do usuário
  useEffect(() => {
    if (currentUser && currentUser.name) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setErrors({ name: "", description: "" });
      setIsFormValid(true);
    }
  }, [currentUser]);

  // Manipulador genérico que captura a alteração e atualiza a validação em tempo real
  const handleChange = (event, setter, fieldName) => {
    const { value, validationMessage } = event.target;
    setter(value);

    // Armazena a mensagem de erro específica gerada pelo navegador
    setErrors((prev) => ({ ...prev, [fieldName]: validationMessage }));

    // Atualiza o estado geral de validação do formulário completo
    setIsFormValid(event.target.form.checkValidity());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    handleUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <form
      className='popup__form'
      name='profile-form'
      id='edit-profile-form'
      noValidate
      onSubmit={handleSubmit}
    >
      <label className='popup__field'>
        <input
          className={`popup__input popup__input_type_name ${errors.name ? "popup__input_type_error" : ""}`}
          id='owner-name'
          maxLength='40'
          minLength='2'
          name='userName'
          placeholder='Nome'
          required
          type='text'
          value={name}
          onChange={(e) => handleChange(e, setName, "name")}
        />
        <span
          className={`popup__error ${errors.name ? "popup__error_visible" : ""}`}
          id='owner-name-error'
        >
          {errors.name}
        </span>
      </label>

      <label className='popup__field'>
        <input
          className={`popup__input popup__input_type_description ${errors.description ? "popup__input_type_error" : ""}`}
          id='owner-description'
          maxLength='200'
          minLength='2'
          name='userDescription'
          placeholder='Sobre mim'
          required
          type='text'
          value={description}
          onChange={(e) => handleChange(e, setDescription, "description")}
        />
        <span
          className={`popup__error ${errors.description ? "popup__error_visible" : ""}`}
          id='owner-description-error'
        >
          {errors.description}
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
