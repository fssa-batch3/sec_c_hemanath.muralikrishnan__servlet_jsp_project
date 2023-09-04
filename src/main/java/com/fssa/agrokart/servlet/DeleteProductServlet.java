package com.fssa.agrokart.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.service.ProductService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class DeleteProductServlet
 */
@WebServlet("/DeleteAjaxProductServlet")
public class DeleteProductServlet extends HttpServlet {

	private static final long serialVersionUID = -1017463388207964840L;
	ProductService service = new ProductService();

	/**
	 * Handles HTTP POST requests for deleting a product by its ID.
	 *
	 * @param request  The HTTP request object containing the product ID to be
	 *                 deleted.
	 * @param response The HTTP response object for sending success or error
	 *                 messages.
	 * @throws ServletException If an error occurs during servlet processing.
	 * @throws IOException      If an I/O error occurs while handling the request or
	 *                          response.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Retrieve the product ID to be deleted from the request parameter
		String index = request.getParameter("index");
		int id = Integer.parseInt(index);

		try {
			// Attempt to delete the product by its ID using the ProductService
			if (service.deleteProductById(id)) {
				// Send a success response if the product is deleted successfully
				response.getWriter().write("success");
			}
		} catch (ServiceException e) {
			// Log the ServiceException and send an error response with the exception
			// message
			ExceptionLoggerUtil.logException(e);
			response.getWriter().write(e.getMessage());
		}
	}
}
