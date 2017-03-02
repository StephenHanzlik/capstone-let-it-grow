(function() {
  'use strict'

  angular.module('app')
    .component('datadash', {
      controller: function($state, $http, $scope) {
        const vm = this

        vm.$onInit = onInit;
        // $scope.greenData = 78;
        let greenTempData = 0;
        let yellowHumidityData = 0;
        let tempLineArray = [34, 55, 66, 76, 78, 83, 56, 54, 54];
        let humidityLineArray = [34, 55, 66, 76, 78, 83, 56, 54, 54];

      function onInit() {
        $http.get("http://localhost:3000/data")
        .then(response => {
          greenTempData = response.data[0].temperature;
          yellowHumidityData = response.data[0].humidity;
          // for(let i = 0; i <= 9; i++){
          //
          // }
          // console.log(response.data[0].temperature);
          // $scope.greenData = response.data[0].temperature;
          // return $scope.greenData
        // });

        // vm.graphToggle = false;

        $scope.myJson = {
          backgroundColor: "#fff",
          globals: {
            color: "#666"
          },
          graphset: [{
            type: "gauge",
            x: 0,
            y: 0,
            width: "31.5%",
            height: "50%",
            "media-rules": [{
              "max-width": 650,
              "x": 0,
              "y": "2%",
              "width": '100%',
              "height": "20%",
            },{
              "min-width": 450,
            x: 0,
            y: 0,
            width: "40%",
            height: "40%",
            }],
            title: {
              text: "Temperature",
              "media-rules": [{
                "max-width": 650,
                "visible": true
              }]
            },
            scaleR: {
              aperture: 130,
              values: "0:100:5",
              guide: {
                backgroundColor: "#E3DEDA",
                alpha: 1
              },
              ring: {
                backgroundColor: "#E3DEDA",
                "media-rules": [{
                  "max-width": 650,
                  "visible": false
                }]
              },
              center: {
                size: 20,
                borderWidth: 2,
                borderColor: "#23211E",
                "media-rules": [{
                  "max-width": 650,
                  "size": 10
                }]
              },
              item: {
                offsetR: 0
              },
              tick: {
                visible: false
              },
              markers: [{
                type: "area",
                range: [0, greenTempData],
                backgroundColor: "#00AE4D",
                alpha:.95,
              }]
            },
            plotarea: {
              marginTop: "45%"
            },
            plot: {
              csize: "3%",
              size: "100%"
            },
            scale: {
              sizeFactor: 1.2,
              "media-rules": [{
                "max-width": 650,
                sizeFactor: 1.6,
              }]
            },
            tooltip: {
              visible: false
            },
            series: [{
              //Green Dial
              values: [greenTempData],
              backgroundColor: "#23211E",
              valueBox: {
                text: "%v",
                placement: "center",
                fontColor: "#00AE4D",
                fontSize: 14,
                "media-rules": [{
                  "max-width": 650,
                  "fontSize": 10
                }]
              }
            }]
          }, {
            type: "gauge",
            x: "34.5%",
            y: 0,
            width: "31.5%",
            height: "50%",
            "media-rules": [{
              "max-width": 650,
              "x": 0,
              "y": "20%",
              "width": '100%',
              "height": "20%",
            },{
              "min-width": 450,
              x: "50%",
              y: 0,
              width: "40%",
              height: "40%",
            }],
            title: {
              text: "Humidity",
              "media-rules": [{
                "max-width": 650,
                "visible": true
              }]
            },
            scaleR: {
              aperture: 130,
              values: "0:100:5",
              guide: {
                backgroundColor: "#E3DEDA",
                alpha: 1
              },
              ring: {
                backgroundColor: "#E3DEDA",
                "media-rules": [{
                  "max-width": 650,
                  "visible": false
                }]
              },
              center: {
                size: 20,
                borderWidth: 2,
                borderColor: "#23211E",
                "media-rules": [{
                  "max-width": 650,
                  "size": 10
                }]
              },
              item: {
                offsetR: 0
              },
              tick: {
                visible: false
              },
              markers: [{
                type: "area",
                range: [0, yellowHumidityData],
                backgroundColor: "#E2D51A",
                alpha:.95,
              }]
            },
            plotarea: {
              marginTop: "45%"
            },
            plot: {
              csize: "3%",
              size: "100%"
            },
            scale: {
              sizeFactor: 1.2,
              "media-rules": [{
                "max-width": 650,
                sizeFactor: 1.6,
              }]
            },
            tooltip: {
              visible: false
            },
            series: [{
              values: [yellowHumidityData],
              backgroundColor: "#23211E",
              valueBox: {
                text: "%v",
                placement: "center",
                fontColor: "#E2D51A",
                fontSize: 14,
                "media-rules": [{
                  "max-width": 650,
                  "fontSize": 10
                }]
              }
            }]
          },
          {
            type: "line",
            title: {
              text: "Live Feed",
              adjustLayout: true,
              "media-rules": [{
                "max-width": 650,
                "fontSize": 14
              }]
            },
            x: 0,
            y: "45%",
            width: "100%",
            height: "55%",
            "media-rules": [{
              "max-width": 650,
              "x": 0,
              "y": "36%",
              "width": '100%',
              "height": "40%%",
            }],
            scaleX: {
              minValue: 1373045400000,
              step: 3000,
              transform: {
                type: "date",
                all: "%D<br>%H:%i:%s"
              }
            },
            "scale-y": {
              values: "0:100:25",
              placement: "default",
              lineColor: "#666666",
              tick: {
                lineColor: "#666666"
              },
              item: {
                fontColor: "#666666",
                bold: true
              }
            },
            plotarea: {
              margin: "dynamic",
              marginRight: "4%"
            },
            crosshairX: {
              lineColor: "#23211E",
              scaleLabel: {
                backgroundColor: "#E3DEDA",
                fontColor: "#414042"
              },
              plotLabel: {
                backgroundColor: "#f0ece8",
                fontColor: "#414042",
                borderWidth: 1,
                borderColor: "#000"
              }
            },
            tooltip: {
              visible: false
            },
            series: [
              {
              values: tempLineArray,
              lineColor: "#00AE4D",
              text: "Temperature",
              scales: "scale-x, scale-y",
              marker: {
                borderWidth: 2,
                borderColor: "#00AE4D",
                backgroundColor: "#00AE4D",
                type: "circle"
              }
            },
            {
              values: humidityLineArray,
              lineColor: "#E2D51A",
              text: "Humidity",
              scales: "scale-x, scale-y",
              marker: {
                borderWidth: 2,
                borderColor: "#E2D51A",
                backgroundColor: "#E2D51A",
                type: "triangle",
                size: 5
              }
            }
            //  {
            //   values: [28, 21, 30, 28, 21, 30, 28, 21, 30],
            //   lineColor: "#FB301E",
            //   text: "Tempurature",
            //   scales: "scale-x, scale-y",
            //   marker: {
            //     borderWidth: 2,
            //     borderColor: "#FB301E",
            //     backgroundColor: "#fff",
            //     type: "square"
            //   }
            // }
          ]
          }]
        };
      });//end of get requests .then
}//end of onInit function


      },
      // template: `<h1>I am hardcoded template for dataDash</h1>`

      templateUrl: "js/app/data-dash.template.html"
    })

}());
