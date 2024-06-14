namespace NutritionalRecipeBook.Application.DTOs.Shared
{
    public class IngredientFile
    {
        public float Quantity { get; set; }

        public ProductFile? Product { get; set; }

        public MeasurementTypeFile? Measurement { get; set; }
    }
}
