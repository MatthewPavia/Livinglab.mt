using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Models
{
    public class Issue
    {
        public List<string> Questions { get; set; }
        public List<string> Answers { get; set; }
        public string PostedBy { get; set; }
    }
}
