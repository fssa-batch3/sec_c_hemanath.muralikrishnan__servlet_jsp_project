/* The below code is importing various modules and functions from different JavaScript files. It is not
clear what the specific functionality of each imported module or function is without further
context. */
import { findUserRecordByEmail, getCurrentUser, UserServlet } from "../is_logged.js";
import { Notify } from "../vendor/notify.js";
import { startSpinner, endSpinner } from "../loading.js";
import { getBaseUrlFromCurrentPage } from "../getUrl.js";
import { handleGenericError } from "../handelerrors.js";


let logged_email;
let user_profile;
let address_id = 0;
const root = getBaseUrlFromCurrentPage();
const addressServlet = root + "/UserAddress";
// Wrap the code in an async function

/**
 * The main function is an asynchronous function that handles the logic for retrieving the current
 * user, finding the user record by email, loading the user's address, appending profile details, and
 * handling any errors that occur.
 */
async function main() {
	try {
		startSpinner();
		logged_email = await getCurrentUser();
		if (logged_email !== null) {
			user_profile = await findUserRecordByEmail(logged_email);
			load_address(user_profile.id);
			document.querySelector(".show-address").innerHTML = " ";
			appendProfileDetails();
		} else {

			window.location.href = getBaseUrlFromCurrentPage() + "/pages/error/error_page.jsp?error=401&msg= User is not authenticated, Unauthorized access."
		}
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}
}

main();

// profile form
const profile_form = document.getElementById("profile_form");

const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const gender_male = document.getElementById("male");
const gender_female = document.getElementById("female");
const others_gender = document.getElementById("others");
const email_Input = document.getElementById("email-address");
const mobile_Input = document.getElementById("profile-mobile-number");
const profile_user_name = document.getElementById("user-profile-name");

// edit button for profile section only
const profile_edit_button = document.getElementById("edit-profile");
const profile_save_button = document.getElementById("save-profile");

// start of add address operations

const new_address = document.getElementById("add_new_address");

// div contains all address form elements new address

const address_div = document.querySelector(".address-form");

const address_form = document.getElementById("address_form");


// close for new address

const address_form_close = document.getElementById("address_close_form");


// getting input using id for new address form

const full_name = document.getElementById("full-name-input");
const full_address = document.getElementById("full-address-input");
const pincode = document.getElementById("pincode-input");
const phone_number = document.getElementById("phone-number-input");

// append the addresses

const address_append_div = document.querySelector(".show-address");


remove_address();


/**
 * The function `appendProfileDetails` is an asynchronous function that appends profile details to the
 * DOM, including a user profile image, first name, last name, email, phone number, and gender.
 */
async function appendProfileDetails() {
	try {
		startSpinner(); // Start the spinner

		if (document.getElementById("user_profile_img") != null) {
			document.getElementById("user_profile_img").remove();
		}

		// Showing data from already existing data
		const profile_img = document.createElement("img");
		profile_img.setAttribute(
			"src",
			`https://ui-avatars.com/api/?name=${user_profile.firstName} ${user_profile.lastName}&background=0D8ABC&color=fff`
		);
		profile_img.setAttribute(
			"alt",
			`user image of ${user_profile.firstName} ${user_profile.lastName}`
		);
		profile_img.setAttribute("id", "user_profile_img");
		document.querySelector(".profile-img").append(profile_img);

		first_name.value = user_profile.firstName;
		last_name.value = user_profile.lastName;
		email_Input.value = user_profile.emailId;
		mobile_Input.value = user_profile.phoneNumber;
		profile_user_name.innerText = `${user_profile.firstName} ${user_profile.lastName}`;

		// Gender radio checked buttons
		if (user_profile.gender !== null) {
			if (user_profile.gender === "MALE") {
				gender_male.checked = true;
				gender_female.checked = false;
				others_gender.checked = false;
			} else if (user_profile.gender === "FEMALE") {
				gender_female.checked = true;
				gender_male.checked = false;
				others_gender.checked = false;
			} else if (user_profile.gender === "OTHERS") {
				others_gender.checked = true;
				gender_female.checked = false;
				gender_male.checked = false;
			}
		}
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner(); // End the spinner (whether success or error)
	}
}


// save button display none
profile_save_button.style.display = "none";

