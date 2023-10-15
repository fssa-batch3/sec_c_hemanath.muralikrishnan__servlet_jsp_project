package com.fssa.agrokart.user;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fssa.agrokart.model.MainOrderHistory;
import com.fssa.agrokart.model.OrderStatus;
import com.fssa.agrokart.model.PaymentMethod;
import com.fssa.agrokart.model.PaymentStatus;
import com.fssa.agrokart.model.SubOrderItems;
import com.fssa.agrokart.service.OrderService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class OrderServlet
 */
@WebServlet("/OrderCRUD")
public class OrderServlet extends HttpServlet {

	private static final int CUST0M_STATUS_CODE = 600;

	OrderService orderService = new OrderService();

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

		if ("validate".equals(action)) {

			try {

				String items = request.getParameter("item");

				JSONArray arr = new JSONArray(items);

				List<SubOrderItems> orderItems = makeItem(arr);

				if (orderService.BeforePayment(orderItems)) {

					response.getWriter().write("success");
				} else {

					response.sendError(CUST0M_STATUS_CODE, "Failed to validate");
				}

			} catch (Exception e) {

				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}

		}

		if ("getRs".equals(action)) {

			try {
				String items = request.getParameter("item");

				JSONArray arr = new JSONArray(items);

				List<SubOrderItems> orderItems = makeItem(arr);

				double amount = orderService.getRs(orderItems);

				if (amount == 0) {

					response.sendError(CUST0M_STATUS_CODE, "Invalid amount");
				} else {

					response.getWriter().write(amount + "");
				}

			} catch (Exception e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}

		}

		if ("placeOrder".equals(action)) {

			try {

				MainOrderHistory orderObj = createMainOrderHistory(request);

				if (orderService.placeOrder(orderObj)) {

					response.getWriter().write("success");
				}

			} catch (Exception e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}

		}

		if ("readAll".equals(action)) {

			try {

				int userId = Integer.parseInt(request.getParameter("id"));

				List<MainOrderHistory> listofHistory = orderService.readAllOrder(userId);

				JSONArray arrofHistory = new JSONArray(listofHistory);

				response.getWriter().write(arrofHistory.toString());

			} catch (Exception e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}

		}

		if ("cancel".equals(action)) {

			try {

				int mainOrderId = Integer.parseInt(request.getParameter("orderId"));
				int userId = Integer.parseInt(request.getParameter("userId"));

				if (orderService.cancelOrder(mainOrderId, userId)) {

					response.getWriter().write("success");
				} else {

					response.sendError(CUST0M_STATUS_CODE, "error while cancelling the order");
				}

			} catch (Exception e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());

			}
		}
	}

	private MainOrderHistory createMainOrderHistory(HttpServletRequest request) {

		// Define the date format you expect
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

		List<SubOrderItems> subOrder = makeItem(new JSONArray(request.getParameter("item")));

		MainOrderHistory item = new MainOrderHistory();
		item.setUserAddress(request.getParameter("address"));
		// Parse the date using the specified format
		item.setDeliveryDay(LocalDate.parse(request.getParameter("date"), formatter));
		item.setOrderCancelled(false);
		item.setUserId(Integer.parseInt(request.getParameter("user_id")));
		item.setOrderItems(subOrder);
		item.setTotalAmount(Double.parseDouble(request.getParameter("amount")));
		item.setOrderStatus(OrderStatus.PENDING);
		item.setTotalProducts(subOrder.size());

		String payment = request.getParameter("payment");

		if ("cash_on_delivery".equals(payment)) {

			item.setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY);
			item.setPaymentStatus(null);
			item.setRazorpay_order_id(null);
		} else {

			item.setPaymentMethod(PaymentMethod.ONLINE_MODE);
			item.setPaymentStatus(PaymentStatus.SUCCESS);
			item.setRazorpay_order_id(request.getParameter("payment_id"));
		}

		return item;
	}

	private static List<SubOrderItems> makeItem(JSONArray arr) {

		List<SubOrderItems> list = new ArrayList<>();

		for (int i = 0; i < arr.length(); i++) {

			JSONObject obj = (JSONObject) arr.get(i);

			SubOrderItems order = new SubOrderItems();

			order.setProductId(obj.getInt("product_id"));
			order.setQtyNos(Integer.parseInt(obj.getString("quantity")));
			order.setQtyId(Integer.parseInt(obj.getString("qty_id")));
			order.setSellerId(obj.getInt("seller_id"));

			list.add(order);

		}

		return list;
	}

}
