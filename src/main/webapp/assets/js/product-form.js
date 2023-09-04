import { deleteAllqty, tempQtyServletUrl } from "./temp-quantity.js";
import { product_id, all_elements, getAllProducts } from "./list-product.js";

// Get references to various form elements by their IDs
const product_form = document.getElementById("product-form");         // Get the form element
const image_url = document.getElementById("product-image-url");       // Get the input for product image URL
const english_name = document.getElementById("product-english-name"); // Get the input for English product name
const tamil_name = document.getElementById("product-tamil-name");     // Get the input for Tamil product name
const description = document.getElementById("product-description");   // Get the input for product description
const protein = document.getElementById("product-protein");           // Get the input for product protein content
const carbohydrates = document.getElementById("product-carbo");       // Get the input for product carbohydrates content
const calories = document.getElementById("product-kcal");             // Get the input for product calorie content
const avbl_weight = document.getElementById("avbl-weight-number");     // Get the input for available product weight

const categoryRadios = document.querySelectorAll('input[name="product-category"]'); // Get the all category radio input
const avblRadios = document.querySelectorAll('input[name="avbl-weight-unit"]'); // Get the all avbl unit radio input

const quantity_price_div = document.querySelector(".qty_cat_div");

const form_sumbit = document.getElementById("form-submit");

const addServletUrl = "http://localhost:8080/agrokart-web/AddProductAjaxServlet";    // URL for adding a product
const updateServletUrl = "http://localhost:8080/agrokart-web/UpdateproductServlet";  // URL for updating a product


// Function to get form input values
function getFormInputValues() {
	// Get values from various form input fields and elements
	const imageUrl = image_url.value.trim();
	const engName = english_name.value.trim();
	const tamName = tamil_name.value.trim();
	const categoryName = document.querySelector('input[name="product-category"]:checked').value;
	const product_desc = description.value.trim();
	const protein_value = protein.value.trim();
	const carbon_value = carbohydrates.value.trim();
	const kcal_value = calories.value.trim();
	const weight = avbl_weight.value.trim();
	const unit = document.querySelector('input[name="avbl-weight-unit"]:checked').value;

	return {
		imageUrl,
		engName,
		tamName,
		categoryName,
		product_desc,
		protein_value,
		carbon_value,
		kcal_value,
		weight,
		unit
	};
}

function submitForm() {

	const formData = getFormInputValues();
	const params = new URLSearchParams(formData);

	// Send a GET request to 'tempQtyServletUrl' to retrieve some data
	axios
		.get(tempQtyServletUrl)
		.then(function(getResponse) {
			const getServerMsg = getResponse.data;
			// Convert the retrieved data to a JSON string
			const jsonQtyArrayString = JSON.stringify(getServerMsg);

			// Add 'qty_cat' parameter to the URLSearchParams
			params.append("qty_cat", jsonQtyArrayString);


			if (product_id == 0) {

				const fullUrl = addServletUrl + "?" + params.toString();

				// After the GET request succeeds, make a POST request to add the product
				axios
					.post(fullUrl)
					.then(function(postResponse) {
						const postServerMsg = postResponse.data.trim();
						if (postServerMsg === "success") {
							// Show a success notification and refresh the page
							Notify.success("Successfully product added");
							deleteAllqty();
							all_elements.style.display = "none";
							getAllProducts();
						} else {
							// Show an error notification with the response message
							Notify.error(postServerMsg);
						}
					})
					.catch(function(postError) {
						// Handle POST request error and show an error notification
						Notify.error(postError);
					});
			} else {
				params.append("id", product_id);
				const fullUrl = updateServletUrl + "?" + params.toString();
				axios
					.post(fullUrl)
					.then(function(postResponse) {
						const postServerMsg = postResponse.data.trim();
						if (postServerMsg === "success") {
							// Show a success notification and refresh the page
							Notify.success("Successfully product updated.");
							deleteAllqty();
							all_elements.style.display = "none";
							getAllProducts();

						} else {
							// Show an error notification with the response message
							Notify.error(postServerMsg);
						}
					})
					.catch(function(postError) {
						// Handle POST request error and show an error notification
						Notify.error(postError);
					});

			}
		})
		.catch(function(getError) {
			// Handle GET request error and show an error notification
			Notify.error(getError);
		});

}

