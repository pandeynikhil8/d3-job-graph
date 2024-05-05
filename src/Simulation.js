import * as d3 from 'd3';

export function createSimulation(nodes, links, width, height) {
  return d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("link", d3.forceLink(links).distance(150).id(d => d.id))
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2));
}
