
import requests
from bs4 import BeautifulSoup
from os import replace
import re
import pandas as pd
import time


def loop():
  while True:
    response = requests.get(
        "https://tw.screener.finance.yahoo.net/future/aa03?opmr=optionfull&opcm=WTXO&opym=202008/")
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find_all(class_="ext-big-tbl")
    tbody = table[1].tbody
    tr = tbody.find_all("tr")

    array = []

    for i in range(len(tr)):
      if(i>0):
        td = tr[i].find_all("td")
        a = td[0].text.replace(" ","")
        b = td[1].text.replace(" ","")
        c = td[7].text.replace(" ","")
        d = td[8].text.replace(" ","")
        e = td[9].text.replace(" ","")
        aa = a[0:4]
        bb = b[0:4]
        dd = d[0:4]
        ee = e[0:4]
        tem = array.append([aa,bb,c,dd,ee])

    df = pd.DataFrame(array)
    df.to_json(path_or_buf =r'D:\Option Tech\json\Yahoo - Realtime.json',orient = 'records')
    print(df)
    time.sleep(5)

if __name__ == "__main__":
  loop()