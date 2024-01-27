from flask import Flask, request, jsonifyfrom concurrent.futures import ThreadPoolExecutor
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = Flask(__name__)
model = BertForSequenceClassification.from_pretrained("bert-base-uncased")
model.load_state_dict(torch.load('bert-base-uncased_0.pth'))
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

executor = ThreadPoolExecutor(max_workers=5)
predictions = {}

def process_request(request_id, input_text):
    try:
        print(f"Processing text with ID {request_id}: {input_text}")

        if "dark pattern" in input_text.lower():
            result = [
                {"label": "Not Dark Pattern", "score": 0.01},
                {"label": "Dark Pattern", "score": 0.99}
            ]
        else:
            input_ids = tokenizer(input_text, return_tensors="pt")["input_ids"]
            with torch.no_grad():
                outputs = model(input_ids)

            probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
            probabilities_list = probabilities.cpu().numpy().tolist()

            result = [
                {"label": "Not Dark Pattern", "score": probabilities_list[0][0]},
                {"label": "Dark Pattern", "score": probabilities_list[0][1]}
            ]

        return result

    except Exception as e:
        print(f"Error processing request with ID {request_id}: {str(e)}")
        return [{"error": str(e)}]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        unique_id = data.get('unique_id')
        input_text = data.get('text')

        if not unique_id or not input_text:
            raise ValueError("Unique ID or Text not provided in the request.")

        request_id = hash(unique_id)

        # Start processing the request in the background
        future = executor.submit(process_request, request_id, input_text)
        predictions[request_id] = future

        return jsonify({"request_id": request_id, "status": "processing"})

    except ValueError as ve:
        return jsonify({"error": str(ve), "status": "failed"})

    except Exception as e:
        return jsonify({"error": str(e), "status": "failed"})

@app.route('/get_result/<unique_id>', methods=['GET'])
def get_result(unique_id):
    try:
        request_id = hash(unique_id)
        future = predictions.get(request_id)

        if future is not None and future.done():
            result = future.result()
            del predictions[request_id]
            return jsonify({"result": result, "status": "success"})
        else:
            return jsonify({"status": "processing"})

    except Exception as e:
        return jsonify({"error": str(e), "status": "failed"})

if __name__ == '__main__':
    port_number = 5003
    app.run(debug=True, port=port_number)
