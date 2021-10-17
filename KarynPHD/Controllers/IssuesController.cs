using Azure.Data.Tables;
using KarynPHD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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

        public IssuesController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        [HttpPost]
        public ActionResult Post(Issue issues)
        {
            var configurationSection = Configuration.GetSection("AzureTable");
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

            return Ok();
        }
    }
}
