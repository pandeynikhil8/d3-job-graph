import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { createNodes } from './Node';
import { createSimulation } from './Simulation';
import { createLinks } from './Links';
import { graphData } from './graphData';


function App() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current),
      width = window.innerWidth,
      height = window.innerHeight;

    svg.attr("width", width)
      .attr("height", height);

    const links = createLinks(svg, graphData.links);
    const simulation = createSimulation(graphData.nodes, graphData.links, width, height);
    const nodes = createNodes(svg, graphData.nodes, simulation);

    simulation.on("tick", () => {
      // Update links
      links.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      // Update nodes
      nodes.attr("transform", d => `translate(${d.x},${d.y})`)

    });

  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <svg ref={svgRef} id="svg"></svg>

    </div>
  );
}

export default App;
