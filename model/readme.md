# Predicting Dark Patterns

## Overview

This folder contains an api.py built using FastAPI for predicting dark patterns in text. Dark patterns are deceptive design techniques used in websites and applications to manipulate users into taking actions they may not want to perform and the model is based on machine learning model using BERT for sequence classification.

## Installation

### 1. Open this open on your Code Editor

### 2. Install Dependencies
Make sure you have Python installed. Then, install the required dependencies using the following commands:

```bash
pip install -r requirements.txt
```
### 3. Run the API

1. Open the `api.py` file in your preferred code editor (e.g., Visual Studio Code).

2. Ensure that the necessary configurations in `api.py` match your setup.

3. Make sure that the "Kavach Beta 1 Model" is present in the specified location.

4. Run the following command in your terminal:

    ```bash
    uvicorn api:app --reload
    ```

   This will start the FastAPI server, and you can access the API at [http://127.0.0.1:8000](http://127.0.0.1:8000).




![Alt text](./Api Demo.png)

