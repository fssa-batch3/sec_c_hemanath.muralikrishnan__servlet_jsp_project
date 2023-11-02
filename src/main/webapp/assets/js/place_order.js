import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { handleGenericError } from "./handelerrors.js";
import { logged_email, findUserRecordByEmail } from "./is_logged.js";
import { startSpinner, endSpinner } from "./loading.js";
import { Notify } from "./vendor/notify.js";
import config from './config.js';

const addressServlet = getBaseUrlFromCurrentPage() + "/UserAddress";
const cartServlet = getBaseUrlFromCurrentPage() + "/CartCRUDServlet";
const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";
const orderServlet = getBaseUrlFromCurrentPage() + "/OrderCRUD";
const orderCreation = getBaseUrlFromCurrentPage() + "/RazorPayOrderCreation";

let find_user_address;
let product_details;
let cart_items;

// Function to fetch data from the API
async function fetchDataFromAPI() {
	try {
		const response = await axios.get(readAllServlet);
		product_details = response.data;
	} catch (error) {
		handleGenericError(error);
	}
}

let user_profile;

async function main() {
	if (logged_email) {
		try {
			startSpinner();
			user_profile = await findUserRecordByEmail(logged_email);
			const fullUrl = addressServlet + "?action=readAllAddress&userId=" + user_profile.id;
			const response = await axios.post(fullUrl);
			find_user_address = response.data;
			await fetchDataFromAPI();
			const cartData = await axios.post(cartServlet + "?action=readAll");
			cart_items = cartData.data;
			show_order_products();
		} catch (error) {
			handleGenericError(error);
		} finally {
			endSpinner();
		}
	} else {

		window.location.href = getBaseUrlFromCurrentPage() + "/pages/error/error_page.jsp?error=401&msg= User is not authenticated, Unauthorized access."
	}
}

await main();

const get_place_order_form = document.getElementById("place-order-form");

const now = new Date();

const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);

const today_input = document.getElementById("TODAY");
const tomorrow_input = document.getElementById("TOMORROW");

const today_label = document.getElementById("today_label");
const tomorrow_label = document.getElementById("tomorrow_label");

today_label.innerHTML = `${now.toLocaleDateString()}`;
today_input.value = `${now.toLocaleDateString()}`;

// tomorrow date
tomorrow_label.innerHTML = `${tomorrow.toLocaleDateString()}`;
tomorrow_input.value = `${tomorrow.toLocaleDateString()}`;

// creating the input the lable regarding available address

if (find_user_address.length === 0) {
	document.querySelector(
		".append_available_address"
	).innerHTML = `<a href='${getBaseUrlFromCurrentPage()}/pages/profile.jsp#manage-add' class="place_order_address_add">Please add address in profile page to checkout</a > `;

	Notify.error("please add address to proceed checkout");

	document.querySelector(".dates-cont").classList.add("disabled");

	document.querySelector(".payment-options").classList.add("disabled");

	document.querySelector(".checkout_btn").classList.add("disabled");
} else {
	find_user_address.forEach((item) => {
		const address_div = document.createElement("div");
		address_div.setAttribute("class", "address_div");
		document.querySelector(".append_available_address").append(address_div);

		const address_input = document.createElement("input");
		address_input.setAttribute("type", "radio");
		address_input.setAttribute("name", "select_address");
		address_input.setAttribute("id", item.id);
		address_input.setAttribute("required", "true");
		address_input.setAttribute("title", "please select address");
		address_div.append(address_input);

		const address_label = document.createElement("label");
		address_label.setAttribute("for", item.id);
		address_label.innerHTML = `${item.fullName}, ${item.address}, ${item.pincode}, ${item.phoneNumber} `;
		address_div.append(address_label);
	});
}

// show the cart items on the place order table

