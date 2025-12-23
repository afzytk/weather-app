from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("WEATHER_API_KEY")

@app.get("/weather")
def get_weather(city: str):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key missing")

    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",
    }

    res = requests.get(url, params=params)
    data = res.json()

    if res.status_code != 200:
        raise HTTPException(status_code=404, detail="City not found")

    return {
        "city": data["name"],
        "temperature": round(data["main"]["temp"]),
        "description": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"],
        "icon": data["weather"][0]["icon"],
    }
