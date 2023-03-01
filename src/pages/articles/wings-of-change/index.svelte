<!-- routify:options frontmatter= { 
  "title": "The Effects of Climate Change on Migratory Birds",
  "description": "Meet the Wood Thrush. Smaller than a Robin, the Wood Thrush makes its home throughout the forests of the Eastern United States. Due to climate change, in recent years, the species has been forced to settle further North than ever before.",
  "authors": [ "Annie Fu", "Jennifer Russell", "Daniel Sanderson" ],
  "date": "December 18, 2020"
} -->

<script>

  import Winter from './_components/Winter.svelte';
  import Summer from './_components/Summer.svelte';
  import USMap from './_components/USMap.svelte';

  import woodThrushGlow from './_images/wood-thrush-glow.png';
  import birdDivider from './_images/bird_divider.png';
  import chubbyThrush from './_images/chubbythrush.jpg';
  import flyingThrush from './_images/flyingthrush2.png';
  import thrushBabies from './_images/thrushbabies.jpg';

  import thrushCall from './_audio/thrush_call.mp3';

  import counties from './_data/counties.json';
  import woodthrushSample from './_data/woodthrush_sample.csv';

  import data1990 from './_data/year_data/data_1990.csv';
  import data1995 from './_data/year_data/data_1995.csv';
  import data2000 from './_data/year_data/data_2000.csv';
  import data2005 from './_data/year_data/data_2005.csv';
  import data2010 from './_data/year_data/data_2010.csv';
  import data2015 from './_data/year_data/data_2015.csv';
  import data2020 from './_data/year_data/data_2020.csv';

  import temp1990 from './_data/temps/temp_1990.csv';
  import temp1995 from './_data/temps/temp_1995.csv';
  import temp2000 from './_data/temps/temp_2000.csv';
  import temp2005 from './_data/temps/temp_2005.csv';
  import temp2010 from './_data/temps/temp_2010.csv';
  import temp2015 from './_data/temps/temp_2015.csv';
  import temp2020 from './_data/temps/temp_2020.csv';

  import avgLatLong from './_data/avg_lat_long.csv';
  import yrAvgTemp from './_data/yr_avg_temp.csv';

  import pi_mult1 from './_images/pi_mult1.png';
  import pi_mult2 from './_images/pi_mult2.png';
  import pi_mult3 from './_images/pi_mult3.png';

  let slid = 2020;

  if (routify.inBrowser) {
    import('d3').then((d3) => (async () => {
      const woodThrushFull = await d3.csv(woodthrushSample, d3.autoType);
      // BIG MAP

      const svgmap = d3.select('#map_svg');
      const width = svgmap.attr('width');
      const height = svgmap.attr('height');
      // set the dimensions and margins of the graph
      let statesmargin = {
        top: 30, right: 30, bottom: 70, left: 150,
      };
      let stateswidth = 730 - statesmargin.left - statesmargin.right;
      let statesheight = 580 - statesmargin.top - statesmargin.bottom;

      // pi graph dimensions
      const piwidth = 120;
      const piheight = 120;
      const pimargin = 5;

      // The radius of the pieplot is half the width or half the height (smallest one).
      // I subtract a bit of margin.
      const radius = Math.min(piwidth, piheight) / 2 - pimargin;

      // append the svg object to the body of the page
      const statessvg = d3.select('#states_svg')
        .attr('width', stateswidth + statesmargin.left + statesmargin.right)
        .attr('height', statesheight + statesmargin.top + statesmargin.bottom);

      const pi_chart = d3.select('#pi_svg')
        .attr('width', piwidth)
        .attr('height', piheight)
        .append('g')
        .attr('transform', `translate(${piwidth / 2},${piheight / 2})`);

      const requestData2 = async () => {
        // GeoJson Source: https://eric.clst.org/tech/usgeojson/
        const map = counties;

        // LOADING DATASETS
        const data_1990 = await d3.csv(data1990);
        data_1990.forEach((d) => {
          d['Number Observations'] = parseInt(d['Number Observations']);
        });
        const data_1995 = await d3.csv(data1995);
        data_1995.forEach((d) => {
          d['Number Observations'] = parseInt(d['Number Observations']);
        });
        const data_2000 = await d3.csv(data2000);
        data_2000.forEach((d) => {
          d['Number Observations'] = parseInt(d['Number Observations']);
        });
        const data_2005 = await d3.csv(data2005);
        data_2005.forEach((d) => {
          d['Number Observations'] = parseInt(d['Number Observations']);
        });
        const data_2010 = await d3.csv(data2010);
        data_2010.forEach((d) => {
          d['Number Observations'] = parseInt(d['Number Observations']);
        });
        const data_2015 = await d3.csv(data2015);
        data_2015.forEach((d) => {
          d['Number Observations'] = parseInt(d['Number Observations']);
        });
        const data_2020 = await d3.csv(data2020);
        data_2020.forEach((d) => {
          d['Number Observations'] = parseInt(d['Number Observations']);
        });

        const projection = d3.geoMercator().fitSize([width, height], map);
        const path = d3.geoPath().projection(projection);

        svgmap.selectAll('path')
          .data(map.features)
          .join('path')
          .attr('d', path)
          .attr('fill', '#eae0d5')
          .attr('stroke', 'none');

        const stateDict = {
          AL: '01',
          AK: '02',
          AZ: '04',
          AR: '05',
          CA: '06',
          CO: '08',
          CT: '09',
          DE: 10,
          FL: 12,
          GA: 13,
          ID: 16,
          IL: 17,
          IN: 18,
          IA: 19,
          KS: 20,
          KY: 21,
          LA: 22,
          ME: 23,
          MD: 24,
          MA: 25,
          MI: 26,
          MN: 27,
          MS: 28,
          MO: 29,
          MT: 30,
          NE: 31,
          NV: 32,
          NH: 33,
          NJ: 34,
          NM: 35,
          NY: 36,
          NC: 37,
          ND: 38,
          OH: 39,
          OK: 40,
          OR: 41,
          PA: 42,
          RI: 44,
          SC: 45,
          SD: 46,
          TN: 47,
          TX: 48,
          UT: 49,
          VT: 50,
          VA: 51,
          WA: 53,
          WV: 54,
          WI: 55,
          WY: 56,
        };

        const woodThrush = woodThrushFull;
        woodThrush.forEach(d => {
          d.position = projection([d.lon, d.lat]);
        });

        // Source: https://www.ncdc.noaa.gov/cag/county/mapping/110/tavg/202010/10/value
        const tempData2020 = await d3.csv(temp2020, d3.autoType);
        const tempData2015 = await d3.csv(temp2015, d3.autoType);
        const tempData2010 = await d3.csv(temp2010, d3.autoType);
        const tempData2005 = await d3.csv(temp2005, d3.autoType);
        const tempData2000 = await d3.csv(temp2000, d3.autoType);
        const tempData1995 = await d3.csv(temp1995, d3.autoType);
        const tempData1990 = await d3.csv(temp1990, d3.autoType);

        const Y1990 = { a: 717, b: 1081 };
        const Y1995 = { a: 835, b: 224 };
        const Y2000 = { a: 558, b: 514 };
        const Y2005 = { a: 660, b: 594 };
        const Y2010 = { a: 1156, b: 338 };
        const Y2015 = { a: 1136, b: 634 };
        const Y2020 = { a: 812, b: 359 };

        const countyColor = d3.scaleSequential(d3.interpolateRdBu).domain([80, 30]);

        const legendScale = d3.scaleLinear()
          .domain([30, 80])
          .range([10, 190]);

        for (let i = 30; i <= 80; i += 0.25) {
          svgmap.append('rect')
            .attr('x', legendScale(i) + 10)
            .attr('y', 345)
            .attr('height', 15)
            .attr('width', 3)
            .attr('fill', countyColor(i));
          if (i % 10 == 0) {
            svgmap.append('text')
              .text(String(i))
              .attr('font-family', 'Open Sans')
              .attr('color', '#fefae0')
              .attr('stroke', '#fefae0')
              .attr('fill', '#fefae0')
              .attr('font-size', '12px')
              .attr('x', legendScale(i) + 3)
              .attr('y', 335);
          }
        }

        svgmap.append('text')
          .attr('x', 30)
          .attr('y', 315)
          .attr('font-family', 'Raleway')
          .attr('font-size', 14)
          .attr('stroke', '#eae0d5')
          .text('Avg. Annual Temperature');

        function showData(sel_year) {
          const woodThrush_filt = woodThrush.filter(d => d.year == sel_year);
          let tempData = tempData2020;

          if (sel_year == 1990) {
            tempData = tempData1990;
          }
          if (sel_year == 1995) {
            tempData = tempData1995;
          }
          if (sel_year == 2000) {
            tempData = tempData2000;
          }
          if (sel_year == 2005) {
            tempData = tempData2005;
          }
          if (sel_year == 2010) {
            tempData = tempData2010;
          }
          if (sel_year == 2015) {
            tempData = tempData2015;
          }

          tempData.forEach(d => {
            d.name = d.Location.replace(' County', '').replace(' Parish', '');
            d.name += stateDict[d['Location ID'].substring(0, 2)];
          });

          map.features.forEach(d => {
            const map_name = d.properties.NAME + d.properties.STATE;
            let val = 'nan';
            tempData.forEach(t => {
              if (map_name == t.name) {
                val = t.Value;
              }
            });
            d.properties.value = val;
          });

          svgmap.selectAll('path')
            .attr('fill', (d) => {
              if (d.properties.value == 'nan' || (!d.properties.value)) {
                return '#eae0d5';
              }
              return countyColor(d.properties.value);
            });

          svgmap.selectAll('circle')
            .data(woodThrush_filt)
            .join('circle')
            .attr('r', 2)
            .attr('opacity', 0.5)
            .attr('fill', '#3d214f')
            .attr('cx', d => d.position[0])
            .attr('cy', d => d.position[1]);
        }

        // Initialize the X axis
        const statesx = d3.scaleBand()
          .range([24, stateswidth + 60])
          .padding(0.2);
        const statesxAxis = statessvg.append('g')
          .attr('transform', `translate(0,${statesheight})`)
          .attr('stroke', '#EAE0D5')
          .attr('fill', '#EAE0D5');

        // Initialize the Y axis
        const statesy = d3.scaleLinear()
          .range([statesheight, 0]);
        const statesyAxis = statessvg.append('g')
          .attr('class', 'myYaxis')
          .attr('transform', `translate(${30}, 0 )`)
          .attr('stroke', '#EAE0D5')
          .attr('fill', '#EAE0D5');

        // A function that create / update the plot for a given variable:
        function update(statesdata) {
          // Update the X axis
          statesx.domain(statesdata.map(d => d.State));
          statesxAxis.transition().duration(1000).attr('color', '#EAE0D5').call(d3.axisBottom(statesx));

          // Update the Y axis
          statesy.domain([0, d3.max(statesdata, d => d['Number Observations'])]);
          statesyAxis.transition().duration(1000).attr('color', '#EAE0D5').call(d3.axisLeft(statesy));

          // Create the u variable
          const u = statessvg.selectAll('rect').data(statesdata);

          u
            .enter()
            .append('rect') // Add a new rect for each new elements
            .merge(u) // get the already existing elements as well
            .transition() // and apply changes to all of them
            .duration(1000)
            .attr('x', d => statesx(d.State) + 5)
            .attr('y', d => statesy(d['Number Observations']))
            .attr('width', statesx.bandwidth() - 15)
            .attr('height', d => statesheight - statesy(d['Number Observations']))
            .attr('fill', d => {
              if (d.State == 'Maine' || d.State == 'Vermont' || d.State == 'Pennsylvania' || d.State == 'New York' || d.State == 'New Jersey' || d.State == 'Delaware' || d.State == 'Conneticut' || d.State == 'Rhode Island' || d.State == 'New Hampshire' || d.State == 'Massachusetts' || d.State == 'Maryland') {
                return '#832232';
              }
              return '#c6ac8f';
            });

          const labs = statessvg.selectAll('#xaxislab');

          labs.text('');

          let xlabel;

          if (statesdata == data_1990) {
            xlabel = 'Year: 1990';
          } else if (statesdata == data_1995) {
            xlabel = 'Year: 1995';
          } else if (statesdata == data_2000) {
            xlabel = 'Year: 2000';
          } else if (statesdata == data_2005) {
            xlabel = 'Year: 2005';
          } else if (statesdata == data_2010) {
            xlabel = 'Year: 2010';
          } else if (statesdata == data_2015) {
            xlabel = 'Year: 2015';
          } else if (statesdata == data_2020) {
            xlabel = 'Year: 2020';
          }

          statessvg.append('text')
            .attr('id', 'xaxislab')
            .attr('x', 285)
            .attr('y', 538)
            .attr('font-size', '12px')
            .attr('fill', '#EAE0D5')
            .attr('stroke', '#EAE0D5')
            .style('font-family', 'Open-Sans, sans-serif')
            .style('text-anchor', 'middle')
            .attr('transform', 'rotate(20)')
            .text(xlabel);

          // If less group in the new dataset, I delete the ones not in use anymore
          u.exit().remove();
        }

        // Basic code for dynamic pie graph from: https://www.d3-graph-gallery.com/graph/pie_changeData.html
        const color = d3.scaleOrdinal().domain(['a', 'b']).range(['#832232', '#C6AC8F']);
        const local = d3.local();

        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        // update pie chart
        function update_pi(data) {
          // Compute the position of each group on the pie:
          const pie = d3.pie()
            .value(d => d.value)
            .sort((a, b) => d3.ascending(a.key, b.key));
            // This make sure that group order remains the same in the pie chart
          const entries = new Array(2);
          entries[0] = { key: 'a', value: data.a };
          entries[1] = { key: 'b', value: data.b };

          const data_ready = pie(entries);

          // map to data

          const u = pi_chart.selectAll('path').data(data_ready);

          // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
          u.enter().append('path')
            .each(function (d) {
              local.set(this, d);
            })
            .merge(u)
            .transition()
            .duration(1000)
            .attrTween('d', function (d) {
              const i = d3.interpolate(local.get(this), d);
              local.set(this, i(0));
              return function (t) {
                return arc(i(t));
              };
            })
            .attr('fill', (d) => color(d.data.key))
            .style('opacity', 1);

          // remove the group that is not present anymore
          u.exit().remove();
        }

        showData(2020);
        update(data_2020);
        update_pi(Y2020);
        const yearSlide = document.getElementById('year_slider');

        function slides(val) {
          slid = Number(val.target.value);
          showData(slid);
          if (slid == 1990) {
            update(data_1990);
            update_pi(Y1990);
          } else if (slid == 1995) {
            update(data_1995);
            update_pi(Y1995);
          } else if (slid == 2000) {
            update(data_2000);
            update_pi(Y2000);
          } else if (slid == 2005) {
            update(data_2005);
            update_pi(Y2005);
          } else if (slid == 2010) {
            update(data_2010);
            update_pi(Y2010);
          } else if (slid == 2015) {
            update(data_2015);
            update_pi(Y2015);
          } else if (slid == 2020) {
            update(data_2020);
            update_pi(Y2020);
          }
        }
        yearSlide.oninput = slides;
      };
      requestData2();

      // LAT LON VIS

      // INSPIRATION CREDIT TO THE LINE GRAPH DEMO BY JEFF RZ IN INFO 3300
      // https://jeffrz.github.io/info3300-spr2020/notes/20.02.26.notes.htm

      // Distance Traveled Chart
      const llsvg = d3.select('#lat_long_svg');
      const width2 = llsvg.attr('width');
      const height2 = llsvg.attr('height');
      const margin = {
        top: 130, right: 130, bottom: 130, left: 130,
      };
      const llWidth = width2 - margin.left - margin.right;
      const llHeight = height2 - margin.top - margin.bottom;
      const annotations = llsvg.append('g').attr('id', 'gridlines');
      const lllinechart = llsvg.append('g').attr('id', 'graphs')
        .attr('transform', `translate(${margin.left + 10},${margin.top})`);

      const vis_avg_lat_long = async () => {
        const lat_long_data = await d3.csv(avgLatLong);

        // change all dates from strings to d3 datetime objects
        const date_parser = d3.timeParse('%Y-%m-%d');
        lat_long_data.forEach(d => {
          d.date = date_parser(d.date);
          d.year = d.date.getFullYear();
        });

        // returns list of dictionaries containing the minimum and maximum array points
        function find_yr_max_mins(data) {
          // does all calculations for one year
          function for_a_yr(yr) {
            // function to filter by a year
            function yr_filter(obj) {
              return obj.year == yr;
            }

            // returns distance between two different days lat and long
            // used haversine formula to transform distances to miles
            // code example taken from https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
            function dist(p1, p2) {
              function toRad(x) {
                return x * Math.PI / 180;
              }

              const y0 = p1.latitude_mean - p2.latitude_mean;
              const x0 = p1.longitude_mean - p2.longitude_mean;
              const dlat = toRad(y0);
              const dlon = toRad(x0);
              const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(toRad(p1.latitude_mean)) * Math.cos(toRad(p2.latitude_mean)) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              const d = 3961 * c;
              return d;
            }

            const yr_data = data.filter(yr_filter);

            // code inspired from https://www.geeksforgeeks.org/maximum-distance-between-two-points-in-coordinate-plane-using-rotating-calipers-method/
            function max_dist(yr_data) {
              const n = yr_data.length;
              let maxm = 0;
              let max_pt = 0;
              let min_pt = 0;
              let dist_list = [];

              for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                  const poss = dist(yr_data[i], yr_data[j]);
                  dist_list.push(poss);
                  if (poss > maxm) {
                    maxm = poss;
                    if (yr_data[i].latitide_mean > yr_data[j].latitide_mean) {
                      min_pt = yr_data[j];
                      max_pt = yr_data[i];
                    } else {
                      min_pt = yr_data[i];
                      max_pt = yr_data[j];
                    }
                  }
                }
              }
              dist_list = dist_list.sort(d3.ascending);
              const lower = d3.quantile(dist_list, 0.993);
              const guess = d3.quantile(dist_list, 0.996);
              const upper = d3.quantile(dist_list, 0.999);
              return {
                year: yr,
                max_pt,
                min_pt,
                max_dist: maxm,
                lower_guess: lower,
                guess,
                upper_guess: upper,
              };
            }
            const big_dist = max_dist(yr_data);
            return big_dist;
          }
          const yr_max_and_mins = [];
          for (let y = 1990; y < 2021; y++) {
            yr_max_and_mins.push(for_a_yr(y));
          }
          return yr_max_and_mins;
        }

        // list of dictionaries containing the minimum and maximum array points
        const distances_per_yr_dict = find_yr_max_mins(lat_long_data);
        const yr_avg_temps = await d3.csv(yrAvgTemp);

        const yearTimeParser = d3.timeParse('%Y');
        distances_per_yr_dict.forEach(d => {
          d.YearDate = yearTimeParser(d.year);
        });

        yr_avg_temps.forEach(d => {
          const st = d.Date;
          const subst = st.substring(0, 4);
          d.YearDate = yearTimeParser(subst);
          d.Value = Number(d.Value);
        });

        const yearExtent = d3.extent(distances_per_yr_dict, d => d.YearDate);
        const yearScale = d3.scaleTime().domain(yearExtent).range([0, llWidth]);

        const distExtent = [1900, 2800];
        const distScale = d3.scaleLinear().domain(distExtent).range([llHeight, 0]);

        const tempExtent = d3.extent(yr_avg_temps, d => d.Value);
        const tempScale = d3.scaleLinear().domain(tempExtent).range([llHeight, 0]);

        const leftAxis = d3.axisLeft(distScale);
        const leftGridlines = d3.axisLeft(distScale)
          .tickSize(-llWidth - 10)
          .tickFormat('');

        annotations.append('g')
          .attr('class', 'y1 axis')
          .attr('fill', '#EAE0D5')
          .attr('transform', `translate(${margin.left + 10},${margin.top})`)
          .attr('fill', '#EAE0D5')
          .attr('stroke', '#EAE0D5')
          // .attr("opacity", ".7")
          .call(leftAxis);

        annotations.append('g')
          .attr('class', 'y1 gridlines')
          .attr('fill', '#EAE0D5')
          .attr('opacity', 0.45)
          .attr('transform', `translate(${margin.left + 10},${margin.top})`)
          .call(leftGridlines);

        annotations.append('text')
          .attr('transform', `translate(${80},${height2 / 2})rotate(-90)`)
          // .attr("transform", "rotate(-90)")
          .style('text-anchor', 'middle')
          .attr('stroke', '#EAE0D5')
          .attr('fill', '#EAE0D5')
          .text('Distance Traveled');

        const rightAxis = d3.axisRight(tempScale);

        annotations.append('g')
          .attr('class', 'y2axis')
          // .style("fill", "white")
          .attr('stroke', '#EAE0D5')
          .attr('transform', `translate(${margin.left + 10 + llWidth},${margin.top})`)
          .call(rightAxis);

        annotations.append('text')
          .attr('transform', `translate(${llWidth + 200},${height2 / 2})rotate(-90)`)
          // .attr("transform", "rotate(-90)")
          .style('text-anchor', 'middle')
          .attr('stroke', '#EAE0D5')
          .text('Annual Average Temperature')
          .attr('fill', '#EAE0D5');

        const bottomAxis = d3.axisBottom(yearScale);
        const bottomGridlines = d3.axisBottom(yearScale)
          .tickSize(-llHeight - 10)
          .tickFormat('');

        annotations.append('g')
          .attr('class', 'x axis')
          .attr('fill', '#EAE0D5')
          .attr('stroke', '#EAE0D5')
          .attr('transform', `translate(${margin.left + 10},${llHeight + margin.top})`)
          .call(bottomAxis);

        annotations.append('g')
          .attr('class', 'x gridlines')
          .attr('fill', '#5E503F')
          .attr('stroke', '#5E503F')
          .attr('opacity', 0.45)
          // .attr("stroke", "white")
          .attr('transform', `translate(${margin.left + 10},${llHeight + margin.top})`)
          .call(bottomGridlines);

        annotations.append('text')
          .attr('transform', `translate(${llWidth / 2 + margin.left + 22},${llHeight + margin.top + 50})`)
          .style('text-anchor', 'middle')
          .attr('fill', '#EAE0D5')
          .attr('stroke', '#EAE0D5')
          .text('Year');

        const lineGenerDist = d3.line()
          .x(d => yearScale(d.YearDate))
          .y(d => distScale(d.guess))
          .curve(d3.curveMonotoneX);

        d3.line()
          .x(d => yearScale(d.YearDate))
          .y(d => tempScale(d.Value));

        // confidence band
        lllinechart.append('path').datum(distances_per_yr_dict)
          // .attr("fill", "#EAE0D5")
          .attr('fill', '#C6AC8F')
          .attr('opacity', 0.55)
          .attr('stroke', 'none')
          .attr('d', d3.area().curve(d3.curveMonotoneX)
            .x((d) => yearScale(d.YearDate))
            .y0((d) => distScale(d.lower_guess))
            .y1((d) => distScale(d.upper_guess)));

        import('d3-regression').then(({ regressionLinear }) => {
          const linearRegression = regressionLinear()
            .x(d => d.YearDate)
            .y(d => d.Value);
          // line chart temp
          lllinechart.append('line').datum(linearRegression(yr_avg_temps))
            .attr('x1', d => yearScale(d[0][0]))
            .attr('x2', d => yearScale(d[1][0]))
            .attr('y1', d => tempScale(d[0][1]))
            .attr('y2', d => tempScale(d[1][1]))
            .attr('class', 'line')
            .attr('data-legend', 'Average Annual Temperature')
            .attr('stroke', '#832232')
            // .attr("stroke", "#ab293f")
            .style('stroke-dasharray', ('12, 12'))
            .attr('stroke-width', 3)
            .attr('opacity', 1);
        });

        // line chart dist
        lllinechart.append('path').datum(distances_per_yr_dict)
          .attr('class', 'line')
          .attr('data-legend', 'Migratory Distance')
          .attr('fill', 'none')
          .attr('stroke', '#EAE0D5')
          // .attr("stroke", "#C6AC8F")
          .attr('stroke-width', 2)
          .attr('opacity', 1)
          .attr('d', lineGenerDist);

        lllinechart.selectAll('circle').data(distances_per_yr_dict)
          .join('circle')
          .attr('r', 3)
          .attr('fill', '#EAE0D5')
          .attr('cx', d => yearScale(d.YearDate))
          .attr('cy', d => distScale(d.guess));

        const llmouseGroup = lllinechart.append('g');
        const valuemark = llmouseGroup.append('circle')
          .attr('id', 'value')
          .attr('fill', 'none')
          .attr('stroke', '#eae0d5')
          .attr('stroke-width', 2)
          .attr('r', 10)
          .attr('opacity', 0);

        const dist_label = llmouseGroup.append('text')
          .attr('id', 'label')
          .attr('stroke', '#eae0d5')
          .attr('fill', '#eae0d5')
          .attr('opacity', 0);

        const dist_label2 = llmouseGroup.append('text')
          .attr('id', 'label2')
          .attr('stroke', '#eae0d5')
          .attr('fill', '#eae0d5')
          .attr('opacity', 0);

        const active = llmouseGroup.append('rect')
          .attr('id', 'active')
          .attr('width', llWidth)
          .attr('height', llHeight)
          .attr('fill', 'none')
          .attr('pointer-events', 'all');

        const find_closest_x = d3.bisector(d => d.YearDate).right;

        active.on('mouseover', () => {
          valuemark.attr('opacity', 1);
          dist_label.attr('opacity', 1);
          dist_label2.attr('opacity', 1);
        });

        active.on('mouseout', () => {
          // Hide them when mousing out of chart
          valuemark.attr('opacity', 0);
          dist_label.attr('opacity', 0);
          dist_label2.attr('opacity', 0);
        });

        active.on('mousemove', (event) => {
          const mouse_loc = d3.pointer(event);
          const x = mouse_loc[0];
          const xyear = yearScale.invert(x);
          const i = find_closest_x(distances_per_yr_dict, xyear);
          const d = distances_per_yr_dict[i];

          const d2 = yr_avg_temps[i];

          const xPos = yearScale(d.YearDate);
          const yPos = distScale(d.guess);
          valuemark.attr('cx', xPos).attr('cy', yPos);

          const txt2 = `${Math.round(d.guess)} mi`;
          const txt = `Avg Temp: ${d2.Value} °F`;

          dist_label.text(txt);
          if (xPos < llWidth / 2.0) {
            dist_label.attr('x', xPos + 4).attr('y', yPos - 15).attr('text-anchor', 'start');
          } else {
            dist_label.attr('x', xPos + 4).attr('y', yPos - 15).attr('text-anchor', 'start');
          }

          dist_label2.text(txt2);
          if (xPos < llWidth / 2.0) {
            dist_label2.attr('x', xPos + 4).attr('y', yPos - 33).attr('text-anchor', 'start');
          } else {
            dist_label2.attr('x', xPos + 4).attr('y', yPos - 33).attr('text-anchor', 'start');
          }
        });

        // legend
        const lllegendwidth = 200;
        const lllegendheight = 50;
        lllinechart.append('rect')
          .attr('width', lllegendwidth)
          .attr('height', lllegendheight)
          .attr('fill', '#eae0d5')
          .attr('opacity', 0.55)
          .attr('class', 'latlonglegend')
          .attr('transform', `translate(${llWidth - lllegendwidth - 10},${10})`);

        lllinechart.append('text')
          .attr('color', '#832232')
          .attr('transform', `translate(${llWidth - lllegendwidth - 5},${30})`)
          .text('Distance (mi)');

        lllinechart.append('line')
          .attr('color', '#832232')
          .attr('transform', `translate(${llWidth - lllegendwidth + 100},${23})`)
          .attr('x1', 0)
          .attr('x2', 70)
          .attr('y1', 5)
          .attr('y2', 5)
          .attr('class', 'line')
          .attr('stroke', '#EAE0D5')
          .attr('stroke-width', 2)
          .attr('opacity', 1);

        lllinechart.append('text')
          .attr('color', '#832232')
          .attr('transform', `translate(${llWidth - lllegendwidth - 5},${50})`)
          .text('Temperature');

        lllinechart.append('line')
          .attr('color', '#832232')
          .attr('transform', `translate(${llWidth - lllegendwidth + 100},${43})`)
          .attr('x1', 0)
          .attr('x2', 70)
          .attr('y1', 5)
          .attr('y2', 5)
          .attr('class', 'line')
          .attr('stroke', '#832232')
          .style('stroke-dasharray', ('12, 12'))
          .attr('stroke-width', 3)
          .attr('opacity', 1);
      };
      vis_avg_lat_long();
      // set the dimensions and margins of the graph
      statesmargin = {
        top: 30, right: 30, bottom: 70, left: 150,
      };
      stateswidth = 760 - statesmargin.left - statesmargin.right;
      statesheight = 580 - statesmargin.top - statesmargin.bottom;

      const pi_lgnd = d3.select('#pi_legend');

      pi_lgnd.append('circle').attr('cx', 10).attr('cy', 7).attr('r', 6)
        .style('fill', '#832232');
      pi_lgnd.append('circle').attr('cx', 145).attr('cy', 7).attr('r', 6)
        .style('fill', '#C6AC8F');
      pi_lgnd.append('text').attr('x', 30).attr('y', 7).text('Northeast')
        .style('font-size', '15px')
        .attr('fill', '#EAE0D5')
        .attr('alignment-baseline', 'middle');
      pi_lgnd.append('text').attr('x', 165).attr('y', 7).text('Other')
        .style('font-size', '15px')
        .attr('fill', '#EAE0D5')
        .attr('alignment-baseline', 'middle');

      statessvg.append('circle').attr('cx', 420).attr('cy', 75).attr('r', 6)
        .style('fill', '#832232');
      statessvg.append('circle').attr('cx', 420).attr('cy', 95).attr('r', 6)
        .style('fill', '#C6AC8F');
      statessvg.append('text').attr('x', 435).attr('y', 75).text('Northeast')
        .style('font-size', '15px')
        .attr('fill', '#EAE0D5')
        .attr('alignment-baseline', 'middle');
      statessvg.append('text').attr('x', 435).attr('y', 95).text('Other')
        .style('font-size', '15px')
        .attr('fill', '#EAE0D5')
        .attr('alignment-baseline', 'middle');
    })());
  }
