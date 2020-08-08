import json
import os
import socket
import sys
import threading

# ------------------------------------------------------------------------------

# import either mock or real sensor implementation, depending on passed argument
if "mock" in sys.argv:
    from mock import getData
else:
    from sensor import getData

# ------------------------------------------------------------------------------

UDP_ADDR = os.getenv("ADDR", "HDs-MacBook-Pro.fritz.box")
UDP_PORT = os.getenv("PORT", 4200)

# ------------------------------------------------------------------------------

def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    while True:
        data = getData()
        jsonData = json.dumps(data)
        b = str.encode(jsonData)
        sock.sendto(b, (UDP_ADDR, UDP_PORT))
        print("%s:%d => %s" % (UDP_ADDR, UDP_PORT, jsonData))

# ------------------------------------------------------------------------------

if __name__=="__main__":
    print("Start pumping out sensor data")
    main()