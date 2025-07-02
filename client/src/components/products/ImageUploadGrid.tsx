import type { UseFormRegister } from "react-hook-form";
import type { ProductFormFields } from "../../features/products/productSchema";
import { InputField } from "../UI/InputField";

interface props {
  register: UseFormRegister<ProductFormFields>;
}

function ImageUploadGrid({ register }: props) {
  return (
    <div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i}>
          <InputField
            label={`Image ${i + 1}`}
            type="file"
            {...register(`images.${i}`)}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageUploadGrid;
