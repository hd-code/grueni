import json
import math
import socket
import random
import time

# ------------------------------------------------------------------------------

UDP_IP = "127.0.0.1"
UDP_PORT = 4200

# ------------------------------------------------------------------------------

def getRandom(max):
    result = math.floor(random.random() * (max + 1))
    return int(result)

def getData():
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

# ------------------------------------------------------------------------------

def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    while True:
        data = getData()
        jsonData = json.dumps(data)
        sock.sendto(jsonData, (UDP_IP, UDP_PORT))
        print jsonData
        time.sleep(1)

if __name__=="__main__":
   main()