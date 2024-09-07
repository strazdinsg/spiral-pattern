import Grid from "./Grid";
import DownloadCsv from "./DownloadCsv";
import { calculatePattern } from "./Pattern";

const maxDistance = 160;

export default function App() {
  const pattern = calculatePattern(maxDistance);

  return (
    <>
      <Grid pattern={pattern} />
      <DownloadCsv pattern={pattern} fileName="pattern" />
    </>
  );
}
