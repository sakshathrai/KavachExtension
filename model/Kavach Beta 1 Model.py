from flask import Flask, request, jsonify
from transformers import BertForSequenceClassification, BertTokenizerFast
import torch

app = Flask(__name__)

model_path = "Kavach Beta 1 Model"
model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizerFast.from_pretrained(model_path)

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model.to(device)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not isinstance(data, dict) or "test" not in data or "category" not in data:
            raise ValueError("Input must be a JSON object with 'test' and 'category' keys.")
        test_data = data.get("test", [])
        category_list = data.get("category", [])

        if not category_list:
            return jsonify({"error": "No categories provided.", "status": "failed"})
        if any(category not in range(8) for category in category_list):
            return jsonify({"error": "Invalid category number. Please provide numbers in the range 0 to 7.", "status": "failed"})

        texts = [item['text'] for item in test_data]
        encodings = tokenizer(texts, truncation=True, padding=True, return_tensors="pt")
        inputs = {key: val.to(device) for key, val in encodings.items()}

        outputs = model(**inputs)

        probs = torch.nn.functional.softmax(outputs.logits, dim=1)
        pred_labels = probs.argmax(dim=1)

        filtered_predictions = [{'unique_id': item['unique_id'],
                                 'predicted_label': int(pred),
                                 'confidence_score': float(prob)
                                } for item, pred, prob in zip(test_data, pred_labels.tolist(), probs[:, 1].tolist()) if pred in category_list]

        if not filtered_predictions:
            return jsonify({"error": "No items found for the specified categories.", "status": "failed"})

        return jsonify(filtered_predictions)

    except ValueError as ve:
        return jsonify({"error": str(ve), "status": "failed"})

    except Exception as e:
        return jsonify({"error": str(e), "status": "failed"})

if __name__ == '__main__':
    app.run(debug=True,port=3042)
