var dapan_target = document.getElementById("dapan-word-id");
var dapan_close1_target = document.getElementById("dapan-close1-id");
var dapan_strike = 0;//大盤
var dapan_options = null;//靠近大盤的履約價
var xAxis = []

function ontime_tbar(){//t字帳
    var url_call = 'json/Yahoo - Realtime.json';
    method: 'POST',
        fetch(url_call)
            .then(function (resp){
                console.log("got tbar data");
                return resp.json();
            })
            .then(function(data){
                var all_data = data
                var row_lengh = document.getElementById("t_table").rows.length;
                var data_lengh = Object.keys(all_data).length
                if (row_lengh !== data_lengh){
                    //先清除資料
                    for (var i=0;i<row_lengh;i++){ document.getElementById("t_table").deleteRow(0);}
                    //建立表格
                    for (var i=0;i<data_lengh; i++){
                        var newRow = t_table.insertRow(i),
                            cell0 = newRow.insertCell(0),
                            cell1 = newRow.insertCell(1),
                            cell2 = newRow.insertCell(2),
                            cell3 = newRow.insertCell(3),
                            cell4 = newRow.insertCell(4);

                        if(all_data[i]['2'] < dapan_options){
                            cell2.setAttribute("id", "bt_code_" + i.toString());
                            cell2.setAttribute("class",'strike_style');
                            cell0.innerHTML = cell0.innerHTML + "<button id='bt_call_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_inside' onclick='show_detail(bt_call_buy_price_" + i.toString() + ");buyCall(bt_call_buy_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell1.innerHTML = cell1.innerHTML + "<button id='bt_call_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_inside' onclick='show_detail(bt_call_sell_price_" + i.toString() + ");sellCall(bt_call_sell_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell2.innerHTML = cell2.innerHTML + "<font>" + 'strike' + "</font>";
                            cell3.innerHTML = cell3.innerHTML + "<button id='bt_put_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_inside' onclick='show_detail(bt_put_sell_price_" + i.toString() + ");sellPut(bt_put_sell_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell4.innerHTML = cell4.innerHTML + "<button id='bt_put_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_inside' onclick='show_detail(bt_put_buy_price_" + i.toString() + ");buyPut(bt_put_buy_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                        }else if(all_data[i]['2'] == dapan_options){
                            cell2.setAttribute("id", "bt_code_" + i.toString());
                            cell2.setAttribute("class",'strike_style_equal');
                            cell0.innerHTML = cell0.innerHTML + "<button id='bt_call_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_outside' onclick='show_detail(bt_call_buy_price_" + i.toString() + ");buyCall(bt_call_buy_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell1.innerHTML = cell1.innerHTML + "<button id='bt_call_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_outside' onclick='show_detail(bt_call_sell_price_" + i.toString() + ");sellCall(bt_call_sell_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell2.innerHTML = cell2.innerHTML + "<font>" + 'strike' + "</font>";
                            cell3.innerHTML = cell3.innerHTML + "<button id='bt_put_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_outside' onclick='show_detail(bt_put_sell_price_" + i.toString() + ");sellPut(bt_put_sell_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell4.innerHTML = cell4.innerHTML + "<button id='bt_put_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_outside' onclick='show_detail(bt_put_buy_price_" + i.toString() + ");buyPut(bt_put_buy_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                        }else if(all_data[i]['2'] > dapan_options){
                            cell2.setAttribute("id", "bt_code_" + i.toString());
                            cell2.setAttribute("class",'strike_style');
                            cell0.innerHTML = cell0.innerHTML + "<button id='bt_call_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_outside' onclick='show_detail(bt_call_buy_price_" + i.toString() + ");buyCall(bt_call_buy_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell1.innerHTML = cell1.innerHTML + "<button id='bt_call_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_outside' onclick='show_detail(bt_call_sell_price_" + i.toString() + ");sellCall(bt_call_sell_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell2.innerHTML = cell2.innerHTML + "<font>" + 'strike' + "</font>";
                            cell3.innerHTML = cell3.innerHTML + "<button id='bt_put_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_outside' onclick='show_detail(bt_put_sell_price_" + i.toString() + ");sellPut(bt_put_sell_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                            cell4.innerHTML = cell4.innerHTML + "<button id='bt_put_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style_outside' onclick='show_detail(bt_put_buy_price_" + i.toString() + ");buyPut(bt_put_buy_price_" + i.toString() + ","+i+")'>" + '-' + "</button>";
                        }
                    }
                    for (i=0;i<data_lengh;i++){
                        document.getElementById('bt_call_sell_price_' + i.toString()).innerHTML = all_data[i]['0'];
                        document.getElementById('bt_call_buy_price_' + i.toString()).innerHTML = all_data[i]['1'];
                        document.getElementById('bt_code_' + i.toString()).innerHTML = "<font>" + all_data[i]['2'] + "</font>";
                        document.getElementById('bt_put_sell_price_' + i.toString()).innerHTML = all_data[i]['3'];
                        document.getElementById('bt_put_buy_price_' + i.toString()).innerHTML = all_data[i]['4'];
                    }
                } else {
                    for (var i=0;i<data_lengh;i++){
                        document.getElementById('bt_call_sell_price_' + i.toString()).innerHTML = all_data[i]['0'];
                        document.getElementById('bt_call_buy_price_' + i.toString()).innerHTML = all_data[i]['1'];
                        document.getElementById('bt_code_' + i.toString()).innerHTML = "<font>" + all_data[i]['2'] + "</font>";
                        document.getElementById('bt_put_sell_price_' + i.toString()).innerHTML = all_data[i]['3'];
                        document.getElementById('bt_put_buy_price_' + i.toString()).innerHTML = all_data[i]['4'];
                    }
                }
            })
}     

