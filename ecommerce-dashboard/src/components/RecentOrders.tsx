import React from "react";
import { Orders } from "@/assets/data";

const RecentOrders = () => {
  return (
    <div className="recent-orders">
      <h2>Recent Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Number</th>
            <th>Payment</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Orders.map((order, index) => (
            <tr key={index}>
              <td>{order.productName}</td>
              <td>{order.productNumber}</td>
              <td>{order.paymentStatus}</td>
              <td
                className={
                  order.status === "Declined"
                    ? "danger"
                    : order.status === "Pending"
                    ? "warning"
                    : "primary"
                }
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="#">Show All</a>
    </div>
  );
};

export default RecentOrders;
