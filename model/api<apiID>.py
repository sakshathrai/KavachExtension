from flask import Flask, request, jsonify
from concurrent.futures import ThreadPoolExecutor
from transformers import BertTokenizer, BertForSequenceClassification 
import torch

app = Flask(__name__)
model = BertForSequenceClassification.from_pretrained("bert-base-uncased")
model.load_state_dict(torch.load('bert-base-uncased_0.pth'))
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

executor = ThreadPoolExecutor(max_workers=5)
predictions = {}

def process_request(request_data):
    try:
        input_text = request_data['text']
        print(f"Processing text: {input_text}")

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
        print(f"Error processing request: {str(e)}")
        return [{"error": str(e)}]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_text = request.json.get('text')
        if not input_text:
            raise ValueError("Text not provided in the request.")

        request_id = hash(input_text)

        if request_id not in predictions:
            future = executor.submit(process_request, {'text': input_text})
            predictions[request_id] = future

        return jsonify({"request_id": request_id})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get_result/<request_id>', methods=['GET'])
def get_result(request_id):
    try:
        future = predictions.get(int(request_id))
        if future is not None and future.done():
            result = future.result()
            del predictions[int(request_id)]  
            return jsonify(result)
        else:
            return jsonify({"status": "processing"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    port_number = 5003
    app.run(debug=True, port=port_number)
