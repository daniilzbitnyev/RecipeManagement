import { CommentModel } from "./CommentModel";

export interface ReviewModel {
    id?: string;
    rate: number;
    comment: CommentModel
    recipeId: string
    ownerUserName?: string;
    ownerId: string
}