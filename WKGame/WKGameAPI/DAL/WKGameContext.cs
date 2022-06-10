using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WKGameAPI.Models;

namespace WKGameAPI.DAL
{
	public class WKGameContext
	{
		public IEnumerable<Avatar> Avatars 
		{
			get 
			{
				this.Avatars.Append(new Avatar());

				return this.Avatars;
			}
		}

		public IEnumerable<Team> Teams { get; set; }

		public IEnumerable<Award> Awards { get; set; } 

	}
}
