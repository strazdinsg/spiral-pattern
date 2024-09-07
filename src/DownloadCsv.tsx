/**
 * CSV download component properties.
 * @property data - The data to be downloaded as a CSV file.
 * @property fileName - The name of the file to be downloaded, without the extension.
 */
type CsvDownloadProps = {
  pattern: boolean[][];
  fileName: string;
};

const SEPARATOR = ",";
const LINE_BREAK = "\r\n";

/**
 * A React component for downloading data as a CSV file.
 * @param props - The props for the component.
 * @returns A button element that, when clicked, downloads the data as a CSV file.
 */
export default function DownloadCsv(props: CsvDownloadProps) {
  function convertToCSV(array: boolean[][]) {
    let str = "";
    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (const index in array[i]) {
        if (line !== "") line += SEPARATOR;
        line += array[i][index] ? "1" : "0";
      }
      str += line + LINE_BREAK;
    }
    return str;
  }

  function downloadCSV() {
    const csvData = new Blob([convertToCSV(props.pattern)], {
      type: "text/csv",
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${props.fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return <button onClick={downloadCSV}>Download CSV</button>;
}
