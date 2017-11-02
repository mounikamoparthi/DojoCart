using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
 using System;
using System.Globalization;

using System.Collections.Generic;
using System.Linq;
 using System.Threading.Tasks;
 using Microsoft.EntityFrameworkCore;
using ecommerce.Models;

namespace ecommerce.Controllers
{
    public class HomeController : Controller
    {
         private ecommercecontext _context;

        public HomeController(ecommercecontext context) {
            _context = context;
        }
        // GET: /Home/
        // [HttpGet]
        // [Route("")]
        // public IActionResult Index()
        // {
        //      List<ProductInfo> AllProductInfos = _context.Products.OrderByDescending(o => o.CreatedAt).ToList();

        //      @ViewBag.AllProductInfos=AllProductInfos.Take(4);
        //      List<Customerinfo> Customerinfos = _context.Customers.OrderByDescending(o => o.CreatedAt).ToList();
        //      @ViewBag.Customerinfos=Customerinfos.Take(3);
        //     List<Orderinfo> Orderinfos = _context.Orders
        //      .Include(c=>c.Customerinfo)
        //      .Include(p=>p.ProductInfo)
        //      .OrderByDescending(o => o.CreatedAt)
        //      .ToList();
        //      @ViewBag.Orderinfos=Orderinfos.Take(3);
        //     return View();
        // }
        [HttpGet]
        [Route("getAllBikes")]
        public IActionResult getAllBikes()
        {
             List<ProductInfo> AllProductInfos = _context.products.ToList();
            //  @ViewBag.AllProductInfos=AllProductInfos;
            // return View("products");//
            System.Console.WriteLine("AllProductInfos");
            System.Console.WriteLine(AllProductInfos);
                        return Json(AllProductInfos);
        }

        [HttpGet]
        [Route("/products/{product_title}")]
        public IActionResult getoneBike(string product_title)
        {
            ProductInfo ProductInfoone = _context.products.SingleOrDefault(w => w.ProductName == product_title);

            //  @ViewBag.AllProductInfos=AllProductInfos;
            // return View("products");//
            System.Console.WriteLine("ProductInfoone");
            System.Console.WriteLine(ProductInfoone);
                        return Json(ProductInfoone);
        }

        [HttpPost]
        [Route("addbike")]
        public IActionResult addbike([FromBody] ProductInfo newprod)
        {
          System.Console.WriteLine("In ADDBIKE##########");
            System.Console.WriteLine(newprod);
            // newprod.UserId=19;
             if(ModelState.IsValid)
                    {   _context.Add(newprod);
                            _context.SaveChanges();
                            return Json(true);

                    }
        else
                    {
                    ViewBag.errors = ModelState.Values;
                    ViewBag.status="prodaddfail";
                    return Json(false);
                    }

        }

        //  [HttpGet]
        // [Route("customers")]
        // public IActionResult customers()
        // {
        //      List<Customerinfo> Customerinfos = _context.Customers.ToList();
        //      @ViewBag.Customerinfos=Customerinfos;
        //     return View("Customershow");
        // }

//          [HttpPost]
//         [Route("addcust")]
//         public IActionResult addcust(Customerinfo newcust)
//         {
//              if(ModelState.IsValid)
//              {
//                   Customerinfo existingcust = _context.Customers.SingleOrDefault(w => w.CustomerName == newcust.CustomerName);
//                   if (existingcust == null){
//                         _context.Add(newcust);
//                         _context.SaveChanges();
//                         return RedirectToAction("customers");
//              }
//              else{
//                  ViewBag.errors = "Customer already exists";
//         ViewBag.status="custadddup";
//          return RedirectToAction("customers");
//              }

//         }
//         else
//         {
//                ViewBag.errors = ModelState.Values;
//         ViewBag.status="custaddfail";
//          return RedirectToAction("customers");
//         }
//     }


//     [HttpGet]
// [Route("customer/remove/{customerid}")]
//         public IActionResult remove(int customerid)
//         {
//                 Customerinfo Customerinfo = _context.Customers.SingleOrDefault(w => w.CustomerId == customerid);
//                 _context.Customers.Remove(Customerinfo);
//                 _context.SaveChanges();
//                 return RedirectToAction("customers"); }


//          [HttpGet]
//         [Route("orders")]
//         public IActionResult orders()
//         {
//              List<Customerinfo> Customerinfos = _context.Customers.ToList();
//              List<ProductInfo> ProductInfos = _context.Products.ToList();



//              List<Orderinfo> Orderinfos = _context.Orders
//              .Include(c=>c.Customerinfo)
//              .Include(p=>p.ProductInfo)
//              .ToList();

//              @ViewBag.Customerinfos=Customerinfos;
//              @ViewBag.ProductInfos=ProductInfos;
//              @ViewBag.Orderinfos=Orderinfos;
//             return View("Ordershow");
//         }

//            [HttpPost]
//         [Route("AddOrder")]
//         public IActionResult AddOrder(Orderinfo neworder)
//         {
//              if(ModelState.IsValid)
//         {   _context.Add(neworder);
//                 _context.SaveChanges();
//                 ProductInfo ProductInfoone = _context.Products.SingleOrDefault(w => w.ProductId == neworder.ProductId);
//                 ProductInfoone.InitialQty =   ProductInfoone.InitialQty - neworder.Quantity;
//                 _context.SaveChanges();
//                 return RedirectToAction("orders");

//         }
//         else
//           {
//                ViewBag.errors = ModelState.Values;
//         ViewBag.status="orderaddfail";
//                  return View("Ordershow");

//         }
// }

// [HttpGet]
// [Route("logout")]
//         public IActionResult logout()
//         {
//             HttpContext.Session.Clear();
//             return RedirectToAction("Index");}
//                 // return View("Register");}


    }
}
