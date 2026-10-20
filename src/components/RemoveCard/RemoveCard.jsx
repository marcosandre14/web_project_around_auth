import React from "react";

export default function RemoveCard({ onSubmit, isLoading }) {
  return (
    <form className='popup__form' onSubmit={onSubmit} noValidate>
      <button className='button popup__button' type='submit'>
        {isLoading ? "Deletando..." : "Sim"}
      </button>
    </form>
  );
}
