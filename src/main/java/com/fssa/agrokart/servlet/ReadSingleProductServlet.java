package com.fssa.agrokart.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fssa.agrokart.service.ProductService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;
import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.model.Product;
import org.json.JSONObject;

/**
 * Servlet implementation class ReadSingleProductServlet
 */
@WebServlet("/ReadProductById")
public class ReadSingleProductServlet extends HttpServlet {
	private static final long serialVersionUID = 3876902657245033806L;
	ProductService service = new ProductService();

	/**
	 * Handles HTTP POST requests for reading a single product by its ID and
	 * returning it as JSON.
	 *
	 * @param request  The HTTP request object containing the product ID to be read.
	 * @param response The HTTP response object for sending the product as JSON.
	 * @throws ServletException If an error occurs during servlet processing.
	 * @throws IOException      If an I/O error occurs while handling the request or
	 *                          response.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Retrieve the product ID from the request parameter and parse it to an integer
		int id = Integer.parseInt(request.getParameter("id"));

		try {
			// Retrieve the product by its ID using the ProductService
			Product product = service.readProductById(id);

			// Convert the product to a JSON object
			JSONObject productObject = new JSONObject(product);

			// Write the JSON object as the response content
			response.getWriter().write(productObject.toString());

		} catch (ServiceException e) {
			// Log the ServiceException and send an error response with the exception
			// message
			ExceptionLoggerUtil.logException(e);
			response.getWriter().write(e.getMessage());
		}
	}
}
