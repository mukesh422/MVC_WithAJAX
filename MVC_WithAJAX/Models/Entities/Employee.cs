using System.ComponentModel.DataAnnotations;

namespace MVC_WithAJAX.Models.Entities
{
    public class Employee
    {
            public int Id { get; set; }
            [Required]
            public string Name { get; set; }
            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }
            [Required]
            public string Mobile { get; set; }
            [Required]
            public string Address { get; set; }
    }

    
}
