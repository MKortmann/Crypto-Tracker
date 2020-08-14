export const options = {
  maintainAspectRatio: false,
  drawTime: 'afterDatasetsDraw',
  annotation: {
    drawTime: 'afterDatasetsDraw',
    annotations: [
      {
        id: 'a-line-2',
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 7000,
        borderColor: '#9BC53D',
        borderWidth: 2,
        borderDash: [10, 5],
        label: {
          backgroundColor: '#9BC53D',
          content: `hello`,
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
        let returnValue = tooltipItems[0].xLabel;
        // converting to our timezone!
        returnValue = new Date(returnValue).toLocaleString().slice(0, -3);
        return returnValue;
      },
      label: (tooltipItem, data) => {
        const label = data.datasets[tooltipItem.datasetIndex].label || '';
        return `${label}: ${tooltipItem.yLabel}`;
      },
    },
  },
  legend: {
    display: true,
    labels: {
      fontColor: '#9bc53d',
      fontSize: 16,
    },
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
        gridLines: {
          color: '#4bc0c0',
          borderDash: [10, 5],
        },
        ticks: {
          fontColor: '#4bc0c0',
          // Include a dollar sign in the ticks
          callback: (value) => {
            if (value >= 10 ** 3 && value <= 10 ** 6) {
              return `${Math.round(value / 10 ** 3)} K `;
            } else if (value >= 10 ** 6 && value <= 10 ** 9) {
              return `${Math.round(value / 10 ** 6)} M`;
            } else if (value >= 10 ** 9 && value <= 10 ** 12) {
              return `${Math.round(value / 10 ** 9)} B`;
            } else if (value >= 10 ** 12 && value <= 10 ** 15) {
              return `${Math.round(value / 10 ** 9)} T`;
            }
            return `${value}`;
          },
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          color: '#4bc0c0',
          zeroLineColor: '#4bc0c0',
        },
        type: 'time',
        ticks: {
          fontColor: '#4bc0c0',
        },
        time: {
          unit: 'hour',
        },
      },
    ],
  },
};
