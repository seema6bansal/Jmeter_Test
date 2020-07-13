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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 26.0, "series": [{"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[300.0, 4.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[300.0, 6.0], [400.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[4100.0, 8.0], [3400.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[600.0, 7.0], [400.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[300.0, 7.0], [600.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[600.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[300.0, 2.0], [200.0, 5.0], [100.0, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[300.0, 6.0], [200.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[300.0, 4.0], [200.0, 6.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 2.0], [1000.0, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[2100.0, 5.0], [2200.0, 1.0], [2500.0, 1.0], [1500.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[300.0, 4.0], [200.0, 3.0], [400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[600.0, 7.0], [700.0, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[100.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[6200.0, 1.0], [6400.0, 1.0], [6900.0, 1.0], [7000.0, 5.0], [7100.0, 1.0], [7300.0, 1.0]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[300.0, 1.0], [400.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[6500.0, 1.0], [7000.0, 1.0], [7400.0, 4.0], [7200.0, 2.0], [7500.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[600.0, 2.0], [400.0, 7.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[200.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0], [500.0, 7.0]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[200.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[300.0, 5.0], [700.0, 2.0], [400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[5900.0, 1.0], [6200.0, 1.0], [6500.0, 1.0], [6700.0, 3.0], [6800.0, 3.0], [6900.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[1300.0, 7.0], [700.0, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[1300.0, 6.0], [700.0, 2.0], [800.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[0.0, 8.0], [200.0, 5.0], [100.0, 26.0], [800.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[0.0, 2.0], [400.0, 2.0], [200.0, 4.0], [100.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[3400.0, 2.0], [4000.0, 8.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[3400.0, 2.0], [3900.0, 2.0], [4000.0, 6.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[300.0, 6.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[300.0, 6.0], [400.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[900.0, 6.0], [1000.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[3700.0, 4.0], [3600.0, 5.0], [3900.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[300.0, 2.0], [800.0, 1.0], [900.0, 5.0], [1000.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[8400.0, 1.0], [6700.0, 1.0], [7300.0, 1.0], [7400.0, 1.0], [7200.0, 1.0], [7600.0, 3.0], [7500.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[0.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[100.0, 5.0], [200.0, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[0.0, 2.0], [100.0, 8.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 8400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 70.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 592.0, "series": [{"data": [[0.0, 592.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 98.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 70.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.5000000000000002, "minX": 1.59461286E12, "maxY": 8.13672922252011, "series": [{"data": [[1.59461286E12, 8.13672922252011], [1.59461292E12, 1.5000000000000002]], "isOverall": false, "label": "Login_Logout_ThreadGroup", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59461292E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 7557.6, "series": [{"data": [[8.0, 24.0], [4.0, 33.0], [2.0, 26.0], [1.0, 7.0], [9.0, 9.0], [10.0, 11.0], [5.0, 5.0], [6.0, 24.0], [3.0, 24.0], [7.0, 43.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[5.5, 20.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9-Aggregated", "isController": false}, {"data": [[8.0, 23.0], [4.0, 33.0], [2.0, 26.0], [1.0, 7.0], [9.0, 9.0], [10.0, 15.0], [5.0, 9.0], [6.0, 24.0], [3.0, 25.0], [7.0, 42.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[5.5, 21.300000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8-Aggregated", "isController": false}, {"data": [[8.0, 13.0], [4.0, 8.0], [2.0, 11.0], [1.0, 34.0], [9.0, 26.0], [10.0, 19.0], [5.0, 2.0], [6.0, 7.0], [3.0, 7.0], [7.0, 8.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[5.5, 13.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3-Aggregated", "isController": false}, {"data": [[8.0, 418.0], [4.0, 592.0], [2.0, 376.0], [1.0, 394.0], [9.0, 590.0], [10.0, 413.0], [5.0, 414.0], [6.0, 382.0], [3.0, 391.0], [7.0, 456.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[5.5, 442.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2-Aggregated", "isController": false}, {"data": [[8.0, 415.0], [4.0, 388.0], [2.0, 366.0], [1.0, 399.0], [9.0, 384.0], [10.0, 402.0], [5.0, 413.0], [6.0, 383.0], [3.0, 386.0], [7.0, 470.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[5.5, 400.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1-Aggregated", "isController": false}, {"data": [[8.0, 34.0], [4.0, 6.0], [2.0, 27.0], [1.0, 29.0], [9.0, 31.0], [10.0, 28.0], [5.0, 8.0], [6.0, 30.0], [3.0, 20.0], [7.0, 45.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[5.5, 25.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0-Aggregated", "isController": false}, {"data": [[8.0, 12.0], [4.0, 38.0], [2.0, 30.0], [1.0, 25.0], [9.0, 17.0], [10.0, 15.0], [5.0, 10.0], [6.0, 24.0], [3.0, 7.0], [7.0, 47.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[5.5, 22.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7-Aggregated", "isController": false}, {"data": [[8.0, 16.0], [4.0, 13.0], [2.0, 14.0], [1.0, 27.0], [9.0, 24.0], [10.0, 13.0], [5.0, 13.0], [6.0, 14.0], [3.0, 14.0], [7.0, 11.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[5.5, 15.899999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6-Aggregated", "isController": false}, {"data": [[8.0, 18.0], [4.0, 12.0], [2.0, 15.0], [1.0, 27.0], [9.0, 25.0], [10.0, 17.0], [5.0, 12.0], [6.0, 15.0], [3.0, 14.0], [7.0, 12.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[5.5, 16.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5-Aggregated", "isController": false}, {"data": [[8.0, 18.0], [4.0, 13.0], [2.0, 15.0], [1.0, 6.0], [9.0, 16.0], [10.0, 15.0], [5.0, 7.0], [6.0, 15.0], [3.0, 14.0], [7.0, 11.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[5.5, 13.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4-Aggregated", "isController": false}, {"data": [[8.0, 15.0], [9.0, 21.0], [10.0, 25.666666666666664], [5.0, 32.0], [6.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[7.699999999999998, 24.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9-Aggregated", "isController": false}, {"data": [[4.0, 149.0], [9.0, 124.5], [10.0, 111.33333333333333], [5.0, 141.0], [6.0, 108.0], [7.0, 103.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[7.5, 122.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation-Aggregated", "isController": false}, {"data": [[8.0, 16.0], [9.0, 21.0], [10.0, 22.666666666666664], [5.0, 27.666666666666668], [6.0, 11.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[7.699999999999998, 22.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8-Aggregated", "isController": false}, {"data": [[10.0, 4042.4999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[10.0, 4042.4999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin-Aggregated", "isController": false}, {"data": [[8.0, 21.0], [9.0, 26.0], [10.0, 28.666666666666664], [5.0, 25.666666666666668], [6.0, 8.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[7.699999999999998, 24.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5-Aggregated", "isController": false}, {"data": [[8.0, 2.0], [4.0, 4.0], [2.0, 4.0], [1.0, 2.0], [9.0, 14.0], [10.0, 4.0], [5.0, 3.0], [6.0, 1.0], [3.0, 6.0], [7.0, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[5.5, 4.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19-Aggregated", "isController": false}, {"data": [[8.0, 31.0], [9.0, 26.5], [10.0, 21.0], [5.0, 17.666666666666668], [6.0, 8.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[7.699999999999998, 20.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4-Aggregated", "isController": false}, {"data": [[8.0, 14.0], [9.0, 40.0], [10.0, 29.666666666666664], [5.0, 25.666666666666668], [6.0, 11.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[7.699999999999998, 27.099999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7-Aggregated", "isController": false}, {"data": [[8.0, 21.0], [9.0, 35.5], [10.0, 19.666666666666668], [5.0, 24.666666666666664], [6.0, 7.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[7.699999999999998, 23.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6-Aggregated", "isController": false}, {"data": [[8.0, 9.0], [4.0, 16.0], [2.0, 7.0], [1.0, 8.0], [9.0, 5.0], [10.0, 5.0], [5.0, 22.0], [6.0, 24.0], [3.0, 12.0], [7.0, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[5.5, 10.999999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15-Aggregated", "isController": false}, {"data": [[8.0, 4.0], [4.0, 15.0], [2.0, 7.0], [1.0, 6.0], [9.0, 29.0], [10.0, 5.0], [5.0, 19.0], [6.0, 24.0], [3.0, 9.0], [7.0, 17.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[5.5, 13.500000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16-Aggregated", "isController": false}, {"data": [[8.0, 4.0], [4.0, 14.0], [2.0, 8.0], [1.0, 4.0], [9.0, 24.0], [10.0, 2.0], [5.0, 5.0], [6.0, 7.0], [3.0, 8.0], [7.0, 14.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[5.5, 8.999999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17-Aggregated", "isController": false}, {"data": [[8.0, 4.0], [4.0, 3.0], [2.0, 6.0], [1.0, 4.0], [9.0, 23.0], [10.0, 4.0], [5.0, 4.0], [6.0, 6.0], [3.0, 7.0], [7.0, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[5.5, 6.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18-Aggregated", "isController": false}, {"data": [[10.0, 632.9000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[10.0, 632.9000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11-Aggregated", "isController": false}, {"data": [[8.0, 16.0], [4.0, 9.0], [2.0, 8.0], [1.0, 5.0], [9.0, 7.0], [10.0, 10.0], [5.0, 10.0], [6.0, 8.0], [3.0, 23.0], [7.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[5.5, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11-Aggregated", "isController": false}, {"data": [[10.0, 393.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[10.0, 393.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10-Aggregated", "isController": false}, {"data": [[8.0, 5.0], [4.0, 25.0], [2.0, 13.0], [1.0, 7.0], [9.0, 11.0], [10.0, 5.0], [5.0, 5.0], [6.0, 7.0], [3.0, 12.0], [7.0, 22.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[5.5, 11.199999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12-Aggregated", "isController": false}, {"data": [[8.0, 5.0], [4.0, 9.0], [2.0, 10.0], [1.0, 14.0], [9.0, 6.0], [10.0, 5.0], [5.0, 30.0], [6.0, 18.0], [3.0, 11.0], [7.0, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[5.5, 11.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13-Aggregated", "isController": false}, {"data": [[8.0, 5.0], [4.0, 10.0], [2.0, 6.0], [1.0, 13.0], [9.0, 19.0], [10.0, 4.0], [5.0, 18.0], [6.0, 18.0], [3.0, 6.0], [7.0, 19.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[5.5, 11.799999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14-Aggregated", "isController": false}, {"data": [[10.0, 556.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[10.0, 556.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15-Aggregated", "isController": false}, {"data": [[10.0, 259.59999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[10.0, 259.59999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14-Aggregated", "isController": false}, {"data": [[10.0, 314.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[10.0, 314.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13-Aggregated", "isController": false}, {"data": [[9.0, 100.5], [10.0, 120.66666666666667], [5.0, 133.66666666666666], [6.0, 118.0], [7.0, 127.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[7.6000000000000005, 120.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage-Aggregated", "isController": false}, {"data": [[10.0, 302.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[10.0, 302.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12-Aggregated", "isController": false}, {"data": [[4.0, 1236.0], [9.0, 1116.0], [10.0, 1140.3333333333333], [5.0, 1085.5], [3.0, 1018.0], [7.0, 1080.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[7.2, 1115.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=-Aggregated", "isController": false}, {"data": [[10.0, 2126.6000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[10.0, 2126.6000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19-Aggregated", "isController": false}, {"data": [[10.0, 325.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[10.0, 325.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18-Aggregated", "isController": false}, {"data": [[10.0, 690.3000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[10.0, 690.3000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17-Aggregated", "isController": false}, {"data": [[10.0, 459.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[10.0, 459.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16-Aggregated", "isController": false}, {"data": [[4.0, 6987.0], [9.0, 6751.5], [10.0, 6771.0], [5.0, 7173.5], [3.0, 7010.0], [7.0, 7017.0]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[7.2, 6917.7]], "isOverall": false, "label": "Login-Aggregated", "isController": true}, {"data": [[8.0, 458.0], [9.0, 505.5], [10.0, 406.6666666666667], [5.0, 424.6666666666667], [6.0, 509.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[7.699999999999998, 447.20000000000005]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-Aggregated", "isController": false}, {"data": [[10.0, 7321.799999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[10.0, 7321.799999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-Aggregated", "isController": false}, {"data": [[8.0, 461.0], [4.0, 601.0], [2.0, 411.0], [1.0, 431.0], [9.0, 629.0], [10.0, 451.0], [5.0, 425.0], [6.0, 418.0], [3.0, 417.0], [7.0, 523.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[5.5, 476.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-Aggregated", "isController": false}, {"data": [[8.0, 199.0], [9.0, 210.0], [10.0, 241.0], [5.0, 243.66666666666666], [6.0, 271.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[7.699999999999998, 234.39999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount-Aggregated", "isController": false}, {"data": [[8.0, 563.0], [4.0, 700.0], [2.0, 516.0], [1.0, 533.0], [9.0, 724.0], [10.0, 557.0], [5.0, 530.0], [6.0, 533.0], [3.0, 514.0], [7.0, 641.0]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[5.5, 581.1]], "isOverall": false, "label": "Logout-Aggregated", "isController": true}, {"data": [[8.0, 98.0], [9.0, 102.0], [10.0, 106.33333333333333], [5.0, 94.33333333333333], [6.0, 108.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[7.699999999999998, 101.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance-Aggregated", "isController": false}, {"data": [[8.0, 229.0], [9.0, 207.5], [10.0, 241.66666666666666], [5.0, 213.0], [6.0, 223.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[7.699999999999998, 223.10000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5-Aggregated", "isController": false}, {"data": [[10.0, 437.59999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[10.0, 437.59999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4-Aggregated", "isController": false}, {"data": [[10.0, 6633.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[10.0, 6633.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3-Aggregated", "isController": false}, {"data": [[10.0, 1168.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[10.0, 1168.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6-Aggregated", "isController": false}, {"data": [[10.0, 1132.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[10.0, 1132.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5-Aggregated", "isController": false}, {"data": [[8.0, 99.5], [4.0, 99.0], [2.0, 105.0], [1.0, 102.0], [9.0, 101.0], [10.0, 183.83333333333331], [5.0, 106.0], [6.0, 136.5], [3.0, 97.0], [7.0, 118.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[8.299999999999999, 153.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated-Aggregated", "isController": false}, {"data": [[8.0, 23.0], [4.0, 32.0], [2.0, 28.0], [1.0, 2.0], [9.0, 8.0], [10.0, 12.0], [5.0, 9.0], [6.0, 14.0], [3.0, 19.0], [7.0, 48.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[5.5, 19.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10-Aggregated", "isController": false}, {"data": [[10.0, 214.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[10.0, 214.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0-Aggregated", "isController": false}, {"data": [[10.0, 3916.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[10.0, 3916.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2-Aggregated", "isController": false}, {"data": [[10.0, 3908.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[10.0, 3908.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1-Aggregated", "isController": false}, {"data": [[8.0, 419.0], [9.0, 470.5], [10.0, 368.3333333333333], [5.0, 378.0], [6.0, 474.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[7.699999999999998, 407.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1-Aggregated", "isController": false}, {"data": [[8.0, 21.0], [9.0, 27.0], [10.0, 16.666666666666668], [5.0, 20.333333333333332], [6.0, 31.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[7.699999999999998, 21.700000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0-Aggregated", "isController": false}, {"data": [[8.0, 23.0], [9.0, 13.0], [10.0, 15.666666666666666], [5.0, 11.666666666666666], [6.0, 7.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[7.699999999999998, 13.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3-Aggregated", "isController": false}, {"data": [[8.0, 424.0], [9.0, 361.5], [10.0, 376.3333333333333], [5.0, 392.6666666666667], [6.0, 472.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[7.699999999999998, 392.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2-Aggregated", "isController": false}, {"data": [[10.0, 992.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[10.0, 992.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8-Aggregated", "isController": false}, {"data": [[10.0, 3729.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[10.0, 3729.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7-Aggregated", "isController": false}, {"data": [[10.0, 819.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[10.0, 819.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9-Aggregated", "isController": false}, {"data": [[8.0, 10.0], [9.0, 102.0], [10.0, 13.0], [5.0, 4.666666666666667], [6.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[7.699999999999998, 27.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14-Aggregated", "isController": false}, {"data": [[8.0, 8.0], [9.0, 102.0], [10.0, 8.333333333333334], [5.0, 3.3333333333333335], [6.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[7.699999999999998, 25.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13-Aggregated", "isController": false}, {"data": [[8.0, 5.0], [9.0, 105.0], [10.0, 10.0], [5.0, 13.333333333333332], [6.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[7.699999999999998, 28.900000000000006]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12-Aggregated", "isController": false}, {"data": [[10.0, 7557.6]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[10.0, 7557.6]], "isOverall": false, "label": "HomePage-Aggregated", "isController": true}, {"data": [[8.0, 8.0], [9.0, 97.0], [10.0, 6.666666666666667], [5.0, 11.666666666666666], [6.0, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[7.699999999999998, 26.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11-Aggregated", "isController": false}, {"data": [[4.0, 121.0], [9.0, 111.0], [10.0, 117.33333333333333], [5.0, 98.5], [6.0, 117.0], [7.0, 192.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}, {"data": [[7.5, 120.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification-Aggregated", "isController": false}, {"data": [[8.0, 11.0], [9.0, 21.5], [10.0, 21.666666666666668], [5.0, 17.666666666666668], [6.0, 9.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[7.699999999999998, 18.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10-Aggregated", "isController": false}, {"data": [[8.0, 183.0], [9.0, 238.0], [10.0, 198.0], [5.0, 219.33333333333334], [6.0, 176.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[7.699999999999998, 208.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19-Aggregated", "isController": false}, {"data": [[8.0, 4.0], [9.0, 22.0], [10.0, 5.333333333333333], [5.0, 9.666666666666668], [6.0, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[7.699999999999998, 10.299999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18-Aggregated", "isController": false}, {"data": [[9.0, 131.0], [10.0, 118.66666666666667], [5.0, 109.33333333333333], [6.0, 136.0], [7.0, 88.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[7.6000000000000005, 117.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill-Aggregated", "isController": false}, {"data": [[8.0, 5.0], [9.0, 25.5], [10.0, 8.666666666666666], [5.0, 4.0], [6.0, 6.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[7.699999999999998, 10.000000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17-Aggregated", "isController": false}, {"data": [[8.0, 4.0], [9.0, 25.5], [10.0, 7.333333333333333], [5.0, 12.333333333333334], [6.0, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[7.699999999999998, 11.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16-Aggregated", "isController": false}, {"data": [[8.0, 5.0], [9.0, 26.0], [10.0, 13.333333333333334], [5.0, 28.666666666666664], [6.0, 6.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}, {"data": [[7.699999999999998, 18.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 645.4333333333333, "minX": 1.59461286E12, "maxY": 3499993.6333333333, "series": [{"data": [[1.59461286E12, 3499993.6333333333], [1.59461292E12, 940.5333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59461286E12, 9621.066666666668], [1.59461292E12, 645.4333333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59461292E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 3.0, "minX": 1.59461286E12, "maxY": 7557.6, "series": [{"data": [[1.59461286E12, 21.625], [1.59461292E12, 16.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[1.59461286E12, 22.500000000000004], [1.59461292E12, 16.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[1.59461286E12, 11.25], [1.59461292E12, 22.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[1.59461286E12, 457.0], [1.59461292E12, 385.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[1.59461286E12, 405.125], [1.59461292E12, 382.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[1.59461286E12, 25.250000000000004], [1.59461292E12, 28.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[1.59461286E12, 21.25], [1.59461292E12, 27.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[1.59461286E12, 14.749999999999998], [1.59461292E12, 20.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[1.59461286E12, 15.625], [1.59461292E12, 21.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[1.59461286E12, 13.625], [1.59461292E12, 10.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[1.59461286E12, 24.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[1.59461286E12, 122.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[1.59461286E12, 22.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[1.59461286E12, 4042.4999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[1.59461286E12, 24.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[1.59461286E12, 4.625], [1.59461292E12, 3.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[1.59461286E12, 20.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[1.59461286E12, 27.099999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[1.59461286E12, 23.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[1.59461286E12, 11.874999999999998], [1.59461292E12, 7.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[1.59461286E12, 15.250000000000004], [1.59461292E12, 6.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[1.59461286E12, 9.749999999999998], [1.59461292E12, 6.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[1.59461286E12, 6.75], [1.59461292E12, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[1.59461286E12, 632.9000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[1.59461286E12, 10.875], [1.59461292E12, 6.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[1.59461286E12, 393.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[1.59461286E12, 11.499999999999998], [1.59461292E12, 10.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[1.59461286E12, 11.125], [1.59461292E12, 12.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[1.59461286E12, 12.375], [1.59461292E12, 9.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[1.59461286E12, 556.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[1.59461286E12, 259.59999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[1.59461286E12, 314.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[1.59461286E12, 120.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[1.59461286E12, 302.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[1.59461286E12, 1115.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[1.59461286E12, 2126.6000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[1.59461286E12, 325.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[1.59461286E12, 690.3000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[1.59461286E12, 459.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[1.59461286E12, 6917.7]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[1.59461286E12, 447.20000000000005]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[1.59461286E12, 7321.799999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[1.59461286E12, 490.625], [1.59461292E12, 421.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[1.59461286E12, 234.39999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[1.59461286E12, 581.1]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[1.59461286E12, 101.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[1.59461286E12, 223.10000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[1.59461286E12, 437.59999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[1.59461286E12, 6633.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[1.59461286E12, 1168.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[1.59461286E12, 1132.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[1.59461286E12, 155.92105263157896], [1.59461292E12, 103.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[1.59461286E12, 20.625], [1.59461292E12, 15.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[1.59461286E12, 214.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[1.59461286E12, 3916.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[1.59461286E12, 3908.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[1.59461286E12, 407.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[1.59461286E12, 21.700000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[1.59461286E12, 13.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[1.59461286E12, 392.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[1.59461286E12, 992.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[1.59461286E12, 3729.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[1.59461286E12, 819.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[1.59461286E12, 27.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[1.59461286E12, 25.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[1.59461286E12, 28.900000000000006]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[1.59461286E12, 7557.6]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[1.59461286E12, 26.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[1.59461286E12, 120.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}, {"data": [[1.59461286E12, 18.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[1.59461286E12, 208.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[1.59461286E12, 10.299999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[1.59461286E12, 117.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[1.59461286E12, 10.000000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[1.59461286E12, 11.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[1.59461286E12, 18.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59461292E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59461286E12, "maxY": 6481.599999999999, "series": [{"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[1.59461286E12, 456.0], [1.59461292E12, 380.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[1.59461286E12, 401.875], [1.59461292E12, 379.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[1.59461286E12, 25.124999999999996], [1.59461292E12, 27.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[1.59461286E12, 120.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[1.59461286E12, 4042.1999999999994]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[1.59461286E12, 321.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[1.59461286E12, 393.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[1.59461286E12, 556.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[1.59461286E12, 259.59999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[1.59461286E12, 314.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[1.59461286E12, 120.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[1.59461286E12, 301.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[1.59461286E12, 1115.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[1.59461286E12, 202.79999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[1.59461286E12, 297.20000000000005]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[1.59461286E12, 511.90000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[1.59461286E12, 459.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[1.59461286E12, 6481.599999999999]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[1.59461286E12, 21.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[1.59461286E12, 210.39999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[1.59461286E12, 25.124999999999996], [1.59461292E12, 27.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[1.59461286E12, 233.99999999999997]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[1.59461286E12, 127.5]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[1.59461286E12, 98.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[1.59461286E12, 222.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[1.59461286E12, 267.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[1.59461286E12, 251.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[1.59461286E12, 226.79999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[1.59461286E12, 260.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[1.59461286E12, 155.02631578947367], [1.59461292E12, 103.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[1.59461286E12, 210.39999999999998]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[1.59461286E12, 3904.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[1.59461286E12, 3896.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[1.59461286E12, 404.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[1.59461286E12, 21.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[1.59461286E12, 391.40000000000003]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[1.59461286E12, 992.4000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[1.59461286E12, 1074.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[1.59461286E12, 818.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[1.59461286E12, 446.1]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[1.59461286E12, 118.39999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[1.59461286E12, 7.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[1.59461286E12, 115.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59461292E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.59461286E12, "maxY": 3673.6, "series": [{"data": [[1.59461286E12, 3.125], [1.59461292E12, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9", "isController": false}, {"data": [[1.59461286E12, 3.375], [1.59461292E12, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8", "isController": false}, {"data": [[1.59461286E12, 1.875], [1.59461292E12, 0.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3", "isController": false}, {"data": [[1.59461286E12, 257.74999999999994], [1.59461292E12, 195.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2", "isController": false}, {"data": [[1.59461286E12, 207.5], [1.59461292E12, 193.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1", "isController": false}, {"data": [[1.59461286E12, 3.5], [1.59461292E12, 3.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0", "isController": false}, {"data": [[1.59461286E12, 2.5], [1.59461292E12, 8.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7", "isController": false}, {"data": [[1.59461286E12, 5.875], [1.59461292E12, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6", "isController": false}, {"data": [[1.59461286E12, 6.499999999999999], [1.59461292E12, 5.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5", "isController": false}, {"data": [[1.59461286E12, 3.4999999999999996], [1.59461292E12, 1.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4", "isController": false}, {"data": [[1.59461286E12, 2.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation", "isController": false}, {"data": [[1.59461286E12, 4.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8", "isController": false}, {"data": [[1.59461286E12, 7.800000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin", "isController": false}, {"data": [[1.59461286E12, 5.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5", "isController": false}, {"data": [[1.59461286E12, 0.125], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19", "isController": false}, {"data": [[1.59461286E12, 5.3999999999999995]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4", "isController": false}, {"data": [[1.59461286E12, 2.4000000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7", "isController": false}, {"data": [[1.59461286E12, 4.3]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6", "isController": false}, {"data": [[1.59461286E12, 0.8749999999999999], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15", "isController": false}, {"data": [[1.59461286E12, 0.375], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16", "isController": false}, {"data": [[1.59461286E12, 0.0], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17", "isController": false}, {"data": [[1.59461286E12, 0.125], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18", "isController": false}, {"data": [[1.59461286E12, 132.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11", "isController": false}, {"data": [[1.59461286E12, 0.875], [1.59461292E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11", "isController": false}, {"data": [[1.59461286E12, 111.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10", "isController": false}, {"data": [[1.59461286E12, 0.75], [1.59461292E12, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12", "isController": false}, {"data": [[1.59461286E12, 0.25], [1.59461292E12, 2.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13", "isController": false}, {"data": [[1.59461286E12, 0.25000000000000006], [1.59461292E12, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14", "isController": false}, {"data": [[1.59461286E12, 142.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15", "isController": false}, {"data": [[1.59461286E12, 69.89999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14", "isController": false}, {"data": [[1.59461286E12, 95.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage", "isController": false}, {"data": [[1.59461286E12, 105.69999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=", "isController": false}, {"data": [[1.59461286E12, 36.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19", "isController": false}, {"data": [[1.59461286E12, 42.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18", "isController": false}, {"data": [[1.59461286E12, 166.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17", "isController": false}, {"data": [[1.59461286E12, 113.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16", "isController": false}, {"data": [[1.59461286E12, 21.1]], "isOverall": false, "label": "Login", "isController": true}, {"data": [[1.59461286E12, 4.000000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile", "isController": false}, {"data": [[1.59461286E12, 67.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/", "isController": false}, {"data": [[1.59461286E12, 3.5], [1.59461292E12, 3.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount", "isController": false}, {"data": [[1.59461286E12, 7.1]], "isOverall": false, "label": "Logout", "isController": true}, {"data": [[1.59461286E12, 2.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance", "isController": false}, {"data": [[1.59461286E12, 4.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5", "isController": false}, {"data": [[1.59461286E12, 61.300000000000004]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4", "isController": false}, {"data": [[1.59461286E12, 62.2]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3", "isController": false}, {"data": [[1.59461286E12, 6.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6", "isController": false}, {"data": [[1.59461286E12, 55.79999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5", "isController": false}, {"data": [[1.59461286E12, 9.394736842105258], [1.59461292E12, 7.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated", "isController": false}, {"data": [[1.59461286E12, 1.8750000000000004], [1.59461292E12, 4.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10", "isController": false}, {"data": [[1.59461286E12, 67.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0", "isController": false}, {"data": [[1.59461286E12, 3673.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2", "isController": false}, {"data": [[1.59461286E12, 3666.9]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1", "isController": false}, {"data": [[1.59461286E12, 219.6]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1", "isController": false}, {"data": [[1.59461286E12, 4.000000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0", "isController": false}, {"data": [[1.59461286E12, 2.1]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3", "isController": false}, {"data": [[1.59461286E12, 204.8]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2", "isController": false}, {"data": [[1.59461286E12, 532.0000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8", "isController": false}, {"data": [[1.59461286E12, 320.4]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7", "isController": false}, {"data": [[1.59461286E12, 160.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9", "isController": false}, {"data": [[1.59461286E12, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14", "isController": false}, {"data": [[1.59461286E12, 0.7]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13", "isController": false}, {"data": [[1.59461286E12, 1.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12", "isController": false}, {"data": [[1.59461286E12, 99.2]], "isOverall": false, "label": "HomePage", "isController": true}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification", "isController": false}, {"data": [[1.59461286E12, 2.5]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19", "isController": false}, {"data": [[1.59461286E12, 0.09999999999999999]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18", "isController": false}, {"data": [[1.59461286E12, 0.0]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill", "isController": false}, {"data": [[1.59461286E12, 0.4000000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17", "isController": false}, {"data": [[1.59461286E12, 0.4000000000000001]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16", "isController": false}, {"data": [[1.59461286E12, 1.0000000000000002]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59461292E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.59461286E12, "maxY": 7664.0, "series": [{"data": [[1.59461286E12, 7664.0], [1.59461292E12, 431.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59461286E12, 1.0], [1.59461292E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59461286E12, 1354.9], [1.59461292E12, 385.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59461286E12, 7250.150000000001], [1.59461292E12, 431.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59461286E12, 4029.3], [1.59461292E12, 408.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59461292E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 7.0, "minX": 1.0, "maxY": 3471.0, "series": [{"data": [[33.0, 3471.0], [2.0, 657.0], [40.0, 20.5], [47.0, 13.0], [3.0, 119.0], [4.0, 487.0], [5.0, 118.0], [86.0, 373.0], [6.0, 370.5], [7.0, 180.0], [9.0, 131.0], [10.0, 984.5], [11.0, 321.0], [12.0, 348.5], [1.0, 1029.0], [16.0, 128.0], [17.0, 7.0], [18.0, 121.5], [19.0, 759.0], [21.0, 11.0], [22.0, 15.0], [23.0, 18.0], [26.0, 16.0], [29.0, 393.0], [31.0, 46.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 86.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 3468.0, "series": [{"data": [[33.0, 3468.0], [2.0, 654.5], [40.0, 0.0], [47.0, 0.0], [3.0, 118.0], [4.0, 231.5], [5.0, 117.0], [86.0, 353.5], [6.0, 133.5], [7.0, 137.0], [9.0, 131.0], [10.0, 984.5], [11.0, 208.0], [12.0, 179.5], [1.0, 1029.0], [16.0, 120.0], [17.0, 0.0], [18.0, 74.0], [19.0, 132.5], [21.0, 0.0], [22.0, 0.0], [23.0, 0.0], [26.0, 0.0], [29.0, 131.5], [31.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 86.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.7333333333333333, "minX": 1.59461286E12, "maxY": 11.933333333333334, "series": [{"data": [[1.59461286E12, 11.933333333333334], [1.59461292E12, 0.7333333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59461292E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.16666666666666666, "minX": 1.59461286E12, "maxY": 7.0, "series": [{"data": [[1.59461286E12, 7.0], [1.59461292E12, 0.16666666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59461286E12, 4.933333333333334], [1.59461292E12, 0.5666666666666667]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59461292E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.59461286E12, "maxY": 0.6333333333333333, "series": [{"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-3-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-10-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60968\/authentication\/authentication\/signin-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-1-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-12-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-0-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-16-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-19-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-17-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-9-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-7-success", "isController": false}, {"data": [[1.59461286E12, 0.6333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/isUserAuthenticated-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-15-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-5-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-9-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-0-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-18-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-11-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-7-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-19-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-14-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-4-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-12-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-17-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-2-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-9-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "HomePage-success", "isController": true}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:51689\/listing\/listing\/getBalance-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-15-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-15-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-3-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-5-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getSkill-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getCertification-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-6-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-0-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-13-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-10-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "Login-success", "isController": true}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-13-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNotification?numberOfNotifications=5-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/notification\/notification\/getNewNotificationCount-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-4-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "Logout-success", "isController": true}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-2-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-1-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-8-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-11-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getLanguage-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-18-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-8-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-17-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getEducation-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-6-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-19-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-16-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-3-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-13-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-12-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-18-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-8-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-1-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:60190\/profile\/profile\/getProfileDetails\/?id=-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-6-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-10-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-16-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-7-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-14-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-2-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-11-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Account\/Profile-4-success", "isController": false}, {"data": [[1.59461286E12, 0.16666666666666666]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/-5-success", "isController": false}, {"data": [[1.59461286E12, 0.13333333333333333], [1.59461292E12, 0.03333333333333333]], "isOverall": false, "label": "http:\/\/192.168.99.100:5000\/Home-14-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59461292E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.7333333333333333, "minX": 1.59461286E12, "maxY": 12.433333333333334, "series": [{"data": [[1.59461286E12, 12.433333333333334], [1.59461292E12, 0.7333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59461292E12, "title": "Total Transactions Per Second"}},
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
