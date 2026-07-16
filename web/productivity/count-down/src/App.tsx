import "./App.css";
import Countdown from "./component/Countdown";
import Facebook from "./component/Facebook";
import Instagram from "./component/Instagram";
import Pinterest from "./component/Pinterest";

export default function App() {
  return (
    <>
      <h1>We're launching soon</h1>

      <div className="countdown">
        <Countdown />
      </div>

      <div className="social">
        <Facebook />
        <Pinterest />
        <Instagram />
      </div>

      <div className="hills" />
    </>
  );
}
