import axios from "axios";
import { HELLO_WORLD } from "..";

function getHelloWorld() {
    return axios
      .get(HELLO_WORLD) // Sends an HTTP GET request to the HELLO_WORLD endpoint
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

export { getHelloWorld };