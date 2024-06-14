using NutritionalRecipeBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutritionalRecipeBook.Application.Contracts
{
    public interface IMeasurementTypeService
    {
        Task<IEnumerable<MeasurementType>> GetAll();
    }
}
