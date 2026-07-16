import "./Count.css";

export default function Count({
  count,
  time,
}: {
  count: number;
  time: string;
}) {
  return (
    <div className="card-flip">
      <span className="card-number">
        <span className="card-number-top" />
        {count}
      </span>
      <p>{time}</p>
    </div>
  );
}
