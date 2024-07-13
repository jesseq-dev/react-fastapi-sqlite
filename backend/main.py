from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import pandas as pd
from typing import Generator, Optional, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection() -> Generator[sqlite3.Connection, None, None]:
    conn = sqlite3.connect('data.db', check_same_thread=False)
    try:
        yield conn
    finally:
        conn.close()

@app.get("/clinics", response_model=List[str])
async def get_clinics(db: sqlite3.Connection = Depends(get_db_connection)):
    try:
        query = """
        SELECT DISTINCT clinicName AS name
        FROM encounters
        ORDER BY name
        """
        df = pd.read_sql_query(query, db)
        return df['name'].tolist()
    except sqlite3.DatabaseError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

@app.get("/providers", response_model=List[str])
async def get_providers(db: sqlite3.Connection = Depends(get_db_connection)):
    try:
        query = """
        SELECT DISTINCT providerFullName AS name
        FROM encounters
        ORDER BY name
        """
        df = pd.read_sql_query(query, db)
        return df['name'].tolist()
    except sqlite3.DatabaseError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")
    
@app.get("/general-practice-metrics")
async def get_general_practice_metrics(
    db: sqlite3.Connection = Depends(get_db_connection), 
    clinic: Optional[str] = Query(None),
    provider: Optional[str] = Query(None)
):
    try:
        query = """
        SELECT clinicState, 
               COUNT(DISTINCT(phEncounterID)) as num, 
               ROUND(100 * COUNT(*) / CAST(SUM(COUNT(*)) OVER () as INT), 1) as percent 
        FROM encounters
        WHERE 1=1
        """
        
        if clinic:
            query += f" AND clinicName = '{clinic}'"
        if provider:
            query += f" AND providerFullName = '{provider}'"
        
        query += " GROUP BY clinicState"
        
        df = pd.read_sql_query(query, db)
        return df.to_dict(orient="records")
    except sqlite3.DatabaseError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

@app.get("/time-to-sign-off")
async def get_time_to_sign_off(
    db: sqlite3.Connection = Depends(get_db_connection),
    clinic: Optional[str] = Query(None),
    provider: Optional[str] = Query(None)
):
    try:
        query = """
        SELECT CAST(strftime('%H', encounterSignOffTimeFirst) AS INTEGER) AS hourOfDay, 
               COUNT(*) AS numEncounters 
        FROM encounters
        WHERE 1=1
        """
        
        if clinic:
            query += f" AND clinicName = '{clinic}'"
        if provider:
            query += f" AND providerFullName = '{provider}'"
        
        query += " GROUP BY hourOfDay"
        
        df = pd.read_sql_query(query, db)
        return df.to_dict(orient="records")
    except sqlite3.DatabaseError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")