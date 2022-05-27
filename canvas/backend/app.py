from flask import Flask
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
cors = CORS(app)

connect = sqlite3.connect('sqlite/canvas.db')
cursor = connect.cursor()

@app.route('/test')
def my_profile():
    response_body = {
        "name": "myName",
        "data": "test"
    }
    return response_body
