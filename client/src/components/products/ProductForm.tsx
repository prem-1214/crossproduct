import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productFormSchema,
  type ProductFormFields,
} from "../../features/products/productSchema";
import { useAddProductMutation } from "../../features/products/productApi";
import Button from "../UI/Button";
import { InputField } from "../UI/InputField";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormFields>({ resolver: zodResolver(productFormSchema) });

  const [createProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: ProductFormFields) => {
    console.log("clicked", data);
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));
    formData.append("category", data.category);

    // Collect all files from the four fields
    [data.image1, data.image2, data.image3, data.image4].forEach((fileList) => {
      if (fileList instanceof FileList && fileList.length > 0) {
        // Append each file in the FileList (usually only one per field)
        Array.from(fileList).forEach((file) => {
          console.log("images", file);
          formData.append("images", file);
        });
      }
    });

    try {
      await createProduct(formData).unwrap();
      navigate("/seller/my-products");
      reset();
    } catch (error) {
      console.error("Product creation failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto"
    >
      <InputField {...register("productName")} placeholder="Product Name" />
      {errors.productName && (
        <p className="text-red-500">{errors.productName.message}</p>
      )}

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <InputField type="number" {...register("price")} placeholder="Price" />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}

      <InputField type="number" {...register("stock")} placeholder="Stock" />
      {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}

      <InputField {...register("category")} placeholder="Category" />
      {errors.category && (
        <p className="text-red-500">{errors.category.message}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">
              Image {index}
            </label>
            <input
              type="file"
              accept="image/*"
              {...register(`image${index}` as keyof ProductFormFields)}
              className="block w-full mt-1"
            />
          </div>
        ))}
      </div>
      {/* {errors.image1 && <p className="text-red-500">{errors.image1.message}</p>} */}

      <Button
        type="submit"
        label={isLoading ? "Uploading" : "Upload"}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      />
    </form>
  );
}

export default ProductForm;
