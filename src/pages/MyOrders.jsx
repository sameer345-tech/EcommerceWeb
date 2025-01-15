import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import orderInfoService from "../appWrite/orderInfo";
import Container from "../components/Container";

function MyOrders() {
  const currentUser = useSelector((state) => state.loginInfo.user);

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      if (!currentUser?.$id) return [];
      return await orderInfoService.getAllOrders(currentUser.$id);
    },
    enabled: !!currentUser?.$id,
  });

  if (isLoading) return <Container><center><Spinner /></center></Container>;
  if (error) return <p className="text-red-500 text-center">Error loading orders: {error.message}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        My Orders
      </h2>

      {orders?.documents?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.documents.map((order) => {
            let orderedItems = [];
            try {
              const parsedItems = JSON.parse(order.orderedItems);
              orderedItems = parsedItems.documents || [];
            } catch (e) {
              console.error("Error parsing ordered items:", e);
              orderedItems = [];
            }

            return (
              <div
                key={order.$id}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  Order ID: {order.orderId}
                </h3>
                <p className="text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    } font-medium`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {order.date}
                </p>
                <div className="mt-4">
                  <strong className="block text-gray-700 mb-2">Items:</strong>
                  <ul className="space-y-1">
                    {orderedItems.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-center gap-2"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded-full border"
                        />
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
