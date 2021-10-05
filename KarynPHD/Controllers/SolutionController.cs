using Azure;
using Azure.Data.Tables;
using KarynPHD.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SolutionController : Controller
    {

        public SolutionController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var configurationSection = Configuration.GetSection("AzureTable");
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "SolutionsQ", new TableSharedKeyCredential(account, key));


                Pageable<TableEntity> queryResultsFilter = tableClient.Query<TableEntity>(filter: $"PartitionKey eq 'Solution'");

                List<Solution> solutions = new List<Solution>();

                foreach (TableEntity qEntity in queryResultsFilter)
                {
                    Solution solution = new Solution
                    {
                        Number = qEntity.RowKey,
                        Title = qEntity.GetString("Title"),
                        Description = qEntity.GetString("Description"),
                        Img1Title = qEntity.GetString("Img1Title"),
                        Img1Url = qEntity.GetString("Img1Url"),
                        Img2Title = qEntity.GetString("Img2Title"),
                        Img2Url = qEntity.GetString("Img2Url")
                    };

                    solutions.Add(solution);
                }


                return Ok(solutions.OrderBy(x => x.Number));
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] SolutionDTO userSolutions)
        {

            try
            {
                var configurationSection = Configuration.GetSection("AzureTable");
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "SolutionsA", new TableSharedKeyCredential(account, key));


                userSolutions.Answers = userSolutions.Answers.Skip(1).ToList();
                int i = 1;

                foreach (var ans in userSolutions.Answers)
                {

                    var entity = new TableEntity("SolutionAnswer", Guid.NewGuid().ToString())
                    {
                        { "Question", i },
                        { "Rating", ans.rating },
                        { "Opinion", ans.opinion },
                        { "Encouragement", ans.encouraged },
                        { "PostedBy",  userSolutions.PostedBy}
                    };

                    tableClient.AddEntity(entity);

                    i++;
                }

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }
    }
}
