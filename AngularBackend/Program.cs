using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using Microsoft.Net.Http.Headers;

// TODO, da configurare la sicurezza
var allowAllOrigins = "allOrigins";

var builder = WebApplication.CreateBuilder(args);

// Abilito le origini note
builder.Services.AddCors(options =>
{
	options.AddPolicy(name: allowAllOrigins,
							builder =>
							{
								builder
								.AllowAnyOrigin()
								.AllowAnyMethod()
								.AllowAnyHeader();
							});
});

// Evita l'errore MultiPartBodyLength quando carico le immagini
builder.Services.Configure<FormOptions>(o =>
{
	o.ValueLengthLimit = int.MaxValue;
	o.MultipartBodyLengthLimit = int.MaxValue;
	o.MemoryBufferThreshold = int.MaxValue;
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Use CORS
app.UseCors(allowAllOrigins);

// Permette di salvare i dati nella tabella resources
app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions()
{
	FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
	RequestPath = new PathString("/Resources")
});

app.Run();