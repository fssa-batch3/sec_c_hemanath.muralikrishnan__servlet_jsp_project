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
	href="<%=request.getContextPath()%>/assets/css/base_style/product_list.css"
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



<link rel="icon" type="image/png" sizes="60x32"
	href="<%=request.getContextPath()%>/assets/images/tabicon/icon.png">
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
				href="<%=request.getContextPath()%>/pages/product_list/list_product.jsp?cat=00">Browse
					Products</a></li>

		</ul>

	</div>

	<!-- end of list top -->

	<!-- start of mobile categories -->

	<div class="mobile-categories-main">

		<div id="list1" class="dropdown-check-list" tabindex="100">

			<span class="anchor" id="mobile_filter">Filter by category ▽</span>

			<ul class="items">
				<li><input type="checkbox" id="mobile_exotic_fruit"
					name="filter_cat" value="EXOTIC_FRUITS"> <label
					for="mobile_exotic_fruit">Exotic Fruits</label></li>
				<li><input type="checkbox" id="mobile_exotic_veggies"
					name="filter_cat" value="EXOTIC_VEGGIES"> <label
					for="mobile_exotic_veggies">Exotic Veggies</label></li>
				<li><input type="checkbox" id="mobile_fresh_veggies"
					name="filter_cat" value="FRESH_VEGGIES"> <label
					for="mobile_fresh_veggies">Fresh Veggies</label></li>
				<li><input type="checkbox" id="mobile_fresh_fruits"
					name="filter_cat" value="FRESH_FRUITS"> <label
					for="mobile_fresh_fruits">Fresh Fruits</label></li>
				<li><input type="checkbox" id="mobile_leafy_green"
					name="filter_cat" value="LEAFY_GREEN"> <label
					for="mobile_leafy_green">Leafy Green</label></li>
				<li><input type="checkbox" id="mobile_tubers" name="filter_cat"
					value="TUBERS"> <label for="mobile_tubers">Tubers</label></li>
			</ul>
		</div>

		<div id="list2" class="dropdown-check-list" tabindex="100">

			<span class="anchor" id="mobile_sort_by">Sort by options ▽</span>

			<ul class="sort-items">
				<li><input type="radio" id="mobile_name_a_to_z"
					name="sort_by_in_cat" value="name_a_to_z"> <label
					for="mobile_name_a_to_z">Name A to Z</label></li>
				<li><input type="radio" id="mobile_name_z_to_a"
					name="sort_by_in_cat" value="name_z_to_a desc"> <label
					for="mobile_name_z_to_a">Name Z to A</label></li>
				<li><input type="radio" id="mobile_cost_high_to_low"
					name="sort_by_in_cat" value="cost_high_to_low"> <label
					for="mobile_cost_high_to_low">Cost High to Low</label></li>
				<li><input type="radio" id="mobile_low_to_high"
					name="sort_by_in_cat" value="cost_low_to_high"> <label
					for="mobile_low_to_high">Cost Low to High</label></li>
			</ul>
		</div>

	</div>

	<!-- end of mobile categories -->

	<div class="main-container-aside-product">

		<div class="left-side-aside">

			<!-- start of aside -->

			<aside class="aside-list">

				<!-- start of categories list -->
				<div class="aside-categories-list">

					<!-- start of categories main -->
					<div class="categories-main">

						<p class="categories-main-title">
							Filter by categories <i class="fa-solid fa-border-all"></i>
						</p>

						<ul>

							<li><input type="checkbox" id="exocit-fruits"
								name="filter_cat" value="EXOTIC_FRUITS"> <img
								src="<%=request.getContextPath()%>/assets/images/categories/exotic_fruits.png"
								alt="exotic_fruits"> <label for="exocit-fruits">Exotic
									Fruits</label></li>
							</a>

							<li><input type="checkbox" id="exocit-veggies"
								name="filter_cat" value="EXOTIC_VEGGIES"> <img
								src="<%=request.getContextPath()%>/assets/images/categories/exotic_veggies.png"
								alt="exotic_veggies"> <label for="exocit-veggies">Exotic
									Veggies</label></li>

							<li><input type="checkbox" id="fresh-veggies"
								name="filter_cat" value="FRESH_VEGGIES"> <img
								src="<%=request.getContextPath()%>/assets/images/categories/fresh_veggies.png"
								alt="fresh_veggies"> <label for="fresh-veggies">Fresh
									Veggies</label></li>

							<li><input type="checkbox" id="fresh-fruits"
								name="filter_cat" value="FRESH_FRUITS"> <img
								src="<%=request.getContextPath()%>/assets/images/categories/fresh_fruits.png"
								alt="fresh_fruits"> <label for="fresh-fruits">Fresh
									Fruits</label></li>

							<li><input type="checkbox" id="leafy-green"
								name="filter_cat" value="LEAFY_GREEN"> <img
								src="<%=request.getContextPath()%>/assets/images/categories/leafy_green.png"
								alt="leafy_green"> <label for="leafy-green">Leafy
									Green</label></li>

							<li><input type="checkbox" id="tubers" name="filter_cat"
								value="TUBERS"> <img
								src="<%=request.getContextPath()%>/assets/images/categories/tubers.png"
								alt="tubers"> <label for="tubers">Tubers</label></li>

						</ul>

						<!-- start of sortby -->
						<div class="aside-sortby-list">

							<div class="sortby-main">
								<p class="sortby-main-title">
									Sort By <i class="fa-solid fa-sort"></i>
								</p>

								<ul>

									<li><input type="radio" id="name_a_to_z"
										name="sort_by_in_cat" value="name_a_to_z"> <label
										for="name_a_to_z">Name A to Z</label></li>

									<li><input type="radio" id="name_z_to_a"
										name="sort_by_in_cat" value="name_z_to_a"> <label
										for="name_z_to_a">Name Z to A</label></li>

									<li><input type="radio" id="cost_high_to_low"
										name="sort_by_in_cat" value="cost_high_to_low"> <label
										for="cost_high_to_low">Cost High to Low</label></li>

									<li><input type="radio" id="cost_low_to_high"
										name="sort_by_in_cat" value="cost_low_to_high"> <label
										for="cost_low_to_high">Cost Low to High</label></li>

								</ul>
							</div>
						</div>
						<!-- end of sortby -->

					</div>
					<!-- end of categories main -->
				</div>
				<!-- end of categories list -->

			</aside>

		</div>

		<!-- end of aside -->

		<!-- start of products container -->

		<div class="products-list-container append_the_products"></div>

		<!-- end of products container -->


	</div>

	<div class="pagination"></div>

	<!-- footer start -->

	<!-- footer ends -->

	<!-- logged check js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/is_logged.js"></script>

	<!-- script -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/product_curd/list_product.js"></script>

	<!-- cards appending -->

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