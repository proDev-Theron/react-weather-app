interface ForecastItem {
  day: string;
  temp: number | string;
  icon: string;
}

interface WeatherCardProps {
  city: string;
  temperature: number | string;
  unit: "C" | "F";
  description: string;
  icon: string;
  forecast?: ForecastItem[];
}

export default function WeatherCard({
  city,
  temperature,
  unit,
  description,
  icon,
  forecast = [],
}: WeatherCardProps) {
  return (
    <div className="w-[340px] bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">

      {/* Header Image */}
      <div className="h-32 w-full overflow-hidden">
        <img
          src="https://img.freepik.com/free-vector/modern-skyline-building-background-design-with-reflection-effect_1017-50620.jpg?semt=ais_hybrid&w=740&q=80"
          alt={city}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Main Section */}
      <div className="p-4 flex flex-col gap-3">

        {/* City + Temp + Icon */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{city}</h2>
            <p className="text-4xl font-bold">
              {temperature}°{unit}
            </p>
          </div>

          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-14 h-14"
          />
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm capitalize">{description}</p>

        {/* Forecast Row */}
        {forecast.length > 0 && (
          <div className="flex justify-between items-center mt-3">
            {forecast.map((day, i) => (
              <div key={i} className="flex flex-col items-center text-xs text-gray-700">
                <span className="font-medium">{day.day}</span>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={day.day}
                  className="w-6"
                />
                <span className="text-sm">{day.temp}°</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
