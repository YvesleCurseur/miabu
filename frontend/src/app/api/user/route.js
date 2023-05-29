import axios from "axios";
import { GET_LIST_USER, LOGIN, REGISTER } from "..";
// Make a get request to the API

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

export { getListUser, signInUser, signUpUser };