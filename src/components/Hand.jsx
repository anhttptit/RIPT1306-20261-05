export default function Hand({ emoji, side, shaking }) {
  return <span className={`hand ${side} ${shaking ? "shake" : ""}`}>{emoji}</span>;
}
