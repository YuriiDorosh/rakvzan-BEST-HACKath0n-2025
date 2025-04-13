from ninja_jwt.tokens import RefreshToken


def create_jwt_pair_for_user(user):
    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)
    tokens = {
        "refresh": str(refresh),
        "access": access,
    }
    return tokens
