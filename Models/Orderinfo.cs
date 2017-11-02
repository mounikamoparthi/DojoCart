using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using ecommerce.Models;
 
namespace ecommerce.Models
{
    public class Orderinfo : BaseEntity
    {
        [Key]
        public int OrderId {get; set;}
       
        public int CustomerId {get; set;}
        public Customerinfo Customerinfo {get; set;}

        public int ProductId {get; set;}
        public ProductInfo ProductInfo {get; set;}
        [Required]
        public int Quantity {get;set;}
        public DateTime CreatedAt {get;set;}
        public DateTime UpdatedAt {get; set;}
  public Orderinfo(){
            
            CreatedAt= DateTime.Now;
            UpdatedAt=DateTime.Now;
        }
    }
}