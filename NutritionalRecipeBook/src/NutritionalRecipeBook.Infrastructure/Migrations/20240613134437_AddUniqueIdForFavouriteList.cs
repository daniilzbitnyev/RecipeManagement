using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NutritionalRecipeBook.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueIdForFavouriteList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteList_AspNetUsers_UsersId",
                table: "FavouriteList");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteList_Recipes_RecipesId",
                table: "FavouriteList");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FavouriteList",
                table: "FavouriteList");

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("25152f24-76d6-44a3-b768-961d9fd40efc"));

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("297a4402-8ebf-47ae-b3e7-2800d0d337db"));

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("56e24662-e6d2-420a-a422-1f88ea2a65f1"));

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("686beb24-ab86-490d-a3d7-3bd1a1d003cb"));

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("781a012b-70d6-47b1-a9c2-516239cca456"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("0e09cccb-8b3a-45cb-a6c4-58be855fe09b"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("48c0c964-4e03-4094-af44-5102f58fbcc5"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("9de3e503-c74e-477a-be85-1449aa61a407"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("a12a3ab4-233c-495a-a1d3-d6bc51738ee2"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("b7399a3d-7ae6-4bdb-bfd3-5a2cd85afb3f"));

            migrationBuilder.RenameTable(
                name: "FavouriteList",
                newName: "FavouriteLists");

            migrationBuilder.RenameIndex(
                name: "IX_FavouriteList_UsersId",
                table: "FavouriteLists",
                newName: "IX_FavouriteLists_UsersId");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "FavouriteLists",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_FavouriteLists",
                table: "FavouriteLists",
                column: "Id");

            migrationBuilder.InsertData(
                table: "MeasurementTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("27afe3fb-9cf6-43ef-81e8-4950a959e6db"), "tsp" },
                    { new Guid("32a8906b-79ed-484a-9699-60c06850f76b"), "tbsp" },
                    { new Guid("5064df5a-8563-4b76-8325-bd3cfadffbed"), "g" },
                    { new Guid("70d07fe1-748d-4428-a650-9ac2d89f5d0f"), "l" },
                    { new Guid("7460ff97-c999-4a67-8867-1c853e140af0"), "kg" }
                });

            migrationBuilder.InsertData(
                table: "RecipeCategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("01f4eea7-de17-4916-b463-b52c37c381c4"), "Lunch" },
                    { new Guid("35cfec96-bc9f-4737-b178-e63be80ad7e5"), "Breakfast" },
                    { new Guid("8089540d-c650-45b7-9333-b19dbbfdc59e"), "Desserts" },
                    { new Guid("a3dda656-c312-42ef-876f-76e0062866c1"), "Dinner" },
                    { new Guid("f4cdc054-fb72-455b-b445-5605165fe7ce"), "Snacks" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_FavouriteLists_RecipesId",
                table: "FavouriteLists",
                column: "RecipesId");

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteLists_AspNetUsers_UsersId",
                table: "FavouriteLists",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteLists_Recipes_RecipesId",
                table: "FavouriteLists",
                column: "RecipesId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteLists_AspNetUsers_UsersId",
                table: "FavouriteLists");

            migrationBuilder.DropForeignKey(
                name: "FK_FavouriteLists_Recipes_RecipesId",
                table: "FavouriteLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FavouriteLists",
                table: "FavouriteLists");

            migrationBuilder.DropIndex(
                name: "IX_FavouriteLists_RecipesId",
                table: "FavouriteLists");

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("27afe3fb-9cf6-43ef-81e8-4950a959e6db"));

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("32a8906b-79ed-484a-9699-60c06850f76b"));

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("5064df5a-8563-4b76-8325-bd3cfadffbed"));

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("70d07fe1-748d-4428-a650-9ac2d89f5d0f"));

            migrationBuilder.DeleteData(
                table: "MeasurementTypes",
                keyColumn: "Id",
                keyValue: new Guid("7460ff97-c999-4a67-8867-1c853e140af0"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("01f4eea7-de17-4916-b463-b52c37c381c4"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("35cfec96-bc9f-4737-b178-e63be80ad7e5"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("8089540d-c650-45b7-9333-b19dbbfdc59e"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("a3dda656-c312-42ef-876f-76e0062866c1"));

            migrationBuilder.DeleteData(
                table: "RecipeCategories",
                keyColumn: "Id",
                keyValue: new Guid("f4cdc054-fb72-455b-b445-5605165fe7ce"));

            migrationBuilder.DropColumn(
                name: "Id",
                table: "FavouriteLists");

            migrationBuilder.RenameTable(
                name: "FavouriteLists",
                newName: "FavouriteList");

            migrationBuilder.RenameIndex(
                name: "IX_FavouriteLists_UsersId",
                table: "FavouriteList",
                newName: "IX_FavouriteList_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FavouriteList",
                table: "FavouriteList",
                columns: new[] { "RecipesId", "UsersId" });

            migrationBuilder.InsertData(
                table: "MeasurementTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("25152f24-76d6-44a3-b768-961d9fd40efc"), "g" },
                    { new Guid("297a4402-8ebf-47ae-b3e7-2800d0d337db"), "kg" },
                    { new Guid("56e24662-e6d2-420a-a422-1f88ea2a65f1"), "l" },
                    { new Guid("686beb24-ab86-490d-a3d7-3bd1a1d003cb"), "tbsp" },
                    { new Guid("781a012b-70d6-47b1-a9c2-516239cca456"), "tsp" }
                });

            migrationBuilder.InsertData(
                table: "RecipeCategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("0e09cccb-8b3a-45cb-a6c4-58be855fe09b"), "Lunch" },
                    { new Guid("48c0c964-4e03-4094-af44-5102f58fbcc5"), "Desserts" },
                    { new Guid("9de3e503-c74e-477a-be85-1449aa61a407"), "Snacks" },
                    { new Guid("a12a3ab4-233c-495a-a1d3-d6bc51738ee2"), "Dinner" },
                    { new Guid("b7399a3d-7ae6-4bdb-bfd3-5a2cd85afb3f"), "Breakfast" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteList_AspNetUsers_UsersId",
                table: "FavouriteList",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavouriteList_Recipes_RecipesId",
                table: "FavouriteList",
                column: "RecipesId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
