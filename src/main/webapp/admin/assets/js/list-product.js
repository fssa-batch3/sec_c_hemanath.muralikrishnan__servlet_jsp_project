import {
	quantity_price_div, categoryRadios, avblRadios, disableAllInputFields,
	enableAllInputFields, form_sumbit, image_url, english_name, tamil_name, description,
	protein, carbohydrates, calories, avbl_weight, product_form, submitForm, seller_id_dropdown, seller_main_div
} from "./product-form.js";

import { deleteAllqty, getAllQutyCate, setTempQty } from "./temp-quantity.js";

import { getBaseUrlFromCurrentPage } from "./getUrl.js"
import { startSpinner, endSpinner } from "./loading.js";


const baseUrl = getBaseUrlFromCurrentPage();

const create_product = document.getElementById("create-product");

const table_body = document.querySelector(".table_body");

// div all the elements of the form
const all_elements = document.querySelector(".edit-product-all");

// close the form
const close_icon = document.getElementById("close_form");

const deleteServletUrl = baseUrl + "agrokart-web/DeleteAjaxProductServlet";
const reaAllServletUrl = baseUrl + "agrokart-web/ReadAllProductServlet";
const updateStatusServletUrl = baseUrl + "agrokart-web/UpdatestatusServlet";
const readSingleProductServletUrl = baseUrl + "agrokart-web/ReadProductById";
const sellerServlet = baseUrl + "agrokart-web/SellerCRUDServlet";


let product_id = 0;

// close the edit the form
close_icon.addEventListener("click", () => {
	all_elements.style.display = "none";
	deleteAllqty();
});

function list_products(array = []) {
	let k = 1;
	if (array.length !== 0) {

		table_body.innerHTML = "";

		array.forEach((item) => {
			const table_tr = document.createElement("tr");

			if (item.status == "AVAILABLE") {
				table_tr.setAttribute("class", "success");
			} else {
				table_tr.setAttribute("class", "fail");
			}

			const td_ser_no = document.createElement("td");
			td_ser_no.innerHTML = `${k}`;
			table_tr.appendChild(td_ser_no);

			const td_seller_id = document.createElement("td");
			td_seller_id.innerHTML = `${item.seller.id}`;
			table_tr.appendChild(td_seller_id);

			const td_cat_name = document.createElement("td");
			td_cat_name.innerHTML = `${item.category.replace(/_/g, ' ')}`;
			table_tr.appendChild(td_cat_name);

			const td_pro_img = document.createElement("td");
			td_pro_img.innerHTML = `<img src="${item.imageUrl}" alt="image of " + ${item.englishName}>`;
			table_tr.appendChild(td_pro_img);

			const td_pro_name = document.createElement("td");
			td_pro_name.innerHTML = `${item.name.englishName}<br>(${item.name.tamilName})`;
			table_tr.appendChild(td_pro_name);

			const td_avail_stock = document.createElement("td");
			td_avail_stock.innerHTML = `${item.availableStock.num} ${item.availableStock.unit}`;
			table_tr.appendChild(td_avail_stock);

			const td_pro_view = document.createElement("td");
			td_pro_view.innerHTML = `<i class="fa-solid fa-eye"></i>`;
			td_pro_view.addEventListener("click", () => {

				getsingleProduct(item.id, "view");
			});
			table_tr.appendChild(td_pro_view);

			const td_pro_edit = document.createElement("td");
			td_pro_edit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
			td_pro_edit.addEventListener("click", () => {

				getsingleProduct(item.id, "edit");

			});
			table_tr.appendChild(td_pro_edit);

			const td_pro_avail_or_not = document.createElement("td");

			if (item.status == "AVAILABLE") {
				td_pro_avail_or_not.innerHTML = `<i class="fa-solid fa-check"></i><br>Available`;
			} else {
				td_pro_avail_or_not.innerHTML = `<i class="fa-solid fa-xmark"></i><br>Not Available`;
			}
			td_pro_avail_or_not.addEventListener("click", () => {
				// Handle the click event here
				if (item.status === "AVAILABLE") {
					// Product is currently available, change it to not available
					notavailableproduct(item.id);
				} else {
					// Product is currently not available, change it to available
					availableproduct(item.id);
				}
			});
			table_tr.appendChild(td_pro_avail_or_not);

			const td_pro_dele = document.createElement("td");
			td_pro_dele.innerHTML = `<i class="fa-solid fa-trash"></i>`;
			td_pro_dele.addEventListener("click", () => {

				deleteproduct(item.id);
			});
			table_tr.appendChild(td_pro_dele);

			k++;

			table_body.appendChild(table_tr);
		});

	} else {

		table_body.innerHTML = `<h3 style="text-align: center;">No product found.</h3>`
	}
}

