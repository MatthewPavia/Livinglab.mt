using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Models
{
    public class User
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string username { get; set; }

        [JsonProperty(PropertyName = "age")]
        public string age { get; set; }

        [JsonProperty(PropertyName = "gender")]
        public string gender { get; set; }

        [JsonProperty(PropertyName = "locality")]
        public string locality { get; set; }
        [JsonProperty(PropertyName = "route")]
        public string route { get; set; }
    }
}
