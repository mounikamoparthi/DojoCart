using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
 
using ecommerce.Models;
using System.Collections.Generic;
using System.Linq;
 using System.Threading.Tasks;
//  using Microsoft.AspNetCore.Identity;

namespace ecommerce.Controllers
{
    public class UserController : Controller
    {
          private ecommercecontext _context;
         
        public UserController(ecommercecontext context) {
            _context = context;
        }
// [HttpGet]
 
// [Route("")]
//         public IActionResult Index()
//         {return View("Register");}

[HttpPost]
[Route("register")]
public IActionResult register([FromBody] Userrecord user)
{
System.Console.WriteLine(user.FirstName);
System.Console.WriteLine("In RegController");
      if(ModelState.IsValid)
     {
           System.Console.WriteLine("In Regmodelvalid");
        List<Userrecord> existinguser = _context.user.Where(u=>u.EmailAddress==user.EmailAddress).ToList();
         System.Console.WriteLine("In Regmodelvalid");
        if (existinguser.Count == 0)
        {
             Userrecord newUser = new Userrecord {FirstName = user.FirstName, LastName= user.LastName, EmailAddress = user.EmailAddress, };
            //  newUser.Password = Hasher.HashPassword(newUser, user.Password);
            newUser.Password =  user.Password;
            _context.Add(newUser);
            _context.SaveChanges();        
            Userrecord logUser = _context.user.SingleOrDefault(u => u.EmailAddress == user.EmailAddress);
            HttpContext.Session.SetInt32("uid", logUser.UserId);
            System.Console.WriteLine("here");
            return Json(true);
        }
        else
        {
             System.Console.WriteLine("In firstelse");
            ViewBag.status="regfailspecific";
            ViewBag.regerror = "User already exists";
            return Json(false);
        }

    }
    else{
         System.Console.WriteLine("In secondelse");
        ViewBag.errors = ModelState.Values;
        ViewBag.status="regfail";
        return Json(false);

    }
    // return Json(true);
}
[HttpPost]
[Route("login")]
public IActionResult login([FromBody] Userrecord user)
{
    System.Console.WriteLine(user.EmailAddress);
    Userrecord existingloginuser = _context.user.SingleOrDefault(u => u.EmailAddress == user.EmailAddress);
         
if (existingloginuser == null)
            {
                System.Console.WriteLine("come here");
                ViewBag.status="loginfailspecific";
                ViewBag.loginerror = "Please register!";
                return Json(false);
            }   
    else    
        {
            if(user.Password != null)
            {
            // var Hasher = new PasswordHasher<User>();
            // if(0 != Hasher.VerifyHashedPassword(existingloginuser, existingloginuser.Password, Password)){
            if(existingloginuser.Password==user.Password){
                HttpContext.Session.SetInt32("uid",(int)existingloginuser.UserId);
                HttpContext.Session.SetString("username", (string)existingloginuser.FirstName);
                return Json(true);
                }
            else{
                        ViewBag.status="loginfailspecific";
                        ViewBag.loginerror = "Invalid Credentials!";
                        return Json(false);
                    }
            }
            else{
                        ViewBag.status="loginfailspecific";
                        ViewBag.loginerror = "Provide password!";
                        return Json(false);
            }

        
    }
}

// [HttpGet]
// [Route("logout")]
//         public IActionResult logout()
//         {
//             HttpContext.Session.Clear();
//             return RedirectToAction("Index");}
//                 // return View("Register");}

}
}
