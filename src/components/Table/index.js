import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import './Table.css';

const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];

class TableData extends Component {
    render() {
        return (
          <DataTable
            className="data-table"
            title="Arnold Movies"
            columns={columns}
            data={data}
          />
        );
    }
}

export default TableData;