using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using ecommerce.Models;
 
namespace ecommerce.Models
{
    public class ProductInfo : BaseEntity
    {
        [Key]
        public int ProductId {get; set;}
        public int UserId {get; set;}
        [Required]
        public string ProductName {get; set;}
        [Required]
        public string Description {get; set;}
        [Required]
        public string Imageurl {get; set;}
        [Required]
        
        public int Price {get;set;}
    //    public DateTime CreatedAt {get;set;}
    //    public DateTime UpdatedAt {get;set;}
        //   public List<Orderinfo> Orderinfo {get;set;}

        // public ProductInfo(){
        //     Orderinfo = new List<Orderinfo>();
        //     // CreatedAt= DateTime.Now;
        //     // UpdatedAt=DateTime.Now;
        }
       

    }
