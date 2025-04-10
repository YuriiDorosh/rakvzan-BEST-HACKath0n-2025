from rest_framework.response import Response

class ApiResponse(Response):
    def __init__(self, data=None, meta=None, errors=None, status=None, *args, **kwargs):
        response_data = {
            "data": data if data is not None else {},
            "meta": meta if meta is not None else {},
            "errors": errors if errors is not None else [],
        }
        super().__init__(data=response_data, status=status, *args, **kwargs)
