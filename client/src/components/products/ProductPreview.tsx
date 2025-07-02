import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products/productApi";

export default function ProductPreview() {
  const [index, setIndex] = useState(0);
  const { id } = useParams<{ id: string }>();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(id ?? "");

  const product = response?.data;

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Product not found.</div>;

  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#ffffff]  relative overflow-hidden z-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-100 dark:bg-slate-100 rounded-xl p-4 sm:p-6 lg:p-12 lg:mr-6">
              <div className="text-center mb-4 md:p-6">
                <img
                  src={product.images?.[index]}
                  alt=""
                  className="max-w-full h-auto"
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
                    <img src={imgUrl} alt="" className="max-w-full h-auto" />
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
              <h3 className="text-2xl text-blue-600 font-medium">
                Rs. {product.price}
              </h3>
            </div>

            <form action="#!">
              {/* Pass product as prop if you have colorVariants/sizeVariants */}
              <ColorVariant product={product} />
              <SizeVariant product={product} />
              <div className="mb-6">
                <h5 className="font-medium mb-2">QTY</h5>
                <QtyField name="qty" value={1} onChange={() => {}} />
              </div>

              <div className="flex flex-col gap-3 w-full my-7">
                <div className="flex items-center gap-4 w-full max-w-lg">
                  <button className="bg-blue-600 border border-blue-600 text-white text-sm rounded uppercase hover:bg-opacity-90 px-10 py-2.5 h-10 md:px-12 w-1/2">
                    Buy Now
                  </button>
                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded uppercase px-6 py-2.5 h-10 md:px-12 w-1/2">
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ColorVariant and SizeVariant now accept product as a prop
const ColorVariant = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(
    product?.colorVariants?.[0]?.value || ""
  );
  if (!product?.colorVariants) return null;

  return (
    <div className="mb-6">
      <h5 className="font-medium mb-2">Color: </h5>
      <div className="flex flex-wrap gap-2 mb-2">
        {product.colorVariants.map((item, i) => (
          <Fragment key={i}>
            <input
              type="radio"
              className="absolute hidden"
              autoComplete="off"
              checked={selectedColor === item.value}
              onChange={() => setSelectedColor(item.value)}
            />
            <label
              className={`w-8 h-8 rounded-full ${item.bgcolor} border-2 border-white dark:border-[#0b1727] cursor-pointer mt-1`}
              onClick={() => setSelectedColor(item.value)}
            ></label>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const SizeVariant = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(
    product?.sizeVariants?.[0]?.value || ""
  );
  if (!product?.sizeVariants) return null;

  return (
    <div className="mb-6">
      <h5 className="text-sm font-medium mb-2">
        Size:{" "}
        <span className="opacity-50">
          {selectedSize &&
            product.sizeVariants.find((size) => size.value === selectedSize)
              ?.label}
        </span>
      </h5>
      <div className="flex gap-2 mb-2">
        {product.sizeVariants.map((size) => (
          <React.Fragment key={size.label}>
            <input
              type="radio"
              className="sr-only"
              autoComplete="off"
              checked={selectedSize === size.value}
              onChange={() => setSelectedSize(size.value)}
            />
            <label
              className={`bg-gray-100 dark:bg-slate-800 cursor-pointer rounded-md flex flex-col overflow-hidden text-start border-2 border-white dark:border-[#0b1727]  ${
                selectedSize === size.value &&
                "outline outline-1 outline-blue-600 dark:outline-blue-600"
              } hover:outline-blue-600 px-6 py-4`}
              onClick={() => setSelectedSize(size.value)}
            >
              <b className="mb-2">{size.label}</b>
              <span className="opacity-75 mb-2">{size.content}</span>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const QtyField = ({ name, value, onChange }) => {
  const qtyControl = (qty) =>
    onChange({
      target: {
        name,
        type: "radio",
        value: qty < 1 ? 1 : qty,
      },
    });

  return (
    <div className="flex h-11 w-24 mb-4">
      <input
        className="w-2/3 pl-2 text-center border border-black dark:border-white bg-transparent focus:outline-none rounded-lg overflow-hidden font-bold text-lg"
        type="number"
        placeholder=""
        value={value}
        onChange={(e) => qtyControl(Number(e.target.value))}
      />
      <div className="w-1/3 rounded-lg overflow-hidden flex flex-col border-1 border-black bg-transparent p-0">
        <button
          className="text-blue-600 hover:bg-blue-600 hover:text-white h-1/2 font-bold leading-none text-lg border-b"
          type="button"
          onClick={() => qtyControl(Number(value) - 1)}
        >
          -
        </button>
        <button
          className="text-blue-600 hover:bg-blue-600 hover:text-white h-1/2 font-bold leading-none text-lg"
          type="button"
          onClick={() => qtyControl(Number(value) + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
