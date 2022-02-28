using KarynPHD.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
using Azure.Data.Tables;
using Microsoft.Extensions.Logging;

namespace KarynPHD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger _logger;
        public UserController(IConfiguration configuration, ILogger<UserController> logger)
        {
            Configuration = configuration;
            _logger = logger;
        }
        public IConfiguration Configuration { get; }

        [HttpPost]
        public async Task<ActionResult> Post(User user)
        {
            try
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable"+ Env);
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

                _logger.LogInformation("User - Post");
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception at User - Post");
                return StatusCode(500);
            }
            
        }
    }
}