async function show_order_products() {

	cart_items.forEach((item) => {

		startSpinner();

		product_details.find((obj) => {

			if (obj.id == item.product_id) {

				append_order_items(JSON.stringify(item), JSON.stringify(obj));
			}
		});

		endSpinner();

	});
}


function append_order_items(item, pro) {

	const cartProduct = JSON.parse(item);
	const product = JSON.parse(pro);

	const table_tr = document.createElement("tr");
	document.querySelector(".body_table").append(table_tr);

	const td_pro_detail = document.createElement("td");
	table_tr.appendChild(td_pro_detail);

	const td_pro_div = document.createElement("div");
	td_pro_div.setAttribute("class", "show-order-items");
	td_pro_detail.appendChild(td_pro_div);

	const pro_img = document.createElement("img");
	pro_img.setAttribute("src", `${product.imageUrl}`);
	pro_img.setAttribute("alt", `image of " + ${product.name.englishName}`);
	td_pro_div.appendChild(pro_img);

	const pro_name = document.createElement("p");
	pro_name.innerHTML = `${product.name.englishName}`;
	td_pro_div.appendChild(pro_name);

	const pro_weight = document.createElement("p");
	td_pro_div.appendChild(pro_weight);

	const unit_price_td = document.createElement("td");
	table_tr.appendChild(unit_price_td);

	const total_qty = document.createElement("td");
	table_tr.appendChild(total_qty);

	const qty_td = document.createElement("td");
	qty_td.innerHTML = `${cartProduct.quantity} `;
	table_tr.append(qty_td);

	const td_subtotal = document.createElement("td");
	td_subtotal.setAttribute("class", "place-item-money");
	table_tr.appendChild(td_subtotal);

	product.quantities.find((obj) => {

		if (cartProduct.qty_id == obj.id) {

			pro_weight.innerHTML = `Qty:${obj.weight}${obj.unit} `;
			unit_price_td.innerHTML = `₹${obj.rs}`;
			td_subtotal.innerHTML = `₹${obj.rs * Number(cartProduct.quantity)}`;


			if (obj.unit === "KG") {
				total_qty.innerHTML = `${(obj.weight * cartProduct.quantity).toFixed(1)} kg`;
			}

			if (obj.unit === "GM") {
				if (obj.weight * cartProduct.quantity < 1000) {
					total_qty.innerHTML = `${obj.weight * cartProduct.quantity} gm`;
				} else if (obj.weight * cartProduct.quantity >= 1000) {
					total_qty.innerHTML = `${(obj.weight * cartProduct.quantity) / 1000} kg`;
				}
			}

			if (obj.unit === "NOS") {
				total_qty.innerHTML = `${cartProduct.quantity} nos`;
			}

			if (obj.unit === "PKT") {
				total_qty.innerHTML = `${cartProduct.quantity} pkt`;
			}
		}

	});

}
// show the total in the summary table

const get_subtotal = document.querySelectorAll(".place-item-money");

let total = 0;

const total_rs_arr = [];

if (get_subtotal != null) {
	get_subtotal.forEach((subtotal) => {
		const split_subtotal = subtotal.innerHTML.split("₹");

		const splice_space = split_subtotal.splice(1, 1);

		const join_total = splice_space.join("");

		total_rs_arr.push(join_total);
	});
}

if (total_rs_arr != null) {
	total_rs_arr.forEach((get_rs) => {
		total += Number(get_rs);
	});
}

document.querySelector(".main-total").innerHTML = `Total: ₹ ${total} `;


