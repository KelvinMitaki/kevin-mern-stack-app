import axios from "axios";
import {
  GET_ITEMS,
  DELETE_ITEM,
  POST_ITEM,
  ITEMS_LOADING
} from "../actions/types";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/items").then(res => {
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  });
};
export const postItem = item => dispatch => {
  axios.post("/api/items", item).then(res => {
    dispatch({
      type: POST_ITEM,
      payload: res.data
    });
  });
};
export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res => {
    dispatch({
      type: DELETE_ITEM,
      payload: id
    });
  });
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
