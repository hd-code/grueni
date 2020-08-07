import math
import random
import time

# ------------------------------------------------------------------------------

def getRandom(max):
    result = math.floor(random.random() * (max + 1))
    return int(result)

# ------------------------------------------------------------------------------

def getData():
    time.sleep(0.2)
    return {
        'timestamp': time.time(),
        'airHumidity': getRandom(100),
        'light': getRandom(1000),
        'temperature': getRandom(40),
        'pots': [
            {
                'soilHumidity': getRandom(100),
                'size': getRandom(10),
            },
        ]
    }