</script>

<style>

  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v18/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpbCIPrE.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8OUuhp.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  #wrapper {
    background: #1D2D34;
    font-family: 'Raleway', sans-serif;
    padding: 2rem 0rem;
  }

  .wrapper-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 0.5rem;
    overflow: hidden;
  }

  h1 {
    color: #eae0d5;
    color: #eae0d5;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    font-size: 46px;
    padding-top: 2rem;
    margin-top: 0;
  }

  h2 {
    color: #eae0d5;
    font-family: 'Raleway', sans-serif;
    font-size: 24px;
  }

  h3 {
    color: #eae0d5;
  }

  p {
    color: #eae0d5;
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    font-size: 18px;
    margin-left: auto;
    margin-right: auto;
    letter-spacing: .5px;
  }

  .credit {
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    font-size: 11px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    letter-spacing: .5px;
    margin-top: 8px;
  }

  a, b {
    color: #C6AC8F;
  }

  /* a { */
    /* text-decoration: underline; */

    /* hover {
      text-decoration: underline;
    }
  } */

  #states_and_pi {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .intro-img-text {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(27rem, 1fr));
  }

  .intro-text {
    font-size: 18px;
  }

  #slider_box {
    padding: 15px;
    background: #1D2D34;
    text-align: center;
    display: block;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-bottom: 2px solid #C6AC8F;
    max-width: 100%;
  }

  #year_slider {
    width: 500px;
    max-width: 100%;
    display: block;
    margin: 0 auto;
    -webkit-appearance: none;
    appearance: none;
    background: #1D2D34;
  }

  /* Slider styling help source: https://dev.to/_phzn/styling-range-sliders-with-css-4lgl */

  #year_slider:focus {
    outline: none;
  }

  #year_slider::-webkit-slider-runnable-track {
    background: #eae0d5;
    height: 3px;
  }

  #year_slider::-moz-range-track {
    background: #eae0d5;
    height: 3px;
  }
  
  
  audio {
    margin: auto;
    filter: sepia(60%) saturate(60%) grayscale(2) contrast(80%) invert(12%);
    width: 250px;
    height: 30px;
  }

  #year_slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #eae0d5;
    height: 18px;
    width:3px;
    margin-top: -7.5px;
  }

  #year_slider::-moz-range-thumb {
    background: #eae0d5;
    height: 10px;
    width:10px;
    margin-top: -5px;
  }

  #tick_labels {
    display: inline-block;
    width: 200;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .tick_label {
    margin: 19px;
  }

  #mult_box1 {
    display:flex;
    justify-content: center;
  }

  #mult_box2 {
    display:flex;
    justify-content: center;
  }

  #intro-text p strong {
    font-size: 36px;
    font-weight: normal;
  }

  .box {
    border: 2px solid #1D2D34;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: -5px;
    padding-bottom: 10px;
    background: #1D2D34;
  }

  .flex-container {
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: space-between;
    flex-wrap: wrap;
  }

  #winter_div, #summer_div {
    display: flex;
  }

  #box1 {
    border-right: 2px solid #eae0d5;
    border-bottom: 2px solid #eae0d5;
  }

  #box2 {
    border-bottom: 2px solid #eae0d5;
  }

  #box3 {
      border-right: 2px solid #eae0d5;
  }

  #temp_map {
    text-align: center;
  }

  #lat_long_svg {
    display: block;
    margin: auto;
  }

  #chub {
    width: 47%;
    margin-left:27%;
  }

  #fly {
    width: 30%;
    margin-left:35%;
  }

  #babies {
    width: 40%;
    margin-left:30%;
  }

  .center {
    text-align: center;
  }

  .expand_margin {
    margin-top: 20px;
  }
