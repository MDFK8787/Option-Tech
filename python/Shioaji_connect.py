from re import S
import shioaji as sj
from shioaji.data import Ticks
import pandas as pd
import time
import math

api = sj.Shioaji()
api.login(
    person_id="A230861176", 
    passwd="Lan900119", 
    contracts_cb=lambda security_type: print(f"{repr(security_type)} fetch done.")
)

'''
#所有合約名稱
txo = api.Contracts.Options.TXO
contract = []
for t in txo:
    contract.append(t.code)
print(contract)'''

def subscribe_daliy_index():
    api.quote.subscribe(api.Contracts.Indexs.TSE.TSE001, quote_type='tick')
    loop = 1
    while(loop):
        @api.quote.on_quote
        def quote_callback(topic:str, quote:dict):
            print(f"Topic:{topic}, Quote:{quote}")

            array1 = quote
            tse_close = array1['Close']
            trans = math.trunc((tse_close/100))
            tse_close = trans*100

            ontime_csv = []#清除暫存值
            price_range = -1500#取價平上下各15
            txo_index = 0

            while price_range < 1500:
                temp_array = []
                contracts = [api.Contracts.Options['TXO'+str(tse_close+(price_range))+'D2'],api.Contracts.Options['TXO'+str(tse_close+(price_range))+'P2']]
                snapshots = api.snapshots(contracts)
                #print(snapshots)
                chang_Call_snapshot = snapshots[0]
                chang_Put_snapshot = snapshots[1]
                temp_array.append(chang_Call_snapshot.code)
                temp_array.append(chang_Call_snapshot.buy_price)
                temp_array.append(chang_Call_snapshot.sell_price)
                temp_array.append(chang_Put_snapshot.code)
                temp_array.append(chang_Put_snapshot.buy_price)
                temp_array.append(chang_Put_snapshot.sell_price)
                ontime_csv.append(temp_array)
                print(ontime_csv)
                price_range += 100
                txo_index += 1
            print(ontime_csv)
            df = pd.DataFrame(ontime_csv,columns=['Call_Code','Call_Buy_price','Call_Sell_price','Put_Code','Put_Buy_price','Put_Sell_price'])
            df.to_json(path_or_buf =r'C:\Users\User\Desktop\ontime tbar\json\ontime_data.json',orient = 'records')
            print(df)

    
    
subscribe_daliy_index()
'''
#所有報價
for i in contract:

    ticks = api.ticks(
        contract = api.Contracts.Options[i],
        date="2022-03-30", 
        query_type=sj.constant.TicksQueryType.RangeTime,
        time_start="09:00:00",
        time_end="13:30:00",
        last_cnt= 5
    )
    
    df = pd.DataFrame({**ticks})
    df.ts = pd.to_datetime(df.ts)
    df['contract'] = i
    print(df)

contract = []
for t in txo:
    contract.append(t.code)
    #print(t.code)    
#print(api.Contracts.Options['TXO19600M2'])
#所有報價
for i in contract:

    ticks = api.ticks(
        contract = api.Contracts.Options[i],
        date="2020-11-23", 
        query_type=sj.constant.TicksQueryType.RangeTime,
        time_start="09:00:00",
        time_end="13:30:00",
        last_cnt= 5
    )
    #print(ticks)
    df = pd.DataFrame({**ticks})
    df.ts = pd.to_datetime(df.ts)
    df['contract'] = i
    print(df)'''
    #df.to_excel(R"C:\Users\User\Desktop\1.xlsx")