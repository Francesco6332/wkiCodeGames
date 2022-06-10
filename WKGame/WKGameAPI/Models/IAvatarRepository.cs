using System.Collections.Generic;
using System.Threading.Tasks;

namespace WKGameAPI.Models
{
   public interface IAvatarRepository
   {
      IEnumerable<Avatar> GetAvatars();
      Avatar GetAvatar(int avatarId);
      Avatar AddAvatar(Avatar avatar);
      Avatar UpdateAvatar(Avatar avatar);
      void DeleteAvatar(int avatarId);
   }
}