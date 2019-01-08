#!/usr/bin/python
import RPi.GPIO as GPIO
import time
import sys

SleepTimeL = 1
pin = int(sys.argv[1])
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin, GPIO.OUT) 
GPIO.output(pin, GPIO.HIGH)

try:
  GPIO.output(pin, GPIO.LOW)
  time.sleep(SleepTimeL)
  GPIO.cleanup()

except KeyboardInterrupt:
  GPIO.cleanup()
