import { Notify } from "./vendor/notify.js";

function handleGenericError(error) {
	if (axios.isAxiosError(error)) {
		// Axios error (network or HTTP error)
		if (error.response) {
			// The request was made and the server responded with a status code
			const status = error.response.status;
			if (status === 401) {
				Notify.error("Unauthorized: Please log in.");
			} else if (status === 400 || status === 500 || status === 600) {
				// Extract and display the error message from the HTML response
				const htmlContent = error.response.data;
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = htmlContent;

				// Find all paragraph elements within the temporary div
				const paragraphs = tempDiv.querySelectorAll('p');

				// Iterate through the paragraphs to find the one containing the error message
				let errorMessage = "An error occurred."; // Default error message
				for (const paragraph of paragraphs) {
					if (paragraph.textContent.includes("Message")) {
						errorMessage = paragraph.textContent.replace("Message", "").trim();
						break; // Stop searching once found
					}
				}

				Notify.error(errorMessage);
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
		Notify.error(error);
	}
}




export { handleGenericError };