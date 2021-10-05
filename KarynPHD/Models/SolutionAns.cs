using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Models
{
    public class SolutionAns
    { 

        [JsonProperty(PropertyName = "rating")]
        public string rating { get; set; }

        [JsonProperty(PropertyName = "opinion")]
        public string opinion { get; set; }

        [JsonProperty(PropertyName = "encouraged")]
        public string encouraged { get; set; }
    }
}
