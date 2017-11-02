using System.ComponentModel.DataAnnotations;
namespace ecommerce.Models
{
    public class RegisterViewModel : BaseEntity
    {
        [Key]
        public int UserId {get;set;}
        
         [Required]
         [MinLength(3)]
         [RegularExpression(@"^[a-zA-Z]+$")]
        public string FirstName { get; set; }
        [Required]
         [MinLength(3)]
         [RegularExpression(@"^[a-zA-Z]+$")]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
 
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        
        // [Compare("Password", ErrorMessage = "Password and confirmation must match.")]
        // public string ConfirmPassword { get; set; }
        
    }
}