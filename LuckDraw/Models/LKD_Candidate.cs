using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuckDraw.Models
{
    [Table("LKD_Candidate")]
    public class LKD_Candidate
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string FullName { get; set; }

        [StringLength(100)]
        public string Department { get; set; }

        [ForeignKey("LuckyDraw")]
        public int LuckyDrawId { get; set; }

        public virtual LKD_LuckyDraw LuckyDraw { get; set; }
    }
}