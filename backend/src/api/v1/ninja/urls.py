from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI
from src.api.v1.ninja.establishment.handlers import EstablishmentController

api = NinjaExtraAPI()

api.register_controllers(
    NinjaJWTDefaultController,
    EstablishmentController,
)
