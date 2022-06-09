using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WKGameAPI.Models
{
	public class AvatarRepository : IAvatarRepository
	{
		private List<Avatar> _avatarsList = new List<Avatar>();
		public List<Avatar> AvatarsList
		{
			get { return _avatarsList; }
			set { _avatarsList = value; }
		}

		public List<Planet> _planetsList = new List<Planet>();
		public List<Planet> PlanetsList
		{
			get { return _planetsList; }
			set { _planetsList = value; }
		}


		public AvatarRepository()
		{

			#region Inizializzazione della lista di Avatar
			
			AvatarsList.Add(new Avatar()
			{
				AvatarId = 1,
				Nickname = "Astroman",
				AvatarImage = "",
				City = "Milano",
				CompanySize = 15,
				JobRole = "",
				CurrentScore = 50,
				CurrentLevel = 3
			});

			AvatarsList.Add(new Avatar()
			{
				AvatarId = 2,
				Nickname = "Moongirl",
				AvatarImage = "",
				City = "Torino",
				CompanySize = 5,
				JobRole = "",
				CurrentScore = 10,
				CurrentLevel = 1
			});

			#endregion


			#region Inizializzazione della lista dei Pianeti

			PlanetsList.Add(new Planet()
			{
				PlanetId = 1,
				Name = "Mercury",
				Description = ""
			});

			PlanetsList.Add(new Planet()
			{
				PlanetId = 2,
				Name = "Venus",
				Description = ""
			});

			PlanetsList.Add(new Planet()
			{
				PlanetId = 3,
				Name = "Earth",
				Description = ""
			});

			PlanetsList.Add(new Planet()
			{
				PlanetId = 4,
				Name = "Mars",
				Description = ""
			});

			PlanetsList.Add(new Planet()
			{
				PlanetId = 5,
				Name = "Jupiter",
				Description = ""
			});

			PlanetsList.Add(new Planet()
			{
				PlanetId = 6,
				Name = "Saturn",
				Description = ""
			});

			PlanetsList.Add(new Planet()
			{
				PlanetId = 7,
				Name = "Uranus",
				Description = ""
			});

			PlanetsList.Add(new Planet()
			{
				PlanetId = 8,
				Name = "Neptune",
				Description = ""
			});



			#endregion
		}

		public Avatar GetAvatar()
		{
			return new Avatar()
			{
				Nickname = "Astroman",
				AvatarImage = "",
				City = "Milano",
				JobRole = "",
				CompanySize = 15
			};

		}

		public Avatar GetAvatar(int avatarId)
		{
			return AvatarsList.Where(x => x.AvatarId == avatarId).FirstOrDefault();
		}

		public bool Save(Avatar avatar)
		{
			var result = AvatarsList.Where(a => a.AvatarId == avatar.AvatarId);
			if (result != null)
			{
				if (result.Count() == 0)
				{
					AvatarsList.Add(avatar);
					return true;
				}
			}
			return false;
		}


		public Double GetScore(int avatarId)
		{
			return AvatarsList.Where(x => x.AvatarId == avatarId).Select(x => x.CurrentScore).FirstOrDefault();
		}



		//public Avatar SetScore(int avatarId, double points)
		//{
		//	var avatar = AvatarsList.Where(x => x.AvatarId == avatarId).FirstOrDefault();

		//	if (avatar != null)
		//	{
		//		avatar.CurrentScore += points;
		//	}

		//	return avatar;
		//}


		//public Avatar SetLevel(int avatarId, int level)
		//{
		//	var avatar = AvatarsList.Where(x => x.AvatarId == avatarId).FirstOrDefault();

		//	if (avatar != null)
		//	{
		//		avatar.CurrentLevel += level;
		//	}

		//	return avatar;
		//}









		public IEnumerable<Avatar> GetAvatars()
		{
			throw new NotImplementedException();
		}

		public Avatar UpdateAvatar(Avatar avatar)
		{
			throw new NotImplementedException();
		}

		public Avatar AddAvatar(Avatar avatar)
		{
			throw new NotImplementedException();
		}

		public void DeleteAvatar(int avatarId)
		{
			throw new NotImplementedException();
		}

	}
}
