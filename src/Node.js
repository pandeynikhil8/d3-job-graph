import * as d3 from 'd3';
import { degrees, sizeScale, blink } from './utils'; // Import shared data and functions
import { openCard } from './Card'; // Import the openCard function from Card.js

export function createNodes(svg, data, simulation) {
  const nodes = svg.selectAll(".nodeGroup")
    .data(data)
    .enter().append("g")
    .attr("class", "nodeGroup")
    .call(drag(simulation)); // Apply drag behavior to the group
    
  // Draw circles for nodes
  const circles = nodes.append("circle")
    .attr("class", "node")
    .attr("r", d => sizeScale(degrees[d.id]))
    .attr("fill", d => {
      if (d.status === "waiting") return "#ffffb3";
      else if (d.status === "processing") return "#99ebff";
      else if (d.status === "failed") return "#ff8080"; // Change failed status color to pink
      else if (d.status === "done") return "#80ffcc";
    })
    .attr("stroke", d => {
      if (d.status === "failed") return "red"; // Add a stroke color for failed nodes
      else return "pink"; // No stroke for other nodes
    })
    .attr("stroke-width", 2) 
    .attr("stroke-dasharray", "3,3")
    .on("click", event => {
      const nodeData = event.currentTarget.__data__;

      
      openCard(svg, nodeData);
    });
    
    

  // Blink animation for nodes with status "failed"
  circles.each(function(d) {
    if (d.status === "failed") {
      const circle = d3.select(this);
      blink(circle);
    }
  });

  return nodes;
}

function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;

    // Get the corresponding card element
    const card = d3.select(this.parentNode).select(".card");
    if (card) {
      card.attr("transform", `translate(${d.x},${d.y})`);
    }
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;

    // Get the corresponding card element
    const card = d3.select(this.parentNode).select(".card");
    if (card) {
      card.attr("transform", `translate(${d.x},${d.y})`);
    }
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    // Get the corresponding card element
    const card = d3.select(this.parentNode).select(".card");
    if (card) {
      card.attr("transform", `translate(${d.x},${d.y})`);
    }
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}
