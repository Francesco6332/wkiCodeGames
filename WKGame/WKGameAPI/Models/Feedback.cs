namespace WKGameAPI.Models
{
	public class Feedback
	{

		private string question         ;
		private int    userId        = 0;

		private int    totalRate     = 0;
		private int    easyRate      = 0;
		private int    completeRate  = 0;
		private int    usefulRate    = 0;
		private string feedbackText     ;

		public Feedback()
		{
		}

		public Feedback(int userId, string question, int totalRate, int easyRate, int ccompleteRate, int usefulRate, string feedbackText)
		{
			UserId = userId;
			Question = question;
			TotalRate = totalRate;
			EasyRate = easyRate;
			CompleteRate = ccompleteRate;
			UsefulRate = usefulRate;
			FeedbackText = feedbackText;
		}

		public string Question { get => question; set => question = value; }
		public int UserId { get => userId; set => userId = value; }


		public int TotalRate { get => totalRate; set => totalRate = value; }
		public int EasyRate { get => easyRate; set => easyRate = value; }
		public int CompleteRate { get => completeRate; set => completeRate = value; }
		public int UsefulRate { get => usefulRate; set => usefulRate = value; }
		public string FeedbackText { get => feedbackText; set => feedbackText = value; }
	}
}
