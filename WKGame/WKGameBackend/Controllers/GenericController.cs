using Microsoft.AspNetCore.Mvc;

namespace WKGameBackend.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GenericController : ControllerBase
	{
		
		private readonly ILogger<GenericController> _logger;

		public GenericController(ILogger<GenericController> logger)
		{
			_logger = logger;
		}


		[HttpGet("/getRandomNumber")]
		public Double GetScore()
		{
			return Random.Shared.Next(0, 100);
		}

		[HttpGet("/getTestString")]
		public String GetTestString()
		{
			return "Hello world!";
		}
	}
}