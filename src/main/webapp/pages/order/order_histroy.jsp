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
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/header.css"
	type="text/css">
<!-- header stylesheet -->

<!-- body stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/body.css"
	type="text/css">
<!-- body stylesheet -->

<link rel="stylesheet" href="../../assets/css/notify.css">

<!-- footer stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/footer.css"
	type="text/css">
<!-- footer stylesheet -->

<!-- stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/order/order_histroy.css"
	type="text/css">
<!-- stylesheet -->

<!-- fontawesome stylesheet -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- fontawesome stylesheet -->

<link rel="icon" type="image/png" sizes="60x32"
	href="<%=request.getContextPath()%>/assets/images/tabicon/icon.png">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/loading.css">

<title>AgroKart - Ecommerce</title>
</head>

<body>
	<jsp:include page="../loading.jsp"></jsp:include>

	<!-- start of list top -->
	<div class="list-top">

		<ul>
			<li><i class="fa-solid fa-house"></i></li>
			<li><a href="<%=request.getContextPath()%>/index.jsp">Home</a></li>
			<li><i class="fa-solid fa-angle-right"></i></li>
			<li><a href="<%=request.getContextPath()%>/pages/profile.jsp">My
					Account</a></li>
			<li><i class="fa-solid fa-angle-right"></i></li>
			<li><a
				href="<%=request.getContextPath()%>/pages/order/order_histroy.jsp">Order</a></li>

		</ul>

	</div>
	<!-- end of list top -->

	<p class="history-title">Order History</p>


	<section class="table__body">
		<table>
			<thead>
				<tr>
					<th>S.No</th>
					<th>View Order</th>
					<th>Order Date</th>
					<th>Total Products</th>
					<th>Total Amount</th>
					<th>Order Status</th>
					<th>Cancel Order</th>
				</tr>
			</thead>
			<tbody class="append_order_history">
			</tbody>
		</table>
	</section>

	<div class="order_details_popup">
		<div class="modal">
			<div class="modal-content">
				<span class="close popup_close">&times;</span>
				<h2>Order Details</h2>
				<div class="order-details">
					<h3>Address</h3>
					<p class="delv_address"></p>
					<h3>Payment Mode</h3>
					<p class="show_payment_method"></p>
					<h3>Payment Status</h3>
					<p class="payment_status"></p>
				</div>
				<div class="table-container">
					<table class="order-items">
						<thead>
							<tr>
								<th>S.No</th>
								<th>Image</th>
								<th>Name</th>
								<th>Selected Quantity</th>
								<th>Unit Price</th>
								<th>Order Quantity</th>
								<th>Total Price</th>
							</tr>
						</thead>
						<tbody class="order_details_body">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>





	<!-- logged check js -->
	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/is_logged.js"></script>

	<!-- wishlist count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/wishlist/wishlist_count.js"></script>

	<!-- cart count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/cart_count.js"></script>

	<!-- this page script -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/order_histroy.js"></script>


</body>
</html>