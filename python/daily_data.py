import pandas as pd
import requests as req
from datetime import datetime,timedelta
import json
import random
import time

date = '2022-07-28'
date_p = datetime.strptime(date,'%Y-%m-%d')
end_date = '2022-08-10'
end_date_p = datetime.strptime(end_date,'%Y-%m-%d')
tick = []
m = []
hour = []
day = []
c = 0

while date_p <= end_date_p:
  r = random.uniform(0, 1)
  time.sleep(r)
  c += 1
  if c == 5:
    time.sleep(5)
    c = 0
    print('A week is done')
  else:
    try:
      date_f = datetime.strftime(date_p,'%Y-%m-%d')   
      d = date_f.replace('-','')
      url=f'https://www.twse.com.tw/exchangeReport/MI_5MINS_INDEX?date={d}'
      data = req.get(url)
      print(date_f, r, data)
      js = json.loads(data.text)

      # tick data
      df_tick = pd.DataFrame.from_dict(js['data']).loc[:,:1]
      df_tick.columns = ['time','price']
      df_tick['date'] = date_f
      df_tick['datetime'] = df_tick['date'] + ' ' + df_tick['time']
      df_tick['datetime'] = pd.to_datetime(df_tick['datetime'],format='%Y-%m-%d %H:%M:%S')
      df_tick.set_index('datetime',inplace = True)
      df_tick['price'] = df_tick['price'].str.replace(',','').astype(float)
      df_tick = df_tick.reset_index()
      tick.append(df_tick)
      date_p +=timedelta(1)
    except:
      date_p +=timedelta(1)

data_tick = pd.concat(tick)
print(data_tick)
data_tick.to_csv(f'D:/Option Tech/csv/daily_data_1sec.csv')


# tick to ohlc
d = date[:4]

# 1分k
df = pd.read_csv(f'D:/Option Tech/csv/daily_data_1sec.csv')
df_min = df.loc[(df['time']!="09:00:00")]
df_min['datetime'] = pd.to_datetime(df_min['datetime'],format='%Y-%m-%d %H:%M:%S')
df_min.set_index('datetime',inplace = True)
df_min = df_min['price'].resample('1Min').ohlc()
df_min['time'] = df_min.index.time.astype(str)
df_min['date'] =df_min.index.date.astype(str)
df_min = df_min.reset_index()
df_min.columns=['datetime','o','h','l','c','time','date']
df_min.dropna(inplace = True)
print(df_min)
df_min.to_csv(f'D:/Option Tech/csv/daily_data_1min.csv')


# 1小時k
df = pd.read_csv(f'D:\Option Tech\csv/daily_data_1sec.csv')
df_hour = df.loc[(df['time']!="09:00:00")]
df_hour['datetime'] = pd.to_datetime(df_hour['datetime'],format='%Y-%m-%d %H:%M:%S')
df_hour.set_index('datetime',inplace = True)
df_hour = df_hour['price'].resample('1H').ohlc()
df_hour['time'] = df_hour.index.time.astype(str)
df_hour['date'] =df_hour.index.date.astype(str)
df_hour = df_hour.reset_index()
df_hour.columns=['datetime','o','h','l','c','time','date']
df_hour.dropna(inplace = True)
df_hour.to_csv(f'D:/Option Tech/csv/daily_data_1hr.csv')
print(df_hour)
'''
# 日k
df = pd.read_csv(f'daily_data.csv')
df_day = df.loc[(df['time']!="09:00:00")]
df_day['datetime'] = pd.to_datetime(df_day['datetime'],format='%Y-%m-%d %H:%M:%S')
df_day.set_index('datetime',inplace = True)
df_day = df_day['price'].resample('1D').ohlc()
df_day['time'] = df_day.index.time.astype(str)
df_day['date'] =df_day.index.date.astype(str)
df_day = df_day.reset_index()
df_day.columns=['datetime','o','h','l','c','time','date']
df_day.dropna(inplace = True)
df_day.to_csv(f'daily_data.csv')
print(df_day)
'''