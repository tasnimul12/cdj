<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';

  Chart.register(...registerables);

  const yKey = 'year';

  const data = [
    { year: "2018", unique_vessels: 1.877256317689529, number_of_detections: 21.35379061371841 },
    { year: "2019", unique_vessels: 1.9945848375451263, number_of_detections: 1.2906137184115494 },
    { year: "2020", unique_vessels: 1.877256317689529, number_of_detections: 61.94945848375451 },
    { year: "2021", unique_vessels: 1.1732851985559591, number_of_detections: 16.54332129963899 },
    { year: "2022", unique_vessels: 2.8158844765342934, number_of_detections: 31.91335740072202 }
  ];

  const seriesNames = Object.keys(data[0]).filter(d => d !== yKey);
  const seriesColors = ['#00bbff', '#800080'];

  // Improved label formatting function
  const formatLabel = (label) => {
    return label
      .split('_')
      .map((word, index) => index === 0 ? 
        word.charAt(0).toUpperCase() + word.slice(1) : 
        word
      )
      .join(' ');
  };

  const chartData = {
    labels: data.map(d => d.year),
    datasets: seriesNames.map((name, index) => ({
      label: formatLabel(name),
      data: data.map(d => d[name]),
      backgroundColor: seriesColors[index],
      borderColor: seriesColors[index],
      borderWidth: 1
    }))
  };

  let chart;
  let chartCanvas;

  onMount(() => {
    chart = new Chart(chartCanvas, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year',
              font: {
                weight: 'bold'
              }
            },
            ticks: {
              callback: function (value) {
                return chartData.labels[value];
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count',
              font: {
                weight: 'bold'
              }
            },
            ticks: {
              callback: function(value) {
                return value.toFixed(2);
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function(context) {
                return `Year: ${context[0].label}`;
              },
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          },
          legend: {
            position: 'top'
          }
        }
      }
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<style>
  .chart-container {
    width: 100%;
    height: 250px;
  }
  canvas {
    width: 100% !important;
    height: 250px !important;
  }
</style>

<div class="chart-container">
  <canvas bind:this={chartCanvas}></canvas>
</div>