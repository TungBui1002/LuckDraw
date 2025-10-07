using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuckDraw.Models
{
    [Table("LKD_Prize")]
    public class LKD_Prize
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string NamePrize { get; set; }
        [Required]
        public int Quantity { get; set; }
        [ForeignKey("LuckyDraw")]
        public int LuckyDrawId { get; set; }
        public virtual LKD_LuckyDraw LuckyDraw { get; set; }
    }
}