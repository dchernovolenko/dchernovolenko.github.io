// set the dimensions and margins of the graph
var margin = {top: 60, right: 60, bottom: 20, left:200},
width = 960 - margin.left - margin.right,
height = 900 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");



//read data
d3.csv("cases.csv").then(function(data){
  console.log(data)
  var maxcase = 0
  var stateslist = d3.map()
  stateslist.set('Alabama', data[0].geoid.slice(7,9))
  var countydata = []
  var countynames = []
  
  for(var i = 0; i < data.length; i++){
    if (data[i].geoid.length == 9){
      stateslist.set(data[i].name, data[i].geoid.slice(7,9))
    }
    }



d3.select("#states")
    .selectAll('myOptions')
    .data(stateslist.keys())
    .enter()
    .append('option')
    .text(function (d) {return d}) // text showed in the menu
    .attr("value", function (d) { return stateslist.get(d)}) // corresponding value returned by the button


d3.select("#states").on("change", function(d){
  statedata(this.value)
})

function statedata(geoidval){
  d3.selectAll("g > *").remove()
  countydata = []
  countynames = []
  maxcase = 0
  for(var i = 0; i < data.length; i++){
    if (data[i].geoid.slice(7,9) == geoidval && data[i].geoid.length > 9 ){
      countynames.push(data[i].name)
      countydata.push(data[i])
      if (Math.max.apply(Math, Object.values(data[i]).filter(item => !isNaN(item) ? item : '')) > maxcase){
        maxcase = Math.max.apply(Math, Object.values(data[i]).filter(item => !isNaN(item) ? item : ''))
      }
    }
  }
  
var categories = countynames
console.log(categories)
var n = data.columns.length

var yName = d3.scaleBand()
.domain(categories)
.range([0, height])
.paddingInner(1)

svg.append("g")
.call(d3.axisLeft(yName));

var allDensity = []
countydata.map(function(d){
  density=[]
  var numb = 0
  for(i = 3; i < Object.entries(d).slice(2,d.length).length; i += 1){
    var element = Object.entries(d).slice(2,d.length)[i]
    var datele = new Date(element[0].replace('tstpos_', '').slice(0,4)+ '-' + element[0].replace('tstpos_', '').slice(4,6) + "-" + element[0].replace('tstpos_', '').slice(6,8))
    if (element[1] - numb > 0){
      density.push([datele, element[1] - numb])
    }
    else {
      density.push([datele, 0])
    }
    numb = Object.entries(d).slice(2,d.length)[i][1]
  }
  allDensity.push({key: d.name, density: density})
  })

console.log(maxcase)
console.log(allDensity)
// Add X axis
var mindate = new Date(2020,0,20), maxdate = new Date(2020,3,14);
var x = d3.scaleTime()
.domain([mindate,maxdate])
.range([ 0, width ])

svg.append("g")
.attr("transform", "translate(0," + (height + 5) + ")")
.call(d3.axisBottom(x));

// Create a Y scale for densities
var y = d3.scaleLinear()
.domain([0, maxcase])
.range([height, 0])


svg.selectAll("areas")
.data(allDensity)
.enter()
.append("path")
  .attr("transform", function(d){
    return("translate(0," + (yName(d.key)-height) +")" )
  })
  .datum(function(d){
    return(d.density)
  })
  .attr("fill", "CornflowerBlue")
  .transition()
  .duration(1000)
  .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("d",  d3.line()
      .curve(d3.curveStep)
      .x(function(d) {
        return x(d[0]); })
      .y(function(d) {return y(d[1]); }))
  .attr("d", d3.area()
    .x(function(d) {return x(d[0]); })
    .y0(height)
    .y1(function(d) {return y(d[1]); })) 
}

statedata('01')
console.log(countydata)
/*
// Get the different categories and count them
var categories = countynames
var n = data.columns.length
*/


// Create the Y axis for names
/*
var yName = d3.scaleBand()
.domain(categories)
.range([0, height])
.paddingInner(1)
svg.append("g")
.call(d3.axisLeft(yName));
*/

/*
var allDensity = []
countydata.map(function(d){
  density=[]
  var numb = 0
  for(i = 9; i < Object.entries(d).slice(2,d.length).length; i += 7){
    var element = Object.entries(d).slice(2,d.length)[i]
    var datele = new Date(element[0].replace('tstpos_', '').slice(0,4)+ '-' + element[0].replace('tstpos_', '').slice(4,6) + "-" + element[0].replace('tstpos_', '').slice(6,8))
    density.push([datele, element[1] - numb])
    numb = Object.entries(d).slice(2,d.length)[i][1]
  }
  allDensity.push({key: d.name, density: density})
  })
  console.log(allDensity)
// Add areas
*/
vardatebins = d3.timeDays(mindate, maxdate, 7);

/*
svg.selectAll("areas")
.data(allDensity)
.enter()
.append("path")
  .attr("transform", function(d){
    return("translate(0," + (yName(d.key)-height) +")" )
  })
  .datum(function(d){
    return(d.density)
  })
  .attr("fill", "CornflowerBlue")
  .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("d",  d3.line()
      .curve(d3.curveBasis)
      .x(function(d) {
        return x(d[0]); })
      .y(function(d) {return y(d[1]); }))
  .attr("d", d3.area()
    .x(function(d) {return x(d[0]); })
    .y0(height)
    .y1(function(d) {return y(d[1]); }))


  */


})
