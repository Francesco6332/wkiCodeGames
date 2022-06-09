using Azure.AI.TextAnalytics;
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
				1 => "Dai una valutazione sul gestionale Genya",
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

				var analyzer = new TextAnalyzerController();

				var feed = analyzer.Analyze(item.FeedbackText);

				return Ok(getFeedResponse(feed));

			}
			catch (Exception)
			{
				return BadRequest();
			}
		}

		private string getFeedResponse(TextSentiment feed)
		{
			return feed switch
			{
				TextSentiment.Positive => "Abbiamo ricevuto il tuo feedback e sembra che la funzione ti sia piaciuta! Ne siamo contenti!! Grazie ai vostri feedback miglioriamo insieme!!",
				TextSentiment.Negative => "Sembra che la funzione non ti sia proprio piaciuta, se vuoi possiamo contattarti per aiutarti a risolvere i problemi migliorando insieme",
				_ => "Abbiamo ricevuto il tuo feedback ma non abbiamo capito se la funzione ti è piaciuta o meno! Manda altri feedback per aiutarci nel migliorare ancora. Grazie!",
			};
		}
	}
}
