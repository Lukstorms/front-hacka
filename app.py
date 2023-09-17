from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load the Excel file into a pandas DataFrame
df = pd.read_excel('resultados_da_busca COMARCA.xlsx')


@app.route('/')
def index():
    return render_template('index.html', columns=df.columns, data=df.to_dict(orient='records'))


@app.route('/group_by', methods=['POST'])
def group_by():
    column_name = request.form['column_name']
    grouped_data = df.groupby(column_name).size().reset_index(name='count')
    return grouped_data.to_json(orient='records')


if __name__ == '__main__':
    app.run(debug=True)
