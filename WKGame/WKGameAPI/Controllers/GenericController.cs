using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WKGameAPI.Controllers
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
			return  new Random().Next();
		}

		[HttpGet("/getTestString")]
		public String GetTestString()
		{
			return "Hello world!";
		}
	}
}
