
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using API.Entities;
using API.Data;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context; 
        public UsersController(DataContext context)
        {
           _context = context;
        }
        [HttpGet]
        public ActionResult<IEnumerable<AppUser>> getUsers(){
            return _context.Users.ToList();
        }
        [HttpGet("{id}")]
        public ActionResult<AppUser> getUser(int id){
            return _context.Users.Find(id);
        }
    }
}