// edit button
/* The below code is adding an event listener to the "profile_edit_button" element. When the button is
clicked, it prevents the default behavior (e.g., submitting a form). */
profile_edit_button.addEventListener("click", (e) => {
	e.preventDefault();

	// assign disable values to input
	first_name.disabled = false;
	last_name.disabled = false;
	gender_male.disabled = false;
	gender_female.disabled = false;
	others_gender.disabled = false;
	// save button display block
	profile_save_button.style.display = "";
	// edit button display none
	profile_edit_button.style.display = "none";
});

// save button
/* The above code is adding an event listener to a form with the id "profile_form". When the form is
submitted, it prevents the default form submission behavior. It then retrieves the values from
various form fields such as first name, last name, and gender. It constructs a URL with these values
as query parameters and sends a POST request to the server using the axios library. */
profile_form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const id = user_profile.id;
	const profile_first_name = first_name.value.trim();
	const profile_last_name = last_name.value.trim();
	const gender = document.querySelector('input[name="gender"]:checked').value;
	const params = new URLSearchParams({
		action: "updateProfile",
		id,
		profile_first_name,
		profile_last_name,
		gender,
	});

	const fullUrl = `${UserServlet}?${params.toString()}`;

	try {
		startSpinner(); // Start the spinner

		const response = await axios.post(fullUrl);

		const serverMsg = response.data.trim();

		if (serverMsg === "success") {
			Notify.success("Profile details updated successfully.");

			// assign disable values to input
			first_name.disabled = true;
			last_name.disabled = true;
			gender_male.disabled = true;
			gender_female.disabled = true;
			others_gender.disabled = true;

			// save button display block
			profile_save_button.style.display = "none";
			// edit button display none
			profile_edit_button.style.display = "";
			main();
		} else {
			Notify.error(serverMsg);
		}
	} catch (error) {
		Notify.error(error);
	} finally {
		endSpinner(); // End the spinner (whether success or error)
	}
});


// new address event listner
/* The below code is adding an event listener to the "new_address" element. When the element is
clicked, the code checks if the "profile_save_button" element is currently displayed. If it is not
displayed, an error message is displayed using the Notify.error() function. If the
"profile_save_button" element is displayed, the code sends a POST request to a specified URL with
parameters "action" and "userId". The response from the request is then checked to see if the length
of the data is less than 5. If it is less than 5, the "address_div" */
new_address.addEventListener("click", async () => {
	if (profile_save_button.style.display === "") {
		Notify.error("Please complete the profile update to add new address");
	} else {

		const params = new URLSearchParams({ action: "readAllAddress", userId: user_profile.id });
		const fullUrl = `${addressServlet}?${params.toString()}`;

		try {
			startSpinner();
			const reponse = await axios.post(fullUrl);

			if (reponse.data.length < 5) {
				address_div.style.display = "block";
				address_id = 0;
			} else {

				Notify.error("You can't add more than 5 address");
			}
		} catch (error) {
			handleGenericError(error);
		} finally {
			endSpinner();
		}
	}
});

// close for new address
/* The below code is adding an event listener to the "address_form_close" element. When the element is
clicked, it will hide the "address_div" element and reset the form inside the "address_form"
element. */
address_form_close.addEventListener("click", () => {
	address_div.style.display = "none";
	address_form.reset();
});


// new address event listner
/* The above code is adding an event listener to the "submit" event of an HTML form with the id
"address_form". When the form is submitted, the code prevents the default form submission behavior. */
address_form.addEventListener("submit", (e) => {
	e.preventDefault();

	// getting values from inputs
	const full_name_value = full_name.value.trim();
	const full_address_value = full_address.value.trim();
	const pincode_value = pincode.value.trim();
	const phonenumber_value = phone_number.value.trim();

	if (
		full_name_value !== "" &&
		full_address_value !== "" &&
		pincode_value !== "" &&
		phonenumber_value !== ""
	) {
		to_find_address(full_name_value, full_address_value, pincode_value, phonenumber_value);
	} else {
		Notify.error("Please provide valid details");
	}
});

// to save new address function
/**
 * The function `to_find_address` is an asynchronous function that fetches address data, searches for a
 * matching address, and either updates an existing address or creates a new address based on the
 * provided parameters.
 * @param full_name_value - The value of the full name input field.
 * @param full_address_value - The full address value is the complete address including street name,
 * building number, city, state, and country.
 * @param pincode_value - The value of the pincode entered by the user.
 * @param phonenumber_value - The phone number value is the phone number of the address.
 * @returns The function does not explicitly return a value.
 */
