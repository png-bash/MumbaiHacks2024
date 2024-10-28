import sys
import json
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    # Fetch the question passed as a command-line argument
    question = sys.argv[1]
    question1 = f'Act like a women helpline assist and answer the following question "{question}"'
    
    # Configure the Google Gemini API
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    
    # Define generation configuration
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    # Create and configure the model
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )

    # Start a new chat session
    chat_session = model.start_chat(
        history=[]
    )

    # Send the question to the model and get a response
    response = chat_session.send_message(question1)

    # Print response as JSON
    print(json.dumps({
        "status": "success",
        "response": response.text
    }))
except Exception as e:
    # Print error as JSON
    print(json.dumps({
        "status": "error",
        "error": str(e)
    }))
