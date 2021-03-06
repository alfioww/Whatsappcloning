import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import {
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SPINNER_LOGIN,
  SIGNUP_SUCCESS,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  SIGNUP_USER_FAIL,
  SPINNER_SIGNUP
} from './types';

export const nameChanged = (text) => {
  return {
      type: NAME_CHANGED,
      payload: text
  };
};

export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};

export const passwordChanged = (text) => {
  return {
      type: PASSWORD_CHANGED,
      payload: text
  };
};

export const enterEmail = (text) => {
  return {
      type: ENTER_EMAIL,
      payload: text
  };
};

export const enterPassword = (text) => {
  return {
      type: ENTER_PASSWORD,
      payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
      dispatch({ type: SPINNER_LOGIN });

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(user => loginUserFail(dispatch, user));
    };
};

export const toLoginScreen = () => {
  return {
    type: 'LOGIN_SCREEN'
  };
};

 export const toMainScreen = () => {
  return {
    type : 'MAIN_SCREEN',
  };
};


const loginUserSuccess = (dispatch, user) => {
  console.log(user);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  dispatch(toMainScreen());
};

const loginUserFail = (dispatch, user) => {
  console.log(user)
  dispatch({ type: LOGIN_USER_FAIL });
};

export const signUp = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch({ type: SPINNER_SIGNUP });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signupUserSuccess(dispatch, user, name, email))
      .catch(user => signupUserFail(dispatch,user))
  };
};


const signupUserSuccess = (dispatch, user, name, email) => {
  console.log(user);
  const { currentUser } = firebase.auth();
  dispatch({
    type: SIGNUP_SUCCESS,
    payload: user
  });
  dispatch(toLoginScreen());
  firebase.database().ref(`users/${currentUser.uid}`)
  .set({ name, email, createdBy:currentUser.uid })

};

const signupUserFail = (dispatch, user) => {
  console.log(user);
  dispatch({ type: SIGNUP_USER_FAIL })
}
