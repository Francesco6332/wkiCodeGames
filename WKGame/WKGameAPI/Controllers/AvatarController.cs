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
	public class AvatarController : ControllerBase
	{
		private readonly ILogger<GenericController> _logger;

		public AvatarController(ILogger<GenericController> logger)
		{
			_logger = logger;
		}

		[HttpGet("/getAvatar/{id:int}")]
		public Avatar GetAvatar(int id)
		{
			AvatarRepository repo = new AvatarRepository();
			return repo.GetAvatar(id);
		}

		/// <summary>
		/// restituisce i team del giocatore
		/// </summary>
		/// <param name="nickname"></param>
		/// <returns></returns>
		public List<Team> GetTeams(String nickname)
		{
			throw new NotImplementedException();
		}

		[HttpGet("/getTestString")]
		public String GetTestString()
		{
			return "Hello world!";
		}
	}
}
