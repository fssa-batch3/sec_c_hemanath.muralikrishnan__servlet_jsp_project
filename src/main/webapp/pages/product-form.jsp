<div class="container mt-2">
	<div class="product-main">
		<form id="product-form">
			<div class="row">
				<div class="col-md-6">
					<div class="product-left-side">
						<div class="mb-3">
							<label for="product-image-url" class="form-label h5">Product
								Image (URL)</label> <input type="url" id="product-image-url"
								class="form-control" placeholder="Enter your product image URL"
								required>
						</div>
						<div class="mb-3">
							<label for="product-english-name" class="form-label h5">Product
								English Name</label> <input type="text" id="product-english-name"
								class="form-control"
								placeholder="Enter your product English name" required>
						</div>
						<div class="mb-3">
							<label for="product-tamil-name" class="form-label h5">Product
								Tamil Name</label> <input type="text" id="product-tamil-name"
								class="form-control" placeholder="Enter your product Tamil name"
								required>
						</div>
						<div class="mb-3">
							<label class="form-label h5">Select Product Category</label>
							<div class="d-flex flex-wrap">
								<div class="form-check me-4">
									<input class="form-check-input" type="radio"
										name="product-category" id="exotic-fruits"
										value="EXOTIC_FRUITS"> <label class="form-check-label"
										for="exotic-fruits">Exotic Fruits</label>
								</div>
								<div class="form-check me-4">
									<input class="form-check-input" type="radio"
										name="product-category" id="exotic-veggies"
										value="EXOTIC_VEGGIES"> <label
										class="form-check-label" for="exotic-veggies">Exotic
										Veggies</label>
								</div>
								<div class="form-check me-4">
									<input class="form-check-input" type="radio"
										name="product-category" id="fresh-fruits" value="FRESH_FRUITS">
									<label class="form-check-label" for="fresh-fruits">Fresh
										Fruits</label>
								</div>
								<div class="form-check me-4">
									<input class="form-check-input" type="radio"
										name="product-category" id="fresh-veggies"
										value="FRESH_VEGGIES"> <label class="form-check-label"
										for="fresh-veggies">Fresh Veggies</label>
								</div>
								<div class="form-check me-4">
									<input class="form-check-input" type="radio"
										name="product-category" id="leafy-green" value="LEAFY_GREEN">
									<label class="form-check-label" for="leafy-green">Leafy
										Green</label>
								</div>
								<div class="form-check me-4">
									<input class="form-check-input" type="radio"
										name="product-category" id="tubers" value="TUBERS"> <label
										class="form-check-label" for="tubers">Tubers</label>
								</div>
							</div>
						</div>

						<div class="mb-3">
							<label for="product-description" class="form-label h5">Product
								Description</label>
							<textarea id="product-description" class="form-control" rows="5"
								placeholder="Enter your product description" required></textarea>
						</div>
						<div class="mb-3">
							<p class="h5">Product Nutrition Contents (per 100gm)</p>
							<div class="input-group mb-2">
								<span class="input-group-text">Protein</span> <input type="text"
									id="product-protein" class="form-control"
									placeholder="Enter product protein value" required
									minlength="1" maxlength="2"> <span
									class="input-group-text">gm</span>
							</div>
							<div class="input-group mb-2">
								<span class="input-group-text">Carbohydrates</span> <input
									type="text" id="product-carbo" class="form-control"
									placeholder="Enter product carbohydrates value" required
									minlength="1" maxlength="2"> <span
									class="input-group-text">gm</span>
							</div>
							<div class="input-group">
								<span class="input-group-text">Calories</span> <input
									type="text" id="product-kcal" class="form-control"
									placeholder="Enter product calories values" required
									minlength="1" maxlength="3"> <span
									class="input-group-text">kcal</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="product-right-side">
						<div class="mb-3">
							<label class="form-label h5">Available Stock Quantity and
								Unit</label>
							<div class="input-group">
								<input type="text" placeholder="quantity"
									id="avbl-weight-number" class="form-control" minlength="1"
									maxlength="2">
							</div>
							<div class="row mt-1">
								<div class="col">
									<div class="form-check">
										<input class="form-check-input" type="radio"
											name="avbl-weight-unit" id="avbl-weight-kg" value="KG">
										<label class="form-check-label" for="avbl-weight-kg">Kg</label>
									</div>
								</div>
								<div class="col">
									<div class="form-check">
										<input class="form-check-input" type="radio"
											name="avbl-weight-unit" id="avbl-weight-nos" value="NOS">
										<label class="form-check-label" for="avbl-weight-nos">Nos</label>
									</div>
								</div>
								<div class="col">
									<div class="form-check">
										<input class="form-check-input" type="radio"
											name="avbl-weight-unit" id="avbl-weight-pkt" value="PKT">
										<label class="form-check-label" for="avbl-weight-pkt">Pkt</label>
									</div>
								</div>
							</div>
						</div>


						<div class="mb-3">
							<label for="quantity-price" class="form-label h5">Product
								Quantity and Price</label>
							<div class="input-group qty_cat_div">
								<input type="text" placeholder="quantity"
									id="qty-cat-weight-number" class="form-control" minlength="1"
									maxlength="3"> <select id="qty-cat-weight-unit"
									class="form-select">
									<option value="GM">gm</option>
									<option value="KG">kg</option>
									<option value="NOS">nos</option>
									<option value="PKT">pkt</option>
								</select> <span class="input-group-text"><i
									class="fa-solid fa-indian-rupee-sign"></i></span> <input type="text"
									id="qty-cat-price" placeholder="price" class="form-control"
									minlength="2" maxlength="4"> <span id="add_quantity"
									class="input-group-text"><i class="fa-solid fa-plus"></i></span>
							</div>

						</div>

						<div class="quantity-price-list">
							<div class="row">
								
							</div>
						</div>


					</div>
				</div>
			</div>
			<button type="submit" class="btn btn-success d-block mx-auto" id="form-submit">Save
				Product</button>
		</form>
	</div>
</div>