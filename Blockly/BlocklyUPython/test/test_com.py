import serial, time

comm = serial.Serial('COM5', baudrate=115200, timeout=1)
time.sleep(2)

comm.write(b'print("Hello from PC!")\r\n')

while True:
    line = comm.readline()
    if line:
        print(line.decode().strip())
    else:
        break

comm.close()