<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!--  header stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/header.css"
	type="text/css">
<!-- header stylesheet -->

<!-- body stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/body.css"
	type="text/css">
<!-- body stylesheet -->

<!-- footer stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/footer.css"
	type="text/css">
<!-- footer stylesheet -->

<!-- stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/cart.css"
	type="text/css">
<!-- stylesheet -->

<!-- fontawesome stylesheet -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- fontawesome stylesheet -->
<!-- Load necessary libraries -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<link rel="icon" type="image/png" sizes="60x32"
	href="<%=request.getContextPath()%>/assets/images/tabicon/icon.png">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/authentication/login.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/authentication/register.css">

<!-- notify css -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/notify.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/loading.css">

<title>AgroKart - Ecommerce</title>
</head>

<body>

	<jsp:include page="loading.jsp"></jsp:include>


	<!-- mobile device nav bar start -->

	<!-- mobile device nav bar end  -->

	<!-- end of header -->

	<!-- end of navigation -->

	<!-- start of list top -->

	<div class="list-top">

		<ul>
			<li><i class="fa-solid fa-house"></i></li>
			<li><a href="<%=request.getContextPath()%>/index.jsp">Home</a></li>
			<li><i class="fa-solid fa-angle-right"></i></li>
			<li>Shop</li>
			<li><i class="fa-solid fa-angle-right"></i></li>
			<li>Cart</li>

		</ul>

	</div>
	<!-- end of list top -->
	<div class="cart-main">

		<!-- table starts -->

		<section class="table__body">
			<table aria-describedby="cart_table">
				<thead>
					<tr>
						<th>Product Detail</th>
						<th>Unit Price</th>
						<th>Total Qty</th>
						<th>Quantity</th>
						<th>Subtotal</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody class="body_table">

				</tbody>
			</table>
		</section>

	</div>

	<p class="notify_messages not_available_message error-message ">Please
		remove cart items which is not available.</p>
	<p class="notify_messages not_ready_message error-message">Please
		add quantity below the available quantity.</p>
	<p class="notify_messages check_out_message error-message">Or
		Remove the product from the cart to proceed with checkout.</p>

	<div class="show-total">

		<div class="cart-continue-btn">
			<a
				href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=00">Continue
				Shopping</a>
		</div>

		<div class="show-total-elem">

			<p class="cart-total"></p>

			<a href="<%=request.getContextPath()%>/pages/order/place_order.jsp"
				class="checkout-btn">Checkout</a>
		</div>

	</div>

	<!-- end of cart cont -->

	<!-- footer start -->

	<!-- footer ends -->

	<!-- logged check js -->

	<script defer type="module"
		src="<%=request.getContextPath()%>/assets/js/is_logged.js"></script>

	<script defer type="module"
		src="<%=request.getContextPath()%>/assets/js/cart.js"></script>

	<!-- cart count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/cart_count.js"></script>

	<!-- wishlist count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/wishlist/wishlist_count.js"></script>

	<!-- notify js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/vendor/notify.js"></script>
</body>

</html>