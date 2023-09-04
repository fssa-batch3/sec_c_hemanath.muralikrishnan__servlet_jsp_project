package com.fssa.agrokart.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;

import com.fssa.agrokart.model.ProductQuantitiesCategory;
import com.fssa.agrokart.model.ProductStockUnits;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class TemporaryDataServlet
 */
@WebServlet("/TemporaryDataServlet")
public class TemporaryDataServlet extends HttpServlet {
	
	private static final long serialVersionUID = 6546509407961075317L;

	public TemporaryDataServlet() {
	}

	// List to hold temporary data
	private List<ProductQuantitiesCategory> temporaryData = new ArrayList<>();

	/**
	 * Handles HTTP POST requests for adding, deleting, or adding multiple temporary
	 * data items.
	 *
	 * @param request  The HTTP request object containing the action and data to be
	 *                 processed.
	 * @param response The HTTP response object for sending success or error
	 *                 messages.
	 * @throws ServletException If an error occurs during servlet processing.
	 * @throws IOException      If an I/O error occurs while handling the request or
	 *                          response.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");

		if ("add".equals(action)) {
			try {
				// Parse and add a single temporary data item
				String quantity = request.getParameter("quantity");
				double weight = Double.parseDouble(quantity);
				String weight_unit = request.getParameter("unit");
				ProductStockUnits unit = ProductStockUnits.valueOf(weight_unit);
				String price = request.getParameter("price");
				double rupees = Double.parseDouble(price);
				ProductQuantitiesCategory newItem = new ProductQuantitiesCategory(weight, unit, rupees);
				temporaryData.add(newItem);

				response.getWriter().write("success");
			} catch (IllegalArgumentException e) {
				ExceptionLoggerUtil.logException(e);
				// Handle parsing or validation errors
				response.getWriter().write("Error: Invalid input data." + e.getMessage());
			}
		}

		if ("deleteAll".equals(action)) {
			try {
				// Clear all temporary data
				temporaryData.clear();
				response.getWriter().write("success");
			} catch (Exception e) {
				ExceptionLoggerUtil.logException(e);
				response.getWriter().write("Error: Unable to delete data." + e.getMessage());
			}
		}

		if ("delete".equals(action)) {
			try {
				// Delete a specific temporary data item by index
				String index = request.getParameter("index");
				int num = Integer.parseInt(index);
				temporaryData.remove(num);
				response.getWriter().write("success");
			} catch (NumberFormatException | IndexOutOfBoundsException e) {
				ExceptionLoggerUtil.logException(e);
				response.getWriter().write("Error: Invalid index." + e.getMessage());
			}
		}

		if ("addAll".equals(action)) {
			try {
				// Parse and add multiple temporary data items from JSON
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.registerModule(new JavaTimeModule()); // Register the JavaTimeModule

				ProductQuantitiesCategory[] items = objectMapper.readValue(request.getReader(),
						ProductQuantitiesCategory[].class);

				// Add items to the temporaryData list
				for (ProductQuantitiesCategory item : items) {
					temporaryData.add(item);
				}
				response.getWriter().write("success");
			} catch (IOException e) {
				ExceptionLoggerUtil.logException(e);
				// Handle parsing errors
				response.getWriter().write("Error: Invalid input data." + e.getMessage());
			}
		}
	}

	/**
	 * Handles HTTP GET requests for retrieving temporary data as a JSON array.
	 *
	 * @param request  The HTTP request object (unused in this case).
	 * @param response The HTTP response object for sending the temporary data as
	 *                 JSON.
	 * @throws ServletException If an error occurs during servlet processing.
	 * @throws IOException      If an I/O error occurs while handling the request or
	 *                          response.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			// Convert temporary data list to a JSON array
			JSONArray qtyJSonArray = new JSONArray(temporaryData);
			response.getWriter().write(qtyJSonArray.toString());
		} catch (JSONException e) {
			ExceptionLoggerUtil.logException(e);
			// Handle JSON conversion error
			response.getWriter().write("Error: Unable to retrieve data.");
		}
	}
}