async function to_find_address(
	full_name_value,
	full_address_value,
	pincode_value,
	phonenumber_value
) {
	let addressArr;

	try {
		startSpinner();
		const params = new URLSearchParams({ action: "getAllTempAddress" });
		const fullUrl = `${addressServlet}?${params.toString()}`;

		const response = await axios.post(fullUrl);

		addressArr = response.data;
	} catch (error) {
		handleGenericError(error);
		return; // Exit the function if there's an error fetching the address data.
	} finally {
		endSpinner();
	}

	let matchingAddress;

	if (address_id === 0) {
		// Use Array.prototype.find() to search for an address with a matching full_address.
		matchingAddress = addressArr.find((address) => address.address === full_address_value);
	}


	if (matchingAddress) {
		Notify.error("Address Already Added: " + matchingAddress.address);
	} else {

		const params = new URLSearchParams({
			full_name_value,
			full_address_value,
			pincode_value,
			phonenumber_value
		});

		if (address_id != 0) {
			params.append("action", "updateAddress");
			params.append("id", address_id);
			update_address(params);
		} else {
			params.append("action", "addAddress");
			params.append("userId", user_profile.id);
			create_address(params);
		}

	}
}

/**
 * The function `create_address` sends a POST request to a server with an address parameter, displays
 * success or error messages based on the server response, and handles any errors that occur during the
 * process.
 * @param address - The `address` parameter is an object that represents the address data to be sent to
 * the server. It should have properties such as `street`, `city`, `state`, and `zipCode`.
 */
async function create_address(address) {
	const fullUrl = `${addressServlet}?${address.toString()}`;
	try {
		startSpinner();
		const response = await axios.post(fullUrl);
		const serverMsg = response.data.trim();
		if (serverMsg === "success") {
			Notify.success("Address Added Successfully");
			close_address();
		} else {
			Notify.error(serverMsg);
		}
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}
}

/**
 * The function `update_address` is an asynchronous function that sends a POST request to a server with
 * an address parameter, displays success or error messages based on the server response, and handles
 * any errors that occur during the process.
 * @param address - The `address` parameter is the address object that contains the updated address
 * information.
 */
async function update_address(address) {
	const fullUrl = `${addressServlet}?${address.toString()}`;
	try {
		startSpinner();
		const response = await axios.post(fullUrl);
		const serverMsg = response.data.trim();
		if (serverMsg === "success") {
			Notify.success("Address Updated Successfully");
			close_address();
		} else {
			Notify.error(serverMsg);
		}
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}
}

/**
 * The function "close_address" hides the address div, clears the show-address element, loads the
 * user's address, and resets the address form.
 */
function close_address() {

	address_div.style.display = "none";

	document.querySelector(".show-address").innerHTML = " ";

	load_address(user_profile.id);

	address_form.reset();
}


// creating element for each address element
/**
 * The function `load_address` is an asynchronous function that sends a POST request to a server to
 * retrieve a user's addresses and displays them on the webpage.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom the addresses
 * are being loaded. It is used to retrieve the addresses associated with that user from the server.
 */
async function load_address(userId) {

	const params = new URLSearchParams({ action: "readAllAddress", userId });

	const fullUrl = `${addressServlet}?${params.toString()}`;

	try {
		startSpinner();
		const response = await axios.post(fullUrl);

		const data = response.data;

		if (data.length > 0) {
			show_address(data);
		} else {
			address_append_div.innerHTML = `<h3 style="text-align:center;">No Address Please Add</h3>`;
		}
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}
}

// create elements and show the address

/**
 * The function `show_address` takes an array of addresses and dynamically creates HTML elements to
 * display each address along with options to edit or delete them.
 * @param [address_array] - An array of address objects. Each address object should have the following
 * properties:
 */
