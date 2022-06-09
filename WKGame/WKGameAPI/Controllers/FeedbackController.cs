using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WKGameAPI.Factory;
using WKGameAPI.Models;

namespace WKGameAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class FeedbackController : ControllerBase
	{
		private readonly ILogger<GenericController> _logger;
		private AvatarRepository repo;

		public FeedbackController(ILogger<GenericController> logger)
		{
			_logger = logger;
			repo = AvatarRepositoryFactory.GetAvatarRepository;
		}

		[HttpGet("/feedback/getQuestion/{level:int}")]
		public String GetQuestion(int level)
		{
			return level switch
			{
				1 => "Dai una valutazione sul gestionele Genya e Fattura Smart",
				2 => "Cosa ne pensi della nuova funzionalità Dismissioni dei cespiti di Genya?",
				_ => "",
			};
		}

		[HttpPost("/feedback/sendFeedback")]
		public async Task<ActionResult<Feedback>> PostSendFeedback(Feedback item)
		{
			try
			{
				//Conto le parole del feedback per assegnare i punti
				char[] delimiters = new char[] { ' ', '\r', '\n' };
				var wordCount = item.FeedbackText.Split(delimiters, StringSplitOptions.RemoveEmptyEntries).Length;

				var avatar = repo.GetAvatar(item.UserId);

				if (avatar == null)
					return NotFound();

				avatar.CurrentScore += wordCount;

				return Ok();

			}
			catch (Exception)
			{
				return BadRequest();
			}
		}
	}
}
