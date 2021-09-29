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

namespace KarynPHD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : Controller
    {
        public NoteController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        [HttpPost]
        public IActionResult Post([FromBody] NoteDTO note)
        {
            try
            {
                var configurationSection = Configuration.GetSection("AzureTable");
                string uri = configurationSection.GetSection("Uri").Value;
                string key = configurationSection.GetSection("Key").Value;
                string account = configurationSection.GetSection("StorageAccountName").Value;

                var tableClient = new TableClient(new Uri(uri), "Notes", new TableSharedKeyCredential(account, key));

                var entity = new TableEntity("Note", Guid.NewGuid().ToString())
                {
                    { "Text", note.Text },
                    { "Likes", 0 },
                    { "PostedBy", note.PostedBy },
                    { "Created",  DateTime.Now.ToString()}
                };

                tableClient.AddEntity(entity);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
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
                        Created = Convert.ToDateTime(qEntity.GetString("Created")),
                        timestamp = qEntity.Timestamp
                    };

                    notes.Add(note);
                }


                return Ok(notes.OrderByDescending(x => x.Created).ToList());
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }

        [Route("AddLike/{noteId}")]
        [HttpPost]
        public IActionResult AddLike(string noteId)
        {
            try {
                var configurationSection = Configuration.GetSection("AzureTable");
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

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }

        [Route("RemoveLike/{noteId}")]
        [HttpPost]
        public IActionResult RemoveLike(string noteId)
        {
            try
            {
                var configurationSection = Configuration.GetSection("AzureTable");
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

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }
    }
}
