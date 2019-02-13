import os

basedir = os.path.abspath(os.path.dirname(__file__))

class BaseConfig(object):

    DEBUG = False
    SECRET_KEY = 'development key'
    PW_ENC_KEY = 'sekrit'
    UPLOAD_FOLDER = '/tmp/artifacts'
    ALLOWED_EXTENSIONS = set(['txt', 'xml', 'jpg', 'png', 'gif', 'pdf'])
    ALLOWED_MIMETYPES = set(['text/plain', 'application/xml', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf'])
    SESSION_COOKIE_HTTPONLY = False
    PERMANENT_SESSION_LIFETIME = 3600 # 1 hour
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MARKDOWN_EXTENSIONS = [
        'markdown.extensions.tables',
        'markdown.extensions.extra',
        'markdown.extensions.attr_list',
        'markdown.extensions.fenced_code',
    ]

class Development(BaseConfig):

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'pwnedhub.db')

class Test(BaseConfig):

    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

class Production(BaseConfig):

    SECRET_KEY = 'M>\n\xb2\xa9B\xae\x8cL~\x0b\xc4\x19\r/GR6\xca\xd1^o\xa3$'
    SQLALCHEMY_DATABASE_URI = 'mysql://root:adminpass@localhost/pwnedhub'
