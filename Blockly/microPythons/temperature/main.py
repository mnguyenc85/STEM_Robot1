import machine
import time
import dht

# Replace with your sensor's data pin
dht_pin = 14

# Initialize the DHT sensor
sensor = dht.DHT11(machine.Pin(dht_pin))

while True:
    try:
        # Read temperature and humidity
        temperature = sensor.temperature()
        humidity = sensor.humidity()

        # Print the readings
        print(f"Temperature: {temperature}°C")
        print(f"Humidity: {humidity}%")

    except OSError as e:
        print("Failed to read sensor data:", e)

    time.sleep(2) # Read every 2 seconds