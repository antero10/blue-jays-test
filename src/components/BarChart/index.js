import React, {Component} from 'react';
import Chart from 'chart.js';


class BarChart extends Component {
    constructor() {
        super();
        this.char = null;
    }
    componentDidMount() {
        var ctx = document.getElementById('myChart');
        this.char = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.props.labels,
                datasets: this.props.datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
      
    }
    
    componentDidUpdate() {
        if (this.char) {
            this.char.data.labels = this.props.labels;
            this.char.data.datasets = this.props.datasets;
            this.char.update();
        }
    }

    render() {
        return (
            <div>
                <canvas id="myChart" width={this.props.width} height={this.props.height}></canvas>
            </div>
        )
    }
}

export default BarChart;