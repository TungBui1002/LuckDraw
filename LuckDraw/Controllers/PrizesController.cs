using LuckDraw.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace LuckDraw.Controllers
{
    public class PrizesController : Controller
    {
        private LuckyDrawDbContext db = new LuckyDrawDbContext();
        // GET: LuckyDraw/GetPrizes
        [HttpGet]
        public JsonResult GetPrizes(int id)
        {
            try
            {
                var prizes = db.LKD_Prizes
                    .Where(p => p.LuckyDrawId == id)
                    .Select(p => new
                    {
                        p.Id,
                        p.NamePrize,
                        p.Quantity
                    })
                    .ToList();

                return Json(prizes, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = true, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}