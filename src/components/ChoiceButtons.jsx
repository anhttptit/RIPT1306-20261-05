import { CHOICES } from "../lib/rules";

export default function ChoiceButtons({ disabled, onPick }) {
  return (
    <div className="choices">
      {CHOICES.map((c) => (
        <button key={c.id} className="choice" disabled={disabled} onClick={() => onPick(c.id)}>
          <span className="emoji">{c.emoji}</span>
          <span className="name">{c.label}</span> <kbd>phím {c.key}</kbd>
        </button>
      ))}
    </div>
  );
}
