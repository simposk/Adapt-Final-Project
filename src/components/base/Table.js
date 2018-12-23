/* eslint-disable */
import React from 'react';

const Table = (props) => {
    const { data } = props;
    return (
        <table width="100%" className="rwd-table">
            <tbody>
                <tr className="table__header">
                    <th>Date</th>
                    <th>Price</th>
                    <th className="change">Change</th>
                </tr>
                {
                    data.length > 0 && data.map(item => (
                        <tr key={item.time}>
                        <td>{item.date}</td>
                        <td>${item.close}</td>
                        <td className={item.changePct[0] === '-' ? 'red' : 'green'} >{ item.changePct[0] === '-' ? item.changePct.substring(0, 5) : item.changePct.substring(0, 4) }%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
  };

export default Table;