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
		private AvatarRepository repo;

		public AvatarController(ILogger<GenericController> logger)
		{
			_logger = logger;
			repo = new AvatarRepository();
		}

		[HttpGet("/getAvatar/{id:int}")]
		public Avatar GetAvatar(int id)
		{
			return repo.GetAvatar(id);
		}

		[HttpGet("/getAvatarScore/{id:int}")]
		public double GetAvatarScore(int id)
		{
			return repo.GetAvatar(id).CurrentScore;
		}

		[HttpGet("/getAvatarLevel/{id:int}")]
		public double GetAvatarLevel(int id)
		{
			return repo.GetAvatar(id).CurrentLevel;
		}

		/// <summary>
		/// restituisce i team del giocatore
		/// </summary>
		/// <param name="nickname"></param>
		/// <returns></returns>
		[HttpGet("/getTeams/{id:int}")]
		public List<Team> GetTeams(String nickname)
		{
			throw new NotImplementedException();
		}

		[HttpPut("/setAvatarScore/{id:int}")]
		public async Task<IActionResult> SetAvatarScore(int id, double score)
		{
			try
			{
				var avatar = repo.GetAvatar(id);

				if (avatar == null)
					return NotFound();

				avatar.CurrentScore = score;

				return Ok();
			}
			catch (Exception)
			{
				return BadRequest();
			}
		}

	}
}
