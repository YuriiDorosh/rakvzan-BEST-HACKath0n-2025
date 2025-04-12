import os
import threading
import uuid
from datetime import datetime, timedelta
from typing import Union

import qrcode


def generate_qr_code_file(data: str) -> Union[str, datetime]:
    exp_time = 600
    temp_dir = "/tmp/qr_codes"
    os.makedirs(temp_dir, exist_ok=True)

    filename = f"{uuid.uuid4().hex}.png"
    file_path = os.path.join(temp_dir, filename)

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(file_path)

    def remove_file():
        if os.path.exists(file_path):
            os.remove(file_path)

    threading.Timer(exp_time, remove_file).start()

    expiration_time = datetime.now() + timedelta(seconds=exp_time)
    return filename, expiration_time
