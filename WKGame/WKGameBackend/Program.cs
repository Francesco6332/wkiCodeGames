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

app.Run();
