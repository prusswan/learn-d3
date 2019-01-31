import * as d3 from 'd3'

(async function () {
  // Selecting and appending elements
  d3.select('#root')
    .append('h5')
    .append('text')
    .text(`D3 version: ${d3.version}`)

  // Loading external data
  const dataset = await d3.csv('/data/results.csv')
  dataset.forEach((data) => {
    console.log(data)
  })

  var sortAscending = true;
  var table = d3.select('#test').append('table');
  var titles = d3.keys(dataset[0]);
  var headers = table.append('thead').append('tr')
                   .selectAll('th')
                   .data(titles).enter()
                   .append('th')
                   .text(function (d) {
                      return d;
                    })
                   .on('click', function (d) {
                     headers.attr('class', 'header');
                     
                     if (sortAscending) {
                       rows.sort(function(a, b) { 
                         //return b[d] < a[d]; 
                         //console.log("comparing", b[d], a[d]);
                         return b[d] < a[d] ? 1 : b[d] == a[d] ? 0 : -1;
                      });
                       sortAscending = false;
                       this.className = 'aes';
                     } else {
                       rows.sort(function(a, b) { 
                         return b[d] > a[d] ? 1 : b[d] == a[d] ? 0 : -1;
                       });
                       sortAscending = true;
                       this.className = 'des';
                     }
                     
                   });
  
  var rows = table.append('tbody').selectAll('tr')
               .data(dataset).enter()
               .append('tr');
  rows.selectAll('td')
    .data(function (d) {
      return titles.map(function (k) {
        return { 'value': d[k], 'name': k};
      });
    }).enter()
    .append('td')
    .attr('data-th', function (d) {
      return d.name;
    })
    .text(function (d) {
      return d.value;
    });
}) ();