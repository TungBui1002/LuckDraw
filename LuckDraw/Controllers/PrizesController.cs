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

        [HttpPost]
        public JsonResult Create(int luckyDrawId, string namePrize, int quantity)
        {
            try
            {
                var prize = new LKD_Prize
                {
                    LuckyDrawId = luckyDrawId,
                    NamePrize = namePrize,
                    Quantity = quantity
                };
                db.LKD_Prizes.Add(prize);
                db.SaveChanges();
                return Json(new { success = true });
            }
            catch (Exception ex)
            { 
                return Json (new {success = false, message = ex.Message});
            }
        }

        [HttpPost]
        public JsonResult Edit(int id, string namePrize, int quantity)
        {
            try
            {
                var prize = db.LKD_Prizes.Find(id);
                if (prize == null)
                    return Json(new { success = false, message = "Prize not found" });

                prize.NamePrize = namePrize;
                prize.Quantity = quantity;
                db.SaveChanges();

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                var prize = db.LKD_Prizes.Find(id);
                if (prize == null)
                    return Json(new { success = false, message = "Prize not found" });

                db.LKD_Prizes.Remove(prize);
                db.SaveChanges();
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}