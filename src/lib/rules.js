// Luật chơi – không liên quan tới React
export const CHOICES = [
  { id: "rock", label: "Búa", emoji: "✊", key: "1" },
  { id: "paper", label: "Bao", emoji: "✋", key: "2" },
  { id: "scissors", label: "Kéo", emoji: "✌️", key: "3" },
];

const BEATS = { rock: "scissors", paper: "rock", scissors: "paper" };

export const byId = (id) => CHOICES.find((c) => c.id === id);

// Kết quả theo góc nhìn người chơi
export function judge(player, computer) {
  if (player === computer) return "draw";
  return BEATS[player] === computer ? "win" : "lose";
}

export function randomChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)].id;
}

