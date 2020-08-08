import json
import socket
import sys
import threading

# ------------------------------------------------------------------------------

if "mock" in sys.argv:
    from mock import getData
else:
    from sensor import getData

# ------------------------------------------------------------------------------

UDP_ADDR = "HDs-MacBook-Pro.fritz.box"
UDP_PORT = 4200

# ------------------------------------------------------------------------------

def updateAddr():
    global UDP_ADDR
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(('0.0.0.0', UDP_PORT+1))
    while True:
        _, (addr, port) = sock.recvfrom(128)
        print("Recieved address from %s" % addr)
        UDP_ADDR = addr
        print("Sending sensor data to %s from now on" % UDP_ADDR)

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
    print("Start listening for connection introduction")
    thread = threading.Thread(target=updateAddr)
    thread.setDaemon(True)
    thread.start()

    print("Start pumping out sensor data")
    main()