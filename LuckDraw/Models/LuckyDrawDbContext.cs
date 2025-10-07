using System.Data.Entity;

namespace LuckDraw.Models
{
    public class LuckyDrawDbContext : DbContext
    {
        public LuckyDrawDbContext() : base("name=LuckyDrawEntities") { }

        public DbSet<LKD_LuckyDraw> LKD_LuckyDraws { get; set; }
        public DbSet<LKD_Candidate> LKD_Candidates { get; set; }
        public DbSet<LKD_Prize> LKD_Prizes { get; set; }
        public DbSet<LKD_Winner> LKD_Winners { get; set; }
    }
}