using KarynPHD.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
using Azure.Data.Tables;

namespace KarynPHD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        public UserController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        [HttpPost]
        public async Task<ActionResult> Post(User user)
        {
            try
            {
                var configurationSection = Configuration.GetSection("AzureTable");
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "Users", new TableSharedKeyCredential(account, key));

                var entity = new TableEntity("User", Guid.NewGuid().ToString())
                {
                    { "Username", user.username },
                    { "Age", user.age },
                    { "Gender",  user.gender},
                    { "Locality", user.locality }
                };

                tableClient.AddEntity(entity);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
            
        }
    }
}
