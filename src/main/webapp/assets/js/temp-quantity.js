const add_qty = document.getElementById("add_quantity");
const qty_cat_weight = document.getElementById("qty-cat-weight-number");
const qty_cat_unit = document.getElementById("qty-cat-weight-unit");
const qty_cat_rs = document.getElementById("qty-cat-price");

// URL for temporary data retrieval and management
const tempQtyServletUrl = "http://localhost:8080/agrokart-web/TemporaryDataServlet";

// Attach a function to the window's onload event, which will execute when the page is fully loaded
window.onload = deleteAllqty;

// Add a click event listener to the 'add_quantity_price' element
add_qty.addEventListener("click", (e) => {
	e.preventDefault(); // Prevent the default click behavior

	// Get values from form inputs
	const quantity_input_value = qty_cat_weight.value.trim();
	const selectedValue = qty_cat_unit.value;
	const quantity_price_input_value = qty_cat_rs.value.trim();

	// Create a URLSearchParams object to build the query string
	const params = new URLSearchParams();
	params.append("quantity", quantity_input_value);
	params.append("unit", selectedValue);
	params.append("price", quantity_price_input_value);
	params.append("action", "add");

	// Construct the full URL with parameters
	const fullUrl = tempQtyServletUrl + "?" + params.toString();

	// Send a GET request to 'tempQtyServletUrl' to retrieve data
	axios
		.get(tempQtyServletUrl)
		.then(function(response) {
			const serverMsg = response.data;
			let checkQty = true;

			// Check if the quantity already exists in the server response
			serverMsg.find((obj) => {
				const weight = "" + obj.weight;
				if (quantity_input_value == weight) {
					checkQty = false;
					Notify.error(`Already ${quantity_input_value}${selectedValue} Added`);
				}
			});

			if (checkQty) {
				// If the quantity doesn't exist, make a POST request to add it
				axios
					.post(fullUrl)
					.then(function(response) {
						const serverMsg = response.data.trim();
						if (serverMsg === "success") {
							Notify.success("Product quantity added.");
							getAllQutyCate();
						} else {
							Notify.error(serverMsg);
						}
					})
					.catch(function(error) {
						Notify.error(error);
					});
			}
		})
		.catch(function(error) {
			// Handle GET request error
			Notify.error(error);
		});
});


// Function to retrieve all quantity categories from the server
function getAllQutyCate() {
	// Send a GET request to 'tempQtyServletUrl' to fetch data
	axios.get(tempQtyServletUrl)
		.then(function(response) {
			const serverMsg = response.data; // Store the server response data
			displaypricelist(serverMsg); // Call a function to display the data
		})
		.catch(function(error) {
			// Handle any errors that may occur during the GET request
			Notify.error(error); // Notify the user of the error
		});
}

function setTempQty(obj) {

	const params = new URLSearchParams();
	params.append("action", "addAll");

	const fullUrl = tempQtyServletUrl + "?" + params.toString();

	axios.post(fullUrl, obj) // Send the obj directly as the request body
		.then(function(response) {
			const serverMsg = response.data.trim();

			if (serverMsg === "success") {
				// Call the getAllQutyCate function after the POST request completes successfully
				getAllQutyCate();
			} else {
				// Handle errors for the POST request
				Notify.error(serverMsg);
			}
		})
		.catch(function(error) {
			// Handle errors for the POST request
			Notify.error(error);
		});
}


// Function to display the list of product quantities and prices
function displaypricelist(quantity) {
	let output = ""; // Initialize an empty output string
	const list_show = document.querySelector(".quantity-price-list .row"); // Get the element where the list will be displayed

	if (quantity.length === 0) {
		// Check if the 'quantity' array is empty
		output += `<h3 style="text-align: center;">No product quantities found.</h3>`; // Display a message indicating no quantities found
	}

	if (quantity !== null || quantity.length != 0) {
		// Check if 'quantity' is not null and not an empty array
		quantity.forEach((element, index) => {
			// Loop through each element in the 'quantity' array
			output += ` <div class="col-lg-4 col-md-6 col-sm-12 m-2">
                                        <div class="quantity_price_list_item text-center">
                                            <p class="quantity_price_p">${element.weight}${element.unit.toLowerCase()} - &#x20B9;${element.rs}</p>
                                            <p class="quantity_price_delete bg-danger">Remove</p>
                                        </div>
                                    </div>`;
			// Generate HTML for displaying quantity and price, along with a delete button
		});
	}

	list_show.innerHTML = output; // Set the HTML content of the 'list_show' element to the generated output
	createDeleteEventlistner();
}

function createDeleteEventlistner() {

	const deleteButtons = document.querySelectorAll('.quantity_price_delete');

	// Add an event listener to each delete button
	deleteButtons.forEach((button, index) => {
		button.addEventListener('click', () => {

			deletepricelist(index);

		});
	});
}

// Function to delete all product quantities
function deleteAllqty() {
	const params = new URLSearchParams(); // Create a URLSearchParams object to build query parameters
	params.append("action", "deleteAll"); // Add the 'action' parameter with the value 'deleteAll'
	const fullUrl = tempQtyServletUrl + "?" + params.toString(); // Construct the full URL with parameters

	// Send a POST request to the server to delete all quantities
	axios
		.post(fullUrl)
		.then(function(response) {
			const serverMsg = response.data.trim(); // Get the server response message

			if (serverMsg === "success") {
				// If the server responds with 'success', the deletion was successful
				// You can add any additional actions or notifications here if needed
			} else {
				// If the server responds with an error message, notify the user
				Notify.error(serverMsg);
			}
		})
		.catch(function(error) {
			// Handle any errors that may occur during the POST request
			Notify.error(error); // Notify the user of the error
		});
}

// Function to delete a product quantity by index
function deletepricelist(index) {
	const params = new URLSearchParams(); // Create a URLSearchParams object to build query parameters
	params.append("index", index); // Add the 'index' parameter with the provided 'index' value
	params.append("action", "delete"); // Add the 'action' parameter with the value 'delete'

	const fullUrl = tempQtyServletUrl + "?" + params.toString(); // Construct the full URL with parameters

	// Send a POST request to the server to delete the product quantity
	axios
		.post(fullUrl)
		.then(function(response) {
			const serverMsg = response.data.trim(); // Get the server response message

			if (serverMsg === "success") {
				// If the server responds with 'success', the deletion was successful
				Notify.success("Product quantity deleted."); // Notify the user of the successful deletion
				getAllQutyCate(); // Refresh the quantity category list
			} else {
				// If the server responds with an error message, notify the user
				Notify.error(serverMsg);
			}
		})
		.catch(function(error) {
			// Handle any errors that may occur during the POST request
			Notify.error(error); // Notify the user of the error
		});
}

export { deletepricelist, getAllQutyCate, deleteAllqty, tempQtyServletUrl,setTempQty };