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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 34.0, "series": [{"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[300.0, 8.0], [400.0, 1.0], [15300.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[300.0, 8.0], [400.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[0.0, 1.0], [100.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[300.0, 13.0], [700.0, 1.0], [400.0, 4.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[300.0, 11.0], [700.0, 1.0], [400.0, 4.0], [800.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[0.0, 2.0], [100.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13", "isController": false}, {"data": [[8700.0, 1.0], [8300.0, 1.0], [9100.0, 1.0], [7900.0, 4.0], [7700.0, 2.0], [7800.0, 1.0]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14", "isController": false}, {"data": [[600.0, 3.0], [400.0, 7.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[0.0, 10.0], [100.0, 8.0], [200.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10", "isController": false}, {"data": [[6600.0, 2.0], [6900.0, 2.0], [6800.0, 1.0], [7100.0, 1.0], [7000.0, 1.0], [7200.0, 2.0], [7300.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [400.0, 12.0], [800.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA", "isController": false}, {"data": [[300.0, 4.0], [400.0, 4.0], [15400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[600.0, 1.0], [400.0, 3.0], [15500.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[700.0, 4.0], [800.0, 9.0], [900.0, 5.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings", "isController": false}, {"data": [[0.0, 11.0], [800.0, 1.0], [100.0, 16.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [200.0, 24.0], [100.0, 2.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[300.0, 1.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [100.0, 7.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[4500.0, 1.0], [4600.0, 1.0], [4800.0, 1.0], [4900.0, 3.0], [5000.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[100.0, 19.0], [900.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 3.0], [1300.0, 3.0], [1500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[1100.0, 5.0], [100.0, 2.0], [200.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [200.0, 1.0], [400.0, 4.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [700.0, 1.0], [200.0, 1.0], [100.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [400.0, 1.0], [100.0, 2.0], [800.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[300.0, 1.0], [700.0, 5.0], [100.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[1100.0, 5.0], [1200.0, 1.0], [1500.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[2300.0, 1.0], [1500.0, 1.0], [400.0, 1.0], [1600.0, 2.0], [1800.0, 1.0], [1900.0, 1.0], [1000.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[300.0, 3.0], [100.0, 2.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[300.0, 3.0], [800.0, 1.0], [200.0, 4.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0], [800.0, 1.0], [200.0, 4.0], [400.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[100.0, 18.0], [200.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount", "isController": false}, {"data": [[300.0, 3.0], [200.0, 24.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[600.0, 2.0], [400.0, 2.0], [100.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[6100.0, 1.0], [6000.0, 1.0], [6400.0, 4.0], [6600.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[600.0, 1.0], [1300.0, 5.0], [700.0, 2.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[1300.0, 7.0], [700.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[0.0, 12.0], [300.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [100.0, 34.0], [200.0, 1.0], [400.0, 1.0], [900.0, 4.0], [1000.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 4.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[4100.0, 1.0], [4500.0, 1.0], [4700.0, 7.0], [3900.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[4100.0, 2.0], [4600.0, 1.0], [4500.0, 1.0], [4700.0, 6.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[300.0, 7.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[300.0, 6.0], [600.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[300.0, 8.0], [400.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[1100.0, 1.0], [3000.0, 1.0], [1500.0, 1.0], [3100.0, 2.0], [3400.0, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[300.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[2100.0, 3.0], [2300.0, 3.0], [2200.0, 3.0], [2400.0, 2.0], [2500.0, 1.0], [2600.0, 2.0], [2700.0, 2.0], [3000.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "SearchSkill", "isController": true}, {"data": [[8200.0, 1.0], [8300.0, 1.0], [8500.0, 1.0], [8700.0, 1.0], [7600.0, 2.0], [7700.0, 1.0], [8000.0, 2.0], [8100.0, 1.0]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[0.0, 2.0], [100.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 15500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1112.0, "series": [{"data": [[0.0, 1112.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 134.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 72.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.913043478260869, "minX": 1.59460938E12, "maxY": 10.0, "series": [{"data": [[1.5946095E12, 2.913043478260869], [1.59460944E12, 8.105527638190958], [1.59460938E12, 10.0]], "isOverall": false, "label": "Search_Skill_Thread_Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5946095E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 15517.0, "series": [{"data": [[8.0, 43.0], [4.0, 28.0], [2.0, 23.0], [1.0, 19.0], [9.0, 19.0], [10.0, 9.0], [5.0, 14.0], [6.0, 25.0], [3.0, 21.0], [7.0, 40.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[5.5, 24.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9-Aggregated", "isController": false}, {"data": [[8.0, 46.0], [4.0, 28.0], [2.0, 23.0], [1.0, 19.0], [9.0, 18.0], [10.0, 9.0], [5.0, 12.0], [6.0, 25.0], [3.0, 22.0], [7.0, 41.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[5.5, 24.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8-Aggregated", "isController": false}, {"data": [[8.0, 9.0], [4.0, 11.0], [2.0, 23.0], [1.0, 21.0], [9.0, 15.0], [10.0, 48.0], [5.0, 10.0], [6.0, 6.0], [3.0, 14.0], [7.0, 27.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[5.5, 18.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3-Aggregated", "isController": false}, {"data": [[8.0, 397.0], [4.0, 359.0], [2.0, 368.0], [1.0, 15381.0], [9.0, 363.0], [10.0, 398.0], [5.0, 482.0], [6.0, 394.0], [3.0, 366.0], [7.0, 369.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[5.5, 1887.6999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2-Aggregated", "isController": false}, {"data": [[8.0, 392.0], [4.0, 340.0], [2.0, 364.0], [1.0, 411.0], [9.0, 383.0], [10.0, 397.0], [5.0, 482.0], [6.0, 393.0], [3.0, 359.0], [7.0, 368.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[5.5, 388.90000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1-Aggregated", "isController": false}, {"data": [[8.0, 8.0], [4.0, 20.0], [2.0, 24.0], [1.0, 8.0], [9.0, 25.0], [10.0, 32.0], [5.0, 24.0], [6.0, 41.0], [3.0, 25.0], [7.0, 25.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[5.5, 23.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0-Aggregated", "isController": false}, {"data": [[8.0, 48.0], [4.0, 36.0], [2.0, 32.0], [1.0, 24.0], [9.0, 18.0], [10.0, 42.0], [5.0, 23.0], [6.0, 29.0], [3.0, 28.0], [7.0, 51.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[5.5, 33.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7-Aggregated", "isController": false}, {"data": [[8.0, 14.0], [4.0, 39.0], [2.0, 22.0], [1.0, 22.0], [9.0, 14.0], [10.0, 47.0], [5.0, 33.0], [6.0, 10.0], [3.0, 34.0], [7.0, 27.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[5.5, 26.200000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6-Aggregated", "isController": false}, {"data": [[8.0, 15.0], [4.0, 36.0], [2.0, 22.0], [1.0, 22.0], [9.0, 15.0], [10.0, 48.0], [5.0, 33.0], [6.0, 10.0], [3.0, 20.0], [7.0, 26.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[5.5, 24.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5-Aggregated", "isController": false}, {"data": [[8.0, 12.0], [4.0, 35.0], [2.0, 12.0], [1.0, 17.0], [9.0, 20.0], [10.0, 11.0], [5.0, 32.0], [6.0, 10.0], [3.0, 21.0], [7.0, 16.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[5.5, 18.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4-Aggregated", "isController": false}, {"data": [[10.0, 148.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[10.0, 148.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation-Aggregated", "isController": false}, {"data": [[8.0, 27.0], [10.0, 24.133333333333333], [5.0, 18.5], [6.0, 20.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8", "isController": false}, {"data": [[9.0, 23.35]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8-Aggregated", "isController": false}, {"data": [[8.0, 5.0], [4.0, 5.0], [2.0, 2.0], [1.0, 4.0], [9.0, 4.0], [10.0, 2.0], [5.0, 2.0], [6.0, 5.0], [3.0, 4.0], [7.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[5.5, 3.6999999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19-Aggregated", "isController": false}, {"data": [[8.0, 27.0], [10.0, 21.333333333333336], [5.0, 18.0], [6.0, 16.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9", "isController": false}, {"data": [[9.0, 20.75]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9-Aggregated", "isController": false}, {"data": [[8.0, 28.0], [10.0, 15.133333333333333], [5.0, 22.0], [6.0, 26.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6", "isController": false}, {"data": [[9.0, 17.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6-Aggregated", "isController": false}, {"data": [[8.0, 7.0], [10.0, 24.400000000000002], [5.0, 28.0], [6.0, 26.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7", "isController": false}, {"data": [[9.0, 24.050000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7-Aggregated", "isController": false}, {"data": [[8.0, 21.0], [10.0, 16.53333333333333], [5.0, 9.5], [6.0, 9.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4", "isController": false}, {"data": [[9.0, 15.349999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4-Aggregated", "isController": false}, {"data": [[8.0, 9.0], [4.0, 7.0], [2.0, 4.0], [1.0, 7.0], [9.0, 9.0], [10.0, 4.0], [5.0, 35.0], [6.0, 4.0], [3.0, 5.0], [7.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[5.5, 8.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15-Aggregated", "isController": false}, {"data": [[8.0, 29.0], [10.0, 15.866666666666665], [5.0, 21.5], [6.0, 16.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5", "isController": false}, {"data": [[9.0, 17.099999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5-Aggregated", "isController": false}, {"data": [[8.0, 10.0], [4.0, 7.0], [2.0, 4.0], [1.0, 7.0], [9.0, 5.0], [10.0, 4.0], [5.0, 29.0], [6.0, 4.0], [3.0, 4.0], [7.0, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[5.5, 7.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16-Aggregated", "isController": false}, {"data": [[8.0, 455.0], [10.0, 452.73333333333335], [5.0, 422.5], [6.0, 370.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2", "isController": false}, {"data": [[9.0, 441.55]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2-Aggregated", "isController": false}, {"data": [[8.0, 7.0], [4.0, 5.0], [2.0, 4.0], [1.0, 11.0], [9.0, 9.0], [10.0, 4.0], [5.0, 11.0], [6.0, 3.0], [3.0, 5.0], [7.0, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[5.5, 6.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17-Aggregated", "isController": false}, {"data": [[8.0, 29.0], [10.0, 11.133333333333335], [5.0, 28.5], [6.0, 9.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3", "isController": false}, {"data": [[9.0, 13.600000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3-Aggregated", "isController": false}, {"data": [[8.0, 8.0], [4.0, 6.0], [2.0, 2.0], [1.0, 4.0], [9.0, 5.0], [10.0, 3.0], [5.0, 4.0], [6.0, 4.0], [3.0, 7.0], [7.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[5.5, 4.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18-Aggregated", "isController": false}, {"data": [[8.0, 25.0], [10.0, 45.46666666666666], [5.0, 26.5], [6.0, 18.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0", "isController": false}, {"data": [[9.0, 39.79999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0-Aggregated", "isController": false}, {"data": [[8.0, 7.0], [4.0, 16.0], [2.0, 6.0], [1.0, 7.0], [9.0, 5.0], [10.0, 4.0], [5.0, 14.0], [6.0, 4.0], [3.0, 5.0], [7.0, 14.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[5.5, 8.200000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11-Aggregated", "isController": false}, {"data": [[8.0, 806.0], [10.0, 469.8666666666667], [5.0, 416.5], [6.0, 388.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1", "isController": false}, {"data": [[9.0, 473.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1-Aggregated", "isController": false}, {"data": [[8.0, 11.0], [4.0, 10.0], [2.0, 6.0], [1.0, 15.0], [9.0, 5.0], [10.0, 4.0], [5.0, 6.0], [6.0, 4.0], [3.0, 8.0], [7.0, 9.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[5.5, 7.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12-Aggregated", "isController": false}, {"data": [[8.0, 11.0], [4.0, 6.0], [2.0, 5.0], [1.0, 8.0], [9.0, 4.0], [10.0, 5.0], [5.0, 23.0], [6.0, 10.0], [3.0, 5.0], [7.0, 13.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[5.5, 9.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13-Aggregated", "isController": false}, {"data": [[8.0, 11.0], [4.0, 7.0], [2.0, 10.0], [1.0, 9.0], [9.0, 4.0], [10.0, 8.0], [5.0, 35.0], [6.0, 4.0], [3.0, 5.0], [7.0, 13.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[5.5, 10.600000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14-Aggregated", "isController": false}, {"data": [[10.0, 120.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[10.0, 120.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage-Aggregated", "isController": false}, {"data": [[8.0, 20.0], [10.0, 9.333333333333332], [5.0, 15.5], [6.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15", "isController": false}, {"data": [[9.0, 9.949999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15-Aggregated", "isController": false}, {"data": [[8.0, 18.0], [10.0, 9.066666666666668], [5.0, 21.5], [6.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16", "isController": false}, {"data": [[9.0, 10.25]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16-Aggregated", "isController": false}, {"data": [[8.0, 20.0], [10.0, 12.733333333333333], [5.0, 5.5], [6.0, 6.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13", "isController": false}, {"data": [[9.0, 11.75]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13-Aggregated", "isController": false}, {"data": [[10.0, 8138.3]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[10.0, 8138.3]], "isOverall": false, "label": "Login-Aggregated", "isController": true}, {"data": [[8.0, 5.0], [10.0, 21.26666666666667], [5.0, 8.5], [6.0, 8.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14", "isController": false}, {"data": [[9.0, 17.850000000000005]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14-Aggregated", "isController": false}, {"data": [[10.0, 488.29999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[10.0, 488.29999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-Aggregated", "isController": false}, {"data": [[8.0, 2.0], [10.0, 113.80000000000001], [5.0, 3.5], [6.0, 9.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19", "isController": false}, {"data": [[9.0, 86.70000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19-Aggregated", "isController": false}, {"data": [[8.0, 16.0], [10.0, 18.666666666666668], [5.0, 20.0], [6.0, 12.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17", "isController": false}, {"data": [[9.0, 18.049999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17-Aggregated", "isController": false}, {"data": [[8.0, 3.0], [10.0, 9.266666666666667], [5.0, 10.5], [6.0, 11.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18", "isController": false}, {"data": [[9.0, 9.249999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18-Aggregated", "isController": false}, {"data": [[8.0, 28.0], [10.0, 20.66666666666666], [5.0, 9.5], [6.0, 8.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11", "isController": false}, {"data": [[9.0, 18.699999999999996]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11-Aggregated", "isController": false}, {"data": [[8.0, 5.0], [10.0, 11.4], [5.0, 24.5], [6.0, 7.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12", "isController": false}, {"data": [[9.0, 11.950000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12-Aggregated", "isController": false}, {"data": [[8.0, 24.0], [10.0, 22.666666666666664], [5.0, 14.0], [6.0, 9.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10", "isController": false}, {"data": [[9.0, 20.549999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10-Aggregated", "isController": false}, {"data": [[10.0, 7012.099999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[10.0, 7012.099999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-Aggregated", "isController": false}, {"data": [[8.0, 837.0], [10.0, 533.0666666666667], [5.0, 458.5], [6.0, 410.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA", "isController": false}, {"data": [[9.0, 528.5500000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-Aggregated", "isController": false}, {"data": [[8.0, 407.0], [4.0, 384.0], [2.0, 397.0], [1.0, 15412.0], [9.0, 415.0], [10.0, 435.0], [5.0, 513.0], [6.0, 441.0], [3.0, 398.0], [7.0, 399.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[5.5, 1920.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-Aggregated", "isController": false}, {"data": [[8.0, 505.0], [4.0, 495.0], [2.0, 494.0], [1.0, 15517.0], [9.0, 524.0], [10.0, 572.0], [5.0, 609.0], [6.0, 566.0], [3.0, 498.0], [7.0, 526.0]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[5.5, 2030.6]], "isOverall": false, "label": "Logout-Aggregated", "isController": true}, {"data": [[8.0, 782.0], [10.0, 1021.7999999999998], [5.0, 784.5], [6.0, 802.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings", "isController": false}, {"data": [[9.0, 964.1499999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings-Aggregated", "isController": false}, {"data": [[10.0, 151.79999999999998], [5.0, 130.5], [6.0, 93.5], [7.0, 83.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[9.3, 144.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance-Aggregated", "isController": false}, {"data": [[10.0, 290.96], [5.0, 237.0], [6.0, 233.5], [7.0, 288.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[9.3, 283.43333333333334]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5-Aggregated", "isController": false}, {"data": [[10.0, 9.699999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[10.0, 9.699999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14-Aggregated", "isController": false}, {"data": [[10.0, 9.799999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[10.0, 9.799999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13-Aggregated", "isController": false}, {"data": [[10.0, 9.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[10.0, 9.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12-Aggregated", "isController": false}, {"data": [[10.0, 9.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[10.0, 9.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11-Aggregated", "isController": false}, {"data": [[10.0, 20.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[10.0, 20.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10-Aggregated", "isController": false}, {"data": [[10.0, 210.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[10.0, 210.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19-Aggregated", "isController": false}, {"data": [[10.0, 5.800000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[10.0, 5.800000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18-Aggregated", "isController": false}, {"data": [[10.0, 175.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[10.0, 175.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill-Aggregated", "isController": false}, {"data": [[10.0, 7.499999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[10.0, 7.499999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17-Aggregated", "isController": false}, {"data": [[10.0, 7.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[10.0, 7.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16-Aggregated", "isController": false}, {"data": [[10.0, 9.900000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}, {"data": [[10.0, 9.900000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15-Aggregated", "isController": false}, {"data": [[10.0, 23.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[10.0, 23.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9-Aggregated", "isController": false}, {"data": [[10.0, 24.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[10.0, 24.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8-Aggregated", "isController": false}, {"data": [[10.0, 4905.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[10.0, 4905.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin-Aggregated", "isController": false}, {"data": [[10.0, 20.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[10.0, 20.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5-Aggregated", "isController": false}, {"data": [[10.0, 19.700000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[10.0, 19.700000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4-Aggregated", "isController": false}, {"data": [[8.0, 135.0], [10.0, 192.13333333333333], [5.0, 134.0], [6.0, 136.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories", "isController": false}, {"data": [[9.0, 177.85]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories-Aggregated", "isController": false}, {"data": [[10.0, 24.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[10.0, 24.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7-Aggregated", "isController": false}, {"data": [[10.0, 19.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[10.0, 19.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6-Aggregated", "isController": false}, {"data": [[10.0, 1266.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[10.0, 1266.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11-Aggregated", "isController": false}, {"data": [[10.0, 818.8999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[10.0, 818.8999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10-Aggregated", "isController": false}, {"data": [[10.0, 410.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[10.0, 410.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15-Aggregated", "isController": false}, {"data": [[10.0, 452.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[10.0, 452.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14-Aggregated", "isController": false}, {"data": [[10.0, 506.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[10.0, 506.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13-Aggregated", "isController": false}, {"data": [[10.0, 541.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[10.0, 541.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12-Aggregated", "isController": false}, {"data": [[10.0, 1160.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[10.0, 1160.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=-Aggregated", "isController": false}, {"data": [[10.0, 1660.6000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[10.0, 1660.6000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19-Aggregated", "isController": false}, {"data": [[10.0, 292.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[10.0, 292.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18-Aggregated", "isController": false}, {"data": [[10.0, 349.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[10.0, 349.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17-Aggregated", "isController": false}, {"data": [[10.0, 414.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[10.0, 414.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16-Aggregated", "isController": false}, {"data": [[10.0, 146.39999999999998], [5.0, 179.5], [6.0, 145.0], [7.0, 162.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount", "isController": false}, {"data": [[8.950000000000001, 150.34999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount-Aggregated", "isController": false}, {"data": [[10.0, 263.08], [5.0, 228.5], [6.0, 247.5], [7.0, 267.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[9.3, 259.8666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount-Aggregated", "isController": false}, {"data": [[10.0, 482.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[10.0, 482.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4-Aggregated", "isController": false}, {"data": [[10.0, 6473.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[10.0, 6473.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3-Aggregated", "isController": false}, {"data": [[10.0, 1073.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[10.0, 1073.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6-Aggregated", "isController": false}, {"data": [[10.0, 1224.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[10.0, 1224.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5-Aggregated", "isController": false}, {"data": [[8.0, 106.5], [4.0, 111.0], [2.0, 97.0], [1.0, 105.0], [9.0, 109.0], [10.0, 348.0869565217391], [5.0, 104.33333333333333], [6.0, 112.0], [3.0, 100.0], [7.0, 127.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[8.916666666666666, 292.04999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated-Aggregated", "isController": false}, {"data": [[8.0, 42.0], [4.0, 23.0], [2.0, 22.0], [1.0, 18.0], [9.0, 15.0], [10.0, 9.0], [5.0, 15.0], [6.0, 25.0], [3.0, 9.0], [7.0, 40.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[5.5, 21.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10-Aggregated", "isController": false}, {"data": [[10.0, 200.00000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[10.0, 200.00000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0-Aggregated", "isController": false}, {"data": [[10.0, 4616.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[10.0, 4616.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2-Aggregated", "isController": false}, {"data": [[10.0, 4614.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[10.0, 4614.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1-Aggregated", "isController": false}, {"data": [[10.0, 399.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[10.0, 399.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1-Aggregated", "isController": false}, {"data": [[10.0, 33.300000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[10.0, 33.300000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0-Aggregated", "isController": false}, {"data": [[10.0, 15.899999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[10.0, 15.899999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3-Aggregated", "isController": false}, {"data": [[10.0, 438.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[10.0, 438.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2-Aggregated", "isController": false}, {"data": [[10.0, 383.30000000000007]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[10.0, 383.30000000000007]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8-Aggregated", "isController": false}, {"data": [[10.0, 2937.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[10.0, 2937.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7-Aggregated", "isController": false}, {"data": [[10.0, 293.19999999999993]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[10.0, 293.19999999999993]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9-Aggregated", "isController": false}, {"data": [[10.0, 2711.2], [5.0, 2261.0], [6.0, 2174.0], [7.0, 2669.0]], "isOverall": false, "label": "SearchSkill", "isController": true}, {"data": [[8.950000000000001, 2610.3500000000004]], "isOverall": false, "label": "SearchSkill-Aggregated", "isController": true}, {"data": [[10.0, 8118.5]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[10.0, 8118.5]], "isOverall": false, "label": "HomePage-Aggregated", "isController": true}, {"data": [[10.0, 120.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}, {"data": [[10.0, 120.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 1142.25, "minX": 1.59460938E12, "maxY": 4010700.65, "series": [{"data": [[1.5946095E12, 1712.15], [1.59460944E12, 638335.7], [1.59460938E12, 4010700.65]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.5946095E12, 1142.25], [1.59460944E12, 8165.416666666667], [1.59460938E12, 8727.666666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5946095E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 3.6666666666666665, "minX": 1.59460938E12, "maxY": 8138.3, "series": [{"data": [[1.5946095E12, 24.0], [1.59460944E12, 24.142857142857142]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[1.5946095E12, 24.333333333333332], [1.59460944E12, 24.28571428571429]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[1.5946095E12, 16.0], [1.59460944E12, 19.42857142857143]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[1.5946095E12, 4118.5], [1.59460944E12, 400.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[1.5946095E12, 354.3333333333333], [1.59460944E12, 403.7142857142857]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[1.5946095E12, 23.0], [1.59460944E12, 23.285714285714285]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[1.5946095E12, 32.0], [1.59460944E12, 33.57142857142858]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[1.5946095E12, 31.666666666666668], [1.59460944E12, 23.857142857142854]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[1.5946095E12, 26.0], [1.59460944E12, 24.142857142857142]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[1.5946095E12, 22.666666666666668], [1.59460944E12, 16.857142857142858]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[1.59460938E12, 148.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[1.59460944E12, 22.400000000000006], [1.59460938E12, 26.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8", "isController": false}, {"data": [[1.5946095E12, 3.6666666666666665], [1.59460944E12, 3.714285714285714]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[1.59460944E12, 20.53333333333334], [1.59460938E12, 21.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9", "isController": false}, {"data": [[1.59460944E12, 19.733333333333334], [1.59460938E12, 11.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6", "isController": false}, {"data": [[1.59460944E12, 22.73333333333333], [1.59460938E12, 28.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7", "isController": false}, {"data": [[1.59460944E12, 15.866666666666664], [1.59460938E12, 13.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4", "isController": false}, {"data": [[1.5946095E12, 5.333333333333333], [1.59460944E12, 10.285714285714285]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[1.59460944E12, 17.800000000000004], [1.59460938E12, 15.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5", "isController": false}, {"data": [[1.5946095E12, 5.0], [1.59460944E12, 8.857142857142858]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[1.59460944E12, 420.75000000000006], [1.59460938E12, 524.75]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2", "isController": false}, {"data": [[1.5946095E12, 4.666666666666667], [1.59460944E12, 6.857142857142858]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[1.59460944E12, 14.466666666666667], [1.59460938E12, 11.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3", "isController": false}, {"data": [[1.5946095E12, 5.0], [1.59460944E12, 4.571428571428571]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[1.59460944E12, 30.333333333333336], [1.59460938E12, 68.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0", "isController": false}, {"data": [[1.5946095E12, 9.0], [1.59460944E12, 7.857142857142857]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[1.59460944E12, 447.93749999999994], [1.59460938E12, 574.25]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1", "isController": false}, {"data": [[1.5946095E12, 8.0], [1.59460944E12, 7.714285714285714]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[1.5946095E12, 5.333333333333333], [1.59460944E12, 10.571428571428571]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[1.5946095E12, 7.333333333333333], [1.59460944E12, 12.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[1.59460938E12, 120.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[1.59460944E12, 10.06666666666667], [1.59460938E12, 9.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15", "isController": false}, {"data": [[1.59460944E12, 11.133333333333333], [1.59460938E12, 7.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16", "isController": false}, {"data": [[1.59460944E12, 10.466666666666665], [1.59460938E12, 15.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13", "isController": false}, {"data": [[1.59460938E12, 8138.3]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[1.59460944E12, 12.733333333333334], [1.59460938E12, 33.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14", "isController": false}, {"data": [[1.59460938E12, 488.29999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[1.59460944E12, 54.4], [1.59460938E12, 183.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19", "isController": false}, {"data": [[1.59460944E12, 12.466666666666667], [1.59460938E12, 34.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17", "isController": false}, {"data": [[1.59460944E12, 10.733333333333333], [1.59460938E12, 4.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18", "isController": false}, {"data": [[1.59460944E12, 16.46666666666667], [1.59460938E12, 25.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11", "isController": false}, {"data": [[1.59460944E12, 12.600000000000001], [1.59460938E12, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12", "isController": false}, {"data": [[1.59460944E12, 20.466666666666665], [1.59460938E12, 20.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10", "isController": false}, {"data": [[1.59460938E12, 7012.099999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[1.59460944E12, 493.8125], [1.59460938E12, 667.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA", "isController": false}, {"data": [[1.5946095E12, 4147.75], [1.59460944E12, 435.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[1.59460944E12, 2030.6]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[1.59460944E12, 987.7500000000001], [1.59460938E12, 869.75]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings", "isController": false}, {"data": [[1.59460944E12, 125.31250000000003], [1.59460938E12, 165.7857142857143]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[1.59460944E12, 251.1875], [1.59460938E12, 320.2857142857143]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[1.59460938E12, 9.699999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[1.59460938E12, 9.799999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[1.59460938E12, 9.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[1.59460938E12, 9.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[1.59460938E12, 20.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[1.59460938E12, 210.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[1.59460938E12, 5.800000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[1.59460938E12, 175.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[1.59460938E12, 7.499999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[1.59460938E12, 7.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[1.59460938E12, 9.900000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}, {"data": [[1.59460938E12, 23.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[1.59460938E12, 24.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[1.59460938E12, 4905.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[1.59460938E12, 20.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[1.59460938E12, 19.700000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[1.59460944E12, 141.0], [1.59460938E12, 325.25]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories", "isController": false}, {"data": [[1.59460938E12, 24.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[1.59460938E12, 19.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[1.59460938E12, 1266.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[1.59460938E12, 818.8999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[1.59460938E12, 410.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[1.59460938E12, 452.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[1.59460938E12, 506.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[1.59460938E12, 541.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[1.59460938E12, 1160.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[1.59460938E12, 1660.6000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[1.59460938E12, 292.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[1.59460938E12, 349.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[1.59460938E12, 414.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[1.59460944E12, 154.18749999999997], [1.59460938E12, 135.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount", "isController": false}, {"data": [[1.59460944E12, 263.75000000000006], [1.59460938E12, 255.4285714285714]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[1.59460938E12, 482.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[1.59460938E12, 6473.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[1.59460938E12, 1073.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[1.59460938E12, 1224.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[1.5946095E12, 103.25], [1.59460944E12, 111.18181818181819], [1.59460938E12, 431.29411764705884]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[1.5946095E12, 18.0], [1.59460944E12, 23.428571428571427]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[1.59460938E12, 200.00000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[1.59460938E12, 4616.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[1.59460938E12, 4614.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[1.59460938E12, 399.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[1.59460938E12, 33.300000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[1.59460938E12, 15.899999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[1.59460938E12, 438.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[1.59460938E12, 383.30000000000007]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[1.59460938E12, 2937.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[1.59460938E12, 293.19999999999993]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[1.59460944E12, 2358.3333333333335], [1.59460938E12, 2718.3571428571427]], "isOverall": false, "label": "SearchSkill", "isController": true}, {"data": [[1.59460938E12, 8118.5]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[1.59460938E12, 120.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5946095E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59460938E12, "maxY": 7671.5, "series": [{"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[1.5946095E12, 4117.0], [1.59460944E12, 399.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[1.5946095E12, 350.0], [1.59460944E12, 400.7142857142857]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[1.5946095E12, 22.0], [1.59460944E12, 22.142857142857142]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[1.59460938E12, 145.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[1.59460944E12, 419.12500000000006], [1.59460938E12, 524.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[1.59460944E12, 30.200000000000006], [1.59460938E12, 68.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[1.59460944E12, 445.1875], [1.59460938E12, 572.75]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[1.59460938E12, 120.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13", "isController": false}, {"data": [[1.59460938E12, 7671.5]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14", "isController": false}, {"data": [[1.59460938E12, 33.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[1.59460944E12, 2.3333333333333335], [1.59460938E12, 10.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10", "isController": false}, {"data": [[1.59460938E12, 196.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[1.59460944E12, 30.187500000000004], [1.59460938E12, 77.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA", "isController": false}, {"data": [[1.5946095E12, 18.5], [1.59460944E12, 24.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[1.59460944E12, 132.3]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[1.59460944E12, 986.6875], [1.59460938E12, 868.75]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings", "isController": false}, {"data": [[1.59460944E12, 124.1875], [1.59460938E12, 165.35714285714286]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[1.59460944E12, 250.43749999999997], [1.59460938E12, 319.85714285714283]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[1.59460938E12, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[1.59460938E12, 173.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[1.59460938E12, 4903.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[1.59460944E12, 139.62499999999997], [1.59460938E12, 323.25]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[1.59460938E12, 638.9999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[1.59460938E12, 818.8999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[1.59460938E12, 410.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[1.59460938E12, 450.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[1.59460938E12, 505.90000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[1.59460938E12, 540.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[1.59460938E12, 1159.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[1.59460938E12, 346.80000000000007]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[1.59460938E12, 277.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[1.59460938E12, 271.79999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[1.59460938E12, 414.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[1.59460944E12, 153.625], [1.59460938E12, 134.75]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount", "isController": false}, {"data": [[1.59460944E12, 263.0], [1.59460938E12, 254.64285714285714]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[1.59460938E12, 332.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[1.59460938E12, 353.50000000000006]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[1.59460938E12, 259.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[1.59460938E12, 230.10000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[1.5946095E12, 103.0], [1.59460944E12, 110.5], [1.59460938E12, 430.6470588235295]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[1.59460938E12, 196.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[1.59460938E12, 4589.299999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[1.59460938E12, 4570.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[1.59460938E12, 397.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[1.59460938E12, 33.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[1.59460938E12, 437.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[1.59460938E12, 383.09999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[1.59460938E12, 491.59999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[1.59460938E12, 293.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[1.59460944E12, 1876.5], [1.59460938E12, 2217.642857142857]], "isOverall": false, "label": "SearchSkill", "isController": true}, {"data": [[1.59460938E12, 1302.8]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[1.59460938E12, 120.70000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5946095E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59460938E12, "maxY": 4263.700000000001, "series": [{"data": [[1.5946095E12, 6.333333333333333], [1.59460944E12, 5.285714285714286]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[1.5946095E12, 6.333333333333333], [1.59460944E12, 1.7142857142857142]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[1.5946095E12, 1.0], [1.59460944E12, 3.857142857142857]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[1.5946095E12, 3932.75], [1.59460944E12, 205.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[1.5946095E12, 176.33333333333334], [1.59460944E12, 205.57142857142858]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[1.5946095E12, 3.0], [1.59460944E12, 2.7142857142857144]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[1.5946095E12, 2.3333333333333335], [1.59460944E12, 4.7142857142857135]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[1.5946095E12, 7.0], [1.59460944E12, 7.857142857142857]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[1.5946095E12, 6.333333333333333], [1.59460944E12, 6.428571428571429]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[1.5946095E12, 4.333333333333334], [1.59460944E12, 2.285714285714286]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[1.59460944E12, 3.8666666666666663], [1.59460938E12, 7.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.14285714285714288]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[1.59460944E12, 3.8000000000000007], [1.59460938E12, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9", "isController": false}, {"data": [[1.59460944E12, 6.266666666666667], [1.59460938E12, 2.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6", "isController": false}, {"data": [[1.59460944E12, 5.733333333333333], [1.59460938E12, 3.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7", "isController": false}, {"data": [[1.59460944E12, 2.4], [1.59460938E12, 3.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.5714285714285715]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[1.59460944E12, 5.466666666666666], [1.59460938E12, 3.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.28571428571428575]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[1.59460944E12, 229.375], [1.59460938E12, 334.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.5714285714285714]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[1.59460944E12, 2.5999999999999996], [1.59460938E12, 1.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3", "isController": false}, {"data": [[1.5946095E12, 0.33333333333333337], [1.59460944E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[1.59460944E12, 3.3999999999999995], [1.59460938E12, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[1.59460944E12, 258.62500000000006], [1.59460938E12, 382.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1", "isController": false}, {"data": [[1.5946095E12, 1.3333333333333335], [1.59460944E12, 0.5714285714285714]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[1.5946095E12, 0.0], [1.59460944E12, 0.9999999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[1.5946095E12, 0.3333333333333333], [1.59460944E12, 1.4285714285714286]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[1.59460944E12, 0.4], [1.59460938E12, 1.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15", "isController": false}, {"data": [[1.59460944E12, 0.19999999999999998], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16", "isController": false}, {"data": [[1.59460944E12, 0.13333333333333336], [1.59460938E12, 1.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13", "isController": false}, {"data": [[1.59460938E12, 17.299999999999997]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[1.59460944E12, 0.4], [1.59460938E12, 1.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14", "isController": false}, {"data": [[1.59460938E12, 5.699999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[1.59460944E12, 0.06666666666666667], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19", "isController": false}, {"data": [[1.59460944E12, 0.39999999999999997], [1.59460938E12, 0.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18", "isController": false}, {"data": [[1.59460944E12, 1.6666666666666665], [1.59460938E12, 0.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11", "isController": false}, {"data": [[1.59460944E12, 0.4666666666666667], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12", "isController": false}, {"data": [[1.59460944E12, 1.7333333333333334], [1.59460938E12, 4.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10", "isController": false}, {"data": [[1.59460938E12, 50.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[1.59460944E12, 3.375], [1.59460938E12, 4.25]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA", "isController": false}, {"data": [[1.5946095E12, 2.5], [1.59460944E12, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[1.59460944E12, 5.4]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings", "isController": false}, {"data": [[1.59460944E12, 0.37499999999999994], [1.59460938E12, 2.285714285714286]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 2.2857142857142856]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[1.59460938E12, 1.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[1.59460938E12, 1.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[1.59460938E12, 0.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[1.59460938E12, 0.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[1.59460938E12, 5.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[1.59460938E12, 0.09999999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[1.59460938E12, 0.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[1.59460938E12, 0.20000000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[1.59460938E12, 0.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}, {"data": [[1.59460938E12, 4.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[1.59460938E12, 6.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[1.59460938E12, 2.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[1.59460938E12, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[1.59460938E12, 4.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[1.59460944E12, 3.0625], [1.59460938E12, 2.75]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories", "isController": false}, {"data": [[1.59460938E12, 1.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[1.59460938E12, 3.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[1.59460938E12, 180.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[1.59460938E12, 171.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[1.59460938E12, 128.79999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[1.59460938E12, 139.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[1.59460938E12, 151.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[1.59460938E12, 101.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[1.59460938E12, 56.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[1.59460938E12, 37.300000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[1.59460938E12, 59.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[1.59460938E12, 142.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount", "isController": false}, {"data": [[1.59460944E12, 0.0], [1.59460938E12, 0.2142857142857143]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[1.59460938E12, 51.80000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[1.59460938E12, 50.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[1.59460938E12, 49.19999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[1.59460938E12, 34.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[1.5946095E12, 2.75], [1.59460944E12, 2.863636363636364], [1.59460938E12, 7.352941176470586]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[1.5946095E12, 1.6666666666666667], [1.59460944E12, 5.285714285714286]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[1.59460938E12, 50.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[1.59460938E12, 4263.700000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[1.59460938E12, 4258.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[1.59460938E12, 204.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[1.59460938E12, 5.699999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[1.59460938E12, 3.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[1.59460938E12, 245.89999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[1.59460938E12, 183.39999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[1.59460938E12, 188.29999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[1.59460938E12, 98.60000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[1.59460944E12, 9.333333333333334], [1.59460938E12, 10.928571428571427]], "isOverall": false, "label": "SearchSkill", "isController": true}, {"data": [[1.59460938E12, 71.6]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[1.59460938E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5946095E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 2.0, "minX": 1.59460938E12, "maxY": 7332.0, "series": [{"data": [[1.5946095E12, 398.0], [1.59460944E12, 2039.0], [1.59460938E12, 7332.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.5946095E12, 2.0], [1.59460944E12, 2.0], [1.59460938E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.5946095E12, 360.0], [1.59460944E12, 392.80000000000007], [1.59460938E12, 1561.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.5946095E12, 398.0], [1.59460944E12, 904.3199999999988], [1.59460938E12, 6952.309999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.5946095E12, 377.5999999999999], [1.59460944E12, 504.1999999999996], [1.59460938E12, 4789.349999999999]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5946095E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 8.0, "minX": 1.0, "maxY": 15396.5, "series": [{"data": [[2.0, 231.5], [37.0, 8.0], [38.0, 95.0], [41.0, 11.0], [45.0, 18.0], [44.0, 12.0], [3.0, 153.0], [61.0, 14.0], [4.0, 238.5], [66.0, 24.5], [83.0, 528.0], [5.0, 230.0], [6.0, 818.5], [7.0, 184.0], [8.0, 327.5], [9.0, 215.0], [10.0, 393.0], [11.0, 216.5], [12.0, 304.0], [13.0, 61.5], [14.0, 131.5], [1.0, 992.5], [17.0, 70.5], [18.0, 10.0], [19.0, 15.0], [20.0, 139.5], [21.0, 14.0], [22.0, 19.0], [23.0, 43.0], [24.0, 13.0], [25.0, 27.0], [26.0, 30.5], [27.0, 929.0], [30.0, 237.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[3.0, 15396.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 83.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 7694.0, "series": [{"data": [[2.0, 231.0], [37.0, 0.0], [38.0, 42.0], [41.0, 0.0], [45.0, 0.0], [44.0, 0.0], [3.0, 152.5], [61.0, 0.0], [4.0, 123.0], [66.0, 0.0], [83.0, 445.0], [5.0, 178.0], [6.0, 288.5], [7.0, 134.0], [8.0, 273.0], [9.0, 193.0], [10.0, 325.0], [11.0, 135.5], [12.0, 304.0], [13.0, 61.0], [14.0, 130.5], [1.0, 991.5], [17.0, 63.0], [18.0, 0.0], [19.0, 0.0], [20.0, 108.5], [21.0, 0.0], [22.0, 0.0], [23.0, 13.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [27.0, 306.0], [30.0, 193.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[3.0, 7694.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 83.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.1166666666666667, "minX": 1.59460938E12, "maxY": 11.216666666666667, "series": [{"data": [[1.5946095E12, 1.1166666666666667], [1.59460944E12, 9.666666666666666], [1.59460938E12, 11.216666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5946095E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.3, "minX": 1.59460938E12, "maxY": 7.166666666666667, "series": [{"data": [[1.5946095E12, 0.3], [1.59460944E12, 3.533333333333333], [1.59460938E12, 7.166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.5946095E12, 0.85], [1.59460944E12, 6.15], [1.59460938E12, 4.0]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5946095E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59460938E12, "maxY": 0.5666666666666667, "series": [{"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1-success", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-2-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-13-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-17-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11-success", "isController": false}, {"data": [[1.59460944E12, 0.1], [1.59460938E12, 0.23333333333333334]], "isOverall": false, "label": "SearchSkill-success", "isController": true}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "HomePage-success", "isController": true}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15-success", "isController": false}, {"data": [[1.5946095E12, 0.016666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-failure", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill-success", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/searchListings-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-10-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-12-success", "isController": false}, {"data": [[1.5946095E12, 0.016666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2-failure", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.23333333333333334]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5-success", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.23333333333333334]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-3-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-9-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-16-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13-success", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/GetServiceCategoryCount-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-success", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14-success", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getCategories-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-6-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-11-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-4-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-8-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-0-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7-success", "isController": false}, {"data": [[1.5946095E12, 0.06666666666666667], [1.59460944E12, 0.36666666666666664], [1.59460938E12, 0.5666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-15-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-19-success", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.23333333333333334]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-7-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "Login-success", "isController": true}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-5-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4-success", "isController": false}, {"data": [[1.59460944E12, 0.15]], "isOverall": false, "label": "Logout-success", "isController": true}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-14-success", "isController": false}, {"data": [[1.59460944E12, 0.016666666666666666]], "isOverall": false, "label": "Logout-failure", "isController": true}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8-success", "isController": false}, {"data": [[1.59460944E12, 0.26666666666666666], [1.59460938E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-1-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=-success", "isController": false}, {"data": [[1.59460944E12, 0.25], [1.59460938E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home\/Search?searchString=QA-18-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2-success", "isController": false}, {"data": [[1.59460938E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11-success", "isController": false}, {"data": [[1.5946095E12, 0.05], [1.59460944E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5946095E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59460938E12, "maxY": 11.733333333333333, "series": [{"data": [[1.5946095E12, 1.1166666666666667], [1.59460944E12, 9.933333333333334], [1.59460938E12, 11.733333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.5946095E12, 0.03333333333333333], [1.59460944E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5946095E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 43200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
