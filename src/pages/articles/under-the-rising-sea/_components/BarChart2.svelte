<script>
    import { LayerCake, Svg } from 'layercake';
    import { scaleBand } from 'd3-scale';
    import AxisX from './AxisX.svelte';
    import AxisY from './AxisY.svelte';
    import Bar from './Bars.svelte';
    import { csvParse } from 'd3-dsv';
    import rawdata from './plot-data-2.csv';
  
    // Transform the data into the required format
    
    const xKey = 'count';
    const yKey = 'year';
  
    const data = [
    { year: "2018", count: 1.877256317689529 },
    { year: "2019", count: 1.9945848375451263 },
    { year: "2020", count: 1.877256317689529 },
    { year: "2021", count: 1.1732851985559591 },
    { year: "2022", count: 2.8158844765342934 }
  ];
  
    data.forEach(d => {
      d[xKey] = +d[xKey];
    });
  </script>
  
  <div class="chart-container">
    <LayerCake
      padding={{ bottom: 20, left: 35 }}
      x={xKey}
      y={yKey}
      yScale={scaleBand().paddingInner(0.05).round(true)}
      yDomain={['2018', '2019', '2020', '2021', '2022']}
      xDomain={[0, null]}
      {data}
    >
      <Svg>
        <AxisX tickMarks baseline snapLabels />
        <AxisY tickMarks gridlines={false} />
        <Bar />
      </Svg>
    </LayerCake>
  </div>
  
  <style>
    /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
    .chart-container {
      width: 100%;
      height: 250px;
    }
  </style>
  