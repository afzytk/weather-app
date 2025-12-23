from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/cities")
def search_cities(query: str):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key missing")

    url = "http://api.openweathermap.org/geo/1.0/direct"
    params = {
        "q": query,
        "limit": 5,
        "appid": API_KEY
    }

    res = requests.get(url, params=params)
    return res.json()


@app.get("/weather")
def get_weather(city: str):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key missing")

    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    res = requests.get(url, params=params)
    data = res.json()

    if res.status_code != 200:
        raise HTTPException(status_code=404, detail="City not found")

    return {
        "city": data["name"],
        "country": data["sys"]["country"],
        "temperature": round(data["main"]["temp"]),
        "feels_like": round(data["main"]["feels_like"]),
        "min": round(data["main"]["temp_min"]),
        "max": round(data["main"]["temp_max"]),
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"],
        "description": data["weather"][0]["description"],
        "icon": data["weather"][0]["icon"],
        "sunrise": datetime.fromtimestamp(data["sys"]["sunrise"]).strftime("%I:%M %p"),
        "sunset": datetime.fromtimestamp(data["sys"]["sunset"]).strftime("%I:%M %p"),
    }
