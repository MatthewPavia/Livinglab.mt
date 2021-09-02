using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody] string noteText)
        {
            return Ok();
        }
    }
}
