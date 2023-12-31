<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<!-- header stylesheet -->
<link rel="stylesheet" href="../../assets/css/base_style/header.css"
	type="text/css">
<!-- header stylesheet -->

<!-- body stylesheet -->
<link rel="stylesheet" href="../../assets/css/base_style/body.css"
	type="text/css">
<!-- body stylesheet -->

<!-- footer stylesheet -->
<link rel="stylesheet" href="../../assets/css/base_style/footer.css"
	type="text/css">
<!-- footer stylesheet -->

<!-- stylesheet -->
<link rel="stylesheet" href="../../assets/css/order/place_order.css"
	type="text/css">
<!-- stylesheet -->

<!-- fontawesome stylesheet -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- fontawesome stylesheet -->

<!-- noitfy css -->

<link rel="stylesheet" href="../../assets/css/notify.css">

<link rel="icon" type="image/png" sizes="60x32"
	href="../../assets/images/tabicon/icon.png">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/loading.css">

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

<title>AgroKart - Ecommerce</title>
</head>

<body>
	<jsp:include page="../loading.jsp"></jsp:include>

	<!-- mobile device nav bar start -->

	<!-- mobile device nav bar end  -->

	<!-- end of header -->

	<!-- end of navigation -->

	<p class="checkout-title">Checkout</p>

	<!-- orders starts -->

	<form id="place-order-form">

		<div class="orders-cont">

			<!-- start of left side  orders cont -->
			<div class="order-left-side">

				<div class="delivery-date-cont">

					<p>Select your date</p>

					<div class="dates-cont">

						<div class="dates">
							<input type="radio" name="select_date" id="TODAY" required
								title="Please select delivery date"> <label for="TODAY"
								id="today_label"></label>
						</div>

						<div class="dates">
							<input type="radio" name="select_date" id="TOMORROW" required
								title="Please select delivery date"> <label
								for="TOMORROW" id="tomorrow_label"></label>
						</div>

					</div>

				</div>

				<div class="address-section-order">

					<p class="address-title">Address</p>

					<div class="append_available_address"></div>

				</div>

			</div>

			<!-- end of left side orders cont -->

			<!-- start of orders right side cont -->

			<div class="orders-right-side">

				<section class="table__body">
					<table aria-describedby="overview">
						<thead>
							<tr>
								<th>Product Detail</th>
								<th>Unit Price</th>
								<th>Total Qty</th>
								<th>Quantity</th>
								<th>Subtotal</th>
							</tr>
						</thead>
						<tbody class="body_table">

						</tbody>
					</table>
				</section>

				<div class="payment-options">

					<p class="main-total"></p>

					<p class="payment-title">Payment options</p>

					<div class="payment-div">

						<input type="radio" id="cash-on-delivery" value="cash_on_delivery"
							name="payment-type" required title="please select payment method">
						<label for="cash-on-delivery">Cash on delivery</label>
					</div>

					<div class="payment-div">
						<input type="radio" id="razorpay" value="razorpay"
							name="payment-type" required title="please select payment method">
						<label for="razorpay">Online Payment</label>

					</div>

					<button type="submit" class="checkout_btn">Place Order</button>
				</div>

			</div>

			<!-- end of orders right side cont -->

		</div>

	</form>
	<!-- end of orders -->

	<!-- footer start -->

	<!-- footer ends -->

	<!-- logged check js -->


	<script type="module" src="../../assets/js/is_logged.js"></script>

	<!-- wishlist count -->

	<script type="module" src="../../assets/js/wishlist/wishlist_count.js"></script>

	<!-- cart_count -->

	<script type="module" src="../../assets/js/cart_count.js"></script>

	<!-- this page script -->

	<script type="module" src="../../assets/js/place_order.js"></script>

	<script type="module" src="../../assets/js/vendor/notify.js"></script>
</body>

</html>