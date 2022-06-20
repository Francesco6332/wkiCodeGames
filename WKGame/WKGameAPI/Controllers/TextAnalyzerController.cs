using Azure;
using System;
using Azure.AI.TextAnalytics;
using System.Collections.Generic;

namespace WKGameAPI.Controllers
{
	public class TextAnalyzerController
	{

		// Valore preso dal portale Azure instanziando i cognitiver services
		const string SUBSCRIPTION_KEY = "a9310009f6324cf79667465f35605c5c";
		const string ENDPOINT = "https://analyze-my-text.cognitiveservices.azure.com/";

		private static readonly AzureKeyCredential credentials = new AzureKeyCredential(SUBSCRIPTION_KEY);
		private static readonly Uri endpoint = new Uri(ENDPOINT);


		TextAnalyticsClient client;

		private Dictionary<string, TextSentiment> keywords = new Dictionary<string, TextSentiment>();

		public TextAnalyzerController()
		{
			client = new TextAnalyticsClient(endpoint, credentials);
		}

		public TextSentiment Analyze(string text)
		{
			// Analisi generale
			DocumentSentiment documentSentiment = client.AnalyzeSentiment(text);

			var sentiment = documentSentiment.Sentiment;

			var documents = new List<string>();
			documents.Add(text);


			// Analisi di dettaglio
			AnalyzeSentimentResultCollection reviews = client.AnalyzeSentimentBatch(documents, options: new AnalyzeSentimentOptions()
			{
				IncludeOpinionMining = true
			});

         foreach (AnalyzeSentimentResult review in reviews)
         {
            foreach (SentenceSentiment sentence in review.DocumentSentiment.Sentences)
            {
               foreach (SentenceOpinion sentenceOpinion in sentence.Opinions)
               {
						var keyword = sentenceOpinion.Target.Text;
						var value = sentenceOpinion.Target.Sentiment;
						keywords.Add(keyword, value);

               }
            }
         }

			return sentiment;
      }
	}
}
