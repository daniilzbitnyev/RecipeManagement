import { RecipeModel } from "@models";

export interface RecipeFormProps {
  id?: string;
  title: string;
  onSubmitSuccessMessage?: string;
  onSubmit: (recipe: RecipeModel) => Promise<void>;
  isUpdateForm?: boolean;
  errors?: string[];
}
