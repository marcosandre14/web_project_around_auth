import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ImagePopup from "./ImagePopup/ImagePopup";

function App() {
  // Estados globais da aplicação
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  // Estados de Autenticação
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  // Estados de controle de abertura dos Popups (Modais)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  // Estado que monitora requisições assíncronas ativas para alterar os botões de submit
  const [isLoading, setIsLoading] = useState(false);

  // Verificação do token ao carregar a aplicação
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res && res.data) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("Erro ao verificar token:", err);
        });
    }
  }, [navigate]);

  // Busca informações do perfil do usuário e cartões iniciais quando estiver logado
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Erro ao carregar dados do usuário:", err);
        });

      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.error("Erro ao carregar os cartões iniciais:", err);
        });
    }
  }, [isLoggedIn]);

  // Função de Registro de Usuário
  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.error("Erro no registro:", err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  // Função de Login/Autorização
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data && data.token) {
          setIsLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Erro no login:", err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  // Função de Logout
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  };

  // Funções controladoras de abertura dos popups
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Captura o cartão que o usuário deseja remover e abre o popup de confirmação
  function handleCardDeleteClick(card) {
    setCardToDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  // Função centralizada responsável por redefinir os estados e fechar qualquer modal ativo
  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setCardToDelete(null);
  }

  // Intercala o estado de curtidas (Like/Dislike)
  async function handleCardLike(card, isLiked) {
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error("Erro ao atualizar curtida:", error));
  }

  // Executa a deleção definitiva
  async function handleConfirmDeleteSubmit(event) {
    event.preventDefault();
    if (!cardToDelete) return;
    setIsLoading(true);

    await api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((error) => console.error("Erro ao deletar o cartão:", error))
      .finally(() => setIsLoading(false));
  }

  // Atualiza os dados de perfil
  const handleUpdateUser = (inputData) => {
    setIsLoading(true);
    api
      .setUserInfo(inputData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) => console.error("Erro ao atualizar perfil:", error))
      .finally(() => setIsLoading(false));
  };

  // Atualiza a imagem de avatar
  const handleUpdateAvatar = (inputData) => {
    setIsLoading(true);
    api
      .setUserAvatar(inputData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) => console.error("Erro ao atualizar avatar:", error))
      .finally(() => setIsLoading(false));
  };

  // Cria e adiciona um novo cartão
  const handleAddPlaceSubmit = (inputData) => {
    setIsLoading(true);
    api
      .addCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error("Erro ao adicionar novo lugar:", error))
      .finally(() => setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className='page'>
        <div className='page__content'>
          <Routes>
            {/* Rota Protegida (Página Principal) */}
            <Route
              path='/'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Header
                    email={userEmail}
                    onSignOut={handleSignOut}
                    isLoggedIn={isLoggedIn}
                  />

                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteClick}
                    onCardClick={handleCardClick}
                    onEditProfileClick={handleEditProfileClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    isEditProfilePopupOpen={isEditProfilePopupOpen}
                    isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                    isConfirmDeletePopupOpen={isConfirmDeletePopupOpen}
                    isLoading={isLoading}
                    onCloseAllPopups={closeAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onConfirmDeleteSubmit={handleConfirmDeleteSubmit}
                  />

                  <Footer />

                  {selectedCard && (
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                  )}
                </ProtectedRoute>
              }
            />

            {/* Rota de Login */}
            <Route
              path='/signin'
              element={
                <>
                  <Header linkTo='/signup' linkText='Inscrever-se' />
                  <Login onLogin={handleLogin} />
                </>
              }
            />

            {/* Rota de Registo */}
            <Route
              path='/signup'
              element={
                <>
                  <Header linkTo='/signin' linkText='Entrar' />
                  <Register onRegister={handleRegister} />
                </>
              }
            />

            {/* Redirecionamento para qualquer outra rota desconhecida */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>

          {/* Modal de confirmação de sucesso/erro */}
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
