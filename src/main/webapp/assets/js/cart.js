import { Notify } from "./vendor/notify.js";
import { cart_count_fun } from "./cart_count.js";
import { logged_email } from "./is_logged.js";
import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { handleGenericError } from "./handelerrors.js";
import { startSpinner, endSpinner } from "./loading.js";


const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";
const cartServlet = getBaseUrlFromCurrentPage() + "/CartCRUDServlet";

const cart_append_div = document.querySelector(".body_table");
const elem = document.querySelector(".checkout-btn");


let product_details;
let cart_items;

main();
// Function to fetch data from the API
async function fetchDataFromAPI() {
	try {
		const response = await axios.get(readAllServlet);
		product_details = response.data;
	} catch (error) {
		handleGenericError(error);
	}
}

const intervalMilliseconds = 2 * 60 * 1000; // 2 minutes
setInterval(fetchDataFromAPI, intervalMilliseconds);


async function main() {

	if (logged_email) {

		try {
			startSpinner();
			await fetchDataFromAPI();
			const cartData = await axios.post(cartServlet + "?action=readAll");
			cart_items = cartData.data;


			if (cart_items.length != 0) {
				cart_append_div.innerHTML = "";
				show_cart_products();

			} else {

				document.querySelector(".table__body").style.display = "none";

				document.querySelector(".show-total").style.display = "none";

				document.querySelector(
					".cart-main"
				).innerHTML = `<h1 class="notify-user">No Cart items</h1>`;

			}
		} catch (error) {

			handleGenericError(error);
		} finally {
			endSpinner();

		}
	} else {
		document.querySelector(".table__body").style.display = "none";

		document.querySelector(".show-total").style.display = "none";

		document.querySelector(
			".cart-main"
		).innerHTML = `<h1 class="notify-user">No Cart items</h1>`;

	}
}



async function show_cart_products() {

	cart_items.forEach((item) => {

		startSpinner();

		product_details.find((obj) => {

			if (obj.id == item.product_id) {

				cart_list(JSON.stringify(item), JSON.stringify(obj));
			}
		});

		endSpinner();

		checkCart();
	});

	show_total();
}


