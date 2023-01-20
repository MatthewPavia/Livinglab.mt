using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Models
{
    public class GenericPage
    {
        [JsonProperty(PropertyName = "FirstPageValue")]
        public string PageValue { get; set; }
        [JsonProperty(PropertyName = "PostedBy")]
        public string PostedBy { get; set; }
    }
}
