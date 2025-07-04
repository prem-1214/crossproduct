import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateQuantity, removeFromCart } from "@/features/cart/cartSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";

import Button from "@/components/UI/CustomButton";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.cart.items);

  const handleQuantity = (id: string, delta: number) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;
    if (delta > 0 && item.quantity >= item.stock) return; // Prevent exceeding stock
    dispatch(updateQuantity({ id, change: delta }));
  };

  const handleRemove = (id: string) => dispatch(removeFromCart(id));

  const handleCheckout = () => {
    navigate("/cart/checkout");
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-6 lg:col-span-2">
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>

          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full md:w-32 object-cover"
                  />

                  <div className="flex-1 p-6 pb-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.productName}</h3>
                      </div>
                      <Button
                        label="delete"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          label="-"
                          onClick={() => handleQuantity(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          label="+"
                          onClick={() => handleQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          &#8377;{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  ₹
                  {" " +
                    items
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                </span>
              </div>
              <Button
                label="Proceed to checkout"
                className="w-full bg-amber-300"
                onClick={handleCheckout}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
