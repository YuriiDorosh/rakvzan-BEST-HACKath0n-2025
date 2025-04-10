from src.config.settings.main import DEBUG, BASE_DIR
import environ

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

if env('USE_ELASTIC') == 1:
    ELASTIC_APM = {
        'SERVICE_NAME': 'reviews',
        'SERVER_URL': env('APM_URL', default='http://apm-server:8200'),
        'DEBUG': True,
        'CAPTURE_BODY': 'all',
        "ENVIRONMENT": 'prod',
        'USE_ELASTIC_EXCEPTHOOK': True,
        'TRANSACTION_SAMPLE_RATE': 1.0, # all
    }

    ELASTICSEARCH_DSL = {
        'default': {
            'hosts': ['http://elasticsearch:9200'],
        },
    }

    ELASTIC_URL = env('ELASTIC_URL', default='http://elasticsearch:9200')
    ELASTIC_PRODUCT_INDEX = env('ELASTIC_PRODUCT_INDEX', default='product-index')