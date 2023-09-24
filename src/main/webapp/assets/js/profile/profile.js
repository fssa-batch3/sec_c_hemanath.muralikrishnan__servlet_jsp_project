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

async function main() {
	try {
		startSpinner();
		logged_email = await getCurrentUser();
		if (logged_email !== null) {
			user_profile = await findUserRecordByEmail(logged_email);
			load_address(user_profile.id);
			document.querySelector(".show-address").innerHTML = " ";
			appendProfileDetails();
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
// save button
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
address_form_close.addEventListener("click", () => {
	address_div.style.display = "none";
	address_form.reset();
});


// new address event listner
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

function close_address() {

	address_div.style.display = "none";

	document.querySelector(".show-address").innerHTML = " ";

	load_address(user_profile.id);

	address_form.reset();
}


// creating element for each address element
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
				address_menus.style.display = "block"; // to show the element
			} else {
				address_menus.style.display = "none"; // to hide the element
			}
		});
		endSpinner();
	});

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
