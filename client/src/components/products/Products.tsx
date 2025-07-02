import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products/productApi";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGetProductByIdQuery(id ?? "");

  if (isLoading) return <p className="text-center">Loading product...</p>;

  if (isError)
    return (
      <div className="text-center text-red-600">
        Error loading product: {error?.data?.message || "Unknown error"}
      </div>
    );

  const product = data?.data;
  console.log("image: ", product?.images[0]);

  if (!product) return <p className="text-center">Product not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>

      <div className="mb-2 text-gray-600">
        <strong>Price:</strong> ₹{product.price}
      </div>

      <div className="mb-2 text-gray-600">
        <strong>Category:</strong> {product.category}
      </div>

      <div className="mb-2 text-gray-600">
        <strong>Stock:</strong> {product.stock}
      </div>

      <div className="mb-4 text-gray-700">
        <strong>Description:</strong> <p>{product.description}</p>
      </div>

      {product.images?.length > 0 && (
        <img
          src={product.images[0]}
          alt={product.productName}
          className="w-full max-h-[300px] object-cover rounded"
        />
      )}
    </div>
  );
}

export default ProductDetails;
