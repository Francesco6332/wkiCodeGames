using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WKGameAPI.Models;

namespace WKGameAPI.Factory
{
	public static class AvatarRepositoryFactory
	{
		private static AvatarRepository _instance;
		static AvatarRepositoryFactory()
		{

		}

		public static AvatarRepository GetAvatarRepository
		{
			get
			{
				if (_instance == null)
				{
					_instance = new AvatarRepository();
				}
				return _instance;
			}
		}

	}
}
