using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutritionalRecipeBook.Application.Contracts;
using NutritionalRecipeBook.Domain.Entities;

namespace NutritionalRecipeBook.Api.Controllers
{
    [ApiController]
    [Route("/api/measurementType")]
    [Authorize]
    public class MeasurementTypeController : ControllerBase
    {
         private readonly IMeasurementTypeService _measurementTypeService;

        public MeasurementTypeController(IMeasurementTypeService measurementTypeService)
        {
            _measurementTypeService = measurementTypeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeasurementType>>> GetAll()
        {
            return Ok(await _measurementTypeService.GetAll());
        }
    }
}
