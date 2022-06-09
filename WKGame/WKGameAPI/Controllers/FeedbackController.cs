using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WKGameAPI.Models;

namespace WKGameAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class FeedbackController : ControllerBase
	{
		private readonly ILogger<GenericController> _logger;

		public FeedbackController(ILogger<GenericController> logger)
		{
			_logger = logger;
		}

		[HttpGet("/feedback/getQuestion/{level:int}")]
		public String GetQuestion(int level)
		{
			return level switch
			{
				1 => "Cosa ne pensi della nuova funzionalità Dismissioni dei cespiti di Genya?",
				2 => "Cosa ne pensi del secondo livello?",
				_ => "",
			};
		}

		[HttpPost("/feedback/sendFeedback")]
		public async Task<ActionResult<Feedback>> PostSendFeedback(Feedback item)
		{
			try
			{
				var fed = item;
				return Ok();
			}
			catch (Exception)
			{
				return BadRequest();
			}
		}
	}
}