function show_address(address_array = []) {
	startSpinner();
	address_array.forEach((item) => {
		const addresses_show_div = document.createElement("div");
		addresses_show_div.setAttribute("class", "addresses-show-div");
		address_append_div.appendChild(addresses_show_div);

		const address_show_main = document.createElement("div");
		address_show_main.setAttribute("class", "address-show-main");
		addresses_show_div.appendChild(address_show_main);

		const address_p = document.createElement("p");
		address_p.innerHTML = `${item.fullName}, ${item.address}, ${item.pincode}, ${item.phoneNumber}`;
		address_show_main.appendChild(address_p);

		const address_show_menu = document.createElement("div");
		address_show_menu.setAttribute("class", "address-show-menu");
		addresses_show_div.appendChild(address_show_menu);

		const i_menu = document.createElement("i");
		i_menu.setAttribute("class", "fa-solid fa-ellipsis-vertical");
		address_show_menu.appendChild(i_menu);

		const address_menus = document.createElement("div");
		address_menus.setAttribute("class", "address-menus");
		address_show_menu.appendChild(address_menus);

		const address_p_edit = document.createElement("p");
		address_p_edit.innerHTML = `<i class="fa-solid fa-pen"></i> Edit`;
		address_p_edit.onclick = () => updateAddress(item.id);
		address_menus.appendChild(address_p_edit);

		const address_p_delete = document.createElement("p");
		address_p_delete.innerHTML = `<i class="fa-solid fa-trash"></i> Delete`;
		address_p_delete.addEventListener("click", () => {

			deleteAddress(item.id)
		});
		address_menus.appendChild(address_p_delete);

		address_menus.style.display = "none";

		i_menu.addEventListener("click", () => {
			if (address_menus.style.display === "none") {
				address_menus.style.display = "block";
			} else {
				address_menus.style.display = "none";
			}
		});

		// Add a click event listener to the window
		window.addEventListener("click", (event) => {
			const iMenu = i_menu;
			const addressMenus = address_menus;

			if (addressMenus.style.display === "block" && !isDescendant(addressMenus, event.target) && event.target !== iMenu) {
				// If address_menus is displayed and the click was outside the menu and not on the i_menu button
				addressMenus.style.display = "none";
			}
		});


		endSpinner();
	});

}

/**
 * The function checks if a given element is a descendant of another element.
 * @param parent - The parent parameter is the DOM element that you want to check if it is a parent of
 * the child element.
 * @param child - The `child` parameter is the DOM element that you want to check if it is a descendant
 * of the `parent` element.
 * @returns The function isDescendant returns a boolean value. It returns true if the child element is
 * a descendant of the parent element, and false otherwise.
 */
function isDescendant(parent, child) {
	let node = child.parentNode;
	while (node != null) {
		if (node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

// delete logic
async function deleteAddress(index) {
	const confirmation = confirm("Are you sure?");
	if (confirmation) {
		const params = new URLSearchParams({ action: "deleteAddress", index });
		const fullUrl = `${addressServlet}?${params.toString()}`;

		try {
			startSpinner();
			const response = await axios.post(fullUrl);
			const serverMsg = response.data.trim();

			if (serverMsg === "success") {
				Notify.success("Address Deleted");

				document.querySelector(".show-address").innerHTML = " ";

				load_address(user_profile.id);
			} else {
				Notify.error(serverMsg);
			}
		} catch (error) {
			handleGenericError(error);
		} finally {
			endSpinner();
		}
	}
}

async function updateAddress(index) {

	const params = new URLSearchParams({ action: "getAddressById", index });
	const fullUrl = `${addressServlet}?${params.toString()}`;

	try {
		startSpinner();
		const response = await axios.post(fullUrl);
		const serverMsg = response.data;
		if (serverMsg != null) {

			address_div.style.display = "block";
			address_id = serverMsg.id;
			full_name.value = serverMsg.fullName;
			full_address.value = serverMsg.address;
			pincode.value = serverMsg.pincode;
			phone_number.value = serverMsg.phoneNumber;


		} else {

			Notify.error("Cannot find id with given address id");
		}
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}
}

// logout

const logout_btn = document.getElementById("logout-user");

logout_btn.addEventListener("click", async () => {
	const confirmation = confirm("Are you sure?");
	if (confirmation) {

		const params = new URLSearchParams({ action: "logout" });
		const fullUrl = `${UserServlet}?${params.toString()}`;

		try {
			const response = await axios.post(fullUrl);

			if (response.data.trim() === "success") {

				Notify.success("Logout successful");

				window.location.href = root + "/index.jsp";
			} else {

				Notify.error("logout failed");
			}

		} catch (error) {

			handleGenericError(error);
		}

	} else {
		Notify.error("Canceled");
	}
});


async function remove_address() {

	const fullUrl = addressServlet + "?action=deleteAllAddressTemp";

	try {
		startSpinner();
		const response = await axios.post(fullUrl);
		if (response.data.trim() !== "success") {

			Notify.error(response.data.trim());
		}
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}
}
