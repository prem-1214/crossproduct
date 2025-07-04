import type { UseFormRegister } from "react-hook-form";
import type { ProductFormFields } from "../../features/products/productSchema";
import { InputField } from "../UI/InputField";

interface props {
  register: UseFormRegister<ProductFormFields>;
}

function ImageUploadGrid({ register }: props) {
  const imageFields = ["image1", "image2", "image3", "image4"] as const;

  return (
    <div>
      {imageFields.map((field, i) => (
        <div key={field}>
          <InputField
            label={`Image ${i + 1}`}
            type="file"
            {...register(field)}
          />
        </div>
      ))}
    </div>
  );
}
export default ImageUploadGrid;
