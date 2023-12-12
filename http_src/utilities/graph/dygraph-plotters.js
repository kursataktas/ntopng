/**
    (C) 2023 - ntop.org
*/

/* *********************************************** */

function darkenColor(colorStr) {
  const color = Dygraph.toRGB_(colorStr);
  color.r = Math.floor((255 + color.r) / 2);
  color.g = Math.floor((255 + color.g) / 2);
  color.b = Math.floor((255 + color.b) / 2);
  return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
}

/* *********************************************** */

/* This function is used to create a bar chart instead of a line chart */
function barChartPlotter(e) {
  const ctx = e.drawingContext;
  const points = e.points;
  const y_bottom = e.dygraph.toDomYCoord(0);

  ctx.fillStyle = darkenColor(e.color);

  /* Find the minimum separation between x-values.
   * This determines the bar width.
   */
  let min_sep = Infinity;
  for (let i = 1; i < points.length; i++) {
    const sep = points[i].canvasx - points[i - 1].canvasx;
    if (sep < min_sep) min_sep = sep;
  }
  /* Keep just a little distance between the bars */
  const bar_width = Math.floor(0.95 * min_sep);

  /* Do the actual plotting */
  for (var i = 0; i < points.length; i++) {
    const p = points[i];
    const center_x = p.canvasx;

    ctx.fillRect(center_x - bar_width / 2, p.canvasy,
      bar_width, y_bottom - p.canvasy);

    ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
      bar_width, y_bottom - p.canvasy);
  }
}

/* *********************************************** */

const dygraphPlotters = function () {
  return {
    barChartPlotter,
  };
}();

export default dygraphPlotters;