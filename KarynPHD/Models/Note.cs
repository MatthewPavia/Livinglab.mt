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
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "text")]
        public string text { get; set; }

        [JsonProperty(PropertyName = "likes")]
        public int likes { get; set; }

    }
}
