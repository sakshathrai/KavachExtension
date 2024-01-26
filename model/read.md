# Model Download and Installation

## Use this to download the model:

After downloading this repository, follow the steps below to set up and use the model.

1. Download the model from the provided Google Drive link: [Model Download](https://drive.google.com/drive/folders/1pytU1CD_CnNY_jg_kh8xQWaQRxV0FVjv?usp=sharing)

## Dependencies Installation

Make sure you have the following dependencies installed before running the code:

- Install PyTorch:
  ```bash
  pip install torch
  ```

- Install Transformers library:
  ```bash
  pip install transformers
  ```

- Install Flask:
  ```bash
  pip install flask
  ```

## Running the Code

Once you have downloaded the model and installed the dependencies, follow these steps to run the code:

1. Open the `ser.py` file.

2. Run the code in your preferred Python environment.

3. After successfully running the code, you can check the API using a tool like Postman or any API tester.

4. Make a POST request with the following JSON body:
   ```json
   {"text": "limited stocks"}
   ```

5. Review the response from the API to see the model's output.