function realtime_dapan(){//大盤即時
    var url_call = 'json/Yahoo - Dapan.json';
    method: 'POST',
        fetch(url_call)
            .then(function (resp){
                console.log("got dapan data")
                return resp.json();
            })
            .then(function(data){
                var strike_data = data
                dapan_strike = strike_data[0]['0']
                dapan_target.innerHTML = strike_data[0]['0']
                dapan_close1_target.innerHTML = strike_data[1]['0']
                caculate_dapan()
            })
    ontime_tbar()
    setTimeout('realtime_dapan()',60000);       
}

function caculate_dapan(){//計算台指現價靠近的履約價
    var a = Math.floor(dapan_strike)
    var aa =100 - (a - (Math.floor((a/100))*100))
    
    if(aa > 75){
        dapan_options = Math.floor((a/100))*100
    }else if(aa < 25){
        dapan_options = Math.floor((a/100))*100 + 100
    }else{
        dapan_options = Math.floor((a/100))*100 + 50
    }
    xAxis_create()
}

function xAxis_create(){//產生圖表正負600點
    xAxis.length = 0;
    for(i=Number(dapan_options)-600;i<Number(dapan_options)+601;i++){
        xAxis.push(i)
    }
    strike = xAxis
    myChart.data.labels = strike;
    myChart.update();
}





function ontime_tbar_ajax(){//ajax取得t字帳
    $.ajax({
        type: "GET",
        url: "json/Yahoo - Realtime.json",
        dataType: "json",
        success: function(data) {
            console.log("success load json (ajax)");
            var all_data = data
            var row_lengh = document.getElementById("t_table").rows.length;
            var data_lengh = Object.keys(all_data).length;
            if (row_lengh !== data_lengh){
                //先清除資料
                for (var i=0;i<row_lengh;i++){
                    document.getElementById("t_table").rows.deleteRow(0);
                }
                for (var i=0;i<data_lengh; i++){
                    var newRow = t_table.insertRow(i),
                        cell0 = newRow.insertCell(0),
                        cell1 = newRow.insertCell(1),
                        cell2 = newRow.insertCell(2),
                        cell3 = newRow.insertCell(3),
                        cell4 = newRow.insertCell(4);

                    cell2.setAttribute("id", "bt_code_" + i.toString());
                    cell2.setAttribute("class",'strike_style');


                    cell0.innerHTML = cell0.innerHTML + "<button id='bt_call_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style' onclick='show_detail(bt_call_buy_price_" + i.toString() + ")'>" + '-' + "</button>";
                    cell1.innerHTML = cell1.innerHTML + "<button id='bt_call_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style' onclick='show_detail(bt_call_sell_price_" + i.toString() + ")'>" + '-' + "</button>";
                    cell2.innerHTML = cell2.innerHTML + "<font>" + 'strike' + "</font>";
                    cell3.innerHTML = cell3.innerHTML + "<button id='bt_put_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style' onclick='show_detail(bt_put_sell_price_" + i.toString() + ")'>" + '-' + "</button>";
                    cell4.innerHTML = cell4.innerHTML + "<button id='bt_put_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style' onclick='show_detail(bt_put_buy_price_" + i.toString() + ")'>" + '-' + "</button>";
                }
                for (i=0;i<data_lengh;i++){
                    document.getElementById('bt_call_sell_price_' + i.toString()).innerHTML = all_data[i]['0'];
                    document.getElementById('bt_call_buy_price_' + i.toString()).innerHTML = all_data[i]['1'];
                    document.getElementById('bt_code_' + i.toString()).innerHTML = "<font>" + all_data[i]['2'] + "</font>";
                    document.getElementById('bt_put_sell_price_' + i.toString()).innerHTML = all_data[i]['3'];
                    document.getElementById('bt_put_buy_price_' + i.toString()).innerHTML = all_data[i]['4'];
                }
            } else {
                document.getElementById("t_table").rows.deleteRow(0);
                for (var i=0;i<data_lengh;i++){
                    document.getElementById('bt_call_sell_price_' + i.toString()).innerHTML = all_data[i]['0'];
                    document.getElementById('bt_call_buy_price_' + i.toString()).innerHTML = all_data[i]['1'];
                    document.getElementById('bt_code_' + i.toString()).innerHTML = "<font>" + all_data[i]['2'] + "</font>";
                    document.getElementById('bt_put_sell_price_' + i.toString()).innerHTML = all_data[i]['3'];
                    document.getElementById('bt_put_buy_price_' + i.toString()).innerHTML = all_data[i]['4'];
                }
            }
            
        }    
    })
    setTimeout('ontime_tbar()',5000);
}