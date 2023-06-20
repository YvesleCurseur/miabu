import axios from "axios";
import { CREATE_ANSWER } from "..";

function createAnswer(data) {
    return axios
        .post(CREATE_ANSWER, data)
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

export default createAnswer;