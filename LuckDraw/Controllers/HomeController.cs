using LuckDraw.Models;
using System.Linq;
using System.Web.Mvc;

namespace LuckDraw.Controllers
{
    public class HomeController : Controller
    {
        private LuckyDrawDbContext db = new LuckyDrawDbContext();
        public ActionResult Index()
        {
            var list = db.LKD_LuckyDraws.ToList();
            return View(list);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}