from flask import Flask, render_template, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/execute', methods=['POST'])
def execute():
    data = request.get_json()
    code = data.get("code", "")

    try:
        result = subprocess.run(
            ["python3", "-c", code], capture_output=True, text=True, timeout=5
        )
        output = result.stdout if result.stdout else result.stderr
    except Exception as e:
        output = str(e)

    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, ssl_context=('zprivate/server.crt', 'zprivate/server.key'))