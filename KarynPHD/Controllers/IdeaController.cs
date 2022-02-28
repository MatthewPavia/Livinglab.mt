using Azure;
using Azure.Data.Tables;
using KarynPHD.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace KarynPHD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IdeaController : Controller
    {
        private readonly ILogger _logger;

        public IdeaController(IConfiguration configuration, ILogger<IdeaController> logger)
        {
            Configuration = configuration;
            _logger = logger;
        }
        public IConfiguration Configuration { get; }

        [HttpPost]
        public IActionResult Post([FromBody] NoteDTO note)
        {
            try
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable"+ Env);
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "Notes", new TableSharedKeyCredential(account, key));

                var entity = new TableEntity("Note", Guid.NewGuid().ToString())
                {
                    { "Text", note.Text },
                    { "Likes", 0 },
                    { "PostedBy", note.PostedBy },
                    { "Created",  DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")}
                };

                tableClient.AddEntity(entity);

                _logger.LogInformation("Idea - Post");
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception at Idea - Post");
                return StatusCode(500);
            }
        }

        [Route("Get/{sort}")]
        [HttpGet]
        public IActionResult Get(string sort)
        {
            try
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable"+Env);
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "Notes", new TableSharedKeyCredential(account, key));


                Pageable<TableEntity> queryResultsFilter = tableClient.Query<TableEntity>(filter: $"PartitionKey eq 'Note'");

                List<Note> notes = new List<Note>();

                foreach (TableEntity qEntity in queryResultsFilter)
                {
                    Note note = new Note
                    {
                        Id = qEntity.RowKey,
                        Text = qEntity.GetString("Text"),
                        Likes = qEntity.GetInt32("Likes"),
                        Created = DateTime.ParseExact(qEntity.GetString("Created"),"dd/MM/yyyy HH:mm:ss",null),
                        timestamp = qEntity.Timestamp
                    };

                    notes.Add(note);
                }

                if (sort == "likes")
                {
                    return Ok(notes.OrderByDescending(x => x.Likes).ToList());
                }

                _logger.LogInformation("Idea - Get");
                return Ok(notes.OrderByDescending(x => x.Created).ToList());
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception at Idea - Get");
                return StatusCode(500);
            }
        }

        [Route("AddLike/{noteId}")]
        [HttpPost]
        public IActionResult AddLike(string noteId)
        {
            try 
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable"+Env);
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "Notes", new TableSharedKeyCredential(account, key));

                TableEntity qEntity = tableClient.GetEntity<TableEntity>("Note", noteId);

                int? incrementedLikes = qEntity.GetInt32("Likes") + 1;

                var updatedEntity = new TableEntity("Note", qEntity.RowKey)
                 {
                        { "Text", qEntity.GetString("Text") },
                        { "Likes", incrementedLikes },
                        { "PostedBy", qEntity.GetString("PostedBy") },
                        { "Created", qEntity.GetString("Created") }
                 };


                tableClient.UpdateEntity(updatedEntity, ETag.All, TableUpdateMode.Replace);

                _logger.LogInformation("Idea - AddLike");
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception at Idea - AddLike");
                return StatusCode(500);
            }
        }

        [Route("RemoveLike/{noteId}")]
        [HttpPost]
        public IActionResult RemoveLike(string noteId)
        {
            try
            {
                string Env = Environment.GetEnvironmentVariable("livinglabenv") == "DEV" ? "DEV" : "PROD";
                var configurationSection = Configuration.GetSection("AzureTable"+Env);
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "Notes", new TableSharedKeyCredential(account, key));

                TableEntity qEntity = tableClient.GetEntity<TableEntity>("Note", noteId);

                int? incrementedLikes = qEntity.GetInt32("Likes") - 1;

                var updatedEntity = new TableEntity("Note", qEntity.RowKey)
                 {
                        { "Text", qEntity.GetString("Text") },
                        { "Likes", incrementedLikes },
                        { "Created", qEntity.GetString("Created") }
                 };


                tableClient.UpdateEntity(updatedEntity, ETag.All, TableUpdateMode.Replace);

                _logger.LogInformation("Idea - RemoveLike");
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception at Idea - RemoveLike");
                return StatusCode(500);
            }
        }
    }
}
