import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { handleGenericError } from "./handelerrors.js";
import { logged_email, getCurrentUser, findUserRecordByEmail } from "./is_logged.js";
import { startSpinner, endSpinner } from "./loading.js";
import { Notify } from "./vendor/notify.js";

const addressServlet = getBaseUrlFromCurrentPage() + "/UserAddress";
const cartServlet = getBaseUrlFromCurrentPage() + "/CartCRUDServlet";
const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";

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

async function main() {
	if (logged_email) {
		try {
			startSpinner();
			let user_profile = await findUserRecordByEmail(logged_email);
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
	}
}

await main();

const get_place_order_form = document.getElementById("place-order-form");

const now = new Date();

const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);

const today_input = document.getElementById("today");
const tomorrow_input = document.getElementById("tomorrow");

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
	).innerHTML = `<a href='${getBaseUrlFromCurrentPage()}/pages/profile.jsp' class="place_order_address_add">Please add address in profile page to checkout</a > `;

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

// place order full logic

const order_array = [];

get_place_order_form.addEventListener("submit", (e) => {
	e.preventDefault();

	push_cart_to_order();

	const get_date = document.querySelector(
		'input[name="select_date"]:checked'
	).value;
	const get_day = document
		.querySelector('input[name="select_date"]:checked')
		.getAttribute("id");

	const get_delivery_address = document
		.querySelector('input[name="select_address"]:checked')
		.getAttribute("id");
	let delivery_address;

	user_records.find((obj) => {
		if (user_id === obj.user_id) {
			const find_add = obj.address;

			return find_add.find((address_obj) => {
				if (get_delivery_address === address_obj.address_id) {
					delivery_address = address_obj;
					return true;
				}

				return null;
			});
		}
		return null;
	});

	const get_payment_type = document.querySelector(
		'input[name="payment-type"]:checked'
	).value;

	const order_json = {
		user_id,
		delivery_address,
		which_day: get_day,
		which_date: get_date,
		payment_type: get_payment_type,
		payment_status: true,
		order_histroy: order_array,
		created_date: new Date().toLocaleDateString(),
		created_time: new Date().toLocaleTimeString(),
		total_amount: total,
	};

	order_histroy.push(order_json);

	localStorage.setItem("order_histroy", JSON.stringify(order_histroy));

	window.location.href = "order_status.html";
});

function push_cart_to_order() {
	place_order_items
		.filter((obj) => user_id === obj.user_id)
		.forEach((obj) => order_array.push(obj));
}
