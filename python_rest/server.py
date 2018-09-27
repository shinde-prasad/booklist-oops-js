# This file contains for mongoDB API interactions

# For flask implementation  
from flask import Flask, render_template, request, redirect, url_for 
from flask_cors import CORS
from flask import jsonify
# For ObjectId to work  
from bson import ObjectId
from bson.json_util import dumps
from pymongo import MongoClient
import os
# import json module
import json


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

client = MongoClient("mongodb://127.0.0.1:27017/") #host uri
db = client["booklist"]

@app.route('/api/v1/getAllBooks')
def getAllBooks():
    collection = db['list_of_books'] #Select the collection name
    cursor = collection.find({})
    output = []
    try:
        for s in cursor:
            output.append({"id": str(s["_id"]), 'title' : s['title'], 'author' : s['author'], 'isbn': s['isbn']})
    finally:
        client.close()
        return jsonify({"result": output})


@app.route("/api/v1/addBook", methods=['POST'])
def addBook():
    try:
        collection = db['list_of_books'] #Select the collection name
        data = json.loads(request.data)
        title = data['title']
        author = data['author']
        isbn = data['isbn']

        status = collection.insert_one({
            "title": title,
            "author": author,
            "isbn": isbn
        })
        print("status", status)
    except Exception, e:
        print("status", str(e))
        return dumps({'error' : str(e)})
    finally:
        client.close()
        print("success")
        return dumps({'message' : 'Successfully saved record!'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)