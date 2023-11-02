import { handleGenericError } from "./handelerrors.js";
import { logged_email, findUserRecordByEmail } from "./is_logged.js";
import { startSpinner, endSpinner } from "./loading.js";
import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { Notify } from "./vendor/notify.js";

const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";
const orderServlet = getBaseUrlFromCurrentPage() + "/OrderCRUD";
let user_profile;
let product_details;
let order_history;
let count = 1;


async function main() {
	if (logged_email) {
		try {
			startSpinner();
			user_profile = await findUserRecordByEmail(logged_email);
			const orderResponse = await axios.post(orderServlet + "?action=readAll&id=" + user_profile.id);
			order_history = orderResponse.data;
			const response = await axios.get(readAllServlet);
			product_details = response.data;
			show_histroy(order_history);
		} catch (error) {
			handleGenericError(error);
		} finally {
			endSpinner();
		}
	} else {

		window.location.href = getBaseUrlFromCurrentPage() + "/pages/error/error_page.jsp?error=401&msg= User is not authenticated, Unauthorized access."
	}
}

main();

startSpinner();

const main_history = document.querySelector(".table__body");
const history_title = document.querySelector(".history-title");
const append_history_td = document.querySelector(".append_order_history");
const show_order_details = document.querySelector(".order_details_popup");
const append_order_details = document.querySelector(".order_details_body");
const close_popup = document.querySelector(".popup_close");
const show_address = document.querySelector(".delv_address");
const show_payment_method = document.querySelector(".show_payment_method");
const show_status = document.querySelector(".payment_status");

endSpinner();

const itemsPerPage = 5;
let currentPage = 1;

const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");

prevPageButton.addEventListener("click", () => {
	count = 1;
	if (currentPage > 1) {
		currentPage--;
		show_histroy(order_history);
	}
});

nextPageButton.addEventListener("click", () => {
	const maxPage = Math.ceil(order_history.length / itemsPerPage);
	if (currentPage < maxPage) {
		currentPage++;
		show_histroy(order_history);
	}
});


function show_histroy(history) {
	startSpinner();
	const startIdx = (currentPage - 1) * itemsPerPage;
	const endIdx = startIdx + itemsPerPage;
	const displayedHistory = history.slice(startIdx, endIdx);

	if (displayedHistory.length != 0) {
		append_history(displayedHistory);
	} else {
		main_history.style.display = "none";
		history_title.innerHTML = "No order items found";
		history_title.style.marginBottom = "12em";
	}

	pageNumber.textContent = currentPage;
	endSpinner();
}


function append_history(array = []) {

	startSpinner();

	append_history_td.innerHTML = "";




	array.forEach(obj => {

		const tr = document.createElement("tr");

		const sn = document.createElement("td");
		sn.innerHTML = `${count}`;
		tr.appendChild(sn);

		const view = document.createElement("td");
		const icon = document.createElement("i");
		icon.className = "fa-solid fa-eye";
		icon.onclick = () => showDetails(obj.uniqueId);
		view.appendChild(icon);
		tr.appendChild(view);

		const getDate = new Date(obj.orderCreationDateTime);

		const date = document.createElement("td");
		date.innerHTML = `${getDate.toLocaleDateString()}`;
		tr.appendChild(date);

		const total_products = document.createElement("td");
		total_products.innerHTML = `${obj.totalProducts}`;
		tr.appendChild(total_products);

		const total_amount = document.createElement("td");
		total_amount.innerHTML = `₹ ${obj.totalAmount}`;
		tr.appendChild(total_amount);

		const status_td = document.createElement("td");

		const status_p = document.createElement("p");

		if (obj.orderStatus == "PENDING") {
			status_p.setAttribute("class", "status pending");
			status_p.innerHTML = "Pending";
		} else {
			status_p.setAttribute("class", "status cancelled");
			status_p.innerHTML = "Cancelled";
		}

		status_td.appendChild(status_p);
		tr.appendChild(status_td);

		const cancel_td = document.createElement("td");

		if (obj.orderCancelled) {
			cancel_td.innerHTML = "Cancelled";
		} else {
			const icon = document.createElement("i");
			icon.className = "fa-solid fa-xmark";
			icon.onclick = () => cancelOrder(obj.uniqueId, obj.userId);
			cancel_td.appendChild(icon);
		}
		tr.appendChild(cancel_td);


		append_history_td.appendChild(tr);
		count++;
	});

	endSpinner();

}

