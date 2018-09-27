from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask.ext.jsonpify import jsonify


db_connect = create_engine('sqlite:///chinook.db')
app = Flask(__name__)
api  = Api(app)

## generator function based approach
# @app.route("/hello")
# def hello():
    # return "first api"

## class based approach
class hello(Resource):
    def get(self):
        return "Server is running."

class Employees(Resource):
    def get(self):
        conn = db_connect.connect() # connect to database
        query = conn.execute("select * from employees")
        # return {'employees': [i for i in query.cursor.fetchall()]}
        # result = {'data': [dict(zip(tuple (query.keys()), i)) for i in query.cursor.fetchall()]}
        result = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return result

api.add_resource(hello, '/init') # get book list
api.add_resource(Employees, '/employees') # Fetch emp list

if __name__ == '__main__':
    app.run(port='5002')