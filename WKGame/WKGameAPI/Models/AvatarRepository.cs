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
			get
			{
				return _avatarsList;
			}
			set
			{
				_avatarsList = value;
			}
		}
		public AvatarRepository()
		{
			AvatarsList.Add(new Avatar() { AvatarId = 1, Nickname = "Astroman" });
			AvatarsList.Add(new Avatar() { AvatarId = 2, Nickname = "Sunny" });
			AvatarsList.Add(new Avatar() { AvatarId = 2, Nickname = "AAA" });
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