get_place_order_form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const get_date = document.querySelector(
		'input[name="select_date"]:checked'
	).value;

	const selectedId = document
		.querySelector('input[name="select_address"]:checked')
		.getAttribute("id");

	const addressObj = find_user_address.find(obj => obj.id == selectedId);

	let finalAddress;

	if (addressObj) {

		finalAddress = `${addressObj.fullName}, ${addressObj.address}, ${addressObj.pincode}, ${addressObj.phoneNumber}`;
	} else {

		handleGenericError("Address not found");
	}

	const get_payment = document.querySelector('input[name="payment-type"]:checked').value;

	if (checkProductWithData()) {
		const amount = await getAmount();
		if (get_payment == "cash_on_delivery") {

			createOrder(amount, get_date, finalAddress, get_payment, null, user_profile.id);

		} else {
			try {
				startSpinner();
				const paymentid = await openCheckOut(amount);
				if (paymentid) {
					Notify.success("Payment Success");
					createOrder(amount, get_date, finalAddress, get_payment, paymentid, user_profile.id);
				}
			} catch (error) {
				handleGenericError(error);
			} finally {

				endSpinner();
			}
		}
	} else {
		Notify.error("Error while validating the order.");
	}

});

async function createOrder(amount, date, address, payment, payment_id, user_id) {

	try {

		startSpinner();

		Notify.success("Placing Order please wait");

		const getCartItems = await axios.post(cartServlet + "?action=readAll");

		const params = new URLSearchParams();
		params.append("action", "placeOrder");
		params.append("item", JSON.stringify(getCartItems.data));
		params.append("amount", amount);
		params.append("date", date);
		params.append("address", address);
		params.append("payment", payment);
		params.append("payment_id", payment_id);
		params.append("user_id", user_id);

		const fullUrl = `${orderServlet}?${params.toString()}`;

		const result = await axios.post(fullUrl);

		if (result.data.trim() == "success") {

			Notify.success("Order placed successfully");

			await axios.post(cartServlet + "?action=clearAll");

			window.location.href = getBaseUrlFromCurrentPage() + "/pages/order/order_status.jsp";
		}


	} catch (error) {

		handleGenericError(error);

	} finally {

		endSpinner();
	}

}

async function getAmount() {

	try {
		startSpinner();

		const getCartItems = await axios.post(cartServlet + "?action=readAll");
		const items = await axios.post(orderServlet + "?action=getRs&item=" + encodeURIComponent(JSON.stringify(getCartItems.data)));

		if (items.data > 0) {


			return items.data;
		} else {

			throw new error("Invalid rupees");
		}

	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}

}

async function checkProductWithData() {
	try {
		startSpinner();

		const getCartItems = await axios.post(cartServlet + "?action=readAll");
		const items = await axios.post(orderServlet + "?action=validate&item=" + encodeURIComponent(JSON.stringify(getCartItems.data)));

		if (items.data.trim() == "success") {

			return true;
		} else {

			return false;
		}

	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}
}

async function CreateOrderId(amount) {
	try {
		const response = await axios.post(orderCreation + "?amount=" + amount);
		return response.data.trim();
	} catch (error) {
		handleGenericError(error);
	}
}



async function openCheckOut(amount) {
	try {
		const order_id = await CreateOrderId(amount);

		return new Promise((resolve, reject) => {
			let options = {
				"key": config.apiKey,
				"amount": amount * 100,
				"currency": "INR",
				"name": "Agrokart E-commerce",
				"description": "Test Transaction",
				"image": "https://freeimghost.net/images/2023/10/08/icon.png",
				"order_id": order_id,
				"handler": function(response) {
					if (typeof response.razorpay_payment_id === 'undefined' || response.razorpay_payment_id < 1) {
						
						reject('Payment failed: ' + response.error.description);
					} else {

						resolve(response.razorpay_payment_id);
					}
				}, "prefill": {
					"name": `${user_profile.firstName} ${user_profile.lastName}`,
					"email": `${user_profile.emailId}`,
					"contact": `${user_profile.phoneNumber}`
				},
				"theme": {
					"color": "#429b44"
				}
			};

			let rzp1 = new Razorpay(options);

			rzp1.on('payment.failed', function(response) {
				reject('Payment failed: ' + response.error.description);
			});

			rzp1.open();
		});
	} catch (error) {
		handleGenericError(error);
	}
}



