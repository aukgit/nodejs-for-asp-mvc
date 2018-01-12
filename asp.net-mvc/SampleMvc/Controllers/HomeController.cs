using System.Web.Mvc;

namespace SampleMvc.Controllers {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }

        public ActionResult About() {
            ViewBag.Message = "Your application description page.";

            var newVariable = "Hello World";

            return View();
        }

        public string Contact() {
            return "Sample Contact String example";
        }
    }
}