using Microsoft.AspNetCore.Mvc;
using MVC_WithAJAX.Models;
using MVC_WithAJAX.Models.Entities;

namespace MVC_WithAJAX.Controllers.Ajax
{
    public class AjaxController : Controller
    {
        private readonly ApplicationDbContext _context;
        public AjaxController(ApplicationDbContext dbContext )
        {
            _context = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult EmpList() 
        { 
            var data = _context.Employees.ToList();
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult AddEmployees(Employee employee)
        {
            if (employee == null || string.IsNullOrEmpty(employee.Address))
            {
                return new JsonResult("Invalid input data");
            }

            var emp = new Employee
            {
                Name = employee.Name,
                Email = employee.Email,
                Password = employee.Password,
                Mobile = employee.Mobile,
                Address = employee.Address
            };

            try
            {
                _context.Employees.Add(emp);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                // Log error
                return new JsonResult($"Error: {ex.Message}");
            }
            return new JsonResult("Data is Saved!!!");
        }



        public IActionResult Edit(int id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == id);
            if (employee == null) return NotFound();
            return Json(employee);
        }
        [HttpPost]
        public IActionResult UpdateEmployee([FromBody] Employee employee)
        {
            if (ModelState.IsValid)
            {
                var existingEmployee = _context.Employees.FirstOrDefault(e => e.Id == employee.Id);
                if (existingEmployee == null) return NotFound();

                existingEmployee.Name = employee.Name;
                existingEmployee.Email = employee.Email;
                existingEmployee.Password = employee.Password;
                existingEmployee.Mobile = employee.Mobile;
                existingEmployee.Address = employee.Address;

                _context.SaveChanges();
                return Ok();
            }
            return BadRequest(ModelState);
        }


       

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                return Json(new { success = false, message = "Employee not found." });
            }

            try
            {
                _context.Employees.Remove(employee);
                _context.SaveChanges();
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred while deleting the record." });
            }
        }

    }
}
