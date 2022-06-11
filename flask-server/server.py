from flask import Flask, make_response, request, jsonify
from flask_cors import CORS, cross_origin


app = Flask("__name__")



# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'


#pull data from the API, format it in a json array.



#API route
@app.route("/")
# @cross_origin()
def members(): #json array
    return {"members": ["1","2","3"]}
if __name__ == "__main__":
    app.run(debug = True)



# #API route
# @app.route("/members")
# def api_create_order():
#     if request.method == "OPTIONS": # CORS preflight
#         return _build_cors_preflight_response()
#     elif request.method == "POST": # The actual request following the preflight
#         order = OrderModel.create(members()) # Whatever.
#         return _corsify_actual_response(jsonify(order.to_dict()))
#     else:
#         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))

# def _build_cors_preflight_response():
#     response = make_response()
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add('Access-Control-Allow-Headers', "*")
#     response.headers.add('Access-Control-Allow-Methods', "*")
#     return response

# def _corsify_actual_response(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response

