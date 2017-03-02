(function() {
  'use strict'

  angular.module('app')
    .component('datadash', {
      controller: function($state, $http, $scope) {
        const vm = this

        // $scope.dataSource = {
        //     "chart": {
        //       "caption": "Sales - 2014 v 2015",
        //       //more chart properties - explained later
        //     },
        //     "dataset": [{
        //         "seriesname": "Bakersfield Central",
        //         "lineAlpha": "55"
        //         //more chart data
        //       ]
        //     };
        // $scope.myJson = {
        //   type: 'line',
        //   series: [
        //     { values: [88, 86, 87, 89, 64, 68, 67] },
        //     { values: [10, 15, 16, 20, 40, 40, 46] }
        //   ]
        // };
        $scope.myJson = {
          title: {
            text: "Drag the bottom right corner to resize",
            fontSize: 16,
            fontColor: "#fff"
          },
          backgroundColor: "#2bbb9a",
          globals: {
            shadow: false,
            fontFamily: "Arial"
          },
          type: "line",
          scaleX: {
            maxItems: 8,
            lineColor: "white",
            lineWidth: "1px",
            tick: {
              lineColor: "white",
              lineWidth: "1px"
            },
            item: {
              fontColor: "white"
            },
            guide: {
              visible: false
            }
          },
          scaleY: {
            lineColor: "white",
            lineWidth: "1px",
            tick: {
              lineColor: "white",
              lineWidth: "1px"
            },
            guide: {
              lineStyle: "solid",
              lineColor: "#249178"
            },
            item: {
              fontColor: "white"
            },
          },
          tooltip: {
            visible: false
          },
          crosshairX: {
            lineColor: "#fff",
            scaleLabel: {
              backgroundColor: "#fff",
              fontColor: "#323232"
            },
            plotLabel: {
              backgroundColor: "#fff",
              fontColor: "#323232",
              text: "%v",
              borderColor: "transparent"
            }
          },
          plot: {
            lineWidth: "2px",
            lineColor: "#FFF",
            aspect: "spline",
            marker: {
              visible: false
            }
          },
          series: [{
            values: [989, 1364, 2161, 2644, 1754, 2015, 818, 77, 1260, 3912, 1671, 1836, 1901]
          }]
        }

      },
      // template: `<h1>I am hardcoded template for dataDash</h1>`

      templateUrl: "js/app/data-dash.template.html"
    })

}());
