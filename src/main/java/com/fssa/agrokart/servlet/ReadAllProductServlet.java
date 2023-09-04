package com.fssa.agrokart.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.model.Product;
import com.fssa.agrokart.service.ProductService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;
import com.fssa.agrokart.util.Logger;

/**
 * Servlet implementation class ReadAllProductServlet
 */
@WebServlet("/ReadAllProductServlet")
public class ReadAllProductServlet extends HttpServlet {
	
	private static final long serialVersionUID = 858279837616370892L;
	ProductService service = new ProductService();

	/**
	 * Handles HTTP GET requests for reading all products and returning them as
	 * JSON.
	 *
	 * @param request  The HTTP request object (unused in this case).
	 * @param response The HTTP response object for sending the list of products as
	 *                 JSON.
	 * @throws ServletException If an error occurs during servlet processing.
	 * @throws IOException      If an I/O error occurs while handling the request or
	 *                          response.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Create a PrintWriter to write the response content
		PrintWriter out = response.getWriter();

		try {
			// Retrieve a list of all products using the ProductService
			List<Product> listOfProducts = service.readAllProducts();

			// Convert the list of products to a JSON array
			JSONArray jsonArray = new JSONArray(listOfProducts);

			// Write the JSON array as the response content
			response.getWriter().write(jsonArray.toString());

		} catch (ServiceException e) {
			// Log the ServiceException and send an error response with the exception
			// message
			ExceptionLoggerUtil.logException(e);
			response.getWriter().write(e.getMessage());
		}
	}
}
