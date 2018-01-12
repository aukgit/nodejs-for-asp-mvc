using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SampleMvc.Startup))]
namespace SampleMvc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
