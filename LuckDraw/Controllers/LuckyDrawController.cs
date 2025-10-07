using LuckDraw.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace LuckDraw.Controllers
{
    public class LuckyDrawController : Controller
    {
        private LuckyDrawDbContext db = new LuckyDrawDbContext();

        // GET: LuckyDraw
        public ActionResult LuckyDrawList()
        {
           var luckyDraws = db.LKD_LuckyDraws.ToList();
            return View(luckyDraws);
        }

        // POST: LuckyDraw/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(LKD_LuckyDraw luckyDraw)
        {
            if (ModelState.IsValid)
            {
                db.LKD_LuckyDraws.Add(luckyDraw);
                db.SaveChanges();
                return Json(new { success = true });
            }

            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
            return Json(new { success = false, message = string.Join("; ", errors) });
        }

        // POST: LuckyDraw/Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Delete(int id)
        {
            try
            {
                var luckyDraw = db.LKD_LuckyDraws.Find(id);
                if (luckyDraw == null)
                {
                    return Json(new { success = false, message = "Lucky draw not found." });
                }

                db.LKD_LuckyDraws.Remove(luckyDraw);
                db.SaveChanges();
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error deleting lucky draw: " + ex.Message });
            }
        }

        // POST: LuckyDraw/Edit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Edit(LKD_LuckyDraw luckyDraw) 
        {
            if (ModelState.IsValid)
            {
                var existingLuckyDraw = db.LKD_LuckyDraws.Find(luckyDraw.Id);
                if (existingLuckyDraw == null)
                {
                    return Json(new { success = false, message = "Lucky draw not found." });
                }

                existingLuckyDraw.NameLuckyDraw = luckyDraw.NameLuckyDraw;
                db.SaveChanges();
                return Json(new { success = true });
            }

            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
            return Json(new { success = false, message = string.Join("; ", errors) });
        }

        //GET: LuckyDraw/Details/
        public ActionResult Details (int id) 
        {
            var luckyDraw = db.LKD_LuckyDraws
                .Include(l => l.Candidates)
                .Include(l => l.Prizes)
                .FirstOrDefault(l => l.Id == id);

            if (luckyDraw == null)
                {
                return HttpNotFound();
            }
            return View(luckyDraw);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}