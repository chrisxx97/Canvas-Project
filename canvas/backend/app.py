from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/test')
def my_profile():
    response_body = {
        "name": "myName",
        "data": "test"
    }
    return response_body