function cart_list(item, pro) {

	const cartProduct = JSON.parse(item);
	const product = JSON.parse(pro);

	const cart_tr = document.createElement("tr");
	cart_append_div.appendChild(cart_tr);

	const cart_td_for_img = document.createElement("td");
	cart_tr.appendChild(cart_td_for_img);

	const pro_img = document.createElement("img");
	pro_img.setAttribute("src", `${product.imageUrl}`);
	pro_img.setAttribute("alt", `image of " + ${product.name.englishName}`);
	cart_td_for_img.appendChild(pro_img);

	const pro_details_div = document.createElement("div");
	pro_details_div.setAttribute("class", "cart_item_detail");
	cart_td_for_img.appendChild(pro_details_div);

	if (!cartProduct.ready_for_checkout) {

		const not_ready = document.createElement("span");
		not_ready.innerHTML = "Sorry, Product quantity is <br> higher than available stock.<br>";
		not_ready.setAttribute("class", "not_ready_span");
		not_ready.classList.add("error-message");
		pro_details_div.appendChild(not_ready);
	}

	if (product.status === "NOT_AVAILABLE") {

		const not_available = document.createElement("span");
		not_available.innerHTML = "Sorry, Product is not available.";
		not_available.setAttribute("class", "not_available_span");
		not_available.classList.add("error-message");
		pro_details_div.appendChild(not_available);
	}

	const p_one = document.createElement("p");
	p_one.innerHTML = `${product.name.englishName}`;
	pro_details_div.appendChild(p_one);

	const p_two = document.createElement("p");
	pro_details_div.appendChild(p_two);

	const td_unit_price = document.createElement("td");
	cart_tr.appendChild(td_unit_price);

	const total_qty = document.createElement("td");
	cart_tr.appendChild(total_qty);

	const td_input = document.createElement("td");
	cart_tr.appendChild(td_input);

	const td_qty_div = document.createElement("div");
	td_qty_div.setAttribute("class", "td_qty");
	td_input.appendChild(td_qty_div);

	let qty_value = `${cartProduct.quantity}`;

	let qty_plus_value;

	let qty_minus_value;

	const qty_minus = document.createElement("div");
	qty_minus.innerText = "-";
	qty_minus.className = "qty-minus";
	td_qty_div.appendChild(qty_minus);

	const qty_number = document.createElement("div");
	qty_number.innerText = `${cartProduct.quantity}`;
	qty_number.className = "qty-number";
	td_qty_div.appendChild(qty_number);

	const qty_plus = document.createElement("div");
	qty_plus.innerText = "+";
	qty_plus.className = "qty-plus";
	td_qty_div.appendChild(qty_plus);

	qty_plus.addEventListener("click", () => {
		qty_value++;
		qty_plus_value = qty_value;
		qty_number.innerText = qty_plus_value;

		cart_update_quantity(product.id, qty_number.innerText, cartProduct.qty_id, JSON.stringify(cartProduct));

	});

	qty_minus.addEventListener("click", () => {
		if (qty_value > 1) {
			qty_value--;
			qty_minus_value = qty_value;
			qty_number.innerText = qty_minus_value;

			cart_update_quantity(product.id, qty_number.innerText, cartProduct.qty_id, JSON.stringify(cartProduct));
		}
	});


	const td_subtotal = document.createElement("td");
	td_subtotal.setAttribute("class", "get_subtotal");

	cart_tr.appendChild(td_subtotal);

	const td_remove = document.createElement("td");
	cart_tr.appendChild(td_remove);

	const td_delete = document.createElement("i");
	td_delete.setAttribute("class", "fa-solid fa-trash");
	td_delete.onclick = () => deletecartitem(cartProduct.cart_item_id);
	td_remove.appendChild(td_delete);

	product.quantities.find((obj) => {

		if (cartProduct.qty_id == obj.id) {

			p_two.innerHTML = `<b>Qty:</b> ${obj.weight}${obj.unit}`;
			td_unit_price.innerHTML = `₹${obj.rs}`;
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

function findObj(id) {
	return product_details.find((obj) => obj.id == id);
}

async function cart_update_quantity(id, num, qty_id, cartPro) {
	const productObj = findObj(id);

	if (!productObj) {
		Notify.error("Cannot find product");
		return;
	}

	await find_which_unit(JSON.stringify(productObj), num, qty_id, cartPro);
}

async function find_which_unit(par, num, qty_id, cartPro) {
	try {
		const parProduct = JSON.parse(par);
		const parCartPro = JSON.parse(cartPro);
		const quantityObj = parProduct.quantities.find((obj) => obj.id == qty_id);

		if (!quantityObj) {
			Notify.error("Quantity not found");
			return;
		}

		const { unit, weight } = quantityObj;
		const avl_into_gram = parProduct.availableStock.num * (unit == "KG" || unit == "GM" ? 1000 : 1);
		const check = num * (unit == "KG" ? weight * 1000 : weight);

		const updatedObj = { ...parCartPro };
		updatedObj.quantity = num;
		updatedObj.ready_for_checkout = check <= avl_into_gram;

		await updateCartItem(updatedObj);
	} catch (error) {
		handleGenericError(error);
	}
}

async function updateCartItem(updateItem) {

	try {
		startSpinner();

		const params = new URLSearchParams({ action: "update", item: JSON.stringify(updateItem) });
		const fullUrl = `${cartServlet}?${params.toString()}`;

		const response = await axios.post(fullUrl);

		if (response.data.trim() === "success") {
			Notify.success("Cart item updated.");
			await main();
		} else {
			throw new Error("Error while updating cart item.");
		}
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}
}


// show the total

function show_total() {
	// show total logic

	const get_subtotal = document.querySelectorAll(".get_subtotal");

	let total = 0;

	const total_rs_arr = [];

	if (get_subtotal !== null) {
		get_subtotal.forEach((subtotal) => {
			const split_subtotal = subtotal.innerHTML.split("₹");
			const splice_space = split_subtotal.splice(1, 1);
			const join_total = splice_space.join("");
			total_rs_arr.push(join_total);
		});
	}

	if (total_rs_arr != null) {
		total_rs_arr.forEach((total_rs) => {
			total += Number(total_rs);
		});
	}

	document.querySelector(".cart-total").innerHTML = `Total: ₹ ${total}`;
}


async function deletecartitem(index) {
	try {

		startSpinner();

		const params = new URLSearchParams({ action: "delete", itemIdToDelete: index });
		const fullUrl = `${cartServlet}?${params.toString()}`;

		const response = await axios.post(fullUrl);

		if (response.data.trim() === "success") {

			await main();
			Notify.success("Product Removed from cart.");
			checkCart();
			show_total();
			cart_count_fun();


		} else {

			Notify.error("Failed to remove product from cart.");
		}
	} catch (error) {

		handleGenericError(error);
	} finally {

		endSpinner();
	}
}

function checkCart() {
	const ready = document.querySelectorAll(".not_ready_span");
	const notAvbl = document.querySelectorAll(".not_available_span");
	const notavblmsg = document.querySelector(".not_available_message");
	const readymsg = document.querySelector(".not_ready_message");
	const checkoutMsg = document.querySelector(".check_out_message");

	// Hide all error messages initially
	notavblmsg.style.display = "none";
	readymsg.style.display = "none";
	checkoutMsg.style.display = "none";

	// Enable the button if neither error condition is met
	if (ready.length === 0 && notAvbl.length === 0) {
		elem.classList.remove("disabled");
	} else {
		elem.classList.add("disabled");
		if (ready.length > 0) {
			readymsg.style.display = "block";
		}
		if (notAvbl.length > 0) {
			notavblmsg.style.display = "block";
		}
		checkoutMsg.style.display = "block";
	}
}



