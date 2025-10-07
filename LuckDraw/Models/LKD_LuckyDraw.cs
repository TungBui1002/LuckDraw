using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuckDraw.Models
{
    [Table("LKD_LuckyDraw")]
    public class LKD_LuckyDraw
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string NameLuckyDraw { get; set; }

        public virtual ICollection<LKD_Candidate> Candidates { get; set; }
        public virtual ICollection<LKD_Prize> Prizes { get; set; }
    }
}