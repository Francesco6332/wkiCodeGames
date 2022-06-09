using System;
using System.Collections.Generic;

namespace WKGameAPI.Models
{
	public class Avatar
	{
		public Avatar()
		{
		}

		public int AvatarId { get; set; }

		public String Nickname { get; set; }

		/// <summary>
		/// contiene il percorso con l'immagine da caricare. va bene gestirla così?
		/// </summary>
		public String AvatarImage { get; set; }


		public int CurrentScore { get; set; }

		public int CurrentLevel { get; set; }

		//public String Gender { get; set; }

		public String JobRole { get; set; }

		public String City { get; set; }

		public int CompanySize { get; set; }

		public String JobDepartment { get; set; }

		public int FollowedCustomers { get; set; }

		public int HoursWorkedWeekly { get; set; }

		public int HoursRemoteWorkedWeekly { get; set; }

		public String Hobbies { get; set; }

	}
}