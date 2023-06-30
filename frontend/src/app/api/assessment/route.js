import axios from "axios";
import { 
    CREATE_EVALUATION, 
    GET_LIST_EVALUATION, 
    GET_DETAIL_EVALUATION, 
    DOWNLOAD_EVALUATION_PDF,
    DOWNLOAD_EVALUATION_WORD
} from '..'

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

function downloadEvaluationPdf(data) {
  return axios.post(DOWNLOAD_EVALUATION_PDF, data, { responseType: 'blob' })
    .then(response => {
      // Créer un objet URL pour le fichier PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', data.filename);

      // Ajouter le lien au document et le déclencher pour télécharger le fichier
      document.body.appendChild(link);
      link.click();

      // Nettoyer l'URL de l'objet après le téléchargement
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors du téléchargement du fichier PDF:', error);
    });
}

function downloadEvaluationWord(data) {
  return axios.post(DOWNLOAD_EVALUATION_WORD, data, { responseType: 'blob' })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', data.filename);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors du téléchargement du fichier Word:', error);
    });
}

export { 
    createEvaluation, 
    getListEvaluation, 
    getDetailEvaluation,
    downloadEvaluationPdf,
    downloadEvaluationWord,
}