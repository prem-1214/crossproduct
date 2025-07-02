import { Link } from "react-router-dom";
import { useGetMyProductsQuery } from "../../features/products/productApi";

function MyProducts() {
  const { data: products, error, isLoading } = useGetMyProductsQuery();
  console.log("data", products);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-5">
      {products?.data.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded shadow p-4 flex flex-col items-center"
        >
          <Link to={`/seller/my-product/${product._id}`}>
            <img
              src={product.images[0]}
              alt={product.productName}
              className="w-40 h-40 object-cover rounded mb-2"
            />
          </Link>
          <div className="font-semibold text-lg">
            <p>{product.productName}</p>
            <p>&#8377; {product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyProducts;
