<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
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

<!-- product_card stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/product_card.css"
	type="text/css">
<!-- product_card stylesheet -->

<!-- stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/home.css"
	type="text/css">
<!-- stylesheet -->

<!-- fontawesome stylesheet -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- fontawesome stylesheet -->

<!-- login css -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/authentication/login.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/authentication/register.css">


<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/loading.css">

<!-- notiy -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/notify.css">

<link rel="icon" type="image/png" sizes="32x32"
	href="<%=request.getContextPath()%>/assets/images/tabicon/icon.png">
<title>AgroKart - Ecommerce</title>
</head>

<body>


	<jsp:include page="/pages/loading.jsp"></jsp:include>


	<!-- mobile device nav bar start -->

	<!-- mobile device nav bar end  -->

	<!-- end of header -->

	<!-- end of navigation -->

	<!-- start of home page main -->
	<div class="home-page-main" id="home-page-main-container">

		<div class="slider">

			<figure>
				<img
					src="<%=request.getContextPath()%>/assets/images/slider/slide.png"
					alt="Image">
				<img
					src="<%=request.getContextPath()%>/assets/images/slider/slide.png"
					alt="Image">
				<img
					src="<%=request.getContextPath()%>/assets/images/slider/slide.png"
					alt="Image">
			</figure>

		</div>

		<!-- start of home page adv -->

		<!-- end of home page adv -->

		<!-- start of home categories images -->
		<div class="home-page-cat">

			<div class="cat_cont">
				<a
					href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=FRESH_FRUITS">
					<img
					src="<%=request.getContextPath()%>/assets/images/categories/fresh_fruits.png"
					alt="fresh_fruits">
					<p>Fresh Fruits</p>
					<p class="fresh_fruits"></p>
				</a>
			</div>

			<div class="cat_cont">
				<a
					href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=EXOTIC_FRUITS">
					<img
					src="<%=request.getContextPath()%>/assets/images/categories/exotic_fruits.png"
					alt="exotic_fruits">
					<p>Exotic Fruits</p>
					<p class="exotic_fruits"></p>
				</a>
			</div>

			<div class="cat_cont">
				<a
					href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=FRESH_VEGGIES">
					<img
					src="<%=request.getContextPath()%>/assets/images/categories/fresh_veggies.png"
					alt="fresh_veggies">
					<p>Fresh Veggies</p>
					<p class="fresh_veggies"></p>
				</a>
			</div>

			<div class="cat_cont">
				<a
					href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=EXOTIC_VEGGIES">
					<img
					src="<%=request.getContextPath()%>/assets/images/categories/exotic_veggies.png"
					alt="exotic_veggies">
					<p>Exotic Veggies</p>
					<p class="exotic_veggies"></p>
				</a>
			</div>

			<div class="cat_cont">
				<a
					href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=LEAFY_GREEN">
					<img
					src="<%=request.getContextPath()%>/assets/images/categories/leafy_green.png"
					alt="leafy_green">
					<p>Leafy Green</p>
					<p class="leafy_green"></p>
				</a>
			</div>

			<div class="cat_cont">
				<a
					href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=TUBERS">
					<img
					src="<%=request.getContextPath()%>/assets/images/categories/tubers.png"
					alt="tubers">
					<p>Tubers</p>
					<p class="tubers"></p>
				</a>
			</div>

		</div>

	</div>

	<!-- end of home categories image -->

	<!-- start of text categoires -->

	<div class="text-categories-home">

		<p>
			Popular <br> Products
		</p>
		<a
			href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=00">All</a>
		<a
			href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=FRESH_FRUITS">Fresh
			Fruits</a> <a
			href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=EXOTIC_FRUITS">Exotic
			Fruits</a> <a
			href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=FRESH_VEGGIES">Fresh
			Veggies</a> <a
			href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=EXOTIC_VEGGIES">Exotic
			Veggies</a> <a
			href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=LEAFY_GREEN">Leafy
			Green</a> <a
			href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=TUBERS">Tubers</a>

	</div>

	<!-- end of text categories -->

	<!-- start of home page main products -->

	<!-- start of products container -->

	<div class="products-container append_the_products"></div>

	<!-- end of products container -->

	<!-- end of home page main products -->

	<!-- start of hassle free shopping -->

	<div class="hassle-main">

		<div class="hassle-left">

			<div class="hassle-text">
				<p>Hassle Free Shopping!</p>
				<p>
					Start Your Daily with shopping <span>AgroKart</span>
				</p>
			</div>

			<div class="hassle-input">
				<i class="fa-regular fa-paper-plane"></i> <input type="email"
					placeholder="Enter Your email address"> <a href="#">Subscribe</a>
			</div>

		</div>

		<div class="hassle-right">

			<div class="hassle-img">
				<img
					src="<%=request.getContextPath()%>/assets/images/hassle/hassle.png"
					alt="hassle_img">
			</div>

		</div>

	</div>

	<!-- end of hassle free shopping -->

	<!-- agrokart unique cont starts -->

	<div class="agrokart-unique">

		<div class="unique-cont">

			<div class="unique-img">
				<i class="fa-solid fa-truck"></i>
			</div>

			<div class="unique-text">
				<p>Free Delivery</p>
				<p>Order for Rs.249 & Above</p>
			</div>
		</div>

		<div class="unique-cont">

			<div class="unique-img">
				<i class="fa-solid fa-check"></i>
			</div>

			<div class="unique-text">
				<p>100% Fresh and Quality</p>
				<p>Farm Fresh</p>
			</div>
		</div>

		<div class="unique-cont">

			<div class="unique-img">
				<i class="fa-solid fa-plate-wheat"></i>
			</div>

			<div class="unique-text">
				<p>Hygiencially Packed</p>
				<p>Extended Shelf Life</p>
			</div>
		</div>

	</div>

	<!-- agrokart unique cont ends -->

	<!-- end of home page main -->

	<!-- footer start -->

	<!-- footer ends -->

	<!-- logged check js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/is_logged.js"></script>

	<!-- product set script -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/main.js"></script>

	<!-- base script for this page -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/home.js"></script>

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/product_curd/appen_card.js"></script>

	<!-- wishlist count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/wishlist/wishlist_count.js"></script>

	<!-- cart count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/cart_count.js"></script>

	<!-- notify js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/vendor/notify.js"></script>

</body>

</html>