# backend/app/main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()

#pa que se suba xd

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DATABASE_NAME", "AyeStock")

client = AsyncIOMotorClient(MONGODB_URI)
db = client[DB_NAME]

app = FastAPI(title="AyeStock API")

# CORS - permitir tu frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ajuste si es necesario
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    name: str
    quantity: int
    price: float
    cost: float
    category: str
    description: str
    active: bool

# util para convertir ObjectId
def fix_id(doc):
    doc = dict(doc)
    doc["_id"] = str(doc["_id"])
    return doc

@app.post("/items", status_code=201)
async def create_item(item: Item):
    res = await db.items.insert_one(item.dict())
    return {"id": str(res.inserted_id)}

@app.get("/items")
async def list_items():
    cursor = db.items.find()
    items = []
    async for doc in cursor:
        items.append(fix_id(doc))
    return items

@app.get("/items/search")
async def search_items(query: str):
    cursor = db.items.find({"name": {"$regex": query, "$options": "i"}})
    items = []
    async for doc in cursor:
        items.append(fix_id(doc))
    return items

@app.get("/items/{item_id}")
async def get_item(item_id: str):
    doc = await db.items.find_one({"_id": ObjectId(item_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return fix_id(doc)