const avalUnitRadios = document.querySelectorAll('input[name="avbl-weight-unit"]');

// Add a change event listener to all the radio buttons
avalUnitRadios.forEach(function(radio) {
	radio.addEventListener("change", function() {
		const selectedValue = this.value;
		updateWeightUnitOptions(selectedValue);
	});
});

// Function to update the disabled property of weight unit options based on the selected value
function updateWeightUnitOptions(selectedValue) {
	const weightUnitSelect = document.getElementById("qty-cat-weight-unit"); // Get the weight unit select element
	const options = weightUnitSelect.options; // Get the list of options within the select element

	// Clear any previously disabled options by setting disabled to false for all options
	for (let i = 0; i < options.length; i++) {
		options[i].disabled = false;
	}

	// Disable specific options based on the selected value
	if (selectedValue == "KG") {
		options[2].disabled = true; // Disable the option for "G"
		options[3].disabled = true; // Disable the option for "NOS"
	}

	if (selectedValue == "PKT") {
		options[0].disabled = true; // Disable the option for "KG"
		options[1].disabled = true; // Disable the option for "G"
		options[2].disabled = true; // Disable the option for "ML"
	}

	if (selectedValue == "NOS") {
		options[0].disabled = true; // Disable the option for "KG"
		options[1].disabled = true; // Disable the option for "G"
		options[3].disabled = true; // Disable the option for "PKT"
	}

	if (selectedValue == null) {
		// If no value is selected (null), disable all options
		for (let i = 0; i < options.length; i++) {
			options[i].disabled = true;
		}
	}
}

// Initialize the disabled options based on the initially selected radio button
const initiallySelectedRadio = document.querySelector('input[name="avbl-weight-unit"]:checked');
updateWeightUnitOptions(initiallySelectedRadio ? initiallySelectedRadio.value : null);


// This function disables all input fields on the page
function disableAllInputFields() {
	image_url.disabled = true;
	english_name.disabled = true;
	tamil_name.disabled = true;
	disableAllCategory();
	description.disabled = true;
	protein.disabled = true;
	carbohydrates.disabled = true;
	calories.disabled = true;
	avbl_weight.disabled = true;
	disableAllAvblUnit();
}

// This function disables all category radio buttons
function disableAllCategory() {

	for (let i = 0; i < categoryRadios.length; i++) {
		categoryRadios[i].disabled = true;
	}

}

// This function disables all available unit radio buttons
function disableAllAvblUnit() {

	for (let i = 0; i < avblRadios.length; i++) {
		avblRadios[i].disabled = true;
	}

}

// This function enables all input fields on the page
function enableAllInputFields() {
	image_url.disabled = false;
	english_name.disabled = false;
	tamil_name.disabled = false;
	enableAllCategory();
	description.disabled = false;
	protein.disabled = false;
	carbohydrates.disabled = false;
	calories.disabled = false;
	avbl_weight.disabled = false;
	enableAllAvblUnit();
}

// This function enables all category radio buttons
function enableAllCategory() {

	for (let i = 0; i < categoryRadios.length; i++) {
		categoryRadios[i].disabled = false;
	}

}

// This function enables all available unit radio buttons
function enableAllAvblUnit() {

	for (let i = 0; i < avblRadios.length; i++) {
		avblRadios[i].disabled = false;
	}

}


export {
	quantity_price_div, categoryRadios, avblRadios, disableAllInputFields,
	enableAllInputFields, form_sumbit, image_url, english_name, tamil_name, description,
	protein, carbohydrates, calories, avbl_weight, product_form, submitForm
};


