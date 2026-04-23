import os
import sys
from dotenv import load_dotenv

load_dotenv()

def test_connection():
    url = os.getenv('DATABASE_URL')
    if not url:
        print("Error: DATABASE_URL not found in .env")
        return False
    
    # Fix legacy postgres:// URLs
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    
    # Add sslmode if needed
    if "supabase.com" in url and "sslmode" not in url:
        url += "?sslmode=require"
    
    host = url.split("@")[1].split("/")[0] if "@" in url else "unknown"
    print(f"Testing connection to: {host}")
    
    try:
        from sqlalchemy import create_engine, text
        engine = create_engine(url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"Connection successful!")
            print(f"PostgreSQL version: {version[:50]}...")
            from sqlalchemy import inspect
            inspector = inspect(engine)
            tables = inspector.get_table_names()
            print(f"Found {len(tables)} tables: {', '.join(tables) if tables else '(none)'}")
        return True
    except Exception as e:
        print(f"Connection FAILED: {e}")
        return False

if __name__ == "__main__":
    ok = test_connection()
    sys.exit(0 if ok else 1)
