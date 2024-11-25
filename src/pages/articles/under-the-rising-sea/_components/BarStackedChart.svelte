<script>
    import { LayerCake, Svg, flatten, stack } from 'layercake';
  
    import { scaleBand, scaleOrdinal } from 'd3-scale';
    import { format } from 'd3-format';
  
    import BarStacked from './BarStacked.svelte';
    import AxisX from './AxisX.svelte';
    import AxisY from './AxisY.svelte';
  
    const xKey = [0, 1];
    const yKey = 'year';
    const zKey = 'key';

    const data = [
    { year: "2018", unique: 1.877256317689529, count: 21.35379061371841 },
    { year: "2019", unique: 1.9945848375451263, count: 1.2906137184115494 },
    { year: "2020", unique: 1.877256317689529, count: 61.94945848375451 },
    { year: "2021", unique: 1.1732851985559591, count: 16.54332129963899 },
    { year: "2022", unique: 2.8158844765342934, count: 31.91335740072202 }
    ];
  
    const seriesNames = Object.keys(data[0]).filter(d => d !== yKey);
    const seriesColors = ['#00bbff', '#8bcef6'];
  
    /* --------------------------------------------
     * Cast data
     */
    data.forEach(d => {
      seriesNames.forEach(name => {
        d[name] = +d[name];
      });
    });
  
    const formatLabelX = d => format(`~s`)(d);
  
    const stackedData = stack(data, seriesNames);
  </script>
  
  <div class="chart-container">
    <LayerCake
      padding={{ top: 0, bottom: 20, left: 35 }}
      x={xKey}
      y={d => d.data[yKey]}
      z={zKey}
      yScale={scaleBand().paddingInner(0.05)}
      zScale={scaleOrdinal()}
      zDomain={seriesNames}
      zRange={seriesColors}
      flatData={flatten(stackedData)}
      data={stackedData}
    >
      <Svg>
        <AxisX baseline snapLabels format={formatLabelX} />
        <AxisY gridlines={false} />
        <BarStacked />
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