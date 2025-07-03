import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/features/order/checkoutSchema";
import { usePlaceOrderMutation } from "@/features/order/orderApi";
import { useAppSelector } from "../../store/hooks";

export default function CheckoutForm() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [placeOrder] = usePlaceOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data) => {
    try {
      await placeOrder({
        ...data,
        products: cartItems.map((i) => ({
          product: i.id,
          quantity: i.quantity,
        })),
        totalPrice,
      }).unwrap();
      alert("Order placed");
    } catch (err) {
      console.log("Order failed", err);
      alert("Order failed, please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("shippingAddress.fullName")}
            placeholder="Your full name"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.shippingAddress?.fullName ? "border-red-500" : ""
            }`}
          />
          {errors.shippingAddress?.fullName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.shippingAddress.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            {...register("shippingAddress.address")}
            placeholder="Your address"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.shippingAddress?.address ? "border-red-500" : ""
            }`}
          />
          {errors.shippingAddress?.address && (
            <p className="text-sm text-red-600 mt-1">
              {errors.shippingAddress.address.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            {...register("shippingAddress.city")}
            placeholder="Your city"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.shippingAddress?.city ? "border-red-500" : ""
            }`}
          />
          {errors.shippingAddress?.city && (
            <p className="text-sm text-red-600 mt-1">
              {errors.shippingAddress.city.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            {...register("shippingAddress.postalCode")}
            placeholder="Postal code"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.shippingAddress?.postalCode ? "border-red-500" : ""
            }`}
          />
          {errors.shippingAddress?.postalCode && (
            <p className="text-sm text-red-600 mt-1">
              {errors.shippingAddress.postalCode.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            id="country"
            type="text"
            {...register("shippingAddress.country")}
            placeholder="Country"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.shippingAddress?.country ? "border-red-500" : ""
            }`}
          />
          {errors.shippingAddress?.country && (
            <p className="text-sm text-red-600 mt-1">
              {errors.shippingAddress.country.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            {...register("paymentMethod")}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.paymentMethod ? "border-red-500" : ""
            }`}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Stripe">Stripe</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-sm text-red-600 mt-1">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
