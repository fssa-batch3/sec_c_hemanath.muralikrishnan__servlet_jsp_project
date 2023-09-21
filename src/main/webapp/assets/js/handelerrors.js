import { Notify } from "./vendor/notify.js";

function handleGenericError(error) {
	if (axios.isAxiosError(error)) {
		// Axios error (network or HTTP error)
		if (error.response) {
			// The request was made and the server responded with a status code
			const status = error.response.status;
			if (status === 401) {
				Notify.error("Unauthorized: Please log in.");
			} else if (status === 400) {
				Notify.error("Bad Request: " + error.response.data);
			} else if (status === 500) {
				Notify.error("Internal Server Error: " + error.response.data);
			} else if (status === 600) {
				Notify.error("Custom Status Code 600: " + error.response.data);
			} else {
				Notify.error("HTTP Error " + status);
			}
		} else if (error.request) {
			// The request was made but no response was received
			Notify.error("Network Error: No response received.");
		} else {
			// Something happened in setting up the request
			Notify.error("Request Error: " + error.message);
		}
	} else {
		// Handle other types of errors as needed
		Notify.error("An error occurred.");
	}
}

export { handleGenericError };