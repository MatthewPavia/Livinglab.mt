using Azure.Data.Tables;
using KarynPHD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase
    {

        private readonly ILogger _logger;
        public IssuesController(IConfiguration configuration, ILogger<IssuesController> logger)
        {
            Configuration = configuration;
            _logger = logger;
        }
        public IConfiguration Configuration { get; }

        [HttpPost]
        public ActionResult Post(Issue issues)
        {
            try
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable"+Env);
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "Issues", new TableSharedKeyCredential(account, key));

                int i = 0;

                foreach (var ans in issues.Answers)
                {
                    string answer = "";

                    switch (ans)
                    {
                        case "1":
                            answer = "Major issue";
                            break;
                        case "2":
                            answer = "Somewhat of an issue";
                            break;
                        case "3":
                            answer = "Not an issue";
                            break;
                        default:
                            answer = ans;
                            break;
                    }

                    var entity = new TableEntity("Issue", Guid.NewGuid().ToString())
                    {
                        { "Question", issues.Questions[i] },
                        { "Answer", answer },
                        { "PostedBy", issues.PostedBy }
                    };

                    tableClient.AddEntity(entity);

                    i++;
                }

                _logger.LogInformation("Issues - Post");
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception at Issues - Post");
                return StatusCode(500);
            }
        }
    }
}
