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

<!-- footer stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/footer.css"
	type="text/css">
<!-- footer stylesheet -->

<!-- stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/indv-product.css"
	type="text/css">
<!-- stylesheet -->

<!-- product_card stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/product_card.css"
	type="text/css">
<!-- product_card stylesheet -->

<!-- fontawesome stylesheet -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- fontawesome stylesheet -->

<link rel="icon" type="image/png" sizes="60x32"
	href="<%=request.getContextPath()%>/assets/images/tabicon/icon.png">

<!-- login and register css -->

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
	<jsp:include page="../loading.jsp"></jsp:include>

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
			<li><a
				href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=00">Shop</a></li>
			<li><i class="fa-solid fa-angle-right"></i></li>
			<li>Product</li>

		</ul>

	</div>
	<!-- end of list top -->

	<!-- start of individuals products -->

	<div class="individuals-products">

		<!-- start of another invidual products cont -->

		<div class="indv-products-cont">

			<!-- end of indvidual products right side -->
		</div>
		<!-- end of another invidual products cont -->
	</div>
	<!-- end of individual products -->

	<!-- start of related products -->

	<div class="rela-cont">

		<div class="rela-scroll">

			<p>Related Products</p>

			<!-- rela products start -->

			<!-- start of products container -->

			<div class="products-container-indv append_the_products"></div>
			<!-- end of products container -->

			<!-- end of products container -->

			<!-- rela products end -->
		</div>

	</div>

	<!-- end of related products -->

	<!-- footer start -->

	<!-- footer ends -->

	<!-- logged check js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/is_logged.js"></script>

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/product_curd/details.js"></script>

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/product_curd/appen_card.js"></script>

	<!-- wishlist count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/wishlist/wishlist_count.js"></script>

	<!-- product list page -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/cart_count.js"></script>

	<!-- notify js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/vendor/notify.js"></script>
</body>

</html>