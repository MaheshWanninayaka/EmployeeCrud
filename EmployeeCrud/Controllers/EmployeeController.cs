using EmployeeCrud.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _employeeContext;
        public EmployeeController(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
        }

        [HttpGet]
        [Route("GetEmployeesAsync")]
        public async Task<List<Employee>?> GetEmployeesAsync()
        {
            if (_employeeContext.Employees != null)
            {
                return await _employeeContext.Employees.ToListAsync();
            }
            else
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<Employee?> GetEmployeeAsync(int id)
        {
            if (_employeeContext.Employees.Where(x => x.Id == id) != null)
            {
                return await _employeeContext.Employees.Where(x => x.Id == id).FirstOrDefaultAsync();
            }
            else
            {
                return null;
            }
        }

        [HttpPost]
        [Route("SaveEmployeeAsync")]
        public async Task<int> SaveEmployeeAsync(Employee employee)
        {
            if (employee != null)
            {
                _employeeContext.Employees.Add(employee);
                var result = await _employeeContext.SaveChangesAsync();
                return result;
            }
            return 0;
        }

        [HttpDelete]
        public async Task<bool> DeleteEmployee(int id)
        {
            if (_employeeContext.Employees == null)
            {
                return false;
            }
            var employee = await _employeeContext.Employees.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (employee == null)
            {
                return false;
            }
            _employeeContext.Employees.Remove(employee);
            await _employeeContext.SaveChangesAsync();
            return true;
        }

        [HttpPost]
        [Route("UpdateEmployeeAsync")]
        public async Task<bool> UpdateEmployeeAsync(Employee employee)
        {
            if (employee != null)
            {
                var exEmployee = await _employeeContext.Employees.FirstOrDefaultAsync(x => x.Id == employee.Id);

                if (exEmployee != null)
                {
                    exEmployee.Name = employee.Name;
                    exEmployee.Address = employee.Address;

                    _employeeContext.Entry(exEmployee).State = EntityState.Modified;

                    var result = _employeeContext.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            return false;
        }
    }
}
