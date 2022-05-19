#!/usr/bin/env python3
# who.py

import os
import sys

def main():
  #too_long_string = 'xxxxxxxxxxxxxxxxxxxxxxxx'
  #username_string = os.getenv('USER')
  default_string = 'helloWorld!'
  signText = default_string
  if len(sys.argv) > 1:
    signText = sys.argv[1]
  printManLines(signText)

def getSignText(signText):
  signText_len = len(signText)

  sign_width_str = "--------------"
  sign_len = len(sign_width_str)

  if signText_len > sign_len:
    return f'|{signText}|'

  output = ''
  delim = ' '
  sides = '|'
  offset_sign_len = sign_len - signText_len - 2
  isEven = None
  if offset_sign_len % 2 == 0:
    isEven = True
  else:
    isEven = False
  #
  if isEven:
    left_buffer  = int(offset_sign_len / 2)
    right_buffer = int(left_buffer)
  else:
    left_buffer  = int(round(offset_sign_len / 2))
    right_buffer = int(offset_sign_len - left_buffer)

  right_delim_str = ''
  left_delim_str = ''

  for x in range(0,right_buffer):
    right_delim_str += delim

  for x in range(0,left_buffer):
    left_delim_str += delim

  output = f'{left_delim_str}{signText}{right_delim_str}'
  output = f'{sides}{output}{sides}'
  return output

def getAsciiMan():
  ascii_man = '''
_____________
|            |
|  HELLO?!?  |
|____________|
 ＼（〇_ｏ）／
   ＼_|__／
      |
      |
      |
      |
     / \\
     |  |
     |_ |_
'''
  return ascii_man

def printManLines(signText):
  ascii_man = getAsciiMan()
  ascii_man_lines = ascii_man.split('\n')
  for line in ascii_man_lines:
    #print(line)
    if line == '':
      continue
    elif line.find("HELLO") > 0:
      print(getSignText(signText))
    else:
      print(line)

if __name__ == '__main__':
  main()



