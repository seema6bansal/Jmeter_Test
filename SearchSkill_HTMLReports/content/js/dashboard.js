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

    var data = {"OkPercent": 99.84848484848484, "KoPercent": 0.15151515151515152};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.864963503649635, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-9"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-8"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-3"], "isController": false}, {"data": [0.9, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-2"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-7"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-6"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-5"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-4"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-19"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-15"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-16"], "isController": false}, {"data": [0.925, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-17"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-18"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-11"], "isController": false}, {"data": [0.875, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-12"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-13"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-14"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": true}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14"], "isController": false}, {"data": [0.85, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/"], "isController": false}, {"data": [0.825, 500, 1500, "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA"], "isController": false}, {"data": [0.85, 500, 1500, "http:\/\/192.168.99.100:5000\/Home"], "isController": false}, {"data": [0.6, 500, 1500, "Logout"], "isController": true}, {"data": [0.45, 500, 1500, "http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance"], "isController": false}, {"data": [0.95, 500, 1500, "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-14"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-13"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-12"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-11"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-10"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-19"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-18"], "isController": false}, {"data": [0.95, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-17"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-16"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-15"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-9"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-8"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-5"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-4"], "isController": false}, {"data": [0.975, 500, 1500, "http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-7"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-6"], "isController": false}, {"data": [0.45, 500, 1500, "http:\/\/192.168.99.100:5000\/-11"], "isController": false}, {"data": [0.65, 500, 1500, "http:\/\/192.168.99.100:5000\/-10"], "isController": false}, {"data": [0.9, 500, 1500, "http:\/\/192.168.99.100:5000\/-15"], "isController": false}, {"data": [0.75, 500, 1500, "http:\/\/192.168.99.100:5000\/-14"], "isController": false}, {"data": [0.65, 500, 1500, "http:\/\/192.168.99.100:5000\/-13"], "isController": false}, {"data": [0.7, 500, 1500, "http:\/\/192.168.99.100:5000\/-12"], "isController": false}, {"data": [0.45, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id="], "isController": false}, {"data": [0.15, 500, 1500, "http:\/\/192.168.99.100:5000\/-19"], "isController": false}, {"data": [0.95, 500, 1500, "http:\/\/192.168.99.100:5000\/-18"], "isController": false}, {"data": [0.95, 500, 1500, "http:\/\/192.168.99.100:5000\/-17"], "isController": false}, {"data": [0.9, 500, 1500, "http:\/\/192.168.99.100:5000\/-16"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount"], "isController": false}, {"data": [0.7, 500, 1500, "http:\/\/192.168.99.100:5000\/-4"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-3"], "isController": false}, {"data": [0.5, 500, 1500, "http:\/\/192.168.99.100:5000\/-6"], "isController": false}, {"data": [0.5, 500, 1500, "http:\/\/192.168.99.100:5000\/-5"], "isController": false}, {"data": [0.9083333333333333, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Home-10"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-0"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-2"], "isController": false}, {"data": [0.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-1"], "isController": false}, {"data": [0.95, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-1"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-0"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-3"], "isController": false}, {"data": [0.85, 500, 1500, "http:\/\/192.168.99.100:5000\/Account\/Profile-2"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-8"], "isController": false}, {"data": [0.05, 500, 1500, "http:\/\/192.168.99.100:5000\/-7"], "isController": false}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:5000\/-9"], "isController": false}, {"data": [0.0, 500, 1500, "SearchSkill"], "isController": true}, {"data": [0.0, 500, 1500, "HomePage"], "isController": true}, {"data": [1.0, 500, 1500, "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1320, 2, 0.15151515151515152, 446.95984848484903, 2, 15412, 928.5000000000005, 1893.550000000004, 6651.58, 9.87358815169422, 2038.333420015521, 7.904538952053258], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["http:\/\/192.168.99.100:5000\/Home-9", 10, 0, 0.0, 24.1, 9, 43, 42.7, 43.0, 43.0, 0.28892548611713037, 0.060380912137759674, 0.13769105197769496], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-8", 10, 0, 0.0, 24.3, 9, 46, 45.5, 46.0, 46.0, 0.28892548611713037, 0.060380912137759674, 0.1303550533067522], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-3", 10, 0, 0.0, 18.4, 6, 48, 45.900000000000006, 48.0, 48.0, 0.2887169419101513, 0.05639002771682642, 0.13026096402586904], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-2", 10, 1, 10.0, 1887.6999999999998, 359, 15381, 13891.100000000006, 15381.0, 15381.0, 0.23396738494653846, 0.8846891743290985, 0.10418860110900541], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-1", 10, 0, 0.0, 388.90000000000003, 340, 482, 474.90000000000003, 482.0, 482.0, 0.28589399050831954, 1.284847797186803, 0.1234034607467551], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-0", 10, 0, 0.0, 23.2, 8, 41, 40.1, 41.0, 41.0, 0.2886336084973734, 0.569656760520695, 0.10316396553714714], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-7", 10, 0, 0.0, 33.1, 18, 51, 50.7, 51.0, 51.0, 0.28862527780182984, 0.0603181732906168, 0.12965588651254079], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-6", 10, 0, 0.0, 26.200000000000003, 10, 47, 46.2, 47.0, 47.0, 0.2887169419101513, 0.060337329657004266, 0.1308248643030373], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-5", 10, 0, 0.0, 24.7, 10, 48, 46.800000000000004, 48.0, 48.0, 0.2887169419101513, 0.05639002771682642, 0.13054291416445316], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-4", 10, 0, 0.0, 18.6, 10, 35, 34.7, 35.0, 35.0, 0.28880032345636225, 0.05640631317507076, 0.1305806150002888], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", 10, 0, 0.0, 148.0, 91, 409, 380.9000000000001, 409.0, 409.0, 0.2964895635673624, 0.1763302189575427, 0.17661975954696393], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8", 20, 0, 0.0, 23.35, 8, 44, 37.0, 43.64999999999999, 44.0, 0.3046922608165753, 0.06367592169408896, 0.1374685786106033], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-19", 10, 0, 0.0, 3.6999999999999997, 2, 5, 5.0, 5.0, 5.0, 0.2889588811512122, 0.06038789117808536, 0.13488510272488224], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9", 20, 0, 0.0, 20.75, 5, 45, 36.0, 44.55, 45.0, 0.3046969027559835, 0.06367689178689499, 0.1452071177196484], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6", 20, 0, 0.0, 17.6, 7, 44, 39.60000000000001, 43.8, 44.0, 0.3046969027559835, 0.06367689178689499, 0.138065784061305], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7", 20, 0, 0.0, 24.050000000000004, 6, 48, 39.900000000000006, 47.599999999999994, 48.0, 0.3046876190186012, 0.06367495163084047, 0.13687139135601223], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4", 20, 0, 0.0, 15.349999999999998, 4, 38, 35.800000000000004, 37.9, 38.0, 0.3048222886057429, 0.05953560324330916, 0.1378249215082607], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-15", 10, 0, 0.0, 8.8, 4, 35, 32.400000000000006, 35.0, 35.0, 0.2889087914945252, 0.05642749833877445, 0.13852950842169126], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5", 20, 0, 0.0, 17.099999999999998, 3, 36, 34.7, 35.95, 36.0, 0.3047015448368323, 0.05951202047594381, 0.13777032740180992], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-16", 10, 0, 0.0, 7.7, 3, 29, 27.10000000000001, 29.0, 29.0, 0.28894218266924787, 0.05643402005258748, 0.13713466872778757], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2", 20, 0, 0.0, 441.55, 361, 929, 730.8000000000005, 920.2999999999998, 929.0, 0.30314972564949827, 1.1462849001121653, 0.1349963622032922], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-17", 10, 0, 0.0, 6.2, 3, 11, 11.0, 11.0, 11.0, 0.28894218266924787, 0.05643402005258748, 0.13769900892831344], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3", 20, 0, 0.0, 13.600000000000001, 3, 49, 38.90000000000002, 48.55, 49.0, 0.3046319284724232, 0.05949842352977015, 0.13744135835376906], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-18", 10, 0, 0.0, 4.7, 2, 8, 7.9, 8.0, 8.0, 0.2889338341519792, 0.05643238948280844, 0.13769503033805258], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0", 20, 0, 0.0, 39.79999999999999, 8, 188, 54.60000000000001, 181.3499999999999, 188.0, 0.3038082362412845, 0.6482626915890689, 0.11541152724400358], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-11", 10, 0, 0.0, 8.200000000000001, 4, 16, 15.8, 16.0, 16.0, 0.28891713856465967, 0.06037916762972379, 0.1365584912747024], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1", 20, 0, 0.0, 473.2, 337, 932, 802.8000000000001, 925.6999999999999, 932.0, 0.3031175641472545, 1.3622529591852202, 0.13083785483699853], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-12", 10, 0, 0.0, 7.8, 4, 15, 14.600000000000001, 15.0, 15.0, 0.28895053166897827, 0.06038614626675914, 0.1371386312413315], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-13", 10, 0, 0.0, 9.0, 4, 23, 22.000000000000004, 23.0, 23.0, 0.28895053166897827, 0.05643565071659732, 0.13629209648058255], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-14", 10, 0, 0.0, 10.600000000000001, 4, 35, 32.80000000000001, 35.0, 35.0, 0.2889087914945252, 0.05642749833877445, 0.13655454597983416], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", 10, 0, 0.0, 120.9, 97, 226, 215.50000000000006, 226.0, 226.0, 0.2968944837004928, 0.07277394082892939, 0.17657103571640637], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15", 20, 0, 0.0, 9.949999999999998, 3, 22, 20.900000000000002, 21.95, 22.0, 0.3046644121500168, 0.05950476799805015, 0.1460842054352131], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16", 20, 0, 0.0, 10.25, 3, 37, 19.800000000000004, 36.14999999999999, 37.0, 0.3046783358469296, 0.05950748747010344, 0.14460319455235135], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13", 20, 0, 0.0, 11.75, 3, 27, 25.900000000000002, 26.95, 27.0, 0.3047061870591282, 0.05951292715998598, 0.14372371909136614], "isController": false}, {"data": ["Login", 10, 0, 0.0, 8138.3, 7768, 9121, 9084.4, 9121.0, 9121.0, 1.0857763300760044, 4934.6837676438645, 16.742586183496197], "isController": true}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14", 20, 0, 0.0, 17.850000000000005, 2, 115, 39.60000000000003, 111.29999999999995, 115.0, 0.3046736944732192, 0.059506580951800614, 0.14400592590335748], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile", 10, 0, 0.0, 488.29999999999995, 401, 676, 671.7, 676.0, 676.0, 0.2874141350271606, 1305.007528903084, 2.6125495789382924], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19", 20, 0, 0.0, 86.70000000000002, 2, 262, 202.9000000000001, 259.29999999999995, 262.0, 0.3046922608165753, 507.8249971435101, 0.13092245581962217], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17", 20, 0, 0.0, 18.049999999999997, 2, 158, 35.10000000000002, 151.89999999999992, 158.0, 0.3046922608165753, 0.05951020719073735, 0.14520490554539914], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18", 20, 0, 0.0, 9.249999999999998, 2, 28, 24.400000000000013, 27.849999999999998, 28.0, 0.3046922608165753, 0.05951020719073735, 0.14520490554539914], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11", 20, 0, 0.0, 18.699999999999996, 4, 78, 43.70000000000003, 76.34999999999998, 78.0, 0.30464120881631657, 0.06366525262372241, 0.14399057135458715], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12", 20, 0, 0.0, 11.950000000000001, 3, 43, 33.0, 42.49999999999999, 43.0, 0.3046922608165753, 0.06367592169408896, 0.14460980347349178], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10", 20, 0, 0.0, 20.549999999999997, 4, 90, 36.500000000000014, 87.34999999999997, 90.0, 0.3047015448368323, 0.06367786190925988, 0.14253128903988543], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/", 10, 0, 0.0, 7012.099999999999, 6652, 7332, 7325.6, 7332.0, 7332.0, 1.3557483731019522, 7727.886208226003, 10.93601715021692], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA", 20, 0, 0.0, 528.5500000000001, 396, 1165, 834.6, 1148.6, 1165.0, 0.30205092578608755, 507.539651263328, 2.7603443002990304], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home", 10, 1, 10.0, 1920.1, 384, 15412, 13922.100000000006, 15412.0, 15412.0, 0.2337650194024966, 3.19760412770583, 2.139726100448829], "isController": false}, {"data": ["Logout", 10, 1, 10.0, 2030.6, 494, 15517, 14026.200000000006, 15517.0, 15517.0, 0.24589357725976196, 3.4120135149257402, 2.3989031609619356], "isController": true}, {"data": ["http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings", 20, 0, 0.0, 964.1499999999999, 776, 2039, 1724.400000000002, 2027.4999999999998, 2039.0, 0.3039190359688179, 0.9714130905526768, 0.23031364444511981], "isController": false}, {"data": ["http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", 30, 0, 0.0, 144.2, 78, 816, 203.4, 610.8499999999997, 816.0, 0.33376351742245564, 0.06225471858172756, 0.18904574229006274], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", 30, 0, 0.0, 283.43333333333334, 186, 1004, 551.0000000000006, 808.7499999999998, 1004.0, 0.3333333333333333, 0.0693359375, 0.20149739583333334], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-14", 10, 0, 0.0, 9.699999999999998, 5, 14, 14.0, 14.0, 14.0, 0.29107844564110025, 0.056851258914277406, 0.13758004657255132], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-13", 10, 0, 0.0, 9.799999999999999, 3, 19, 18.8, 19.0, 19.0, 0.29103608847497087, 0.05684298603026775, 0.13727581126309663], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-12", 10, 0, 0.0, 9.5, 3, 20, 19.8, 20.0, 20.0, 0.29107844564110025, 0.06083084703827682, 0.13814855916169408], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-11", 10, 0, 0.0, 9.4, 4, 21, 20.200000000000003, 21.0, 21.0, 0.29107844564110025, 0.06083084703827682, 0.13758004657255132], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-10", 10, 0, 0.0, 20.7, 9, 55, 52.900000000000006, 55.0, 55.0, 0.2909514111143439, 0.06080429880709922, 0.13609934172243238], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-19", 10, 0, 0.0, 210.1, 189, 339, 326.50000000000006, 339.0, 339.0, 0.2883755803558554, 1305.4813213729562, 0.11320994463188858], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-18", 10, 0, 0.0, 5.800000000000001, 3, 11, 10.700000000000001, 11.0, 11.0, 0.29113776639105626, 0.05686284499825318, 0.13874534179573775], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", 10, 0, 0.0, 175.5, 91, 639, 594.4000000000001, 639.0, 639.0, 0.29677113010446343, 0.046370489078822415, 0.1756282273860399], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-17", 10, 0, 0.0, 7.499999999999999, 4, 16, 15.500000000000002, 16.0, 16.0, 0.29109539195994527, 0.05685456874217681, 0.1387251477309114], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-16", 10, 0, 0.0, 7.7, 3, 18, 17.5, 18.0, 18.0, 0.2911123402521033, 0.056857878955488925, 0.13816464586183808], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-15", 10, 0, 0.0, 9.900000000000002, 5, 17, 16.9, 17.0, 17.0, 0.29109539195994527, 0.05685456874217681, 0.13957796626204408], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-9", 10, 0, 0.0, 23.6, 10, 55, 53.00000000000001, 55.0, 55.0, 0.2909429460882721, 0.060802529748916236, 0.13865249774519217], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-8", 10, 0, 0.0, 24.2, 12, 55, 52.80000000000001, 55.0, 55.0, 0.29098527614502706, 0.06081137606937089, 0.13128437263574463], "isController": false}, {"data": ["http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", 10, 0, 0.0, 4905.0, 4513, 5060, 5058.1, 5060.0, 5060.0, 1.8835938971557733, 0.9031685581088716, 0.7633705735543417], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-5", 10, 0, 0.0, 20.3, 9, 33, 33.0, 33.0, 33.0, 0.29090062834535724, 0.05681652897370259, 0.13153026457412148], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-4", 10, 0, 0.0, 19.700000000000003, 9, 36, 35.8, 36.0, 36.0, 0.29101914906000814, 0.05683967755078284, 0.13158385353006227], "isController": false}, {"data": ["http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories", 20, 0, 0.0, 177.85, 114, 911, 177.90000000000003, 874.3999999999995, 911.0, 0.3068755466220674, 1.13849629064183, 0.18310640525984687], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-7", 10, 0, 0.0, 24.0, 12, 61, 57.70000000000001, 61.0, 61.0, 0.2909514111143439, 0.06080429880709922, 0.13070082921152168], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-6", 10, 0, 0.0, 19.3, 11, 33, 32.6, 33.0, 33.0, 0.29090062834535724, 0.06079368600186177, 0.13181434721899], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-11", 10, 0, 0.0, 1266.5, 1080, 1561, 1537.2, 1561.0, 1561.0, 3.8910505836575875, 278.93588886186774, 1.5199416342412453], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-10", 10, 0, 0.0, 818.8999999999999, 106, 1105, 1104.9, 1105.0, 1105.0, 6.5274151436031325, 13.647652170365536, 2.517899396214099], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-15", 10, 0, 0.0, 410.9, 187, 618, 610.2, 618.0, 618.0, 5.534034311012728, 31.674780368013284, 2.199562465412286], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-14", 10, 0, 0.0, 452.0, 145, 761, 745.6, 761.0, 761.0, 4.522840343735866, 7.150857926277703, 1.7667345092718227], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-13", 10, 0, 0.0, 506.2, 120, 817, 811.4, 817.0, 817.0, 4.043671653861707, 8.043905428629195, 1.575610341690255], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-12", 10, 0, 0.0, 541.0, 102, 1099, 1061.1000000000001, 1099.0, 1099.0, 4.821600771456123, 20.750775976374157, 1.8928549903567986], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", 10, 0, 0.0, 1160.7, 1053, 1509, 1480.1000000000001, 1509.0, 1509.0, 0.28812631457631027, 0.45498071354481806, 0.16657302561442935], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-19", 10, 0, 0.0, 1660.6000000000001, 476, 2327, 2297.8, 2327.0, 2327.0, 3.8255547054322876, 12596.49065130069, 1.4719419472073452], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-18", 10, 0, 0.0, 292.0, 119, 557, 534.5000000000001, 557.0, 557.0, 6.613756613756613, 188.80854208002646, 2.609333664021164], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-17", 10, 0, 0.0, 349.6, 117, 870, 827.2000000000002, 870.0, 870.0, 6.531678641410843, 290.9977649412149, 2.5769513389941214], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-16", 10, 0, 0.0, 414.7, 267, 800, 795.9, 800.0, 800.0, 6.112469437652813, 34.806454385696824, 2.3996217909535456], "isController": false}, {"data": ["http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount", 20, 0, 0.0, 150.34999999999997, 110, 262, 217.0000000000001, 260.0, 262.0, 0.3077585941587419, 0.0823494675776321, 0.2359282191548949], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", 30, 0, 0.0, 259.8666666666667, 179, 544, 337.4000000000001, 454.3499999999999, 544.0, 0.3332407664537628, 0.06931668286587059, 0.19623455290197167], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-4", 10, 0, 0.0, 482.9, 182, 685, 684.5, 685.0, 685.0, 7.369196757553427, 127.54323645910095, 2.727466378039794], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-3", 10, 0, 0.0, 6473.1, 6065, 6695, 6690.5, 6695.0, 6695.0, 1.4896469536719799, 1155.1615685051393, 1.1594224824966484], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-6", 10, 0, 0.0, 1073.6, 691, 1385, 1383.3, 1385.0, 1385.0, 7.204610951008645, 1959.597892651297, 2.6735860951008648], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-5", 10, 0, 0.0, 1224.6, 751, 1395, 1394.1, 1395.0, 1395.0, 6.51890482398957, 2626.412004970665, 2.4127587190352022], "isController": false}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", 60, 0, 0.0, 292.04999999999995, 89, 1561, 1000.8, 1085.6, 1561.0, 0.4735932307740881, 0.09342366466441973, 0.2853584212769652], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-10", 10, 0, 0.0, 21.8, 9, 42, 41.8, 42.0, 42.0, 0.28892548611713037, 0.060380912137759674, 0.13515166782236862], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-0", 10, 0, 0.0, 200.00000000000003, 13, 428, 425.0, 428.0, 428.0, 10.449320794148381, 20.623122387669802, 3.693998171368861], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-2", 10, 0, 0.0, 4616.1, 3948, 4792, 4792.0, 4792.0, 4792.0, 2.083767451552407, 7.879245676182538, 0.8261812356740987], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-1", 10, 0, 0.0, 4614.4, 4112, 4798, 4797.4, 4798.0, 4798.0, 2.083767451552407, 9.36474395707439, 0.7976922275474057], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-1", 10, 0, 0.0, 399.8, 350, 550, 536.2, 550.0, 550.0, 0.28811801313818136, 1.2948428676385848, 0.12436343926472283], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-0", 10, 0, 0.0, 33.300000000000004, 10, 68, 66.0, 68.0, 68.0, 0.2908414041822994, 0.581398783555827, 0.10707735290695983], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-3", 10, 0, 0.0, 15.899999999999999, 4, 36, 34.900000000000006, 36.0, 36.0, 0.2910869185538802, 0.05685291378005473, 0.1313302308319264], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Account\/Profile-2", 10, 0, 0.0, 438.9, 354, 600, 598.3, 600.0, 600.0, 0.28812631457631027, 1.089477626991673, 0.12830624945976316], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-8", 10, 0, 0.0, 383.30000000000007, 367, 412, 411.7, 412.0, 412.0, 24.096385542168676, 81.9371234939759, 8.894954819277109], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-7", 10, 0, 0.0, 2937.5, 1172, 3487, 3483.7, 3487.0, 3487.0, 2.433682161109759, 1828.9050141457776, 0.8936176685324897], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/-9", 10, 0, 0.0, 293.19999999999993, 108, 360, 355.20000000000005, 360.0, 360.0, 17.035775127768314, 143.0905291737649, 6.721145655877343], "isController": false}, {"data": ["SearchSkill", 20, 0, 0.0, 2610.3500000000004, 2120, 3784, 3472.0000000000005, 3769.45, 3784.0, 0.32422793223636215, 547.3892052362811, 4.41665569020021], "isController": true}, {"data": ["HomePage", 10, 0, 0.0, 8118.5, 7632, 8729, 8706.3, 8729.0, 8729.0, 1.0991426687183996, 6265.4277124780165, 9.528407685755111], "isController": true}, {"data": ["http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", 10, 0, 0.0, 120.9, 93, 210, 202.60000000000002, 210.0, 210.0, 0.29672710008605085, 0.08287495178184623, 0.1779203510281594], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 15,381 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 50.0, 0.07575757575757576], "isController": false}, {"data": ["The operation lasted too long: It took 15,412 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 50.0, 0.07575757575757576], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1320, 2, "The operation lasted too long: It took 15,381 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, "The operation lasted too long: It took 15,412 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home-2", 10, 1, "The operation lasted too long: It took 15,381 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http:\/\/192.168.99.100:5000\/Home", 10, 1, "The operation lasted too long: It took 15,412 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
