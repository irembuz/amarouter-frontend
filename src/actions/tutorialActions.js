import { db } from "../firebase/firebaseConfig";
import {
  TUTORIAL_LIST_REQUEST,
  TUTORIAL_LIST_SUCCESS,
  TUTORIAL_LIST_FAIL,
  TUTORIAL_PAGE_REQUEST,
  TUTORIAL_PAGE_SUCCESS,
  TUTORIAL_PAGE_FAIL,
} from "../constants/tutorialConstants";

export const listTutorials = (slug) => async (dispatch) => {
  try {
    dispatch({ type: TUTORIAL_LIST_REQUEST });

    const docRef = db.collection("tutorials");
    docRef
      .where("slug", "==", slug)
      .get()
      .then((snapshot) => {
        let data = [];
        if (snapshot && !snapshot.empty) {
          snapshot.forEach((doc) => {
            data.push({ ...doc.data(), _id: doc.id });
          });
        }
        return data;
      })
      .then((data) => {
        dispatch({
          type: TUTORIAL_LIST_SUCCESS,
          payload: data,
        });
      });
  } catch (error) {
    dispatch({
      type: TUTORIAL_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listTutorialPage = (slug) => async (dispatch) => {
  try {
    dispatch({ type: TUTORIAL_PAGE_REQUEST });
    const docRef = db.collection("tutorials");
    docRef
      .where("slug", "==", slug)
      .get()
      .then((snapshot) => {
        let data = [];
        if (snapshot && !snapshot.empty) {
          snapshot.forEach((doc) => {
            data.push({ ...doc.data(), _id: doc.id });
          });
        }
        return data;
      })
      .then((snapshot) => {
        const data = snapshot[0];
        if (data) {
          dispatch({
            type: TUTORIAL_PAGE_SUCCESS,
            payload: data,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: TUTORIAL_PAGE_FAIL,
      payload: error.message,
    });
  }
};
