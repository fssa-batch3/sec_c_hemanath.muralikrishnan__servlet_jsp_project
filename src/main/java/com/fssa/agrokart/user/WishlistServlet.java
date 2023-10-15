package com.fssa.agrokart.user;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class WishlistServlet
 */
@WebServlet("/WishlistCRUD")
public class WishlistServlet extends HttpServlet {

	private static final int CUST0M_STATUS_CODE = 600;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");

		if (action == null || action.isEmpty()) {

			response.sendError(CUST0M_STATUS_CODE, "Cannot find action parameter");
			return;
		}

		if ("add".equals(action)) {

			String getObject = request.getParameter("item");

			if (getObject == null || getObject.isEmpty()) {
				response.sendError(CUST0M_STATUS_CODE, "Invalid cart item data.");
				return;
			}

			try {
				JSONObject cartObject = new JSONObject(getObject);

				HttpSession session = request.getSession();

				List<JSONObject> wishlist = (List<JSONObject>) session.getAttribute("wishlist");

				if (wishlist == null) {
					wishlist = new ArrayList<>();
					session.setAttribute("wishlist", wishlist);
				}

				// Check if the product with the same ID is already in the wishlist
				boolean productExists = false;
				for (JSONObject item : wishlist) {
					if (item.getInt("productID") == cartObject.getInt("productID")) {
						// Product with the same ID already exists, handle as needed
						productExists = true;
						break;
					}
				}

				if (!productExists) {
					// Add the cart item to the user's wishlist
					wishlist.add(cartObject);
					response.getWriter().write("success");
				} else {
					// Product with the same ID already in the wishlist, you can handle this case
					// e.g., show a message or update the quantity of the existing item
					response.sendError(CUST0M_STATUS_CODE, "Product is already added in the wishlist.");
				}

			} catch (Exception e) {
				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to add the product to the cart.");
			}
		}

		if ("delete".equals(action)) {

			try {
				String productIDToDelete = request.getParameter("productID");

				if (productIDToDelete == null || productIDToDelete.isEmpty()) {
					response.sendError(CUST0M_STATUS_CODE, "Invalid product ID for deletion.");
					return;
				}

				HttpSession session = request.getSession();

				List<JSONObject> wishlist = (List<JSONObject>) session.getAttribute("wishlist");

				if (wishlist != null) {
					for (Iterator<JSONObject> iterator = wishlist.iterator(); iterator.hasNext();) {
						JSONObject item = iterator.next();
						if (item.getInt("productID") == Integer.parseInt(productIDToDelete)) {
							iterator.remove(); // Remove the item with the specified product ID
							response.getWriter().write("success");
							return;
						}
					}
				}

				// Product with the specified ID not found in the wishlist
				response.sendError(CUST0M_STATUS_CODE, "Product with the specified ID is not in the wishlist.");
			} catch (Exception e) {

				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to delete product from the wishlist");
			}

		}

		if ("readAll".equals(action)) {

			try {
				// Get the user's session
				HttpSession session = request.getSession();

				// Retrieve the user's cart from the session
				List<Object> wishlist = (List<Object>) session.getAttribute("wishlist");
				JSONArray cartArr = new JSONArray(wishlist);

				response.getWriter().write(cartArr.toString());

			} catch (Exception e) {
				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to read all wishlist product");
			}

		}

		if ("getLength".equals(action)) {

			try {
				// Get the user's session
				HttpSession session = request.getSession();
				// Retrieve the user's cart from the session
				List<Object> wishlist = (List<Object>) session.getAttribute("wishlist");

				int count = 0;

				if (session != null && wishlist != null && !wishlist.isEmpty()) {

					count = wishlist.size();
				}

				response.getWriter().write(count + "");

			} catch (Exception e) {
				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to read wishlist size");
			}

		}

	}

}
