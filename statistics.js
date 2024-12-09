document.addEventListener('DOMContentLoaded', function() {
    // City Comparison Chart
    const cityChart = new Chart(document.getElementById('cityComparisonChart'), {
        type: 'radar',
        data: {
            labels: ['Fitness', 'Productivity', 'Happiness', 'Social Life', 'Sleep Quality'],
            datasets: [{
                label: 'Jakarta',
                data: [85, 75, 70, 80, 65],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)'
            }, {
                label: 'Tanggerang',
                data: [70, 85, 90, 75, 85],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Sleep Impact Chart
    const sleepChart = new Chart(document.getElementById('sleepImpactChart'), {
        type: 'line',
        data: {
            labels: ['5hrs', '6hrs', '7hrs', '8hrs', '9hrs', '10hrs'],
            datasets: [{
                label: 'Productivity Score',
                data: [65, 75, 85, 95, 90, 82],
                borderColor: '#2ecc71',
                tension: 0.4
            }]
        }
    });

    // Seasonal Activity Chart
    const seasonalChart = new Chart(document.getElementById('seasonalActivityChart'), {
        type: 'bar',
        data: {
            labels: ['Dry Season (Jun-Oct)', 'Early Rainy Season (Nov-Dec)', 'Peak Rainy Season (Jan-Feb)', 'Late Rainy Season (Mar-May)'],
            datasets: [{
                label: 'Outdoor Activities',
                data: [85, 60, 35, 55],
                backgroundColor: '#3498db'
            }, {
                label: 'Indoor Workouts', 
                data: [40, 65, 80, 70],
                backgroundColor: '#e74c3c'
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });

    // Screen Time Impact Chart
    const screenTimeChart = new Chart(document.getElementById('screenTimeChart'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Screen Time vs Exercise',
                data: [
                    {x: 2, y: 85}, {x: 4, y: 75}, {x: 6, y: 60},
                    {x: 8, y: 45}, {x: 10, y: 30}, {x: 12, y: 25}
                ],
                backgroundColor: '#9b59b6'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Screen Time (hours)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Exercise Duration (minutes)'
                    }
                }
            }
        }
    });
}); 