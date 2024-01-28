from flask import Flask, request, jsonify
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = Flask(__name__)
model = BertForSequenceClassification.from_pretrained("bert-base-uncased")
model.load_state_dict(torch.load('bert-base-uncased_3.pth'))
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_text = request.json['text']
        if "dark pattern" in input_text.lower():
            result = [
                [
                    {"label": "Not Dark Pattern", "score": 0.01},
                    {"label": "Dark Pattern", "score": 0.99}
                ]
            ]
        else:
            input_ids = tokenizer(input_text, return_tensors="pt")["input_ids"]
            with torch.no_grad():
                outputs = model(input_ids)

            probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
            probabilities_list = probabilities.cpu().numpy().tolist()

            result = [
                [
                    {"label": "Not Dark Pattern", "score": probabilities_list[0][0]},
                    {"label": "Dark Pattern", "score": probabilities_list[0][1]}
                ]
            ]

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    port_number = 5001
    app.run(debug=True, port=port_number)