create_product.addEventListener('click', e => {

	createReady();

});

async function createReady() {

	seller_main_div.style.display = "";

	product_id = 0;

	all_elements.style.display = "block";

	form_sumbit.disabled = false;

	quantity_price_div.style.display = "";

	enableAllInputFields();

	getAllQutyCate();

	image_url.value = "";

	english_name.value = "";

	tamil_name.value = "";

	check_cat(null);

	description.innerText = "";

	protein.value = "";

	carbohydrates.value = "";

	calories.value = "";

	avbl_weight.value = "";

	check_unit_cat(null);

	get_all_seller_id();

}

product_form.addEventListener("submit", e => {

	e.preventDefault();

	submitForm();

});



async function get_all_seller_id() {
	const params = new URLSearchParams({ action: "getallsellers" });
	const fullUrl = `${sellerServlet}?${params.toString()}`;

	try {
		startSpinner();
		const response = await axios.post(fullUrl);

		// Assuming the response data is an array of seller IDs
		const sellerIds = response.data;
		// Clear the existing options (if any)
		seller_id_dropdown.innerHTML = '';

		// Append the new options
		sellerIds.forEach((sellerId) => {
			const option = document.createElement("option");
			option.value = sellerId;
			option.text = sellerId;
			seller_id_dropdown.appendChild(option);
		});
	} catch (error) {
		Notify.error(error);
	} finally {
		endSpinner();
	}
}



function getAllProducts() {
	startSpinner();
	axios.get(reaAllServletUrl)
		.then(function(response) {
			endSpinner();
			const serverMsg = response.data;
			list_products(serverMsg);
		})
		.catch(function(error) {
			// handle error
			Notify.error(error);
		});
}

function deleteproduct(index) {
	startSpinner();
	const params = new URLSearchParams();
	params.append("index", index);

	const fullUrl = deleteServletUrl + "?" + params.toString();

	axios.post(fullUrl, null)
		.then(function(response) {

			const serverMsg = response.data.trim();
			if (serverMsg == "success") {
				endSpinner();
				Notify.success("Product deleted successfully.");
				getAllProducts();
			} else {
				endSpinner();
				Notify.error(serverMsg);
			}


		}).catch(function(error) {
			endSpinner();
			// handle error
			Notify.error(error);
		});

}

function notavailableproduct(index) {
	startSpinner();

	const params = new URLSearchParams();
	params.append("status", "NOT_AVAILABLE");
	params.append("index", index);

	const fullUrl = updateStatusServletUrl + "?" + params.toString();

	axios.post(fullUrl)
		.then(function(response) {

			const serverMsg = response.data.trim();
			if (serverMsg === "success") {
				endSpinner();
				Notify.success("Product status updated.");
				getAllProducts();
			} else {
				endSpinner();
				Notify.error(serverMsg);
			}


		}).catch(function(error) {
			endSpinner();
			// handle error
			Notify.error(error);
		});


}

