using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using ecommerce.Models;
 
namespace ecommerce.Models
{
    public class Customerinfo : BaseEntity
    {
        [Key]
        public int CustomerId {get; set;}
        [Required]
        public string CustomerName {get; set;}
         public List<Orderinfo> Orderinfo {get;set;}
 public DateTime CreatedAt {get;set;}
       public DateTime UpdatedAt {get;set;}
        public Customerinfo(){
            Orderinfo = new List<Orderinfo>();
            CreatedAt= DateTime.Now;
            UpdatedAt=DateTime.Now;
        }
    }
}