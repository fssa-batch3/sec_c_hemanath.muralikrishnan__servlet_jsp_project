package com.fssa.agrokart.user;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fssa.agrokart.util.ExceptionLoggerUtil;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

/**
 * Servlet implementation class OrderCreation
 */
@WebServlet("/RazorPayOrderCreation")
public class OrderCreation extends HttpServlet {

	private static final int CUST0M_STATUS_CODE = 600;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String amount = request.getParameter("amount");

		if (amount == null || amount.isEmpty()) {

			response.sendError(CUST0M_STATUS_CODE, "Invalid parameter");
		}

		RazorpayClient client = null;
		String orderId = null;

		try {

			client = new RazorpayClient(System.getenv("RAZORPAY_KEY_ID"), System.getenv("RAZORPAY_SECRET_KEY"));
			JSONObject options = new JSONObject();
			options.put("amount", Double.parseDouble(amount) * 100);
			options.put("currency", "INR");
			options.put("receipt", "zxr456");
			options.put("payment_capture", true);
			Order order = client.orders.create(options);
			orderId = order.get("id");
			response.getWriter().write(orderId);
		} catch (RazorpayException e) {
			ExceptionLoggerUtil.logException(e);
			response.sendError(CUST0M_STATUS_CODE, e.getMessage());
		}
	}

}
