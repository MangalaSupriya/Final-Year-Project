document.addEventListener('DOMContentLoaded', () => {
    // Simulated data - In a real project, this data would come from a back-end API
    const binsData = [
        { id: 1, location: 'Park A', fillLevel: 90 },
        { id: 2, location: 'Street B', fillLevel: 40 },  // Street B has 40% fill level
        { id: 3, location: 'Mall C', fillLevel: 84 }     // Mall C is between 70% and 80%
    ];

    const notifications = [];

    // Populate Real-Time Bin Status
    const binsStatusElement = document.getElementById('bins-status');
    binsData.forEach(bin => {
        const binDiv = document.createElement('div');
        binDiv.classList.add('bin');

        // Determine the status color based on the fill level
        let statusClass = '';
        if (bin.fillLevel >= 85 && bin.fillLevel <= 100) {
            statusClass = 'full';  // Red for full bins (85% to 100%)
            notifications.push(`Bin at ${bin.location} is full, please take it early!`);
        } else if (bin.fillLevel >= 70 && bin.fillLevel < 85) {
            statusClass = 'warning';  // Yellow for bins between 70% and 80%
            notifications.push(`Bin at ${bin.location}, bin will be filled in 1 or 2 days!`);
        } else if (bin.fillLevel < 70) {
            statusClass = 'low';  // Green for bins below 70%
        }

        binDiv.innerHTML = `
            <h3>Bin ${bin.id} - ${bin.location}</h3>
            <p class="bin-status ${statusClass}">
                ${bin.fillLevel}% Full
            </p>
        `;
        binsStatusElement.appendChild(binDiv);
    });

    // Populate Notifications
    const notificationsList = document.getElementById('notifications-list');
    notifications.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert;
        notificationsList.appendChild(li);
    });

    // Populate Summary Statistics
    const totalBinsElement = document.getElementById('total-bins');
    const fullBinsElement = document.getElementById('full-bins');
    const avgFillElement = document.getElementById('avg-fill');

    const totalBins = binsData.length;
    const fullBins = binsData.filter(bin => bin.fillLevel >= 85).length;
    const avgFill = (binsData.reduce((sum, bin) => sum + bin.fillLevel, 0) / totalBins).toFixed(2);

    totalBinsElement.textContent = totalBins;
    fullBinsElement.textContent = fullBins;
    avgFillElement.textContent = `${avgFill}%`;
});
