import sys
import json
from langchain_groq import ChatGroq

try:
    # Fetch the question passed as a command-line argument
    question = sys.argv[1]
    
    # Define your LLM model
    llm = ChatGroq(
        temperature=0,
        groq_api_key="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",
        model_name="llama-3.1-70b-versatile"
    )
    
    # Query the model
    response = llm.invoke(f"Act like a Women helpline and empowerment assistant. Question: {question}")
    
    # Print response as JSON
    print(json.dumps({
        "status": "success",
        "response": response.content
    }))
except Exception as e:
    # Print error as JSON
    print(json.dumps({
        "status": "error",
        "error": str(e)
    }))