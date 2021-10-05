using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarynPHD.Models
{
    public class SolutionDTO
    {
        public List<SolutionAns> Answers { get; set; }
        public string PostedBy { get; set; }
    }
}
