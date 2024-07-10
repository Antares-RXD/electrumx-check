document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api-electrumx.radiant4people.com/api/v1/electrumx';
    const tableBody = document.getElementById('server-table-body');

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            updateTable(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function updateTable(data) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class="status-circle ${item.status === 'online' ? 'online' : 'offline'}"></span></td>
                <td>${item.server}</td>
                <td>${item.block_height}</td>
                <td>${new Date(item.last_checked).toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetchData();
    setInterval(fetchData, 60000); // Refresh every 60 seconds
});
