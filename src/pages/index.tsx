"use client";

import { useState } from "react";

const allQuestions = [
  {
    question: "Asgar itu sebenernya berasal dari...",
    options: [
      { text: "Korea Selatan 🇰🇷", score: 2 },
      { text: "Manggarai 🐉", score: 3 },
      { text: "Multiverse", score: 4 },
      { text: "Tidak terdeteksi radar", score: 5 },
    ],
  },
  {
    question: "Kenapa dia dipanggil Oppa?",
    options: [
      { text: "Karena ganteng", score: 1 },
      { text: "Karena halu", score: 3 },
      { text: "Karena dipaksa", score: 2 },
      { text: "Dia sendiri yang ngaku", score: 4 },
    ],
  },
  {
    question: "Habitat asli Asgar:",
    options: [
      { text: "Cafe aesthetic", score: 1 },
      { text: "Gunung", score: 2 },
      { text: "Pulau Komodo 🐉", score: 4 },
      { text: "Kasur", score: 3 },
    ],
  },
  {
    question: "Jika Asgar bilang 'gas', itu artinya...",
    options: [
      { text: "Langsung jalan", score: 1 },
      { text: "30 menit lagi", score: 2 },
      { text: "Besok", score: 3 },
      { text: "Tahun depan", score: 5 },
    ],
  },
];

const titles = [
  "Oppa KW 🥲",
  "Ngaret Enjoyer 🐢",
  "Komodo Magang 🐉",
  "ASGAR FINAL BOSS 💀🔥",
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [name, setName] = useState("");
  const [showJumpscare, setShowJumpscare] = useState(false);

  const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

  const startGame = () => {
    setQuestions(shuffle(allQuestions));
    setStarted(true);
  };

const handleAnswer = (value: number) => {
  if (navigator.vibrate) navigator.vibrate(50);

  setScore(score + value);

  if (current + 1 < questions.length) {
    setCurrent(current + 1);
  } else {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setFinished(true);

      // delay sebelum jumpscare muncul
      setTimeout(() => {
        setShowJumpscare(true);

        // sound
        const audio = new Audio("/jumpscare.mp3");
        audio.play();

        // ⏳ auto hilang setelah 3 detik
        setTimeout(() => {
          setShowJumpscare(false);
        }, 3000);

      }, 1000);

    }, 1800);
  }
};
  const getPercentage = () => {
    return Math.min(100, Math.floor((score / 20) * 100));
  };

  const getResult = () => {
    if (name.toLowerCase() === "asgar") {
      return "LAH INI ORANGNYA LANGSUNG 😭🐉";
    }
    if (score <= 6) return "masih aman sih… tapi tipis 🤏";
    if (score <= 12) return "waduh mulai keliatan 😭";
    return "ANJIR 💀 ini sih udah parah banget 🐉🔥";
  };

  const getRandomTitle = () => {
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const shareToWA = () => {
    const message = `ANJIR GUE COBA TES INI 😭

${name || "Gue"} dapet:
${getResult()}
${getPercentage()}% ASGAR 💀

Lu coba deh:
${window.location.href}`;

    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const resetGame = () => {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <main className="min-h-dvh flex items-center justify-center bg-neutral-950 text-white px-4">

      <div className="w-full max-w-lg">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">

          {/* START */}
          {!started && (
            <div className="text-center space-y-5">
              <h1 className="text-3xl sm:text-4xl font-semibold">
                OPPA ASGAR 🐉
              </h1>

              <p className="text-sm text-neutral-400">
                ini khusus oppa asgar
              </p>

              <input
                type="text"
                placeholder="Masukkan ki nama ta`"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-white"
              />
              {!name.trim() && (
  <p className="text-xs text-red-400 text-left">
    Isi Ki dulu nama ta ganteng
  </p>
)}

              <button
  onClick={startGame}
  disabled={!name.trim()}
  className={`w-full py-3 rounded-lg font-medium transition
    ${!name.trim()
      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
      : "bg-white text-black hover:bg-neutral-200 active:scale-95"}
  `}
>
  Mulai Tes
</button>

            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="text-center py-10 space-y-3">
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mt-4">
  <div className="h-full bg-green-400 animate-pulse w-full"></div>
</div>

<p className="text-xs text-neutral-500 mt-2">
  scanning DNA komodo...
</p>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-neutral-400">
                lagi ngecek seberapa parah 😭
              </p>
            </div>
            
          )}

          {/* QUIZ */}
          {started && !loading && !finished && (
            <div className="space-y-6">

              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div>
                <p className="text-xs text-neutral-500 mb-1">
                  pertanyaan {current + 1}/{questions.length}
                </p>

                <h2 className="text-lg font-medium">
                  {questions[current]?.question}
                </h2>
              </div>

              <div className="space-y-3">
                {questions[current]?.options.map((opt: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.score)}
                    className="w-full text-left border border-neutral-700 px-4 py-3 rounded-lg hover:border-white hover:bg-neutral-800 active:scale-[0.98] transition"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RESULT */}
          {finished && (
            <div className="text-center space-y-5 animate-slide-down">

              <h1 className="text-2xl font-semibold">
                hasilnya keluar 
              </h1>

              <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-5 space-y-3">

                <p className="text-sm text-neutral-400">
                  {name || "lu"} ternyata...
                </p>

                <p className="text-lg font-medium">
                  {getResult()}
                </p>

                <p className="text-3xl font-bold">
                  {getPercentage()}% ASGAR 
                </p>

                <p className="text-sm text-neutral-400">
                  {getRandomTitle()}
                </p>

                <p className="text-xs text-neutral-500">
                  *data tidak bisa dipertanggungjawabkan 😭
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={shareToWA}
                  className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-neutral-200 active:scale-95 transition"
                >
                  Share ke WhatsApp 📤
                </button>

                <button
                  onClick={resetGame}
                  className="w-full border border-neutral-700 py-3 rounded-lg hover:bg-neutral-800 active:scale-95 transition"
                >
                  Coba Lagi 🔁
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
      {showJumpscare && (
  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-pulse">

    <img
      src="/asgar.jpeg" // taruh foto di public folder
      alt="ASGAR"
      className="w-full h-full object-cover scale-110 animate-[zoom_0.3s_ease-out]"
    />

  </div>
  
)}

    </main>
    
    
  );
}