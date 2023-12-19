from flask import Flask, jsonify
import sys

sys.path.append('/Users/seij/opt/anaconda3/envs/bluesky_2023_3/lib/python3.11/site-packages')

app = Flask(__name__)



import quick_hello
import bluesky
import databroker
from bluesky.callbacks.best_effort import BestEffortCallback

cat = databroker.temp().v2
RE = bluesky.RunEngine()
RE.subscribe(cat.v1.insert)
RE.subscribe(BestEffortCallback())

test_function = quick_hello.blueskyHello()

RE(test_function())

run = cat[-1]
metadata=run.metadata
data=run.primary.read()



@app.route("/")
def hello_world():
    variable = "test"
    return f'Variable = {variable}'


@app.route("/data")
def data():
    try:
      response = jsonify(metadata)
      response.headers.add('Access-Control-Allow-Origin', '*')
      code = 200
    except:
      response = ''
      code = 500
    return response, code

