using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace AngularBackend.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class WeatherForecastController : ControllerBase
	{
		private static readonly string[] Summaries = new[]
		{
		  "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
	 };

		private readonly ILogger<WeatherForecastController> _logger;

		public WeatherForecastController(ILogger<WeatherForecastController> logger)
		{
			_logger = logger;
		}

		[HttpGet(Name = "GetWeatherForecast")]
		public IEnumerable<WeatherForecast> Get()
		{
			return Enumerable.Range(1, 5).Select(index => new WeatherForecast
			{
				Date = DateTime.Now.AddDays(index),
				TemperatureC = Random.Shared.Next(-20, 55),
				Summary = Summaries[Random.Shared.Next(Summaries.Length)]
			})
			.ToArray();
		}

		[HttpGet("/getScore")]
		public Double GetScore()
		{
			return Random.Shared.Next(0, 100);
		}


		[HttpPost("/uploadImage"), DisableRequestSizeLimit]
		public async Task<IActionResult> UploadImage()
		{
			try
			{
				// Salvo il file localmente
				var formCollection = await Request.ReadFormAsync();
				var file = formCollection.Files.First();
				var folderName = Path.Combine("Resources", "Images");
				var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
				var fullPath = "";
				if (file.Length > 0)
				{
					var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
					fullPath = Path.Combine(pathToSave, fileName);
					var dbPath = Path.Combine(folderName, fileName);
					using (var stream = new FileStream(fullPath, FileMode.Create))
					{
						file.CopyTo(stream);
					}

					//var result = new String[] { "Daje", "Forte" };

					//return Ok(result);
				}
				else
				{
					return BadRequest();
				}

				// Lo analizzo con gli Azure Cognitive Services

				var controller = new EmotionsController();
				var res = await controller.GetEmotionsFromFile(fullPath);

				return Ok(res);

			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex}");
			}
		}

	}
}