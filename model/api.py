from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from transformers import BertForSequenceClassification, BertTokenizerFast
import torch
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]  # Adjust this based on your CORS requirements
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    test: list
    category: list

model_path = "Kavach_Beta1Model"
model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizerFast.from_pretrained(model_path)

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model.to(device)

def get_model():
    return model

def get_tokenizer():
    return tokenizer

def get_device():
    return device

@app.post('/predict')
async def predict(data: PredictionInput, model: BertForSequenceClassification = Depends(get_model),
                  tokenizer: BertTokenizerFast = Depends(get_tokenizer),
                  device: torch.device = Depends(get_device)):
    try:
        if not data.test or not data.category:
            raise HTTPException(status_code=400, detail="Input must contain 'test' and 'category' keys.")
        
        if any(category not in range(8) for category in data.category):
            raise HTTPException(status_code=400, detail="Invalid category number. Please provide numbers in the range 0 to 7.")

        texts = [item['text'] for item in data.test]
        encodings = tokenizer(texts, truncation=True, padding=True, return_tensors="pt")
        inputs = {key: val.to(device) for key, val in encodings.items()}

        outputs = model(**inputs)

        probs = torch.nn.functional.softmax(outputs.logits, dim=1)
        pred_labels = probs.argmax(dim=1)

        filtered_predictions = []
        for idx, (item, pred) in enumerate(zip(data.test, pred_labels.tolist())):
            if pred in data.category:
                score = round(float(probs[idx, pred].item()), 4)
                filtered_predictions.append({'_id': item['_id'],
                                             'label': int(pred),
                                             'score': score
                                             })

        if not filtered_predictions:
            raise HTTPException(status_code=400, detail="No items found for the specified categories.")

        return filtered_predictions

    except HTTPException as he:
        raise he

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))