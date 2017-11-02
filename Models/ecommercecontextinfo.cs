using Microsoft.EntityFrameworkCore;
 
namespace ecommerce.Models
{
    public class ecommercecontext : DbContext
    {
        // base() calls the parent class' constructor passing the "options" parameter along
        public ecommercecontext(DbContextOptions<ecommercecontext> options) : base(options) { }
            public DbSet<Userrecord> user { get; set; }

            public DbSet<Customerinfo> Customers { get; set; }
            public DbSet<Orderinfo> Orders { get; set; }
            public DbSet<ProductInfo> products { get; set; }


    }
}