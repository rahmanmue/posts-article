import os 
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME : str = "FastApi Microservices"
    SQLALCHEMY_DATABASE_URI : str = os.getenv("DATABASE_URL")

settings = Settings()