from flask import Flask
import sys

app = Flask(__name__)

sys.path.append('/Users/seij/opt/anaconda3/envs/bluesky_2023_3/lib/python3.11/site-packages')
import bluesky
import databroker

from bluesky.callbacks.best_effort import BestEffortCallback
cat = databroker.temp().v2
RE = bluesky.RunEngine()
RE.subscribe(cat.v1.insert)
RE.subscribe(BestEffortCallback())

import quick_hello
test_function = quick_hello.blueskyHello()

RE(test_function())

run = cat[-1]
metadata=run.metadata
data=run.primary.read()
print(run)
print(run.primary)
print(data)


@app.route("/")
def hello_world():
    variable = "potatoe"
    return f'Variable = {variable}'

@app.route("/data")
def show_data():
    global run
    run
    return f'Run = {str(run)}'


if __name__ == "__main__":
    app.run(debug=True)