using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Text;
using Newtonsoft.Json.Converters;


using Microsoft.Azure.CognitiveServices.Vision.Face;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WKGameAPI.Controllers
{
	public class EmotionsController
	{
		// Valore preso dal portale Azure instanziando i cognitiver services
		const string SUBSCRIPTION_KEY = "42d872754aa14883beeca8d6bf7d702a";
		const string ENDPOINT = "https://my-face-api.cognitiveservices.azure.com/";

		IFaceClient client;

		static readonly JsonSerializerSettings jsonSettings = new JsonSerializerSettings()
		{
			DateFormatHandling = DateFormatHandling.IsoDateFormat,
			NullValueHandling = NullValueHandling.Ignore,
			ContractResolver = new CamelCasePropertyNamesContractResolver()
		};

		public EmotionsController()
		{

			client = Authenticate(ENDPOINT, SUBSCRIPTION_KEY);
		}

		public async Task<String> GetEmotionsFromUrl()
		{
			try
			{
				var photo = "https://contentblog.abaenglish.com/wp-content/uploads/sites/4/2019/05/22013335/People-is-or-are-People-singolare-o-plurale.jpg";

				var requiredFaceAttributes = new List<FaceAttributeType> {
					 FaceAttributeType.Age,
					 FaceAttributeType.Gender,
					 FaceAttributeType.Smile,
					 FaceAttributeType.FacialHair,
					 FaceAttributeType.HeadPose,
					 FaceAttributeType.Glasses,
					 FaceAttributeType.Emotion,
					 FaceAttributeType.Hair,
					 FaceAttributeType.Accessories,
					 FaceAttributeType.Makeup,
					 FaceAttributeType.QualityForRecognition
				};

				IList<DetectedFace> faces = await client.Face.DetectWithUrlAsync(url: photo, returnFaceId: true, detectionModel: DetectionModel.Detection03);
				//IList<DetectedFace> faces_stream = await client.Face.DetectWithStreamAsync(image: stream, returnFaceId: true, detectionModel: DetectionModel.Detection03);

				// Note DetectionModel.Detection02 cannot be used with returnFaceLandmarks.
				IList<DetectedFace> faces2 = await client.Face.DetectWithUrlAsync(url: photo, returnFaceId: true, returnFaceLandmarks: true, detectionModel: DetectionModel.Detection01);


				// Note DetectionModel.Detection02 cannot be used with returnFaceAttributes.
				var faces3 = await client.Face.DetectWithUrlAsync(url: photo, returnFaceId: true, returnFaceAttributes: requiredFaceAttributes, detectionModel: DetectionModel.Detection01, recognitionModel: RecognitionModel.Recognition04);

				return "I'm happy!";
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public async Task<String[]> GetEmotionsFromFile(String? photoPath)
		{
			Dictionary<String, Double> result = new Dictionary<String, Double>();
			if (photoPath == null)
				throw new Exception("ERROR: No file in path");

			try
			{
				var requiredFaceAttributes = new List<FaceAttributeType> {
					 FaceAttributeType.Age,
					 FaceAttributeType.Gender,
					 FaceAttributeType.Smile,
					 FaceAttributeType.FacialHair,
					 FaceAttributeType.HeadPose,
					 FaceAttributeType.Glasses,
					 FaceAttributeType.Emotion,
					 FaceAttributeType.Hair,
					 FaceAttributeType.Accessories,
					 FaceAttributeType.Makeup,
					 FaceAttributeType.QualityForRecognition
				};

				using (Stream s = File.OpenRead(photoPath))
				{
					var facesResults = await client.Face.DetectWithStreamAsync(s, returnFaceId: true, returnFaceAttributes: requiredFaceAttributes, detectionModel: DetectionModel.Detection01, recognitionModel: RecognitionModel.Recognition04);

					if (facesResults.Count == 0)
						return new String[] { "None" };

					if (facesResults.Count > 1)
						return new String[] { "More" };


					var emotions = facesResults.FirstOrDefault()?.FaceAttributes.Emotion;

					// Aggiungo le emozioni ed il rating (da ottimizzare)
					result.Add("rabbia",    emotions?.Anger     ?? 0);
					result.Add("disprezzo", emotions?.Contempt  ?? 0);
					result.Add("disgusto",  emotions?.Disgust   ?? 0);
					result.Add("paura",     emotions?.Fear      ?? 0);
					result.Add("felicità",  emotions?.Happiness ?? 0);
					//result.Add("neutra",    emotions?.Neutral   ?? 0); Rimosso perche da qualche test mi sembra che ci sia sempre
					result.Add("tristezza", emotions?.Sadness   ?? 0);
					result.Add("sorpresa",  emotions?.Surprise  ?? 0);

					// Ordino in base al valore di confidenza e converto in array di stringhe
					var orderedResult = result.OrderByDescending(x => x.Value).Select(x => x.Key).ToArray();
					return orderedResult;
				}
			}
			catch (Exception)
			{
				throw;
			}

		}

		public static IFaceClient Authenticate(string endpoint, string key)
		{
			return new FaceClient(new ApiKeyServiceClientCredentials(key)) { Endpoint = endpoint };
		}
	}

}