</style>



<div id="wrapper">
<div class="wrapper-inner">
  <div id="header">
    <h1> Wings of Change</h1>
    <h2> <i>The Effects of Climate Change on Migratory Birds </i></h2>
  </div>
  <div id="intro-image-text" class="intro-img-text">
    <div class="intro-img">
      <figure>
        <img src={woodThrushGlow} alt="Wood Finch sitting on a branch, singing" width=74%>
        <!-- <figcaption style ="color: #eae0d5; font-family: 'Open Sans', sans-serif;"> The Wood Finch is one of the most notorious North American Song Birds</figcaption> -->
      </figure>
    </div>
    <div class="intro-text" id="intro-text">
      <p><strong>M</strong>eet the <b>Wood Thrush</b>. Smaller than a Robin, the Wood Thrush makes its home throughout the forests of the Eastern United States.</p>
      <p>While the birds aren’t frequently seen in urbanized areas, their singsong nature would be recognizable to most who’ve spent time hiking or live near a wooded area: </p>
      <p class="credit">
      <!-- svelte-ignore a11y-media-has-caption -->
        <audio controls>
          <source src={thrushCall} type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <br /><br />
        Michael Andersen / Macaulay Library at the Cornell Lab of Ornithology (ML125223)
      </p>
      <p>
        The Wood Thrush survives off a diet of insects and small fruits, eating copious amounts to fuel migration each year. 
      </p>
    </div>
  </div>
  <div style="text-align: center"><img src={birdDivider} width="600px;" style="margin:auto;" alt="Vector drawning of birds flying"></div>
  <div>
    <p>
      The Wood Thrush is a <b>long distance migrant,</b> spending springs and summers breeding in the eastern United States. In fall, it migrates to central America, taking on a lengthy journey and tackling amazing feats like crossing the Gulf of Mexico in a single night’s flight. In the early spring, it makes the same lengthy trip back to the Northeastern forests. Since these journeys are so strenuous, the availablity of ripe fruit and insect populations greatly impacts the distance of its trips.
      <a href=https://www.allaboutbirds.org/guide/Wood_Thrush/maps-range> Source </a>
    </p>
    <p>
      <!-- Over the last 50 years, the Wood Thrush population has been in decline. Every year, the number of Wood Thrushes declines about 2%. To further investigate the effects of climate change on this vulnerable species and its food source, we turned to the data collected by <a href="https://ebird.org/home" target="_blank">eBird at the Cornell Lab of Ornithology.</a> Every day, millions of bird sightings are recorded into the system by bird enthusiasts and experts around the globe. -->
    </p>
  </div>
  <br />
  <!-- <img src="images/color-palette.png" style="width: 500px; ">
    <p style="color: white;">Proposed color palette to use</p></img> -->
  <br />
  <img src={chubbyThrush} id="chub" alt="A wood thrush">
  <!-- img source: https://abcbirds.org/bird/wood-thrush -->
  <div>
    <p>
      In the last 30 years, the Wood Thrush population has become more and more densely populated in the Northeastern United States. This can be seen in the maps below, as the more Southern and Western population clusters are moving North and East.  This is likely due to these already warmer areas becoming too hot for the Wood Thrush to find sustainable nutrition. This loss in habitable areas is projected to continue, as “the Wood Thrush is on track to be declining or completely wiped out from 90% of its range under the worst temperature increase scenario.”
      <a href="https://www.wfae.org/energy-environment/2019-10-11/new-report-shows-climate-change-will-put-two-thirds-of-north-american-birds-at-risk">Source</a>
    </p>
  </div>
  <!--small  multiples-->
  <div id=mult_box1>
    <div id=box1 class=box>
      <h3>1990</h3>
      <USMap id="mult_4">
        <path fill="#FFF" d="M297.5 148l2.5-2.1 1.9-1.9 2.1-3.6.3-.4 1-4-.5-4-.8-1.7-1.2-2.3-2.8-3.6-.3-.4-2.7-4-1-3.1-.3-.9.3-1 .7-3 2.2-4 1.1-1.7 1.5-2.3 2.5-3.3.6-.7 3.4-3h4l2.9 3 1.1 1.2 2 2.8 2 2.2 1.8 1.8 2.2 1.8 4 2.1.3.1 3.7 1.3 4 .6h4l4-.6 3.4-1.3.6-.2 4-1.7 3-2.1 1-.7 3.7-3.3.3-.3 3.4-3.7.6-.7 3-3.3 1-1 3-3 1-.8 4-3 .4-.2 3.6-2 2.9-2 1.1-.8 3.2-3.2.8-1 2.2-3 1.8-4 1.2-4 .5-4v-4l-.8-4-.9-2.1-.8-1.9-3-4-.2-.2-4-3.1-1.6-.7-2.4-1-4-.9-4-.3h-4l-4 .4-4 .6-4 .6-4 .3h-4l-2.4.3-1.6.1-4 .6-4 1-4 1.8-.6.5-3.4 3-1.1 1-2.9 3.1-1 .9-3 2.4-4 1-4-.2-4-.6-4-.6-4-.9-4-.8-1.1-.3-2.9-.9-4-1.4-4-1.2-4-.5-4 .1-4 .4-4 .9-4 1.6-2 1-2 .9-4 2.3-1 .8-3 3-1 1-2 4-.5 4 .4 4 1.6 4 1.5 2.2 1.2 1.8 2.4 4 .4 1.1 1.2 2.9-.5 4-.7.6-3.3 3.4-.7.6-4 3.2-.2.2-3.8 3-1.2 1-2.8 2.4-1.6 1.6-2.4 2.2-2.8 1.8-1.2 1.2-2.8 2.8-1.2 4 1.1 4 2.9 3.2.6.8 3.4 2.6 1.6 1.4 2.4 1.5 4 1.4 4 .7h4l4-.7 4-1.9 2.2-1 1.8-1 4-2 4-.1 2 3.1 1.6 4 .4.7 1.6 3.3 2.4 3.4.8.6 3.2 1.8 4 .7 4-.2 4-1.4zm-65.4 32l3-4 .9-4-.6-4-2.3-4-1.1-1-4-2.1-4-.7-4 .4-4 1.8-2 1.6-2 3.5-.2.5-.4 4 .6 3.3.2.7 2.7 4 1.1.8 4 1.6 4 .4 4-.6 4-2.1z"/>
        <path fill="#EADADD" d="M346.6 108l1.4-.5 4-2.1 1.8-1.4 2.2-1.8 2.2-2.2 1.8-2 1.7-2 2.3-2.8 1.1-1.2 2.9-2.8 1.4-1.2 2.6-2 3-2 1-.6 4-2.7.8-.7 3.2-2.8 1-1.2 2.4-4 .6-2 .7-2 .5-4-.3-4-.9-2.7-.4-1.3-2.7-4-.9-1-4-2.5-1.6-.5-2.4-.8-4-.5-4 .1-4 .6-2.3.6-1.7.4-4 1-4 1-4 .6-3.7 1-.3.1-4 1.5-3.8 2.4-.2.2-3 3.8-1 1.6-1.2 2.4-2.6 4-.2.2-4 3.3-1.3.5-2.7 1.1-2.2-1.1-1.8-1-3-3-1-.5-4-1.5-4-1-4-.8-1.8-.2-2.2-.3-4-.5-4-1.4-3.9-1.8h-.1l-4-1-4-.3h-4l-4 1-.6.3-3.4 1.8-3.3 2.2-.7.8-2.3 3.2-.9 4 .6 4 2.5 4 .1.1 4 3.6.4.3 3.6 3.6.4.4 3.4 4 .2.3 2.3 3.7 1.7 3.8.1.2 3.9 3.2 4 .5 4-.6 4-1.8 1.5-1.3 2.5-1.8 2.2-2.2 1.8-1.8 2.2-2.2 1.8-1.7 2.8-2.3 1.2-1 4-1 3.9 2 .1.1 1.4 3.9 1.7 4 .9 1.6 1 2.4 3 3.7.2.3 3.8 3.2 2 .8 2 .9 4 .8 4 .1 4-.7zm-90 20l2.5-4 .9-2.5.7-1.5.4-4-1.1-1-4-1-3.5 2-.5.3-4 2.5-1.6 1.2-2 4 1.2 4 2.4 1.8 4 .5 4-1.7z"/>
        <path fill="#D6B5BB" d="M289 92l3-1 4-2.8.2-.2 3.8-3.4.7-.6 3.3-3.9.1-.1.3-4-.4-.5-3.4-3.5-.6-.3-4-.5h-4l-4-1.4-2.8-1.8-1.2-.6-4-1.4-4-1-4-.4-4 1.6-1.8 1.8-1.5 4 .7 4 2.6 3 1.3 1 2.7 1.9 3.7 2.1.3.2 3.8 3.8.2.3 4 3 2.6.7 1.4.3zm59.5 12l3.5-2.2 2.1-1.8 1.9-1.8 2-2.2 2-2.5 1.3-1.5 2.7-3.4.6-.6 3.4-3 1.2-1 2.8-2 3.2-2 .8-.5 4-3 .6-.5 3.2-4 .2-.4 1.4-3.6.4-4-.4-4-1.4-3.2-.5-.8-3.5-3.3-1.5-.7-2.5-1-4-.7-4 .2-4 .7-2.2.8-1.8.6-4 1.7-3.7 1.7-.3.2-4 1.7-3.3 2.1-.7.5-4 3.5-3.9 4h-.1l-3.8 4-.2.2-4 3.6-.2.2-3.3 4-.5.8-1.9 3.2-.6 4 .3 4 1.2 4 1 2 1 2 3 3.4 1 .6 3 1.6 4 1 4 .2 4-.7 4-1.8z"/>
        <path fill="#C19199" d="M341.1 104l2.9-.5 4-2 2.2-1.5 1.8-1.4 2.6-2.6 1.4-1.5 2.1-2.5 1.9-2.6 1.2-1.4 2.8-3.5.5-.5 3.5-2.9 1.7-1.1 2.3-1.4 4-2.5.1-.1 3.9-3.6.3-.4 2-4 .4-4-.8-4-1.9-3-1.2-1-2.8-1.6-4-.9-4 .2-4 1-2.9 1.3-1.1.6-4 2.4-1.7 1-2.3 1.7-3.5 2.3-.5.3-4 3-1 .7-3 2.1-2.2 1.9-1.8 1.2-3 2.8-1 .9-3 3.1-1 1.2-1.9 2.8-1.1 4v4l1 4 2 3.5.4.5 3.6 2.6 4 1.3.8.1 3.2.2z"/>
        <path fill="#AC6C76" d="M346 100l2-1.3 3.4-2.7.6-.6 3.1-3.4.9-1.2 2-2.8 2-3 .8-1 3.2-3.8.2-.2 3.8-2.5 2.7-1.5 1.3-.8 4-2.8.4-.4 2.5-4 .5-4-1.5-4-1.9-1.7-4-1.5-4 .1-4 1.4-3 1.7-1 .8-3.9 3.2-.1.1-4 3-1.5.9-2.5 1.3-4 2.4-.5.3-3.5 2.1-2.6 1.9-1.4 1-3 3-1 1-2.5 3-1.5 3.5-.2.5-.1 4 .3 1.2 1 2.8 3 3.6.7.4 3.3 1.4 4 .4 4-.7z"/>
        <path fill="#984754" d="M347.9 96h.1l4-3.8.1-.2 2.8-4 1.1-2 1.1-2 2.1-4 .8-1.3 3-2.7 1-.8 4-1.9 2.6-1.3 1.4-1 2.5-3 .3-4-2.8-3-4-.1-4 2.1-1.2 1-2.8 2.9-1.2 1.1-2.8 2.4-3.4 1.6-.6.2-4 1.4-4 1.6-1.3.8-2.7 1.6-3.1 2.4-.9.7-3.1 3.3-.9 1.5-1.2 2.5-.2 4 1.4 3.3.5.7 3.5 2.6 4 .7 4-.8z"/>
        <path fill="#832232" d="M342.5 96l1.5-.3 4-3 .7-.7 3-4 .3-1 1.1-3v-4l-1.1-1.4-4-.6-4 .8-2 1.2-2 1.1-3.6 2.9-.4.5-2 3.5v4l2 2.9 2.3 1.1 1.7.5z"/>
      </USMap>
    </div>
    <div id=box2 class=box>
      <h3>2000</h3>
      <USMap id="mult_3">
        <path fill="#FFF" d="M298.46 152l1.54-1 2.94-3 1.06-2 1.07-2 1.04-4 .78-4-.07-4-1.86-4-.96-1.02-2-2.98-2-2.43-.95-1.57-2.25-4-.8-3.36-.14-.64.14-.77.6-3.23 2.47-4 .93-1.18 3.41-2.82.59-.37 4-.36 1.37.73 2.63 1.47 2.99 2.53 1.01 1.01 2.93 2.99 1.07 1.43 2.64 2.57 1.36 2 4 1.92 4-.06 4-.4 4-.47 4-.84 4-1.42 1.53-.73 2.47-.92 4-2.64.51-.44 3.49-2.75 1.32-1.25 2.68-2.64 1.3-1.36 2.7-3.16.73-.84 3.27-3.79.21-.21 3.79-3.57.46-.43 3.54-3.6.4-.4 3.38-4 .22-.32 2.66-3.68 1.34-3.04.5-.96 1.14-4 .4-4-.23-4-1.08-4-.73-1.32-1.6-2.68-2.4-2.54-2.4-1.46-1.6-.87-4-1.27-4-.46-4 .06-4 .49-4 .86-3.86 1.19-.14.04-4 1.08-4 1.26-4 1.55-.21.07-3.79 1.2-4 1.22-4 1.3-.67.28-3.33 1.4-4 1.48-2.73 1.12-1.27.45-4 .98-4 .22-4-.6-3.38-1.05-.62-.2-4-2.3-3.2-1.5-.8-.43-4-1.67-4-1.26-2.71-.64-1.29-.33-4-.16-4 .2-3.71.29-.29.02-4 .57-4 1.17-4 1.51-1.4.73-2.6 1.32-3.06 2.68-.94 1.18-1.95 2.82-1.24 4-.51 4-.14 4 .33 4 .79 4-.21 4-1.07 1.62-4 2.08-1.42.3-2.58.72-4 2.62-.77.66-1.28 4 .45 4 1.43 4 .17.52 1.15 3.48.39 4 1.32 4 1.14 1.22 2.85 2.78 1.15.74 4 1.98 4 1.01 1.46.27 2.54.4 4 1.28 1.39 2.32 1.93 4 .68 1.47.78 2.53 1.75 4 1.47 2.36 1.17 1.64 2.83 2.6 2.25 1.4 1.75.88 4 1.14 4 .61 4 .12 4-.3 4-1.19zm-69.2 32l2.74-1.66 2.84-2.34 1.16-1.67 1.8-2.33 1.35-4 .05-4-1.67-4-1.53-1.38-3.51-2.62-.49-.28-4-1.86-4-.64-4 .06-4 .79-3.83 1.93-.17.09-3.94 3.91-.06.15-1.63 3.85-.41 4 .52 4 1.52 3.39.27.61 3.73 3.58.92.42 3.08 1.41 4 .62 4-.2 4-1.1z"/>
        <path fill="#EADADD" d="M347.9 108l.1-.03 4-1.66 3.24-2.31.76-.54 3.8-3.46.2-.2 3.61-3.8.39-.44 3.15-3.56.85-1 2.81-3 1.19-1.4 2.51-2.6 1.49-1.72 2.04-2.28 1.96-2.62 1.04-1.38 2.16-4 .8-2.97.31-1.03.27-4-.58-3.46-.1-.54-2.15-4-1.75-1.67-4-2.2-.5-.13-3.5-.93-4-.2-4 .48-2.49.65-1.51.33-4 1.25-4 1.74-1.4.68-2.6 1.24-4 2.5-.44.26-3.56 2.04-3.33 1.96-.67.35-4 1.99-3.14 1.66-.86.4-4 1.21-4 1.4-4 .9-3.72.09h-.37l-3.91-.34-4-1.08-3.2-2.58-.8-.52-4-2.34-2.2-1.14-1.8-.79-4-1.86-2.98-1.35-1.02-.36-4-.5-4-.3-4-.26-4 .4-3.06 1.02-.94.34-4 1.98-2.15 1.68-1.85 2.83-.54 1.17-.63 4 .4 4 .77 1.76 1.44 2.24 2.56 2.33 2.7 1.67 1.3.94 4 2.55.8.51 3.2 2.56 1.57 1.44 2.43 3.27.6.73 2.95 4 .45.52 4 1.28 4-1.27.6-.53 3.4-2.82 1.02-1.18 2.98-3.12 1.01-.88 2.99-2.52 3.34-1.48.66-.35 1.3.35 2.7.52 4 3.15.24.33 3.76 3.83.11.17 3.24 4 .65.65 3.3 3.35.7.63 4 2.83 1.41.54 2.59 1.1 4 .83 4 .1 4-.62zm-57.84 36l1.94-1.52 1.43-2.48.68-4-.7-4-1.41-2.8-.97-1.2-3.03-2.55-4-1.03-4 1.06-2.35 2.52-1.65 3.66-.1.34-.28 4 .38 1.82.61 2.18 3.39 3.84.34.16 3.66 1.1 4-.26zm-62.16 32l.1-.17 1.22-3.83-.64-4-.58-.8-4-2.42-4-.16-4 1.96-1.2 1.42-.97 4 1.17 4 1 1.09 4 1.7 4-.42z"/>
        <path fill="#D6B5BB" d="M282.35 76l-.58-4-1.77-1.06-3.03-2.94-.97-.44-4-1.94-4 .13-3.6 2.25-.4.72-1.16 3.28 1.16 3.47.28.53 3.72 2.3 4 .92 4-.98 4-1.35zm67.32 28l2.33-1.13 3.7-2.87.3-.24 3.84-3.76.16-.18 3.47-3.82.53-.62 2.97-3.38 1.03-1.35 2.3-2.65 1.7-2.15 1.64-1.85 2.36-3.07.73-.93 2.3-4 .97-3.54.13-.46v-4l-.13-.45-1.34-3.55-2.66-2.71-2.44-1.29-1.56-.6-4-.52-4 .37-2.87.75-1.13.28-4 1.47-4 2.07-.33.18-3.67 2.07-2.73 1.93-1.27.84-4 2.58-.94.58-3.06 1.7-3.69 2.3-.31.19-4 2.21-3.08 1.6-.92.61-3.98 3.39-.02.04-2.38 3.96.15 4 1.5 4 .73 1.1 1.47 2.9 2.53 3.31.55.69 3.45 3.05 1.69.95 2.31 1.18 4 1.18 4 .31 4-.49 4-1.33z"/>
        <path fill="#C19199" d="M351.84 100l.16-.09 4-3.28.64-.63 3.36-3.65.32-.35 3.48-4 .2-.27 2.89-3.73 1.11-1.6 1.91-2.4 2.09-2.85.9-1.15 2.26-4 .84-3.55.11-.45-.11-1-.44-3-3.24-4-.32-.2-4-1.12-4 .12-4 .99-.52.21-3.48 1.46-4 2.2-.55.34-3.45 1.98-2.9 2.02-1.1.7-4 2.46-1.34.84-2.66 1.59-3.53 2.41-.47.36-4 3-.85.64-3.15 3.89-.08.11-1 4 .72 4 .36.69 1.57 3.31 2.43 2.94 1.18 1.06 2.82 1.82 4 1.57 4 .5 4-.45 4-1.33z"/>
        <path fill="#AC6C76" d="M346.7 100l1.3-.47 4-2.27 1.5-1.26 2.5-2.44 1.45-1.56 2.55-2.99.89-1.01 2.96-4 .15-.23 2.54-3.77 1.46-2.31 1.21-1.69 2.04-4 .5-4-2.38-4-1.37-.82-4-.52-4 .8-1.31.54-2.69 1.09-4 2.04-1.49.87-2.51 1.32-4 2.58-.16.1-3.84 2.31-2.61 1.69-1.39.94-3.8 3.06-.2.22-3.46 3.78-.54 1.33-1.05 2.67.36 4 .69 1.4 1.43 2.6 2.57 2.37 2.61 1.63 1.39.64 4 .75 4-.41z"/>
        <path fill="#984754" d="M349.81 96l2.19-1.51 2.55-2.49 1.45-1.65 2-2.35 2-2.92.78-1.08 2.43-4 .79-1.47 1.4-2.53 1.27-4-1.9-4-.77-.43-4-.01-1.41.44-2.59.76-4 1.65-3.2 1.59-.8.39-4 2.44-1.9 1.17-2.1 1.3-3.82 2.7-.18.16-3.5 3.84-.5 1.1-1.35 2.9.28 4 1.07 1.8 1.57 2.2 2.43 1.68 4 1.14 4-.31 4-1.44z"/>
        <path fill="#832232" d="M344.1 96l3.9-1.69 3.4-2.31.6-.52 3.02-3.48.98-1.6 1.5-2.4 1.86-4 .64-2.36.5-1.64-.5-1.46-4-1.51-4 .93-4 1.56-.8.48-3.2 1.87-3.54 2.13-.46.34-3.95 3.66-.05.1-1.83 3.9.45 4 1.38 1.81 3.5 2.19.5.17 4-.14z"/>
      </USMap>
    </div>
  </div>
  <div id=mult_box2>
    <div id=box3 class=box>
      <h3>2010</h3>
      <USMap id="mult_2">
        <path fill="#FFF" d="M244 104l-1.2-4-2.8-3.4-.7-.6-3.3-1.4-4 .2-2.4 1.2-1.2 4 2.8 4 .8.5 4 1.5 4 .2zm45.5 52l2.5-.4 4-1.4 3.7-2.2.3-.2 4-2.8 1.3-1 2.7-2.4 1.6-1.6 2.4-2.6 1.2-1.4 2.8-4 2.6-4 1.4-3.1.4-.9.7-4 .9-4 2-1.2 4-.1 4-.1 4-.2 4-.5 4-.8 2.5-1.1 1.5-.5 4-2 2-1.5 2-1.6 2.5-2.4 1.5-1.5 2.3-2.5 1.7-1.9 2-2.1 2-2.2 1.8-1.8 2.2-2.3 1.8-1.7 2.2-2.2 1.9-1.8 2.1-2.2 1.9-1.8 2.1-2.5 1.3-1.5 2.4-4 .3-.8 1.4-3.2 1-4 .2-4-.4-4-1.3-4-.9-1.6-1.6-2.4-2.4-2.3-3.5-1.7-.5-.3-4-1-4-.3h-8l-4 .1-4-.3-4-.7-4-1-4-.4-3.6-.1h-.4l-4 .4-4 1.2-4 2.2-.3.2-3.7 2.7-1.3 1.3-2.7 3.7-.3.3-3 4-.7.8-4 2-4-.2-4-.9-4-1.4-.9-.3-3.1-1-4-.4-4 .3-3.5 1.1-.5.2-4 2.6-2.2 1.2-1.8 1.7-4 1.4-2.7.9-1.3.6-3.8 3.4-.2.8-.5 3.2.5 1.3 1.4 2.7 2.5 4 .1.5.7 3.5 1.4 4 1.6 4 .3.8 1.6 3.2 2.4 3.2 1.4.8 2.6 1.6 4-.2 4-.7 1-.7 3-.9 4-2.1 1.6-1 2.4-.9 4-1.1 4-.3 3.8 2.3.2.1 2.2 3.9 1.8 3.6.2.4.5 4-.7 1.6-4 1.3-4-.3-4-.8-4-.5-4-.6-4-.6-1.7-.1-2.3-.6-4 .2-4 .4-4 1-4 2-1.3 1-2.7 3-.6 1-1.5 4-.1 4 .7 4 1.3 4 .2.5 1.2 3.5 1.8 4 1 1.9 1.3 2.1 2.7 3.5.5.5 3.5 3 3.2 1 .8.3h4zm-64.7 24l3.2-2 2-2 2-3.3.5-.7 1.1-4-1.1-4-.5-.4-4-2.4-4-.2-4 .4-4 1-2.8 1.6-1.2 1.2-1.7 2.8-.6 4 .8 4 1.5 2.2 2.2 1.8 1.8.8 4 .3 4-.8z"/>
        <path fill="#F0E3E5" d="M345 112l3-1 4-2.6.5-.4 3.5-2.7 1.3-1.3 2.7-2.9 1-1.1 3-3.2.8-.8 3.2-3.4.6-.6 3.4-3.6.4-.4 3.6-4 3.4-4 .6-.8 2.3-3.2 1.7-4 1-4 .1-4-1-4-.1-.2-2.6-3.8-1.4-1.3-4-2-3.2-.7-.8-.2-4-.2-4 .1-3.8.3h-.2l-4 .1-3.2-.1h-.8l-4-.7-4-.5-4-.1-4 .5-2.2.8-1.8.8-3.8 3.2-.2.2-2.9 3.8-1.1 2.2-1 1.8-2.2 4-.8 1.5-2.5 2.5-1.5 1.5-4 1-4-1-4-1-1.5-.5-2.5-.5-4 .5-2.5 4-.3 4 2.2 4 .6.4 4 1 4 .1 4 .2 4 2 .2.3 2.8 4 1 1.4 1 2.6 2 4 1 1.8 1.1 2.2 2.9 3.6.4.4 3.6 3 2.4 1 1.6.7 4 .6h4l4-.9zm-48.4 32l3.4-3 1-1 2.2-4 .8-3.7v-.6l-1.2-3.7-2.8-2-4-1.7-2.5-.3-1.5-.2h-4l-1 .2-3 .8-4 2.3-.8.9-1.6 4 .2 4 1.3 4 .9 1.4 2.3 2.6 1.7 1.3 4 1 4-.3 4-1.6z"/>
        <path fill="#E0C8CC" d="M347 108l1-.4 4-2.5 1.3-1.1 2.7-2.4 1.6-1.6 2.4-2.5 1.4-1.5 2.6-2.8 1.2-1.2 2.8-3.1.8-.9 3.2-3.8.2-.2 3.3-4 .5-.8 2.3-3.2 1.7-4 1-4-.3-4-.7-1.7-1.2-2.3-2.8-2.4-4-1.6-4-.7h-4l-4 .3-4 .2-4 .2-4-.1h-4l-1.6.1-2.4.1-4 1-4 2.6-.3.3-2.5 4-1.2 2.7-.6 1.3-2 4-1.4 2.7-.8 1.3-2 4-1.2 3.9v.1l-.5 4 .5 2.4.2 1.6 1 4 1.6 4 1.2 2 1.3 2 2.7 2.7 2.3 1.3 1.7 1 4 1 4 .1 4-.7z"/>
        <path fill="#D1ACB2" d="M349.5 104l2.5-1.8 2.4-2.2 1.6-1.4 2.5-2.6 1.5-1.5 2.3-2.5 1.7-1.8 2-2.2 2-2.5 1.3-1.5 2.7-3.7.2-.3 2.7-4 1.1-2.8.5-1.2.7-4-.8-4-.4-.5-3.7-3.5-.3-.2-4-1.2-4-.3-4 .2-4 .2-4 .3-4 .3-4 .5-1 .2-3 .7-4 2.2-1.1 1.1-2.9 4-2.1 4-1.9 3.6-.2.4-2.1 4-1.6 4-.1.6-.8 3.4.1 4 .7 2.6.3 1.4 1.6 4 2.1 2.8 1.2 1.2 2.8 2 4 1.2 4 .3 4-.7 4-1.8z"/>
        <path fill="#C19199" d="M345 104l3-1.5 3.4-2.5.6-.4 4-3.6 3.8-4 .2-.2 3.4-3.8.6-.7 2.6-3.3 1.4-2 1.5-2 2.3-4 .2-.5 1.3-3.5.1-4-1.4-3.2-.5-.8-3.5-2-4-.8h-4l-4 .2-4 .3-4 .6-4 1-1.8.7-2.2 1-3.4 3-.6.6-2.4 3.4-1.6 2.4-1 1.6-2 4-1 2.3-.8 1.7-1.2 4v4l.9 4 1.1 2.4 1 1.6 3 3 2 1 2 .8 4 .4 4-.7z"/>
        <path fill="#B2757F" d="M348.2 100l3.8-2.8 1.3-1.2 2.7-2.5 1.4-1.5 2.6-2.8 1.1-1.2 2.9-3.8.2-.2 2.8-4 1-2 1-2 1.1-4-.6-4-1.5-1.9-4-2-.8-.1-3.2-.3-4 .1-1.3.2-2.7.3-4 .8-4 1.4-2.4 1.5-1.6 1-3 3-1 1.3-2 2.7-2 3.7-.1.3-2 4-1.3 4-.2 4 1 4 2.6 3.9.1.1 3.9 2.3 4 .7 4-.8 4-2z"/>
        <path fill="#A25965" d="M344 100l4-2.1 2.5-1.9 1.5-1.2 3-2.8 1-1 2.8-3 1.2-1.6 1.9-2.4 2.1-3.3.5-.7 1.8-4 .5-4-2.3-4-.5-.3-4-1.2-4-.1-4 .4-4 1-.6.2-3.4 1.5-3.3 2.5-.7.6-3 3.4-1 1.5-1.5 2.5-2 4-.5 1.1-1 2.9-.2 4 1.2 3.6.2.4 3.8 3.7 1 .3 3 .7 4-.7z"/>
        <path fill="#933E4C" d="M347.2 96l.8-.4 4-3.1.5-.5 3.5-3.5.5-.5 3-4 .5-.8 2-3.2 1.4-4-.5-4-2.9-2.2-4-.8-4 .3-4 1-3.3 1.7-.7.4-4 3.5v.1l-2.9 4-1.1 2-1 2-1.6 4v4l2.1 4 .5.5 4 1.7 4-.6z"/>
        <path fill="#832232" d="M349.4 92l2.6-2.2 1.8-1.8 2.2-2.8 1-1.2 2.2-4 .8-3.4.1-.6-.1-.4-3.6-3.6-.4-.1h-4l-.7.1-3.3 1-4 2.4-.6.6-3.4 3.8-.1.2-2.3 4-1.6 4v.3l.4 3.7 3.6 3.3 4-.2 4-2z"/>
      </USMap>
    </div>
    <div id=box4 class=box>
      <h3>2020</h3>
      <USMap id="mult_1">
        <path fill="#FFF" d="M292.3 144l3.7-1.2 4-2.3.9-.5 3.1-1.8 3.8-2.2.2-.1 4-2.3 2.8-1.6 1.2-1 3.5-3 .5-1 1.5-3 1-4 1.5-2.4 4-1 2.8-.6h1.2l4-.5 4-.6 4-.9 4-1.7.5-.3 3.5-1.6 3.3-2.4.7-.4 4-3.6 4-3.8.2-.2 3.8-3.4.7-.6 3.3-2.8 1.3-1.2 2.7-2.5 1.6-1.5 2.4-2.7 1.1-1.3 2.7-4 .2-.3 2-3.7 1.2-4 .5-4v-4l-.5-4-1.4-4-1.8-2.8-1-1.2-3-2.6-2.8-1.4-1.2-.6-4-1-4-.6-4-.1-4 .1-4 .3-4 .3-4 .2-4 .4-4 .4-4 .5-.2.1-3.8.8-4 1.6-3 1.6-1 .6-4 2.9-.7.5-3.3 2-4 1.3-4 .4-4-.3-4-1-4-1.3-3.7-1.1-.3-.1-4-1.3-4-.8h-4l-4 .6-4 1.3-1 .3-3 1-4 1.6-2.8 1.4-1.2.6-4 2.3-1.3 1.1-2.7 3.2-.5.8-1.5 4-.8 4v4l1 4 1.2 4 .6 4v.1l.7 3.9.6 4-.3 4 .7 4 2 4 .3.7 2.5 3.3 1.5 1.8 2.2 2.2 1.8 1.6 1.6 2.4 2 4 .4.5 1.6 3.5 2.2 4 .2.3 2.7 3.7 1.3 1 4 2.7.8.3 3.2.8h4l4-.7z"/>
        <path fill="#F0E3E5" d="M347.2 108l.8-.3 4-2 2.2-1.7 1.8-1.3 3-2.7 1-1 3.2-3 .8-.7 3.6-3.3.4-.4 4-3.6 3.8-4 .2-.3 2.8-3.7 1.2-2.2 1-1.8 1.4-4 .5-4-.2-4-1.2-4-1.5-2.3-1.3-1.7-2.7-2.2-3.7-1.8-.3-.1-4-1-4-.4h-4l-4 .3-4 .6-4 .4-1 .2-3 .4-4 .5-4 .9-4 1.4-1.4.8-2.6 1.6-3.5 2.4-.5.4-4 3-1 .6-3 1.4-4 .8-4 .2-4-.1-4-.4-4-.2-4 .2-4 .4-4 .7-3 1-1 .5-4 2-4 1.1-1.5.4-2.5 1.6-1 2.4.5 4 .5.8 1.9 3.2 1.3 4 .8 1.8.8 2.2 2.3 4 .9 1 4 3 4 1.2 4 .5 4-.1 4-.8 2.3-.8 1.7-.5 4-1 4-1h4l4 1.6 1.2.9 2.8 2.2 2 1.8 2 1.7 3.6 2.3.4.2 4 1.6 4 .5h4l4-.9z"/>
        <path fill="#E0C8CC" d="M349 104l3-1.7 2.9-2.3 1.1-.9 3.4-3.1.6-.5 3.7-3.5.3-.3 4-3.6V88l4-4 3.2-4 .8-1.4 1.5-2.6 1.4-4 .4-4-.6-4-1.9-4-.8-1-3.9-3h-.1l-4-1.5-4-.7h-4l-4 .3-4 .6-4 .6-2.8.7-1.2.3-4 .9-4 1.2-3.3 1.6-.7.4-4 3.4-.3.2-3.7 3-1.4 1-2.6 1.8-4 1.7-3.2.5-.8.1-4 .2-4 .2-4 .1-4 1-4 2.2-.2.2-3.8 3.6-.4.4-1.7 4v4l2.1 3.2.9.8 3.1 1.3 4 .3 4-.6 4-.8 1.1-.2 2.9-.6 4 .3.6.3 3.4 1.3 3.4 2.7.6.5 3.3 3.5.7.7 3.9 3.3h.1l4 2 4 .9h4l4-.6 4-1.7z"/>
        <path fill="#D1ACB2" d="M341.8 104l2.2-.4 4-1.7 3-1.9 1-.6 4-3.2.2-.2 3.8-3.4.6-.6 3.4-3.2 1-.8 3-3 .9-1 3.1-3.8.2-.2 2.4-4 1.3-4 .1-2.1.1-1.9-.1-.7-.8-3.3-2.8-4-.4-.3-4-2-4-1-4-.1-4 .3-4 .7-4 .7-4 1.2-1.6.5-2.4.9-4 2-1.8 1.1-2.2 1.6-2.5 2.4-1.5 1.4-3 2.6-1 .9-4 3.1v.1l-4 3.7-.4.2-1.2 4 1.6 1 1.4 3 2.6 2.8.7 1.2 3.3 4 3.5 4 .5.5 4 2.4 3.6 1.1.4.1 4 .3z"/>
        <path fill="#C19199" d="M346.7 100l1.3-.6 4-2.6 1-.8 3-2.4 1.7-1.6 2.3-2 2-2 2-2 2-2 2-2.3 1.4-1.7 2.5-4 .1-.2 1.2-3.8.1-4-1.3-3.6-.2-.4-3.8-3.2-1.9-.8-2.1-.7-4-.3-4 .4-3.2.6-.8.2-4 .9-4 1.5-3 1.4-1 .5-4 2.5-1.3 1-2.7 2.4-1.6 1.6-2.4 2.6-1.4 1.4-2.6 3.9-.1.1-1.5 4 .4 4 1.2 2.2.7 1.8 2.7 4 .6.6 4 3.4 4 1.6 4 .4 4-.8z"/>
        <path fill="#B2757F" d="M349.6 96l2.4-1.7 2.8-2.3 1.2-1 3.3-3 .7-.7 3.3-3.3.7-.8 2.7-3.2 1.3-2 1.3-2 1.3-4-.3-4-2.3-3.7-.4-.3-3.6-1.9-4-.6-4 .3-4 .9-4 1.1-.5.2-3.5 1.6-4 2.4-4 3-1.1 1-2.9 3-1 1-2.6 4-.4 1-1.3 3-.2 4 1.5 4 3.1 4 .9.8 4 2.1 4 .7 4-.7 4-1.9z"/>
        <path fill="#A25965" d="M345.2 96l2.8-1.4 3.9-2.6.1-.1 4-3.4.6-.5 3.4-3.3.7-.7 3.3-3.9.1-.1 2.5-4 1.2-4-1-4-2.8-2.7-4-1.2-4 .2-4 1-4 1.2-3 1.5-1 .6-4 2.8-.8.6-3.2 3-1 1-2.9 4-.1.2-1.7 3.8-.5 4 1.5 4 .7.9 3.7 3.1.3.2 4 1 4-.6z"/>
        <path fill="#933E4C" d="M348.2 92l3.8-2.8 1.5-1.2 2.5-2.3 1.8-1.7 2.2-2.5 1.3-1.5 2.5-4 .2-.8.6-3.2-.6-1.7-2-2.3-2-1h-4l-4 .8-.6.2-3.4 1.3-4 2.4-.5.3-3.5 3-1.1 1-2.9 3.5-.3.5-2 4-.5 4 2 4 .8.7 4 1.7 4-.4 4-1.8z"/>
        <path fill="#832232" d="M349.6 88l2.4-2 2.3-2 1.7-1.8 2-2.2 2-3.2.4-.8v-4l-.4-.5-4-1.2-4 .7-3 1-1 .4-4 2.9-.9.7-3.1 3.5-.4.5-2.2 4-.2 4 2.8 2.8 4 .2 4-1.9z"/>
      </USMap>
    </div>
  </div>
  <br>
  <!--Map-->
  <div>
    <p>
      The southern US has become drastically warmer over the last few decades, especially in the last ten years. A warmer climate has many adverse effects on the Wood Thrush and other migratory bird populations. Loss of habitat will be common due to rising sea levels and increased rate of drought and wildfires. Rising temperatures also affect precipitation and vegetation, which in turn will affect the Wood Thrush’s food supply. If United States temperatures continue to rise at their current rate, “the ranges of [birds’] habitats may move closer to the poles or higher elevations.”
      <a href="https://www.audubon.org/sites/default/files/documents/gwandbirds.pdf"> Source </a>
    </p>
    <p>
      The map below shows both the average temperature in a US county and a sample Wood Thrush population for a given year. The sample population on this map above can be seen moving further north east over time.<br /> 
    </p>
    <p class="center expand_margin">
      <b>Use the time slider to explore the changing locations of Wood Thrush sightings.</b>
    </p>
  </div>