function showDetails(id) {

	startSpinner();

	let count = 1;

	append_order_details.innerHTML = "";


	show_order_details.style.display = "block";

	const findOrder = order_history.find(obj => obj.uniqueId == id);

	show_address.innerHTML = `${findOrder.userAddress}`;

	show_payment_method.innerHTML = `${findOrder.paymentMethod.replace(/_/g, ' ')}`;

	if (findOrder.paymentMethod == "ONLINE_MODE") {

		show_status.innerHTML = "Paid";
	} else {

		show_status.innerHTML = "Not paid";
	}

	findOrder.orderItems.forEach(item => {

		const product = product_details.find(obj => obj.id == item.productId);

		const qtyObj = product.quantities.find(obj => obj.id == item.qtyId);


		const tr = document.createElement("tr");

		const sn = document.createElement("td");
		sn.innerHTML = `${count}`;
		tr.appendChild(sn);

		const tdImg = document.createElement("td");
		const imgtag = document.createElement("img");
		imgtag.setAttribute("src", `${product.imageUrl}`);
		imgtag.setAttribute("alt", `${product.name.englishName}`);
		tdImg.appendChild(imgtag);
		tr.appendChild(tdImg);

		const tdName = document.createElement("td");
		tdName.innerHTML = `${product.name.englishName}`;
		tr.appendChild(tdName);

		const tdSelected = document.createElement("td");
		tdSelected.innerHTML = `${qtyObj.weight} ${qtyObj.unit}`
		tr.appendChild(tdSelected);

		const tdSelectedRs = document.createElement("td");
		tdSelectedRs.innerHTML = `₹ ${qtyObj.rs}`;
		tr.appendChild(tdSelectedRs);

		const reqQty = document.createElement("td");
		reqQty.innerHTML = `${calculateTotalQuantity(qtyObj.weight, item.qtyNos, qtyObj.unit)}`;
		tr.appendChild(reqQty);

		const reqTotal = document.createElement("td");
		reqTotal.innerHTML = `₹ ${qtyObj.rs * item.qtyNos}`;
		tr.appendChild(reqTotal);

		append_order_details.appendChild(tr);

		count++;

	});

	endSpinner();
}

function calculateTotalQuantity(selectedQty, quantity, unit) {
	if (unit === "KG") {
		return `${(selectedQty * quantity).toFixed(1)} kg`;
	}

	if (unit === "GM") {
		if (selectedQty * quantity < 1000) {
			return `${selectedQty * quantity} gm`;
		} else if (selectedQty * quantity >= 1000) {
			return `${(selectedQty * quantity) / 1000} kg`;
		}
	}

	if (unit === "NOS") {
		return `${quantity} nos`;
	}

	if (unit === "PKT") {
		return `${quantity} pkt`;
	}

	return "Invalid unit"; // Handle the case when the unit is not recognized.
}

close_popup.addEventListener('click', () => {

	show_order_details.style.display = "none";

});

async function cancelOrder(orderId, userId) {

	try {

		const confirmation = window.confirm("Are you sure you want to cancel this order?");

		if (confirmation) {

			startSpinner();

			const response = await axios.post(orderServlet + "?action=cancel&orderId=" + orderId + "&userId=" + userId);

			if (response.data.trim() == "success") {

				Notify.success("Order successfully cancelled");
				const orderResponse = await axios.post(orderServlet + "?action=readAll&id=" + user_profile.id);
				order_history = orderResponse.data;
				count = 1;
				show_histroy(order_history);
			} else {
				handleGenericError(response.data.trim());

			}

		} else {

			handleGenericError("Cancelled");
		}

	} catch (error) {

		handleGenericError(error);
	} finally {

		endSpinner();
	}

}



