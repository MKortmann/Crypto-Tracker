export const options = {
  maintainAspectRatio: false,
  annotation: {
    drawTime: 'afterDatasetsDraw',
    annotations: [
      {
        id: 'a-line-1',
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 7000,
        borderColor: 'red',
        borderWidth: 2,
        borderDash: [10, 5],
        label: {
          backgroundColor: 'red',
          content: 'Test Label',
          enabled: true,
        },
      },
    ],
  },
  tooltips: {
    titleFontSize: 18,
    bodyFontSize: 16,
    // backgroundColor: '#4bc0c0',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    callbacks: {
      title: (tooltipItems, data) => {
        let returnValue = tooltipItems[0].xLabel.split('T')[0];
        returnValue = returnValue.split('-');
        returnValue = `${returnValue[2]}-${returnValue[1]}-${returnValue[0]}`;
        return returnValue;
      },
      label: (tooltipItem, data) => {
        const label = data.datasets[tooltipItem.datasetIndex].label || '';
        return `${label}: $${tooltipItem.yLabel}`;
      },
    },
  },
  legend: {
    onHover: (e) => {
      e.target.style.cursor = 'pointer';
    },
  },
  hover: {
    function(e) {
      const point = this.getElementAtEvent(e);
      if (point.length) {
        e.target.style.cursor = 'pointer';
      } else {
        e.target.style.cursor = 'default';
      }
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          // Include a dollar sign in the ticks
          callback: (value, index, values) => {
            if (value > 1000) {
              return '$' + value / 1000 + 'k';
            }
            return '$' + value;
          },
        },
      },
    ],
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM',
          },
        },
      },
    ],
  },
};
