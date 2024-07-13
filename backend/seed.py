import pandas as pd
from datetime import datetime
import sqlite3

conn = sqlite3.connect('data.db')
df = pd.read_csv('data.csv')

# Function to ensure consistent datetime format
def ensure_datetime_format(dt_str):
    try:
        # Parse the datetime string
        dt = datetime.strptime(dt_str, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        # Handle single digit hour case
        dt = datetime.strptime(dt_str, '%Y-%m-%d %H:%M:%S')
    return dt.strftime('%Y-%m-%d %H:%M:%S')

# Apply the function to your datetime column
df['encounterSignOffTimeFirst'] = df['encounterSignOffTimeFirst'].apply(ensure_datetime_format)

df.to_sql('encounters', conn, if_exists='replace', index=False)
conn.close()