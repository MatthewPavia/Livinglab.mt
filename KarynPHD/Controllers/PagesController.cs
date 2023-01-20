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
    public class PagesController : ControllerBase
    {
        private readonly ILogger _logger;
        public PagesController(IConfiguration configuration, ILogger<UserController> logger)
        {
            Configuration = configuration;
            _logger = logger;
        }
        public IConfiguration Configuration { get; }

        [HttpPost]
        public async Task<ActionResult> FirstPage([FromBody] GenericPage result)
        {
            try
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable" + Env);
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "FirstPage", new TableSharedKeyCredential(account, key));
                tableClient.CreateIfNotExists();

                var entity = new TableEntity("FirstPage", Guid.NewGuid().ToString())
                {
                    { "Username", result.PostedBy },
                    { "Selection", result.PageValue },
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

        [HttpPost]
        public async Task<ActionResult> ThirdPage([FromBody] GenericPage result)
        {
            try
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable" + Env);
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "ThirdPage", new TableSharedKeyCredential(account, key));
                tableClient.CreateIfNotExists();

                var entity = new TableEntity("ThirdPage", Guid.NewGuid().ToString())
                {
                    { "Username", result.PostedBy },
                    { "SliderValue", result.PageValue },
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

        [HttpPost]
        public async Task<ActionResult> FourthPage([FromBody]FourthPage result)
        {
            try
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable" + Env);
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "FourthPage", new TableSharedKeyCredential(account, key));
                tableClient.CreateIfNotExists();

                var entity = new TableEntity("FourthPage", Guid.NewGuid().ToString())
                {
                    { "Username", result.PostedBy },
                    { "transportMode", result.transportMode },
                    { "daysCarForWork", result.daysCarForWork },
                    { "daysCarForActivities", result.daysCarForActivities },
                    { "daysWalkForWork", result.daysWalkForWork },
                    { "daysWalkForActivities", result.daysWalkForActivities },
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
