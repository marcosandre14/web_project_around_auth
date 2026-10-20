import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";

import EditProfile from "../EditProfile/EditProfile";
import EditAvatar from "../EditAvatar/EditAvatar";
import NewCard from "../NewCard/NewCard";
import RemoveCard from "../RemoveCard/RemoveCard"; // 🟢 1. Importamos o componente RemoveCard
import Popup from "../Popup/Popup";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onCardClick,
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  isEditProfilePopupOpen,
  isEditAvatarPopupOpen,
  isAddPlacePopupOpen,
  isConfirmDeletePopupOpen,
  isLoading,
  onCloseAllPopups,
  onAddPlaceSubmit,
  onConfirmDeleteSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile page__section'>
        <div className='profile__avatar-container'>
          <img
            src={currentUser?.avatar}
            alt={`Avatar de ${currentUser?.name}`}
            className='profile__image'
          />
          <div
            className='profile__avatar-overlay'
            onClick={onEditAvatarClick}
          ></div>
        </div>

        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser?.name}</h1>
          <button
            className='profile__edit-button'
            type='button'
            onClick={onEditProfileClick}
          />
          <p className='profile__description'>{currentUser?.about}</p>
        </div>

        <button
          className='profile__add-button'
          type='button'
          onClick={onAddPlaceClick}
        />
      </section>

      <section className='cards page__section'>
        <ul className='cards__list'>
          {cards.map((card) => {
            const isCardLiked = card.isLiked || false;

            return (
              <Card
                key={card._id}
                card={card}
                isLiked={isCardLiked}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>

      {/* Popup para Edição de Perfil */}
      {isEditProfilePopupOpen && (
        <Popup title='Editar perfil' onClose={onCloseAllPopups}>
          <EditProfile isLoading={isLoading} />
        </Popup>
      )}

      {/* Popup para Edição de Avatar */}
      {isEditAvatarPopupOpen && (
        <Popup title='Alterar a foto do perfil' onClose={onCloseAllPopups}>
          <EditAvatar isLoading={isLoading} />
        </Popup>
      )}

      {/* Popup para Adição de Novo Cartão */}
      {isAddPlacePopupOpen && (
        <Popup title='Novo lugar' onClose={onCloseAllPopups}>
          <NewCard onAddPlaceSubmit={onAddPlaceSubmit} isLoading={isLoading} />
        </Popup>
      )}

      {/* Popup confirmação de remover card */}
      {isConfirmDeletePopupOpen && (
        <Popup
          title='Tem certeza?'
          onClose={onCloseAllPopups}
          isConfirmation={true}
        >
          <RemoveCard onSubmit={onConfirmDeleteSubmit} isLoading={isLoading} />
        </Popup>
      )}
    </main>
  );
}
