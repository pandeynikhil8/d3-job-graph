import * as d3 from 'd3';
import { graphData } from './graphData';

export const degrees = {}; // Object to store the degree of each node

// Calculate the degree of each node
graphData.links.forEach(link => {
    degrees[link.source] = (degrees[link.source] || 0) + 1;
    degrees[link.target] = (degrees[link.target] || 0) + 1;
});

// Determine the maximum degree
const maxDegree = Math.max(...Object.values(degrees));

// Define the range of node sizes based on the degree
const minSize = 5; // Minimum node size
const maxSize = 20; // Maximum node size

// Scale function to map degree to node size range
export const sizeScale = d3.scaleLinear()
    .domain([0, maxDegree])
    .range([minSize, maxSize]);

export function blink(element) {
  element.transition()
    .duration(500)
    .style("opacity", 0)
    .transition()
    .duration(500)
    .style("opacity", 1)
    .on("end", function() {
      blink(d3.select(this));
    });
}
