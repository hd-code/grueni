import Adafruit_ADS1x15
import Adafruit_DHT
import json
import smbus
import socket
import sys
import time

# ------------------------------------------------------------------------------

adc                      = Adafruit_ADS1x15.ADS1115()
bus                      = smbus.SMBus(1)

DEVICE                   = 0x23 # Default device I2C address
ONE_TIME_HIGH_RES_MODE_1 = 0x20 # Start measurement at 1lx resolution. Time typically 120ms

UDP_IP = "127.0.0.1"
UDP_PORT = 4200

# ------------------------------------------------------------------------------

def readLight():
    data = bus.read_i2c_block_data(DEVICE, ONE_TIME_HIGH_RES_MODE_1)
    result = (data[1] + (256 * data[0])) / 1.2
    return result

def readSoilHumidity():
    data = adc.read_adc(0, 2)
    result = ((data - 18600) / 100) / 1.48
    return result

def readAirHumidityAndTemperature():
    airHumidity, temperature = Adafruit_DHT.read_retry(22, 4) # DHT 22, GPIO 4
    return (airHumidity, temperature)

def getData():
    airHumidity, temperature = readAirHumidityAndTemperature()
    return {
        'timestamp': time.time(),
        'airHumidity': airHumidity,
        'light': readLight(),
        'temperature': temperature,
        'pots': [
            {
                'soilHumidity': readSoilHumidity(),
                'size': 8,
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

if __name__=="__main__":
   main()