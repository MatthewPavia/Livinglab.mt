using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Models
{
    public class FourthPage
    {
        [JsonProperty(PropertyName = "transportMode")]
        public string transportMode { get; set; }

        [JsonProperty(PropertyName = "daysCarForWork")]
        public string daysCarForWork { get; set; }

        [JsonProperty(PropertyName = "daysCarForActivities")]
        public string daysCarForActivities { get; set; }

        [JsonProperty(PropertyName = "daysWalkForWork")]
        public string daysWalkForWork { get; set; }

        [JsonProperty(PropertyName = "daysWalkForActivities")]
        public string daysWalkForActivities { get; set; }

        [JsonProperty(PropertyName = "PostedBy")]
        public string PostedBy { get; set; }
    }
}
