FROM python:latest
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the application code
COPY . .

# Run the seed script
RUN python3 seed.py

# command to start FASTAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]