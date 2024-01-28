import asyncio
from flask import Flask, request, jsonify
from concurrent.futures import ThreadPoolExecutor
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = Flask(__name__)
model = BertForSequenceClassification.from_pretrained("bert-base-uncased")
model.load_state_dict(torch.load('best_bert-base-uncased_3.pth'))
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

executor = ThreadPoolExecutor(max_workers=10)

async def process_request(unique_id, input_text):
    try:
        # print(f"Processing text with ID {unique_id}: {input_text}")

        input_ids = tokenizer(input_text, return_tensors="pt")["input_ids"]
        with torch.no_grad():
            outputs = model(input_ids)

        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
        probabilities_list = probabilities.cpu().numpy().tolist()

        result = [
                {"label": "0", "score": probabilities_list[0][0]},
                {"label": "1", "score": probabilities_list[0][1]}
            ]

        return {"unique_id": unique_id, "result": result, "status": "success"}

    except Exception as e:
        # print(f"Error processing request with ID {unique_id}: {str(e)}")
        return {"unique_id": unique_id, "error": str(e), "status": "failed"}

async def process_all_requests(data):
    loop = asyncio.get_event_loop()
    with executor:
        return await asyncio.gather(*[process_request(item['unique_id'], item['text']) for item in data])

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not isinstance(data, list):
            raise ValueError("Input must be an array of JSON objects.")

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        results = loop.run_until_complete(process_all_requests(data))

        return jsonify({"results": results})

    except ValueError as ve:
        return jsonify({"error": str(ve), "status": "failed"})

    except Exception as e:
        return jsonify({"error": str(e), "status": "failed"})

if __name__ == '__main__':
    port_number = 5011
    app.run(debug=True, port=port_number)
