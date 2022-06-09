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
	public class AvatarController : ControllerBase
	{
		private readonly ILogger<GenericController> _logger;
		private AvatarRepository repo;

		public AvatarController(ILogger<GenericController> logger)
		{
			_logger = logger;
			repo = AvatarRepositoryFactory.GetAvatarRepository;
		}

		[HttpGet("/getAvatar/{id:int}")]
		public Avatar GetAvatar(int id)
		{
			return repo.GetAvatar(id);
		}
		
		[HttpPost]
		public bool SaveAvatar(Avatar avatar)
		{
			return repo.Save(avatar);
		}


		[HttpPost("/setAvatar/")]
		public ActionResult<Feedback> SetAvatar(Avatar item)
		{
			try
			{
				var avatarToUpdate = repo.UpdateAvatar(item);

				if (avatarToUpdate)
					return Ok();
				else
					return BadRequest();
			}
			catch (Exception)
			{
				return BadRequest();
			}
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
		/// <param name="id">id avatar</param>
		/// <returns></returns>
		[HttpGet("/getTeams/{id:int}")]
		public List<Team> GetTeams(int id)
		{
			throw new NotImplementedException();
		}

		[HttpPut("/setAvatarScore/{id:int}/{score:int}")]
		public async Task<IActionResult> SetAvatarScore(int id, int score)
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
