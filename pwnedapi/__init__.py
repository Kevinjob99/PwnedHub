from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from common import db

cors = CORS(supports_credentials=True)

def create_app(config='Development'):

    # setting the static_url_path to blank serves static files from the web root
    app = Flask(__name__, static_url_path='')
    app.config.from_object('pwnedapi.config.{}'.format(config.title()))

    db.init_app(app)
    cors.init_app(app)

    from pwnedapi.views.api import resources
    app.register_blueprint(resources)

    return app
