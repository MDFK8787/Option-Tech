window.setInterval(ontime_tbar(),1000)
window.setInterval(realtime_dapan(),1000)

function ontime_tbar(){
    var url_call = 'json/Yahoo - Realtime.json';
    method: 'POST',
        fetch(url_call)
            .then(function (resp){
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

                        cell2.setAttribute("id", "bt_code_" + i.toString());
                        cell2.setAttribute("class",'strike_style');


                        cell0.innerHTML = cell0.innerHTML + "<button id='bt_call_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style' onclick='show_detail(bt_call_buy_price_" + i.toString() + ")'>" + '-' + "</button>";
                        cell1.innerHTML = cell1.innerHTML + "<button id='bt_call_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style' onclick='show_detail(bt_call_sell_price_" + i.toString() + ")'>" + '-' + "</button>";
                        cell2.innerHTML = cell2.innerHTML + "<font>" + 'strike' + "</font>";
                        cell3.innerHTML = cell3.innerHTML + "<button id='bt_put_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style' onclick='show_detail(bt_put_sell_price_" + i.toString() + ")'>" + '-' + "</button>";
                        cell4.innerHTML = cell4.innerHTML + "<button id='bt_put_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn_style' onclick='show_detail(bt_put_buy_price_" + i.toString() + ")'>" + '-' + "</button>";
                    }
                    for (i=0;i<data_lengh;i++){
                        console.log('1')
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

function realtime_dapan(){
    var url_call = 'json/Yahoo - Dapan.json';
    method: 'POST',
        fetch(url_call)
            .then(function (resp){
                return resp.json();
            })
            .then(function(data){
                var strike_data = data
                var dapan_targrt = document.getElementById("dapan-word-id");
                dapan_targrt.innerHTML = strike_data[0]['0']
            })
}