</div>
  <div id=slider_box>
    <input type=range min=1990 max=2020 value=2020 id="year_slider" step=5 list="year_ticks">
    <datalist id=year_ticks>
      <option>1990</option>
      <option>1995</option>
      <option>2000</option>
      <option>2005</option>
      <option>2010</option>
      <option>2015</option>
      <option>2020</option>
    </datalist>
    <p id=tick_labels>
      <span class="tick_label">1990</span>
      <span class="tick_label">1995</span>
      <span class="tick_label">2000</span>
      <span class="tick_label">2005</span>
      <span class="tick_label">2010</span>
      <span class="tick_label">2015</span>
      <span class="tick_label">2020</span>
    </p>
    <br>
    <!--<output id=year_out>2020</output> <p value="year_slider.value"> </p>-->
  </div>
<div class="wrapper-inner">
  <br>
  <div>
    <h3 class="sectionheader"> Wood Thrush Population and US Average Annual Temperature, <span> {slid}</span>
    </h3>
    <div id=temp_map>
      <svg id=map_svg height=400 width=600></svg>
    </div>
  </div>
  <!--migratory distance line plot-->
  <div>
    <h2 class="sectionheader"> Change in Average Migratory Distance </h2>
    <img src={flyingThrush} id="fly" alt="A flying wood thrush">
    <!-- img source: https://www.pinterest.co.uk/pin/779685754218620672/ -->
    <p>
      Over the last 30 years, the Woodthrush has seen a significant drop in migratory distance. This can be attributed to the increasing inhospitality of the far north breeding grounds and the southern wintering grounds. In central America, the Wood Thrush encounters acid rain, which depletes calcium levels from soil, and habitat shrinkage due to tropical deforestation. In Northern breeding grounds, less nutricious food sources can leave birds hungry and increase exposure to predators like racoons and crows. 
    </p>
    <p>We can see the impacts of rapid environmental extremes in the migratory distance of the birds. As the United State’s average temperature is increasing, we notice a severe drop, roughly 500 miles, in the distance traveled by migrating birds.
    </p>
  </div>
  <svg id="lat_long_svg" width="1000" height="600"></svg>
  <h2 class="sectionheader"> Movement North</h2>
  <div>
    <p>
      The eBird system has significantly expanded over the past 10 years as mobile connection became the standard of communication around the world. As a result, eBird saw a tremendous increase in bird watcher participation, therefore keeping a more accurate record of bird sightings around the United States. Over this same time period, there has been record shifts in the average monthly latitude of Wood Thrush sightings. 
    </p>
    <p>The rapid decrease in habitable forests in the bird’s wintering grounds has led to a latitude increase of about 100 miles, roughly equivalent to 18 times the height of Mount Everest. In the summering months, there is still a significant, but notably smaller, increase in average latitude, probably due to the more significant breeding-time movements from the midwest to the more eastern states instead of strictly moving further northward.
      <a href="https://www.audubon.org/field-guide/bird/wood-thrush#bird-climate-vulnerability"> Source </a>
    </p>
    <!-- winter/summer regressions  -->
    <div id="month_regression" class="flex-container">
      <div id="winter_div">
        <Winter />
      </div>
      <div id="summer_div">
        <Summer />
      </div>
    </div>
  </div>
  <!--third Vis-->
  <h2 class="sectionheader"> Top 10 States with Most Observations, <span> {slid}</span></h2>
  <p> The proportional ratio of sightings between Northeastern and non-Northeastern states further illustrates the shfting migration trends of the species over the past two decades. The numbers in the two regions gradually grow and grow in disparity, with numbers in the 21st consistently composing the majority of sightings.  This trend is observed again by looking at three different snapshots of total sightings in Northeastern vs. non-Northeastern states in 1990, 2005, and 2020:
  </p>
  <div class="pi_mult" id="pi_mults" style="margin: auto; text-align: center; ">
    <div>
      <div style="margin: auto; text-align: center; display: inline-flex; direction: row;">
        <div style="color: #eae0d5; margin-right: 125px; font-weight: bold;"> 1990</div>
        <div style="color: #eae0d5;font-weight: bold;"> 2005</div>
        <div style="color: #eae0d5; margin-left: 127px;font-weight: bold;"> 2020</div>
      </div>
      <br /><br />
      <img src={pi_mult1} style="height: 114px; padding-right: 45px;" alt="a circular chart with two shaded regions, one for Northeastern states and one for other states.
        The non-Northeastern states portion much islarger, taking up around 60% of the chart.">
      <img src={pi_mult2} style="height: 116px; margin-top: -10px; "
        alt="a circular chart with two shaded regions, one for Northeastern states and one for other states.
        The Northeastern states portion is only slightly larger than the non-Northeastern states portion, being larger by around 5%.">
      <img src={pi_mult3} style="height: 116px; padding-left: 45px;"
        alt="a circular chart with two shaded regions, one for Northeastern states and one for other states.
        The Northeastern states portion is much larger than the non-Northeastern states portion, taking up around 70% of the chart.">
    </div>
    <br /><br />
    <svg id="pi_legend" width="210px" height="30px"></svg>
    <br /><br />
  </div>
  <div class="center">
    <p><b>To observe the trend over the past two decades, use the time slider to adjust by year.</b></p>
  </div>
  <div id="states_and_pi">
    <svg id="states_svg" width="690" height="600"></svg>
    <svg id="pi_svg" width="150" height="150"></svg>
  </div>
  <img src={thrushBabies} id="babies" alt="A wood thrush next with yelling chicks">
  <!-- img source: https://blogs.massaudubon.org/yourgreatoutdoors/take-5-baby-birds/ -->
  <div id="conclusion">
    <h2 class="sectionheader"> The Role of the Wood Thrush</h2>
    <p>The Wood Thrush is a cornerstone of the ecosystems of North American forests. The species regulates the insect populations of species they consume, and by extension the vivacity of forest vegetation. The bird also disperses the seeds of the various fruits they eat,further increasing tree coverage. 
    </p>
    <p>
      As a result, the impact of the Wood Thrush on human life may be difficult to observe day to day, but is nonetheless significant. Its seed dispersal means that humans have access to more plants that can be used as food, medicine, or timber, and its migration patterns also provide key environmental data that can be used to signal and detect environmental changes in the North American climate.
    </p>
    <p>Warming global temperatures, primarily due to human activity, have dramatically affected the habitats of Wood Thrush and many other bird species, but this is an often overlooked aspect of communicating climate change to humans. So, the next time you hear the familiar songbird call of the Wood Thrush, think, what am I doing to help the conservation efforts towards birds and the many other animals who inhabit the Earth alongside us?
      <a href="https://www.audubon.org/news/what-do-birds-do-us#:~:text=Birds%20keep%20farmers%20in%20business,slow%20the%20spread%20of%20disease">Source </a>
    </p>
  </div>
</div>
</div>
