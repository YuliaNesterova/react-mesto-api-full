import React from "react";
import {Router, Route, withRouter, useHistory, Switch, Redirect } from "react-router-dom";
import * as auth from '../utils/auth';

import Header from './Header.js'
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ErrorPopup from "./ErrorPopup";
import CardDeletePopup from "./CardDeletePopup";
import Loader from "./Loader";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [pageLoader, setPageLoader] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
    const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
    const [currentCard, setCurrentCard] = React.useState({});
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isLoginPageActive, setIsLoginPageActive] = React.useState(true);
    const [userEmail, setUserEmail] = React.useState('');
    const [token, setToken] = React.useState('');

    const history = useHistory();

    function handleLogin(password, email) {
        auth.authorize(password, email)
            .then((data) => {
                if(data.token) {
                    setLoggedIn(true)
                    history.push('/main');
                }
            })
            .catch(() => {
                setIsInfoTooltipOpen(true)
            })
    }

    React.useEffect(() => {
        function checkToken() {

            if(localStorage.getItem('token')) {
                const token = localStorage.getItem('token');

                setPageLoader(true);

                if(token) {
                    Promise.all([auth.getUserData(token), api.getUserInfo(token), api.getInitialCards(token)])
                        .then(([userData, userInfo, cards]) => {
                                setUserEmail(userData.email);
                                setLoggedIn(true);
                                setToken(localStorage.getItem('token'));
                                history.push('/main');
                                setCurrentUser(userInfo)
                                setCards(cards)
                        })
                        .catch(() => {
                            setIsErrorPopupOpen(true);
                            }
                        )
                        .finally(() => {
                            setPageLoader(false);
                        })
                }
            }
        }
        checkToken();

    }, [history, loggedIn, token])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

   function handleCardClick(card) {
        setSelectedCard({
            link: card.link,
            name: card.name
        });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked, token).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((res) =>  {
                console.log(`Ошибка ${res}, попробуйте еще раз`);
            });
    }

    function handleCardDelete(card) {
       setIsDeleting(true);

           api.deleteCard(card._id, token).then(() => {
               const newCards = cards.filter((item) => {return item._id !== card._id})
               setCards(newCards);
           })
               .catch((res) =>  {
                   console.log(`Ошибка ${res}, попробуйте еще раз`);
               })
               .finally(() => {
                   setIsCardDeletePopupOpen(false);
                   setIsDeleting(false);
               });
       }

    function handleDeleteCardPopup(card) {
       setIsCardDeletePopupOpen(true);
       setCurrentCard(card);
    }

    function handleDeleteCardConfirm() {
       handleCardDelete(currentCard);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
        setIsErrorPopupOpen(false);
        setIsCardDeletePopupOpen(false);
        setIsInfoTooltipOpen(false);
    }

   function handleUpdateUser(object) {
       setIsSaving(true);

       api.changeUserInfo(object, token).then((user) => {
           setCurrentUser(user);
       })
           .catch((res) =>  {
               console.log(`Ошибка ${res}, попробуйте еще раз`);
           })
           .finally(() => {
               setIsEditProfilePopupOpen(false);
               setIsSaving(false);
           });
    }

    function handleUpdateAvatar(object) {
       setIsSaving(true);

       api.getNewUserPic(object, token).then((avatar) => {
           setCurrentUser(avatar);
       })
           .catch((res) =>  {
               console.log(`Ошибка ${res}, попробуйте еще раз`);
           })
           .finally(() => {
               setIsEditAvatarPopupOpen(false);
               setIsSaving(false);
           });
    }

    function handleAddPlace(object) {
        setIsSaving(true);

        api.addNewCard(object, token).then((newCard) => {
            setCards([newCard, ...cards]);

        })
            .catch((res) =>  {
                console.log(`Ошибка ${res}, попробуйте еще раз`);
            })
            .finally(() => {
                setIsAddPlacePopupOpen(false);
                setIsSaving(false);
            });
    }


    function handleSignOut() {
       setLoggedIn(false);
       setUserEmail('');
    }

    function handleLoginActive() {
        setIsLoginPageActive(true)
    }

    function handleLoginInactive() {
        setIsLoginPageActive(false);
    }

    function handleRegister(password, email) {
        auth.register(password, email)
            .then((res) => {
                if(res) {
                    setIsRegisterSuccess(true);
                    setIsInfoTooltipOpen(true);
                    setIsLoginPageActive(true);
                    history.push('/sign-in');
                } else {
                    setIsRegisterSuccess(false);
                    setIsInfoTooltipOpen(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsRegisterSuccess(false);
                setIsInfoTooltipOpen(true);
            })
    }

  return (
      <Router history={history}>

      <CurrentUserContext.Provider value={currentUser}>

          <div className="page">
              <Header loggedIn={loggedIn} isLoginActive={isLoginPageActive} onSignOut={handleSignOut}
                      userEmail={userEmail} handleLoginActive={handleLoginActive}
                      handleLoginInactive={handleLoginInactive}/>

              <Switch>
              <ProtectedRoute path="/main" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick}
                              onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
                              onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike}
                              onCardDelete={handleCardDelete} onDelete={handleDeleteCardPopup}/>
              <Route exact path="/sign-in">
                  <Login onLogin={handleLogin} loggedIn={loggedIn}/>
              </Route>
              <Route exact path="/sign-up">
                  <Register handleLoginActive={handleLoginActive} onRegister={handleRegister} isRegisterSuccess={isRegisterSuccess}/>
              </Route>
              <Route exact path="/">
                  {loggedIn ? <Redirect to="/main"/> : <Redirect to="/sign-in" />}
              </Route>
              </Switch>

              <Footer />
              <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} success={isRegisterSuccess} />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSaving={isSaving}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSaving={isSaving}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} isSaving={isSaving}/>
              <CardDeletePopup isOpen={isCardDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleDeleteCardConfirm} isDeleting={isDeleting}/>
              <ImagePopup name={`image`} card={selectedCard} onClose={closeAllPopups} />
              <ErrorPopup isOpen={isErrorPopupOpen} onClose={closeAllPopups} />
              <Loader isLoading={pageLoader}/>
          </div>

      </CurrentUserContext.Provider>

      </Router>
      );
}

export default withRouter(App);
