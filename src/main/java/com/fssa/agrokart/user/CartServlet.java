package com.fssa.agrokart.user;

import java.io.IOException;
import java.util.ArrayList;
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
 * Servlet implementation class CartServlet
 */
@WebServlet("/CartCRUDServlet")
public class CartServlet extends HttpServlet {


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

		if ("add".equals(action)) { // TODO : change the position of the checking

			String getObject = request.getParameter("item");

			if (getObject == null || getObject.isEmpty()) {
				response.sendError(CUST0M_STATUS_CODE, "Invalid cart item data.");
				return;
			}

			try {
				JSONObject cartObject = new JSONObject(getObject);

				HttpSession session = request.getSession();

				List<Object> cart = (List<Object>) session.getAttribute("cart");
				if (cart == null) {
					cart = new ArrayList<>();
				}

				// Add the cart item to the user's cart
				cart.add(cartObject);

				// Update the cart in the session
				session.setAttribute("cart", cart);
				response.getWriter().write("success");

			} catch (Exception e) {
				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to add the product to the cart.");
			}
		}

		if ("update".equals(action)) {

			String getObject = request.getParameter("item");

			if (getObject == null || getObject.isEmpty()) {
				response.sendError(CUST0M_STATUS_CODE, "Invalid cart item data.");
				return;
			}

			try {

				JSONObject cartObject = new JSONObject(getObject);

				// Get the user's session
				HttpSession session = request.getSession();

				// Retrieve the user's cart from the session
				List<Object> cart = (List<Object>) session.getAttribute("cart");

				// Check if the cart exists
				if (cart != null) {
					// Find the index of the item to update (you might use a unique identifier)
					int indexOfItemToUpdate = findIndexOfCartItemToUpdate(cart, cartObject);

					if (indexOfItemToUpdate >= 0) {
						// Update the cart item at the specified index
						cart.set(indexOfItemToUpdate, cartObject);

						// Update the cart in the session
						session.setAttribute("cart", cart);

						// Optionally, you can respond with a success message or perform other actions.
						response.getWriter().write("success");

					}
				}

			} catch (Exception e) {
				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to update cart item.");
			}
		}

		if ("delete".equals(action)) {

			// Get the unique identifier of the item to delete from the request
			String itemIdToDelete = request.getParameter("itemIdToDelete");

			if (itemIdToDelete == null || itemIdToDelete.isEmpty()) {
				response.sendError(CUST0M_STATUS_CODE, "Cannot find delete parameter");
				return;
			}

			try {
				HttpSession session = request.getSession();

				// Retrieve the user's cart from the session
				List<Object> cart = (List<Object>) session.getAttribute("cart");

				// Check if the cart exists
				if (cart != null) {
					// Find the index of the item to delete (you might use a unique identifier)
					int indexOfItemToDelete = findIndexOfCartItemToDelete(cart, itemIdToDelete);

					if (indexOfItemToDelete >= 0) {
						// Remove the cart item at the specified index
						cart.remove(indexOfItemToDelete);

						// Update the cart in the session
						session.setAttribute("cart", cart);

						// Optionally, you can respond with a success message or perform other actions.
						response.getWriter().write("success");
					}
				}
			} catch (Exception e) {
				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to delete cart item");
			}

		}

		if ("readAll".equals(action)) {

			try {
				// Get the user's session
				HttpSession session = request.getSession();

				// Retrieve the user's cart from the session
				List<Object> cart = (List<Object>) session.getAttribute("cart");
				JSONArray cartArr = new JSONArray(cart);

				response.getWriter().write(cartArr.toString());

			} catch (Exception e) {
				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to read all cart product");
			}

		}

		if ("getLength".equals(action)) {

			try {
				// Get the user's session
				HttpSession session = request.getSession();
				// Retrieve the user's cart from the session
				List<Object> cart = (List<Object>) session.getAttribute("cart");

				int count = 0;

				if (session != null && cart != null && !cart.isEmpty()) {

					count = cart.size();
				}

				response.getWriter().write(count + "");

			} catch (Exception e) {
				// Handle JSON parsing or other exceptions
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to read cart size");
			}

		}

		if ("clearAll".equals(action)) {
			try {
				// Get the user's session
				HttpSession session = request.getSession();

				// Remove the user's cart from the session to clear all items
				session.removeAttribute("cart");

				response.getWriter().write("success");

			} catch (Exception e) {
				// Handle exceptions and log them
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, "Failed to clear cart");
			}
		}

	}

	// Helper method to find the index of a cart item to update
	private int findIndexOfCartItemToUpdate(List<Object> cart, JSONObject updatedCartItem) {

		for (int i = 0; i < cart.size(); i++) {
			JSONObject currentItem = (JSONObject) cart.get(i);
			if (currentItem.getString("cart_item_id").equals(updatedCartItem.getString("cart_item_id"))) {
				return i;
			}
		}
		return -1;
	}

	// Helper method to find the index of a cart item to delete
	private int findIndexOfCartItemToDelete(List<Object> cart, String itemIdToDelete) {
		for (int i = 0; i < cart.size(); i++) {
			JSONObject currentItem = (JSONObject) cart.get(i);
			if (currentItem.getString("cart_item_id").equals(itemIdToDelete)) {
				return i;
			}
		}
		return -1;
	}

}
