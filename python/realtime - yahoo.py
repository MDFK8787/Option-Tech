
import requests
from bs4 import BeautifulSoup
from os import replace
import re
import pandas as pd
import time


def loop():
  while True:
    response2 = requests.get(
        "https://tw.screener.finance.yahoo.net/future/aa01")
    soup2 = BeautifulSoup(response2.text, "html.parser")
    table2 = soup2.find_all(class_="dx up")
    target2 = table2[0].text
    #print(table2[0].text)

    response = requests.get(
        "https://tw.screener.finance.yahoo.net/future/aa03?opmr=optionfull&opcm=WTXO&opym=202008/")
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find_all(class_="ext-big-tbl")

    #大盤
    array2 = []
    tbody2 = table[0].tbody
    tr2 = tbody2.find_all("tr")
    td2 = tr2[0].find_all("td")
    tem2 = td2[1].text.replace(" ","")
    target = tem2[0:8]#target = 大盤
    array2.append(target)
    array2.append(target2)
    df2 = pd.DataFrame(array2)
    df2.to_json(path_or_buf =r'C:\Users\User\Documents\GitHub\Option-Tech\json\Yahoo - Dapan.json',orient = 'records')
    print(df2)
    

    #t字帳
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
        if(aa[-1]=='.'):
          aa = aa[:-1]
        if(bb[-1]=='.'):
          bb = bb[:-1]
        if(dd[-1]=='.'):
          dd = dd[:-1]
        if(ee[-1]=='.'):
          ee = ee[:-1]      
        tem = array.append([aa,bb,c,dd,ee])

    df = pd.DataFrame(array)
    df.to_json(path_or_buf =r'C:\Users\User\Documents\GitHub\Option-Tech\json\Yahoo - Realtime.json',orient = 'records')
    print(df)
    time.sleep(10)
  

if __name__ == "__main__":
  loop()