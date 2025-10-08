using LuckDraw.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace LuckDraw.Controllers
{
    public class CandidateController : Controller
    {
        private LuckyDrawDbContext db = new LuckyDrawDbContext();

        // GET: LuckyDraw/GetCandidates
        [HttpGet]
        public JsonResult GetCandidates(int id)
        {
            try
            {
                var candidates = db.LKD_Candidates
                    .Where(c => c.LuckyDrawId == id)
                    .Select(c => new
                    {
                        c.Id,
                        c.FullName,
                        c.Department
                    })
                    .ToList();

                return Json(candidates, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = true, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Create(int luckyDrawId, string fullName, string department)
        { 
            try
            {
                var candidate = new LKD_Candidate
                {
                    FullName = fullName,
                    Department = department,
                    LuckyDrawId = luckyDrawId
                };

                db.LKD_Candidates.Add(candidate);
                db.SaveChanges();

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Edit(int id, string fullName, string department)
        {
            try
            {
                var candidate = db.LKD_Candidates.Find(id);
                if (candidate == null)
                    return Json(new { success = false, message = "Candidate not found" });

                candidate.FullName = fullName;
                candidate.Department = department;
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
                var candidate = db.LKD_Candidates.Find(id);
                if (candidate == null)
                    return Json(new { success = false, message = "Candidate not found" });

                db.LKD_Candidates.Remove(candidate);
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