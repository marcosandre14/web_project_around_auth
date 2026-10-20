// src/components/Header/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({ email, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isSignIn = location.pathname === "/signin";
  const isSignUp = location.pathname === "/signup";
  const isLoggedIn = !isSignIn && !isSignUp;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    setIsMenuOpen(false);
    onSignOut();
  };

  return (
    <header className='header page__section'>
      {/*  Gaveta de e-mail e Sair */}
      {isLoggedIn && (
        <div
          className={`header__user-menu ${isMenuOpen ? "header__user-menu_opened" : ""}`}
        >
          <span className='header__email'>{email}</span>
          <button
            onClick={handleSignOut}
            className='header__button header__button_type_logout'
          >
            Sair
          </button>
        </div>
      )}

      {/* Barra Principal (Logo + Link ou Botão Hambúrguer/Fechar) */}
      <div className='header__main-container'>
        <img
          src={logo}
          alt='Logotipo Around The U.S.'
          className='logo header__logo'
        />

        <div className='header__nav'>
          {isSignIn && (
            <Link to='/signup' className='header__link'>
              Inscrever-se
            </Link>
          )}

          {isSignUp && (
            <Link to='/signin' className='header__link'>
              Entrar
            </Link>
          )}

          {isLoggedIn && (
            <>
              {/* Informações de usuário visíveis apenas no Desktop */}
              <div className='header__user-info header__user-info_desktop'>
                <span className='header__email'>{email}</span>
                <button
                  onClick={onSignOut}
                  className='header__button header__button_type_logout'
                >
                  Sair
                </button>
              </div>

              {/* Botão Hambúrguer / Fechar no Mobile */}
              <button
                type='button'
                className={`header__hamburger ${isMenuOpen ? "header__hamburger_type_close" : ""}`}
                onClick={toggleMenu}
                aria-label='Alternar menu'
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
