export function openCard(nodeGroup, data) {
    const cardGroup = nodeGroup.append("g")
        .attr("class", "card-group")
        .attr("transform", `translate(${data.x + 32},${data.y + 60})`); // Adjust translation to center the card

    const card = cardGroup.append("foreignObject")
        .attr("class", "w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700")
        .attr("width", 64) // Set width of the card
        .attr("height", 120);

    const container = card.append("xhtml:div")
        .attr("class", "flex flex-col items-center pb-10");

    container.append("h5")
        .attr("class", "mb-1 text-xl font-medium text-gray-900 dark:text-white")
        .text(data.label);

    container.append("span")
        .attr("class", "text-sm text-gray-500 dark:text-gray-400")
        .text(`Status: ${data.status}`);

    const buttonContainer = container.append("div")
        .attr("class", "flex mt-4 md:mt-6");

    buttonContainer.append("a")
        .attr("href", "#")
        .attr("class", "inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800")
        .text("Slack chat"); // Change button text as needed

    buttonContainer.append("a")
        .attr("href", "#")
        .attr("class", "py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700")
        .text("Jira ticket"); // Change button text as needed

    return cardGroup; // Return the card group so it can be updated later
}

// Update the card's position when the node's position changes
export function updateCardPosition(cardGroup, data) {
    cardGroup.attr("transform", `translate(${data.x - 32},${data.y - 60})`);
}
