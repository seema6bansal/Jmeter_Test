/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8177215189873418, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-9"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-8"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-3"], "isController": false}, {"data": [0.9, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-2"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-7"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-6"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-5"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-4"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-9"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-8"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-5"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-19"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-4"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-7"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-6"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-15"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-16"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-17"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-18"], "isController": false}, {"data": [0.55, 500, 1500, "http:\/\/192.168.99.100:5000\/-11"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-11"], "isController": false}, {"data": [0.9, 500, 1500, "http:\/\/192.168.99.100:5000\/-10"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-12"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-13"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-14"], "isController": false}, {"data": [0.5, 500, 1500, "http:\/\/192.168.99.100:5000\/-15"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-14"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-13"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-12"], "isController": false}, {"data": [0.5, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id="], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-19"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-18"], "isController": false}, {"data": [0.5, 500, 1500, "http:\/\/192.168.99.100:5000\/-17"], "isController": false}, {"data": [0.6, 500, 1500, "http:\/\/192.168.99.100:5000\/-16"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": true}, {"data": [0.9, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/"], "isController": false}, {"data": [0.85, 500, 1500, "http:\/\/192.168.99.100:5000\/Home"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount"], "isController": false}, {"data": [0.5, 500, 1500, "Logout"], "isController": true}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5"], "isController": false}, {"data": [0.9, 500, 1500, "http:\/\/192.168.99.100:5000\/-4"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-3"], "isController": false}, {"data": [0.5, 500, 1500, "http:\/\/192.168.99.100:5000\/-6"], "isController": false}, {"data": [0.5, 500, 1500, "http:\/\/192.168.99.100:5000\/-5"], "isController": false}, {"data": [0.9875, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-10"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-0"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-2"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-1"], "isController": false}, {"data": [0.95, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-3"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-2"], "isController": false}, {"data": [0.5, 500, 1500, "http:\/\/192.168.99.100:5000\/-8"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-7"], "isController": false}, {"data": [0.6, 500, 1500, "http:\/\/192.168.99.100:5000\/-9"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-14"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-13"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-12"], "isController": false}, {"data": [0.0, 500, 1500, "HomePage"], "isController": true}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-11"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-10"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-19"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-18"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-17"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-16"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-15"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 760, 0, 0.0, 612.2473684210522, 1, 7664, 1340.8, 4022.85, 7247.95, 12.848472553295803, 3467.952550728221, 10.169781311812141], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["http:\/\/192.168.99.100:5000\/Home-9", 10, 0, 0.0, 20.6, 5, 43, 42.0, 43.0, 43.0, 0.27342575123725155, 0.057141709731222484, 0.1303044595740027], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-8", 10, 0, 0.0, 21.300000000000004, 7, 42, 41.1, 42.0, 42.0, 0.27341827527751955, 0.05714014737245038, 0.12335863591622465], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-3", 10, 0, 0.0, 13.5, 2, 34, 33.2, 34.0, 34.0, 0.2732763096767141, 0.053374279233733224, 0.12329458502992374], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-2", 10, 0, 0.0, 442.6, 376, 592, 591.8, 592.0, 592.0, 0.2706286704013423, 1.0233146599550755, 0.12051432978809774], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-1", 10, 0, 0.0, 400.6, 366, 470, 464.5, 470.0, 470.0, 0.27065064414853307, 1.216342055050341, 0.1168238131969254], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-0", 10, 0, 0.0, 25.8, 6, 45, 43.900000000000006, 45.0, 45.0, 0.27328377787494534, 0.5393618311379537, 0.09767760029514648], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-7", 10, 0, 0.0, 22.5, 7, 47, 46.1, 47.0, 47.0, 0.27341079972658916, 0.05713858509911141, 0.12282125768967873], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-6", 10, 0, 0.0, 15.899999999999999, 11, 27, 26.700000000000003, 27.0, 27.0, 0.2733734281027884, 0.05713077501366867, 0.123872334609076], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-5", 10, 0, 0.0, 16.7, 12, 27, 26.8, 27.0, 27.0, 0.2733435381587579, 0.0533874097966324, 0.12359185367920401], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-4", 10, 0, 0.0, 13.0, 6, 18, 17.8, 18.0, 18.0, 0.27348557363599074, 0.053415151100779434, 0.1236560747983044], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-9", 10, 0, 0.0, 24.0, 7, 68, 65.60000000000001, 68.0, 68.0, 0.33395671920919046, 0.06979173624098317, 0.15915124899812985], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", 10, 0, 0.0, 122.5, 101, 156, 155.3, 156.0, 156.0, 0.3313233052812935, 0.1970467704260818, 0.19737032834139553], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-8", 10, 0, 0.0, 22.0, 6, 43, 42.300000000000004, 43.0, 43.0, 0.3339009649737888, 0.06978008447694413, 0.1506467244315336], "isController": false}, {"data": ["http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", 10, 0, 0.0, 4042.4999999999995, 3469, 4181, 4180.9, 4181.0, 4181.0, 2.0959966464053656, 1.0050140169775728, 0.8514986376021798], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-5", 10, 0, 0.0, 24.4, 8, 46, 45.7, 46.0, 46.0, 0.3339009649737888, 0.06521503222144312, 0.15097279959264082], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-19", 10, 0, 0.0, 4.3, 1, 14, 13.200000000000003, 14.0, 14.0, 0.2734556591648664, 0.05714796002078262, 0.12764824714922474], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-4", 10, 0, 0.0, 20.8, 8, 36, 35.5, 36.0, 36.0, 0.333889816360601, 0.06521285475792989, 0.1509677587646077], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-7", 10, 0, 0.0, 27.099999999999998, 11, 53, 52.2, 53.0, 53.0, 0.33384522935167255, 0.06976843660279095, 0.14996953662282167], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-6", 10, 0, 0.0, 23.2, 7, 50, 49.300000000000004, 50.0, 50.0, 0.3339121143315079, 0.06978241451849873, 0.15130392680646454], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-15", 10, 0, 0.0, 10.999999999999998, 2, 24, 23.8, 24.0, 24.0, 0.27346313716910964, 0.053410768978341724, 0.13112343784182892], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-16", 10, 0, 0.0, 13.500000000000002, 4, 29, 28.5, 29.0, 29.0, 0.2734706155823557, 0.05341222960592884, 0.1297917179424071], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-17", 10, 0, 0.0, 8.999999999999998, 2, 24, 23.000000000000004, 24.0, 24.0, 0.27344070438325446, 0.05340638757485439, 0.13031158568264473], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-18", 10, 0, 0.0, 6.4, 3, 23, 21.400000000000006, 23.0, 23.0, 0.27344818156959255, 0.05340784796281105, 0.13031514902925895], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-11", 10, 0, 0.0, 632.9000000000001, 497, 800, 786.2, 800.0, 800.0, 10.515247108307046, 753.8015082807572, 4.10751840168244], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-11", 10, 0, 0.0, 10.0, 4, 23, 22.300000000000004, 23.0, 23.0, 0.2734706155823557, 0.057151085678343864, 0.1292575956463478], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-10", 10, 0, 0.0, 393.3, 147, 602, 601.8, 602.0, 602.0, 10.256410256410257, 21.444310897435898, 3.956330128205128], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-12", 10, 0, 0.0, 11.199999999999998, 5, 25, 24.700000000000003, 25.0, 25.0, 0.2734706155823557, 0.057151085678343864, 0.1297917179424071], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-13", 10, 0, 0.0, 11.3, 5, 30, 28.800000000000004, 30.0, 30.0, 0.27341827527751955, 0.05340200689014054, 0.1289658466396894], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-14", 10, 0, 0.0, 11.799999999999999, 4, 19, 19.0, 19.0, 19.0, 0.2734332276058186, 0.05340492726676145, 0.12923992398556272], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-15", 10, 0, 0.0, 556.8, 516, 628, 622.8000000000001, 628.0, 628.0, 15.79778830963665, 90.42073953396525, 6.279003751974724], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-14", 10, 0, 0.0, 259.59999999999997, 186, 334, 331.8, 334.0, 334.0, 25.64102564102564, 40.53986378205128, 10.01602564102564], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-13", 10, 0, 0.0, 314.2, 277, 359, 356.5, 359.0, 359.0, 23.86634844868735, 47.47632010739857, 9.299485381861576], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", 10, 0, 0.0, 120.9, 100, 184, 179.10000000000002, 184.0, 184.0, 0.3317409766454352, 0.08131541517383227, 0.1972951706807325], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-12", 10, 0, 0.0, 302.0, 255, 364, 360.6, 364.0, 364.0, 23.696682464454973, 101.98367150473933, 9.302799170616113], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", 10, 0, 0.0, 1115.8, 1018, 1236, 1233.0, 1236.0, 1236.0, 0.321285140562249, 0.5073418674698795, 0.1857429718875502], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-19", 10, 0, 0.0, 2126.6000000000004, 1579, 2516, 2492.4, 2516.0, 2516.0, 3.847633705271258, 12669.190674297806, 1.4804371873797613], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-18", 10, 0, 0.0, 325.2, 134, 471, 465.1, 471.0, 471.0, 13.642564802182811, 389.46591490450203, 5.382418144611187], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-17", 10, 0, 0.0, 690.3000000000001, 667, 762, 758.8, 762.0, 762.0, 12.422360248447204, 553.4379852484471, 4.901009316770186], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-16", 10, 0, 0.0, 459.2, 154, 573, 572.8, 573.0, 573.0, 15.948963317384369, 90.81875498405104, 6.261214114832536], "isController": false}, {"data": ["Login", 10, 0, 0.0, 6917.7, 6240, 7328, 7305.3, 7328.0, 7328.0, 1.3073604392731075, 5941.7489214276375, 20.16067255523598], "isController": true}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile", 10, 0, 0.0, 447.20000000000005, 395, 593, 584.6, 593.0, 593.0, 0.329261466530572, 1495.0158688592737, 2.9929352836587535], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/", 10, 0, 0.0, 7321.799999999999, 6501, 7664, 7654.5, 7664.0, 7664.0, 1.3048016701461378, 7437.485473887657, 10.525060347077245], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home", 10, 0, 0.0, 476.7, 411, 629, 626.2, 629.0, 629.0, 0.27031410498999836, 3.697548504487214, 2.4742715879602097], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", 10, 0, 0.0, 234.39999999999998, 196, 278, 277.3, 278.0, 278.0, 0.33061130029424407, 0.06876973336198632, 0.19468614655998942], "isController": false}, {"data": ["Logout", 10, 0, 0.0, 581.1, 514, 724, 721.6, 724.0, 724.0, 0.3285690816494168, 4.559216876129456, 3.2054737555446033], "isController": true}, {"data": ["http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", 10, 0, 0.0, 101.2, 80, 124, 122.60000000000001, 124.0, 124.0, 0.33197224712014073, 0.06192060468744813, 0.1880311555953922], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", 10, 0, 0.0, 223.10000000000002, 195, 256, 256.0, 256.0, 256.0, 0.3311039004039467, 0.06887219803324282, 0.2001497210449639], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-4", 10, 0, 0.0, 437.59999999999997, 127, 761, 760.6, 761.0, 761.0, 7.352941176470588, 127.26189108455881, 2.721449908088235], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-3", 10, 0, 0.0, 6633.8, 5982, 6904, 6897.2, 6904.0, 6904.0, 1.4484356894553883, 1123.2038831655561, 1.1273469184530707], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-6", 10, 0, 0.0, 1168.1, 775, 1348, 1347.7, 1348.0, 1348.0, 7.363770250368188, 2002.8879786450661, 2.7326491163475697], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-5", 10, 0, 0.0, 1132.0, 762, 1357, 1356.7, 1357.0, 1357.0, 7.309941520467836, 2945.1140465095027, 2.7055349963450293], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", 40, 0, 0.0, 153.3, 81, 821, 212.5, 278.44999999999993, 821.0, 0.768787238131847, 0.15165529502210262, 0.46322434172592736], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-10", 10, 0, 0.0, 19.5, 2, 48, 46.400000000000006, 48.0, 48.0, 0.27341827527751955, 0.05714014737245038, 0.1278978065018866], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-0", 10, 0, 0.0, 214.4, 15, 449, 447.0, 449.0, 449.0, 10.131712259371835, 19.996279761904763, 3.581718591691996], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-2", 10, 0, 0.0, 3916.2, 3465, 4049, 4048.5, 4049.0, 4049.0, 2.4691358024691357, 9.336419753086421, 0.9789737654320988], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-1", 10, 0, 0.0, 3908.8, 3470, 4048, 4047.1, 4048.0, 4048.0, 2.469745616201531, 11.099384107186959, 0.9454494937021486], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-1", 10, 0, 0.0, 407.3, 347, 560, 551.4000000000001, 560.0, 560.0, 0.33002211148146926, 1.48316577835715, 0.1424509504636811], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-0", 10, 0, 0.0, 21.700000000000003, 10, 31, 30.700000000000003, 31.0, 31.0, 0.3335445782328808, 0.666763429338581, 0.12279912694706648], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-3", 10, 0, 0.0, 13.8, 6, 23, 22.9, 23.0, 23.0, 0.33384522935167255, 0.06520414635774854, 0.15062157808639914], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-2", 10, 0, 0.0, 392.6, 351, 472, 467.20000000000005, 472.0, 472.0, 0.3297826732183491, 1.2469907331068826, 0.14685634666754607], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-8", 10, 0, 0.0, 992.5, 940, 1039, 1038.9, 1039.0, 1039.0, 9.04977375565611, 30.772765837104075, 3.3406391402714934], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-7", 10, 0, 0.0, 3729.4, 3655, 3973, 3950.0, 3973.0, 3973.0, 2.2999080036798527, 1728.37412675368, 0.844497470101196], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-9", 10, 0, 0.0, 819.0, 323, 1021, 1019.6, 1021.0, 1021.0, 9.775171065493646, 82.10570931085044, 3.8566104594330404], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-14", 10, 0, 0.0, 27.1, 4, 195, 177.00000000000006, 195.0, 195.0, 0.33406828355715906, 0.06524771163225764, 0.15789946215006348], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-13", 10, 0, 0.0, 25.1, 3, 196, 178.00000000000006, 196.0, 196.0, 0.3340571237681644, 0.06524553198596961, 0.1575679597461166], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-12", 10, 0, 0.0, 28.900000000000006, 4, 189, 173.20000000000005, 189.0, 189.0, 0.3340348064268297, 0.06980805524935697, 0.1585360507064836], "isController": false}, {"data": ["HomePage", 10, 0, 0.0, 7557.6, 6769, 8485, 8407.300000000001, 8485.0, 8485.0, 1.156737998843262, 6593.7375741035285, 10.027698452862927], "isController": true}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-11", 10, 0, 0.0, 26.1, 4, 189, 172.60000000000005, 189.0, 189.0, 0.3340348064268297, 0.06980805524935697, 0.1578836389751812], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", 10, 0, 0.0, 120.1, 89, 192, 185.60000000000002, 192.0, 192.0, 0.33108197589723215, 0.09247016123692225, 0.19851985664150443], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-10", 10, 0, 0.0, 18.1, 8, 35, 34.5, 35.0, 35.0, 0.33400133600534404, 0.06980106045424181, 0.1562369530728123], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-19", 10, 0, 0.0, 208.7, 175, 273, 270.3, 273.0, 273.0, 0.3315979706204198, 1501.1498418692177, 0.1301781095599695], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-18", 10, 0, 0.0, 10.299999999999999, 4, 36, 34.400000000000006, 36.0, 36.0, 0.33400133600534404, 0.06523463593854376, 0.15917251169004676], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", 10, 0, 0.0, 117.0, 85, 136, 136.0, 136.0, 136.0, 0.3316859597333245, 0.05182593120833195, 0.19629071445155727], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-17", 10, 0, 0.0, 10.000000000000002, 4, 45, 41.90000000000001, 45.0, 45.0, 0.33416875522138684, 0.06526733500417711, 0.15925229741019215], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-16", 10, 0, 0.0, 11.9, 4, 37, 36.0, 37.0, 37.0, 0.33414642296254216, 0.06526297323487153, 0.1585890249607378], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-15", 10, 0, 0.0, 18.9, 4, 56, 54.7, 56.0, 56.0, 0.33351120597652084, 0.06513890741728921, 0.15991601770944502], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 760, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
