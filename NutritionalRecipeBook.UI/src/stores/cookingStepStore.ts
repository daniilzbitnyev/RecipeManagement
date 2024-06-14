import { makeAutoObservable } from 'mobx';

import { CookingStepModel } from 'models/CookingStepModel';
import { PhotoModel } from 'models/PhotoModel';

export class CookingStepStore {
  cookingSteps: CookingStepModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAll(): CookingStepModel[] {
    return this.cookingSteps;
  }

  getPhotosCookingStep(cookingStepId: string): PhotoModel[] | undefined {
    const index = this.cookingSteps.findIndex((t) => t.id == cookingStepId);
    return this.cookingSteps[index].photos;
  }

  setAll(cookingSteps: CookingStepModel[]) {
    this.cookingSteps = cookingSteps;
  }

  addOne(cookingStep: CookingStepModel) {
    this.cookingSteps.push(cookingStep);
  }

  updateOne(cookingStep: CookingStepModel) {
    const index = this.cookingSteps.findIndex((t) => t.id == cookingStep.id);
    if (index > -1) {
      this.cookingSteps[index] = cookingStep;
    }
  }

  deleteOne(id: string) {
    const index = this.cookingSteps.findIndex((t) => t.id == id);
    if (index > -1) {
      this.cookingSteps.splice(index, 1);
    }
  }
}

const cookingStepStore = new CookingStepStore();
export default cookingStepStore;
