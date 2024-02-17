import * as d3 from 'd3';

// Set up the SVG container
const width = 800;
const height = 600;

const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

// Set up the globe projection
const projection = d3.geoOrthographic()
  .translate([width / 2, height / 2])
  .scale(300)
  .clipAngle(90);

const path : any = d3.geoPath().projection(projection);

// Draw the globe
const globe = svg.append('path')
  .datum({ type: 'Sphere' })
  .attr('class', 'globe')
  .attr('d', path);

// Rotate the globe continuously
function rotateGlobe() {
  projection.rotate([Date.now() / 10, 0]);
  globe.attr('d', path);
  requestAnimationFrame(rotateGlobe);
}

rotateGlobe();
