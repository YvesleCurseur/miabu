export const URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_PROD;

// Hello World
export const HELLO_WORLD = URL + "v1/hello-world/"

//Create a Evaluation
export const CREATE_EVALUATION = URL + "v1/assessment/add-evaluation/"
export const GET_LIST_EVALUATION = URL + "v1/assessment/evaluations/"
export const GET_DETAIL_EVALUATION = URL + "v1/assessment/evaluation/"  

// Answer
export const CREATE_ANSWER = URL + "v1/forum/add-answer/"

// User
export const GET_LIST_USER = URL + "v1/user/list-users/"
export const GET_DETAIL_USER = URL + "v1/user/detail-user/"
export const REGISTER = URL + "v1/user/register/"
export const LOGIN = URL + "v1/user/login/"

