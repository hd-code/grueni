import Adafruit_ADS1x15
import Adafruit_DHT
import smbus
import time

# ------------------------------------------------------------------------------

adc = Adafruit_ADS1x15.ADS1115()
bus = smbus.SMBus(1)

DEVICE                   = 0x23 # Default device I2C address
ONE_TIME_HIGH_RES_MODE_1 = 0x20 # Start measurement at 1lx resolution. Time typically 120ms

# ------------------------------------------------------------------------------

def readLight():
    data = bus.read_i2c_block_data(DEVICE, ONE_TIME_HIGH_RES_MODE_1)
    result = (data[1] + (256 * data[0])) / 1.2
    return result

def readSoilHumidity():
    data = adc.read_adc(0, 2)
    result = ((data - 18600) / 100) / 1.48
    return 100 - result # sensor returns the drought level

def readAirHumidityAndTemperature():
    airHumidity, temperature = Adafruit_DHT.read_retry(22, 4) # DHT 22, GPIO 4
    return (airHumidity, temperature)

# ------------------------------------------------------------------------------

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
                'size': 0,
            },
        ]
    }