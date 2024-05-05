import * as d3 from 'd3';

export function createLinks(svg, data) {
  const linkGroups = svg.selectAll(".link-group")
    .data(data)
    .enter().append("g")
    .attr("class", "link-group");

  const links = linkGroups.append("line")
    .attr("class", "link")
    .attr("stroke-width", 2);

  const arrows = linkGroups.append("path")
    .attr("class", "arrow")
    .attr("d", "M0,-4 L10,0 L0,4 L6,0 Z") // Custom arrow path
    .attr("fill", "black")
    .attr("opacity", 0); // Set opacity to 0 initially

  function animateLinks() {
    links.attr("stroke", d => {
      if (d.status === "waiting") return "#ffffb3";
      else if (d.status === "flowing") return "#80ffcc";
      else if (d.status === "missing") return "#ff8080";
    })
    .attr("stroke-dasharray", "1000") // Set the stroke-dasharray to a large value
    .attr("stroke-dashoffset", "1000") // Set the stroke-dashoffset to the same large value
    .transition()
    .duration(4000) // Animation duration
    .ease(d3.easeLinear) // Use linear easing for constant speed
    .attr("stroke-dashoffset", "0") // Set stroke-dashoffset to 0 to animate the flow
    .on("end", function () {
      setTimeout(animateLinks, 2000); // Restart the transition after 2 seconds
    });

    arrows.transition()
    .duration(4000) // Same duration as the line animation
    .ease(d3.easeLinear)
    .attrTween("transform", function (d, i) {
      return function (t) {
        const path = links.nodes()[i];
        const length = path.getTotalLength();
        const point = path.getPointAtLength(t * length);
        const nextPoint = path.getPointAtLength((t + 0.01) * length); // Get the next point for calculating angle
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
        return `translate(${point.x},${point.y}) rotate(${angle})`;
      };
    })
    .on("start", function () {
      d3.select(this).attr("opacity", 1); // Set opacity to 1 at the start of the animation
    })
    .on("end", function () {
      d3.select(this).attr("opacity", 0); // Set opacity to 0 at the end of the animation
    });
  }

  // Start the animation after 2 seconds
  setTimeout(animateLinks, 2000);

  return links;
}
