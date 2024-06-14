export interface PhotoModel {
  id?: string;
  title: string;
  imageName?: string;
  data?: File | null;
  imageSrc?: string;
  cookingStepId?: string
}
