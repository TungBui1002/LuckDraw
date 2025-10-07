using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuckDraw.Models
{
    [Table("LKD_Winner")]
    public class LKD_Winner
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("LuckyDraw")]
        public int LuckyDrawId { get; set; }

        [ForeignKey("Candidate")]
        public int CandidateId { get; set; }

        [ForeignKey("Prize")]
        public int PrizeId { get; set; }

        public DateTime WinDate { get; set; } = DateTime.Now;

        [StringLength(200)]
        public string Note { get; set; }

        // Navigation properties (liên kết)
        public virtual LKD_LuckyDraw LuckyDraw { get; set; }
        public virtual LKD_Candidate Candidate { get; set; }
        public virtual LKD_Prize Prize { get; set; }
    }
}