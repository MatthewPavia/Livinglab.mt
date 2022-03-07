using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Models
{
    public class Solution
    {
        [JsonProperty(PropertyName = "Number")]
        public string Number { get; set; }
        [JsonProperty(PropertyName = "Title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "Description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "Img1Title")]
        public string Img1Title { get; set; }
        [JsonProperty(PropertyName = "Img1Url")]
        public string Img1Url { get; set; }
        [JsonProperty(PropertyName = "Img2Title")]
        public string Img2Title { get; set; }
        [JsonProperty(PropertyName = "Img2Url")]
        public string Img2Url { get; set; }
        [JsonProperty(PropertyName = "Credits")]
        public string Credits { get; set; }
    }
}
