import axios from "axios";
import { GET_LIST_USER, GET_DETAIL_USER, LOGIN, REGISTER, GET_LIKES_LIST_USER } from "..";
// Make a get request to the API

import Cookies from "js-cookie";

function getListUser() {
    return axios
    .get(GET_LIST_USER)
      .then((response) => {
        const data = response.data; // Extracts the response data
        // console.log(data); // Logs the response data to the console
        return data; // Returns the response data
      })
      .catch((error) => {
        console.error(error); // Logs the error to the console
        throw error; // Throws the error to be caught by the caller
      });
}

function signInUser (email, password){
	return axios
	.post(LOGIN, {
		email,
		password,
	})
	.then((response) => {
		return response.data
	})
	.catch((error) => {
		console.error(error)
	});
};

function signUpUser(userSubmission){
	return axios
	.post(REGISTER, userSubmission)
	.then((response) => {
		return response.data
	})
	.catch((error) => {
		console.error(error)
	});
};

function getDetailUser(email){
	return axios
	.post(GET_DETAIL_USER, {
		email
	})
	.then((response) => {
		const data = response.data; // Extracts the response data
		console.log(data); // Logs the response data to the console
		return data; // Returns the response data
	})
	.catch((error) => {
		console.error(error); // Logs the error to the console
		throw error; // Throws the error to be caught by the caller
	});
};

function getLikesListUser(user_id){
	return axios
	.post(GET_LIKES_LIST_USER, {
		user_id
	})
	.then((response) => {
		const data = response.data; // Extracts the response data
		console.log(data); // Logs the response data to the console
		return data; // Returns the response data
	})
	.catch((error) => {
		console.error(error); // Logs the error to the console
		throw error; // Throws the error to be caught by the caller
	});
}
export { getListUser, getDetailUser, signInUser, signUpUser, getLikesListUser };