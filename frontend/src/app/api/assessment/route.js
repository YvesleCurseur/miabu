import axios from "axios";
import { CREATE_EVALUATION, GET_LIST_EVALUATION, GET_DETAIL_EVALUATION } from '..'

function createEvaluation(data) {
    return axios
        .post(CREATE_EVALUATION, data)
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

function getListEvaluation() {
    return axios
        .get(GET_LIST_EVALUATION)
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

function getDetailEvaluation(id) {
    return axios
        .get(GET_DETAIL_EVALUATION + id + '/')
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

export { createEvaluation, getListEvaluation, getDetailEvaluation };