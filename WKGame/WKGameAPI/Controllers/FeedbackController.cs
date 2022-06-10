using Azure.AI.TextAnalytics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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


		// Carico l'immagine in una cartella locale prima di inviare un feedback
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

				// Creo la directory se none siste
				Directory.CreateDirectory(pathToSave);

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

				}
				else
				{
					return BadRequest();
				}

				// Lo analizzo con gli Azure Cognitive Services
				var controller = new EmotionsController();
				var res = await controller.GetEmotionsFromFile(fullPath);

				return Ok(getImageAnalysis(res));

			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex}");
			}
		}

		private string getImageAnalysis(string[] res)
		{
			var result = "Grazie per il feedback!";

			if (res[0] == "None")
				return result += "\nLa prossima volta accendi la telecamera per un'esperienza di gioco migliore";


			if (res[0] == "More")
				return result += "\nLa prossima assicurati che la webcam inquadri solo te per un'esperienza di gioco migliore";

			return result+=$"\nOggi la tua faccia esprime un po' di {res[0]} ed anche un po' di {res[1]}";
		}

		private string getFeedResponse(TextSentiment feed)
		{
			return feed switch
			{
				TextSentiment.Positive => "Il feedback dato ci sembra POSITIVO, grazie",
				TextSentiment.Negative => "Il feedback dato ci sembra NEGATIVO, possiamo aiutarti?",
				_ => "Abbiamo ricevuto il tuo feedback ma non abbiamo capito se è positivo o meno! Prova ancora, grazie!",
			};
		}
	}
}
