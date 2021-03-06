import React from "react";
// import { Button } from "react-bootstrap";
import FileSaver from "file-saver";
const XLSX = require("xlsx");

const ExportCSV = ({ fileName = 'Customers_Infomation_xlsx' }) => {
    // ******** XLSX with object key as header *************
    // const fileType =
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    // const fileExtension = ".xlsx";

    // const exportToCSV = (csvData, fileName) => {
    //   const ws = XLSX.utils.json_to_sheet(csvData);
    //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    //   const data = new Blob([excelBuffer], { type: fileType });
    //   FileSaver.saveAs(data, fileName + fileExtension);
    // };

    // ******** XLSX with new header *************
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const Heading = [
        {
            Name: "Name",
            DOB: "DOB",
            Class: "Class",
            Section: "Section",
            ExamTheme: "ExamTheme",
            MockExam: "MockExam"
        }
    ];

    const exportToCSV = (fileName) => {
        let csvData = [{
            Name: "",
            DOB: "",
            Class: "",
            Section: "",
            ExamTheme: "",
            MockExam: ""
        }];

        const wscols = [
            { wch: Math.max(...csvData.map(customer => customer.Name.length)) + 3 },
            { wch: Math.max(...csvData.map(customer => customer.DOB.length)) + 3 },
            { wch: Math.max(...csvData.map(customer => customer.Class.length)) + 3 },
            { wch: Math.max(...csvData.map(customer => customer.Section.length)) + 3 },
            {
                wch: Math.max(...csvData.map(customer => customer.ExamTheme.length)) + 3
            },
            { wch: Math.max(...csvData.map(customer => customer.MockExam.length)) + 3 },
        ];
        const ws = XLSX.utils.json_to_sheet(Heading, {
            header: ["Name", "DOB", "Class", "Section", "ExamTheme", "MockExam"],
            skipHeader: true,
            origin: 0 //ok
        });
        ws["!cols"] = wscols;
        XLSX.utils.sheet_add_json(ws, csvData, {
            header: ["Name", "DOB", "Class", "Section", "ExamTheme", "MockExam"],
            skipHeader: true,
            origin: -1 //ok
        });
        const wb = { Sheets: { Sheet1: ws }, SheetNames: ["Sheet1"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <button className="btn btn-primary mb-4 mb-sm-0 w-100" onClick={e => exportToCSV(fileName)}>Download Excel Format</button>
        // <button
        //     variant="warning"
        //     onClick={e => exportToCSV(csvData, fileName, wscols)}
        // >
        //     Export XLSX
        // </button>
    );
};

export default ExportCSV;

// This component is a presentational component which takes the data to download and file name as props. The exportToCSV method is invoked when the export button is clicked on line 20.
