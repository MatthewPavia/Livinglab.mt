using Azure.Data.Tables;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Models
{
    public class Note
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "likes")]
        public int? Likes { get; set; }

        [JsonProperty(PropertyName = "postedby")]
        public string PostedBy { get; set; }

        public DateTime Created { get; set; }
        public DateTimeOffset? timestamp { get; set; }

    }
}
