import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products/productApi";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";

export default function ProductPreview() {
  const [index, setIndex] = useState(0);
  const { id } = useParams<{ id: string }>();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(id ?? "");
  const navigate = useNavigate();

  const product = response?.data;
  const dispatch = useAppDispatch();
  const [qty, setqty] = useState(1);

  const handleBuyNow = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product._id,
        productName: product.productName,
        price: product.price,
        quantity: qty,
        image: product.images?.[0] || "",
        stock: product.stock,
      })
    );
    navigate("/cart/checkout");
  };

  const handleAddToCart = () => {
    if (!product) return;

    console.log(product);
    dispatch(
      addToCart({
        id: product._id,
        productName: product.productName,
        price: product.price,
        quantity: qty,
        image: product.images?.[0] || "",
        stock: product.stock,
      })
    );
    navigate("/cart");
  };

  // Update QtyField usage to include stock check
  const handleQtyChange = (e) => {
    const newQty = Number(e.target.value);
    if (newQty > product.stock) {
      alert(`Only ${product.stock} items available in stock.`);
      setqty(product.stock);
    } else if (newQty < 1) {
      setqty(1);
    } else {
      setqty(newQty);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Product not found.</div>;

  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#ffffff]  relative overflow-hidden z-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-100 dark:bg-slate-100 rounded-xl p-4 sm:p-6 lg:p-12 lg:mr-6">
              <div className="flex justify-center mb-4 md:p-6">
                <img
                  src={product.images?.[index]}
                  alt=""
                  className="max-w-full h-72 "
                />
              </div>
              <ul className="flex gap-3">
                {product.images?.map((imgUrl, i) => (
                  <li
                    className={`w-24 h-24 flex justify-center items-center p-2 rounded-md border cursor-pointer ${
                      index === i
                        ? "border-blue-600"
                        : "border-gray-200 dark:border-slate-700"
                    }`}
                    key={i}
                    onClick={() => setIndex(i)}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      className="max-w-full h-full w-full"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mb-6 lg:mb-12">
              <h1 className="text-2xl leading-none md:text-4xl font-medium mb-4">
                {product.productName}
              </h1>
              <p className="opacity-70 mb-6">
                <span>{product.rating ?? 4.0}</span>{" "}
                <FontAwesomeIcon
                  icon={faStar}
                  className="mx-2 text-yellow-500"
                />
                <a href="#!" className="text-blue-600 font-medium ml-1">
                  {product.numreviews ?? 0} Reviews
                </a>{" "}
                <span className="ml-2">104 Order</span>
              </p>
              <p className="opacity-70 lg:mr-56 xl:mr-80 my-4">
                {product.description}
              </p>
              <p className="opacity-70 lg:mr-56 xl:mr-80 my-4">
                Items available - {product.stock}
              </p>
              <h3 className="text-2xl text-blue-600 font-medium">
                Rs. {product.price}
              </h3>
            </div>

            <div className="mb-6">
              <h5 className="font-medium mb-2">QTY</h5>
              <QtyField
                name="qty"
                value={qty}
                onChange={handleQtyChange}
              />
            </div>

            <div className="flex flex-col gap-3 w-full my-7">
              <div className="flex items-center gap-4 w-full max-w-lg">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="bg-blue-600 border border-blue-600 text-white text-sm rounded uppercase hover:bg-opacity-90 px-10 py-2.5 h-10 md:px-12 w-1/2"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded uppercase px-6 py-2.5 h-10 md:px-12 w-1/2"
                >
                  Add To Cart
                </button>
              </div>
              <div className="flex items-center gap-4 w-full">
                <button className="hover:border-1 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2">
                  <FontAwesomeIcon icon={faHeart} /> Add to wishlist
                </button>
                <button className="hover:border-1 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2">
                  <FontAwesomeIcon icon={faShareAlt} className="mr-1" /> share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Update QtyField to not allow + button to exceed stock
const QtyField = ({ name, value, onChange }) => {
  const qtyControl = (qty) => {
    onChange({
      target: {
        name,
        type: "radio",
        value: qty,
      },
    });
  };

  return (
    <div className="flex h-11 w-24 mb-4">
      <input
        className="w-2/3 pl-2 text-center border border-black dark:border-white bg-transparent focus:outline-none rounded-lg overflow-hidden font-bold text-lg"
        type="number"
        placeholder=""
        value={value}
        min={1}
        onChange={(e) => qtyControl(Number(e.target.value))}
      />
      <div className="w-1/3 rounded-lg overflow-hidden flex flex-col border-1 border-black bg-transparent p-0">
        <button
          className="text-blue-600 hover:bg-blue-600 hover:text-white h-1/2 font-bold leading-none text-lg border-b"
          type="button"
          onClick={() => qtyControl(Number(value) - 1)}
          disabled={value <= 1}
        >
          -
        </button>
        <button
          className="text-blue-600 hover:bg-blue-600 hover:text-white h-1/2 font-bold leading-none text-lg"
          type="button"
          onClick={() => qtyControl(Number(value) + 1)}
          disabled={value >= (typeof window !== "undefined" && window.productStock ? window.productStock : Infinity)}
        >
          +
        </button>
      </div>
    </div>
  );
};
