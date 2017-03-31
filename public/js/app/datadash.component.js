(function() {
  'use strict'

  angular.module('app')
    .component('datadash', {
      controller: function($state, $http, $scope, $interval) {
        const vm = this

        vm.$onInit = onInit;
        vm.lightOn = 1;
        vm.update = update;
        vm.timerData = timerData;

        let greenTempData = 0;
        let yellowHumidityData = 0;
        let tempLineArray = [];
        let humidityLineArray = [];

        var timerData = $interval(function() {
          console.log(greenTempData);
          if (!$scope.loading) {
            update();
          }
        }, 300000);

        function update() {

          $http.get("https://dinkydinky.herokuapp.com/data")
            .then(response => {
              console.log(response.data);
              greenTempData = response.data[0].temperature;
              yellowHumidityData = response.data[0].humidity;
              let timeString = response.data[0].created_at;
              let timeStamp = Date.parse(timeString);
              vm.lightOn = response.data[0].light;
              vm.soil = response.data[0].soil_moisture;

              tempLineArray.shift();
              humidityLineArray.shift();
              tempLineArray.push(response.data[0].temperature);
              humidityLineArray.push(response.data[0].humidity);


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
                    }, {
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
                        alpha: .95,
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
                    }, {
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
                        alpha: .95,
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
                      minValue: timeStamp,
                      step: 3000,
                      transform: {
                        type: "date",
                        // all: createdAt
                        all: "%D<br>%g:%i:%s%a"
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
                    series: [{
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
                  }
                ]
              };
              // }
            }); //commented out because I took out get request
        }

        function onInit() {
          $http.get("https://dinkydinky.herokuapp.com/data")
            .then(response => {
              console.log(response.data);
              greenTempData = response.data[0].temperature;
              yellowHumidityData = response.data[0].humidity;
              let timeString = response.data[0].created_at;
              let timeStamp = Date.parse(timeString);
              vm.lightOn = response.data[0].light;
              vm.soil = response.data[0].soil_moisture;


              for (let i = 0; i <= 8; i++) {
                tempLineArray.push(response.data[i].temperature);
                humidityLineArray.push(response.data[i].humidity);
              }


              window.feed = function(callback) {
                $http.get("https://dinkydinky.herokuapp.com/data")
                  .then(response => {
                    let soil = response.data[0].soil_moisture;

                    let tick = {};
                    tick.plot0 = soil;
                    callback(JSON.stringify(tick));
                    // tick.plot0 = Math.ceil(350 + (Math.random() * 500));
                  });
              };

              var myConfig = {
                type: "gauge",
                globals: {
                  fontSize: 25
                },
                plotarea: {
                  marginTop: 20,
                },
                plot: {
                  size: '100%',
                  valueBox: {
                    placement: 'center',
                    text: '%v', //default
                    fontSize: 35,
                    rules: [{
                        rule: '%v >= 450',
                        text: 'Soil Wet'
                      },
                      //  {
                      //    rule: '%v < 700 && %v > 640',
                      //    text: '%v<br>Good'
                      //  },
                      {
                        rule: '%v < 450 && %v > 300',
                        text: 'Soil Ok'
                      },
                      {
                        rule: '%v <  300',
                        text: 'Soil Dry!'
                      }
                    ]
                  }
                },
                tooltip: {
                  borderRadius: 5
                },
                scaleR: {
                  aperture: 180,
                  minValue: 0,
                  maxValue: 600,
                  step: 10,
                  center: {
                    visible: false
                  },
                  tick: {
                    visible: false
                  },
                  item: {
                    offsetR: 0,
                    rules: [{
                      rule: '%i == 9',
                      offsetX: 15
                    }]
                  },
                  labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                  ring: {
                    size: 50,
                    rules: [{
                        rule: '%v <= 300',
                        backgroundColor: '#E53935'
                      },
                      // {
                      //   rule:'%v > 0 && %v < 1',
                      //   backgroundColor:'#EF5350'
                      // },
                      {
                        rule: '%v >= 300 && %v < 450',
                        backgroundColor: '#FFA726'
                      },
                      {
                        rule: '%v >= 450',
                        backgroundColor: '#0cb054'
                      }
                    ]
                  }
                },
                refresh: {
                  type: "feed",
                  transport: "js",
                  url: "feed()",
                  interval: 1000,
                  resetTimeout: 1000
                },
                series: [{
                  values: [0], // starting value
                  backgroundColor: 'black',
                  indicator: [10, 10, 10, 10, 0.75],
                  animation: {
                    effect: 2,
                    method: 1,
                    sequence: 4,
                    speed: 900
                  },
                }]
              };

              zingchart.render({
                id: 'myChart2',
                data: myConfig,
                height: 300,
                width: '100%',
              });


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
                    }, {
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
                        alpha: .95,
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
                    }, {
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
                        alpha: .95,
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
                      minValue: timeStamp,
                      step: 3000,
                      transform: {
                        type: "date",
                        // all: createdAt
                        all: "%D<br>%g:%i:%s%a"
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
                    series: [{
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
                  }
                ]
              };
            }); //end of get requests .then
        } //end of onInit function


      },
      // template: `<h1>I am hardcoded template for dataDash</h1>`

      templateUrl: "js/app/data-dash.template.html"
    })

}());
