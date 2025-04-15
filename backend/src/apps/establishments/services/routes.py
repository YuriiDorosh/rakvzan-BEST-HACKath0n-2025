import math
from random import SystemRandom

secure_random = SystemRandom()


def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371.0
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def calculate_steps(latA, lonA, latB, lonB):
    dist_km = haversine_distance(latA, lonA, latB, lonB)
    raw_steps = dist_km / 5
    steps = int(round(raw_steps))
    steps = max(5, steps)
    steps = min(100, steps)
    return steps


def generate_random_route(latA, lonA, latB, lonB):
    steps = calculate_steps(latA, lonA, latB, lonB)
    route = []
    route.append([latA, lonA])

    delta_lat = (latB - latA) / steps
    delta_lon = (lonB - lonA) / steps

    for _ in range(1, steps):
        prev_lat, prev_lon = route[-1]
        next_lat = prev_lat + delta_lat + secure_random.uniform(-0.005, 0.005)
        next_lon = prev_lon + delta_lon + secure_random.uniform(-0.005, 0.005)
        route.append([round(next_lat, 5), round(next_lon, 5)])

    route.append([latB, lonB])

    return route