function availableproduct(index) {
	startSpinner();

	const params = new URLSearchParams();
	params.append("status", "AVAILABLE");
	params.append("index", index);

	const fullUrl = updateStatusServletUrl + "?" + params.toString();

	axios.post(fullUrl)
		.then(function(response) {

			const serverMsg = response.data.trim();
			if (serverMsg === "success") {
				endSpinner();
				Notify.success("Product status updated.");
				getAllProducts();

			} else {
				endSpinner();
				Notify.error(serverMsg);
			}

		}).catch(function(error) {
			endSpinner();
			// handle error
			Notify.error(error);
		});
}

// function to append the data in the form which all the fields are enabled
function editproduct(obj) {

	all_elements.style.display = "block";

	form_sumbit.disabled = false;

	quantity_price_div.style.display = "";

	enableAllInputFields();

	image_url.value = obj.imageUrl;

	english_name.value = obj.name.englishName;

	tamil_name.value = obj.name.tamilName;

	check_cat(obj);

	description.innerText = obj.description;

	protein.value = obj.nutrition.proteinNum;

	carbohydrates.value = obj.nutrition.carbonNumb;

	calories.value = obj.nutrition.kcalNum;

	avbl_weight.value = obj.availableStock.num;

	check_unit_cat(obj.availableStock);

	// set the list of qty in temp data
	setTempQty(obj.quantities);

	seller_main_div.style.display = "none";
}


// function to append the product details with disabled inputs

function viewproduct(obj) {

	all_elements.style.display = "block";

	form_sumbit.disabled = true;

	quantity_price_div.style.display = "none";

	disableAllInputFields();

	image_url.value = obj.imageUrl;

	english_name.value = obj.name.englishName;

	tamil_name.value = obj.name.tamilName;

	check_cat(obj);

	description.innerText = obj.description;

	protein.value = obj.nutrition.proteinNum;

	carbohydrates.value = obj.nutrition.carbonNumb;

	calories.value = obj.nutrition.kcalNum;

	avbl_weight.value = obj.availableStock.num;

	check_unit_cat(obj.availableStock);

	// show the already having quantities

	let output = "";

	const list_show = document.querySelector(".quantity-price-list .row");

	if (obj !== null) {
		obj.quantities.forEach((element) => {
			output += `<div class="col-lg-4 col-md-6 col-sm-12 m-2">
                          <div class="quantity_price_list_item text-center">
                          <p class="quantity_price_p">${element.weight}${element.unit.toLowerCase()} - &#x20B9;${element.rs}</p>
                           </div>
                           </div>`;
		});

		list_show.innerHTML = output;
	}

	seller_main_div.style.display = "none";

}

function check_cat(obj) {

	if (obj != null) {

		for (let i = 0; i < categoryRadios.length; i++) {

			if (categoryRadios[i].value === obj.category) {

				categoryRadios[i].checked = true;
				break;
			}
		}
	} else {

		for (let i = 0; i < categoryRadios.length; i++) {


			categoryRadios[i].checked = false;

		}

	}
}

// checked the available stock

function check_unit_cat(obj) {

	if (obj != null) {

		for (let i = 0; i < avblRadios.length; i++) {

			if (avblRadios[i].value === obj.unit) {

				avblRadios[i].checked = true;
				break;
			}
		}
	} else {

		for (let i = 0; i < avblRadios.length; i++) {

			avblRadios[i].checked = false;
		}

	}
}

function getsingleProduct(id, action) {
	startSpinner();

	product_id = id;

	const params = new URLSearchParams();
	params.append("id", id);

	const fullUrl = readSingleProductServletUrl + "?" + params.toString();
	axios.post(fullUrl)
		.then(function(reponse) {
			const serverMsg = reponse.data;
			if (Object.keys(serverMsg).length != 0) {
				if (action === "view") {
					endSpinner();
					viewproduct(serverMsg);

				} else {
					endSpinner();
					editproduct(serverMsg);
				}
			} else {
				endSpinner();
				Notify.error("No products found.");
			}
		}).catch(function(error) {
			endSpinner();
			// handle error
			Notify.error(error);
		});

}

getAllProducts();


export { product_id, all_elements, getAllProducts };