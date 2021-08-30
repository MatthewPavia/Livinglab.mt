using KarynPHD.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ICosmosDbService _cosmosDbService;
        public UserController(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        [HttpPost]
        public async Task<ActionResult> Post(User user)
        {
            try
            {
                user.Id = Guid.NewGuid();
                await _cosmosDbService.AddUserAsync(user);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
            
        }
    }
}
