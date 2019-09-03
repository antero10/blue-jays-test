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
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: this.props.datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
      
    }

    componentDidUpdate() {
        if (this.char && (this.props.labels.length > 0 && this.props.datasets.length > 0)) {
            this.char.config.data.labels = this.props.labels;
            this.char.config.data.datasets = this.props.datasets;
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