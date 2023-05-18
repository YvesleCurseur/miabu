import axios from "axios";

const URL = "http://127.0.0:8000/v1/";

// Get a hello world

export const getHelloWorld = () => {
    return axios.get(URL + 'hello-world');
}

