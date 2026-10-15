import { useEffect, useState } from "react";
import { CHOICES, byId, judge, randomChoice } from "./lib/rules";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useKeyPress } from "./hooks/useKeyPress";
import Hand from "./components/Hand";
import Scoreboard from "./components/Scoreboard";
import ChoiceButtons from "./components/ChoiceButtons";

const RESULT_TEXT = { win: "Bạn thắng!", lose: "Máy thắng!", draw: "Hòa!" };

export default function App() {
  const [phase, setPhase] = useState("idle"); // idle | countdown | result
  const [count, setCount] = useState(3);
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);

  // Custom hook: giống useState nhưng tải lại trang vẫn còn tỉ số
  const [score, setScore] = useLocalStorage("ott-score", { win: 0, lose: 0, draw: 0 });

  function pick(id) {
    if (phase === "countdown") return;
    setPlayer(id);
    setComputer(randomChoice());
    setCount(3);
    setPhase("countdown");
  }

  // useEffect: đếm ngược 3-2-1 rồi công bố kết quả; cleanup hủy timer cũ
  useEffect(() => {
    if (phase !== "countdown") return;

    const id = setTimeout(() => {
      if (count > 1) {
        setCount(count - 1);
        return;
      }
      const result = judge(player, computer);
      setPhase("result");
      setScore((s) => ({ ...s, [result]: s[result] + 1 }));
    }, 600);

    return () => clearTimeout(id);
  }, [phase, count, player, computer, setScore]);

  // Custom hook: chơi bằng phím 1, 2, 3
  useKeyPress((key) => {
    const choice = CHOICES.find((c) => c.key === key);
    if (choice) pick(choice.id);
  });

  const result = phase === "result" ? judge(player, computer) : null;
  const shaking = phase === "countdown";
  const playerEmoji = phase === "result" ? byId(player).emoji : "✊";
  const computerEmoji = phase === "result" ? byId(computer).emoji : "✊";

  return (
    <main className="app">
      <h1 className="title">Oẳn tù tì</h1>
      <p className="subtitle">Đấu với máy. Tỉ số được lưu lại, tải lại trang vẫn còn.</p>

      <Scoreboard score={score} />

      <section className="arena" aria-live="polite">
        <div>
          <Hand emoji={playerEmoji} side="player" shaking={shaking} />
          <div className="side-name">Bạn</div>
        </div>

        <div className="center">
          {phase === "idle" && <div className="vs">Chọn Búa, Bao hoặc Kéo</div>}
          {phase === "countdown" && <div className="count">{count}</div>}
          {phase === "result" && (
            <>
              <div className={`result ${result}`}>{RESULT_TEXT[result]}</div>
              <div className="muted">Máy ra {byId(computer).label}</div>
            </>
          )}
        </div>

        <div>
          <Hand emoji={computerEmoji} side="computer" shaking={shaking} />
          <div className="side-name">Máy</div>
        </div>
      </section>

      <ChoiceButtons disabled={phase === "countdown"} onPick={pick} />

      <div className="row">
        <button className="ghost" onClick={() => setScore({ win: 0, lose: 0, draw: 0 })}>Xóa tỉ số</button>
      </div>
    </main>
  );
}
