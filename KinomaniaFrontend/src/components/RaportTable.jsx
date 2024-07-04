import React from 'react';
import '../styles/tableStyle.css';

const ReportTable = ({ data }) => {
    if (!data || data.length === 0 || !data[0]) {
        return <div>Brak danych</div>;
    }

    const columns = Object.keys(data[0]);

    return (
        <div className="report-table-container">
            <table className="report-table">
                <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;