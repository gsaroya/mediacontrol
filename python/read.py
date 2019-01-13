import sys
from gpiozero import MCP3008
import time

threshold = 0.6
source = sys.argv[1]

def check(pinList):
  for i, p in enumerate(pinList):
    if p.value > threshold:
      return i
  return len(pinList)

if source == "usb":
  pList = [MCP3008(0), MCP3008(1), MCP3008(2)]
else:
  pList = [MCP3008(3), MCP3008(4), MCP3008(5), MCP3008(6)]

time.sleep(1)
print(check(pList))



