"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from "lucide-react";

const AUDIO_URL = "/Spanish.webm";
const summaries = [
  {
    Interval_Time: 0,
    Psychometric_Summary_Spanish:
      "Durante el intervalo inicial, el análisis del audio revela una narrativa marcada por variaciones significativas en el tono y ritmo vocal. La oradora, quien se identifica como psicóloga, expresa sus reflexiones sobre la ansiedad con un patrón prosódico que alterna entre momentos de intensidad emocional y períodos de contemplación. Sus patrones de habla sugieren una profunda conexión personal con el tema, especialmente notable en las modulaciones vocales al describir la importancia de escuchar las señales del cuerpo. Las pausas y cambios en la cadencia del discurso son particularmente evidentes cuando aborda recuerdos personales, como la pérdida de su padre, donde el tono de voz revela la persistencia del impacto emocional de estas experiencias.",

    Psychometric_Summary_English:
      "During the initial interval, the audio analysis reveals a narrative marked by significant variations in vocal tone and rhythm. The speaker, who identifies as a psychologist, expresses her reflections on anxiety with a prosodic pattern that alternates between moments of emotional intensity and periods of contemplation. Her speech patterns suggest a deep personal connection to the topic, especially notable in the vocal modulations when describing the importance of listening to body signals. Pauses and changes in speech cadence are particularly evident when addressing personal memories, such as the loss of her father, where the tone of voice reveals the persistent emotional impact of these experiences.",
  },
  {
    Interval_Time: 120,
    Psychometric_Summary_Spanish:
      "En este intervalo, el análisis prosódico muestra un discurso caracterizado por cambios notables en la intensidad vocal y el ritmo narrativo. La oradora mantiene un patrón de habla que refleja una profunda introspección, especialmente evidente en las modulaciones de su voz al abordar temas de pérdida y recuperación. Las variaciones en el tono y la cadencia sugieren un proceso activo de procesamiento emocional, particularmente cuando describe situaciones de ansiedad en contextos laborales. Las pausas estratégicas en su narrativa enfatizan momentos de reflexión significativa, mientras que los cambios en la intensidad vocal subrayan la importancia de ciertos puntos en su discurso.",

    Psychometric_Summary_English:
      "In this interval, prosodic analysis shows a discourse characterized by notable changes in vocal intensity and narrative rhythm. The speaker maintains a speech pattern that reflects deep introspection, especially evident in her voice modulations when addressing themes of loss and recovery. Variations in tone and cadence suggest an active process of emotional processing, particularly when describing anxiety situations in work contexts. Strategic pauses in her narrative emphasize moments of significant reflection, while changes in vocal intensity underscore the importance of certain points in her discourse.",
  },
  {
    Interval_Time: 240,
    Psychometric_Summary_Spanish:
      "Durante este intervalo final, los patrones prosódicos revelan una narrativa emotiva y reflexiva, con variaciones significativas en el ritmo y la intensidad vocal. La voz de la oradora transmite una mezcla de profesionalismo y vulnerabilidad personal, especialmente notable en las modulaciones tonales al discutir la naturaleza de la ansiedad como mecanismo de alerta. Los cambios en la cadencia y las pausas estratégicas en su discurso sugieren un proceso continuo de procesamiento emocional, particularmente evidente cuando aborda temas de resiliencia y recuperación. La estructura rítmica de su narrativa indica una integración consciente entre sus experiencias personales y su comprensión profesional del tema.",

    Psychometric_Summary_English:
      "During this final interval, prosodic patterns reveal an emotive and reflective narrative, with significant variations in rhythm and vocal intensity. The speaker's voice conveys a mixture of professionalism and personal vulnerability, especially notable in tonal modulations when discussing the nature of anxiety as a warning mechanism. Changes in cadence and strategic pauses in her speech suggest an ongoing process of emotional processing, particularly evident when addressing themes of resilience and recovery. The rhythmic structure of her narrative indicates a conscious integration between her personal experiences and professional understanding of the topic.",
  },
];

const overallSummary = {
  Psychometric_Summary_Spanish:
    "Durante la sesión, la oradora, una psicóloga, aborda la complejidad de la ansiedad y su relación con las experiencias de vida desde una perspectiva tanto personal como profesional. A través de su narrativa vocal, se percibe una profunda reflexión sobre el impacto de la ansiedad en la vida cotidiana. Su tono de voz y patrones prosódicos revelan una alternancia entre momentos de intensidad emocional y períodos de calma reflexiva, especialmente al compartir experiencias sobre pérdidas personales y desafíos profesionales. La cadencia de su habla y las variaciones en su entonación sugieren un proceso activo de procesamiento emocional mientras articula sus pensamientos sobre el manejo de la ansiedad. Las pausas en su discurso y los cambios en el ritmo vocal son particularmente notables cuando aborda temas relacionados con el duelo y las experiencias traumáticas, indicando la profundidad emocional de estas memorias. A través de su expresión vocal, se evidencia una lucha interna entre la vulnerabilidad personal y su rol profesional como psicóloga. Los patrones prosódicos también revelan momentos de determinación y esperanza, especialmente cuando habla sobre la capacidad de recuperación humana. La variación en la intensidad vocal y el ritmo de su narrativa sugieren un proceso continuo de integración entre sus experiencias personales y su comprensión profesional de la salud mental.",

  Psychometric_Summary_English:
    "During the session, the speaker, a psychologist, addresses the complexity of anxiety and its relationship with life experiences from both a personal and professional perspective. Through her vocal narrative, a deep reflection on the impact of anxiety in daily life is perceived. Her tone of voice and prosodic patterns reveal an alternation between moments of emotional intensity and periods of reflective calm, especially when sharing experiences about personal losses and professional challenges. The cadence of her speech and variations in intonation suggest an active process of emotional processing while articulating her thoughts about managing anxiety. The pauses in her discourse and changes in vocal rhythm are particularly notable when addressing topics related to grief and traumatic experiences, indicating the emotional depth of these memories. Through her vocal expression, an internal struggle between personal vulnerability and her professional role as a psychologist is evident. Prosodic patterns also reveal moments of determination and hope, especially when speaking about human resilience. The variation in vocal intensity and narrative rhythm suggests an ongoing process of integration between her personal experiences and professional understanding of mental health.",
};

const messages = [
  {
    start: 5.0,
    end: 13.0,
    text_Spanish:
      "Soy Elizabeth Flappes, psicóloga y creadora de contenido, y escritora de hasta que te caigas bien y querida yo.",
    text_English:
      "I am Elizabeth Flappes, a psychologist, content creator, and author of Until You Like Yourself and Dear Me.",
  },
  {
    start: 13.0,
    end: 23.0,
    text_Spanish:
      "Hola, Elizabeth. Hola. Mi nombre es Isabel. Soy directora de recursos humanos y madre de dos hijos de 18-15 años.",
    text_English:
      "Hello, Elizabeth. Hello. My name is Isabel. I am an HR director and mother of two children aged 18 and 15.",
  },
  {
    start: 23.0,
    end: 30.0,
    text_Spanish:
      "Encantada. Hoy más que nunca sabemos lo importante que es con Orcéanos, que queremos y que no.",
    text_English:
      "Pleased to meet you. Today, more than ever, we know how important it is with Orcéanos to know what we want and what we don’t.",
  },
  {
    start: 30.0,
    end: 38.0,
    text_Spanish:
      "Pero muchas veces nos causa ansiedad y preocupación. ¿Cómo podemos manejar esta ansiedad ante situaciones que nos desbordan?",
    text_English:
      "But it often causes us anxiety and worry. How can we manage this anxiety in situations that overwhelm us?",
  },
  {
    start: 38.0,
    end: 45.0,
    text_Spanish:
      "Yo creo que lo principal es entender que la ansiedad es la alarma, pero no el incendio.",
    text_English:
      "I believe the key is to understand that anxiety is the alarm, but not the fire.",
  },
  {
    start: 45.0,
    end: 54.0,
    text_Spanish:
      "En el sentido de que en muchas ocasiones viene a decirnos de alguna manera como puede que algo no va bien,",
    text_English:
      "In the sense that, on many occasions, it is trying to tell us in some way that something might be wrong,",
  },
  {
    start: 54.0,
    end: 61.0,
    text_Spanish:
      "que hay un trabajo que nos está afectando para mal, que nos estamos relacionando con alguien que nos está generando malestar,",
    text_English:
      "that there is a job that is affecting us negatively, or that we are in a relationship with someone causing us discomfort,",
  },
  {
    start: 61.0,
    end: 70.0,
    text_Spanish:
      "que hay una decisión que tenemos que tomar y no somos capaces, cualquier cosa que nuestro cuerpo nos está intentando decir que nos está haciendo daño.",
    text_English:
      "or that there is a decision we need to make and cannot. Anything our body is trying to tell us is hurting us.",
  },
  {
    start: 70.0,
    end: 76.0,
    text_Spanish:
      "Y como siempre digo yo, el cuerpo habla y si no lo escuchas, grita.",
    text_English:
      "And as I always say, the body talks, and if you don't listen, it screams.",
  },
  {
    start: 76.0,
    end: 81.0,
    text_Spanish:
      "Y si no le haces caso va a gritar tan fuerte que no te va a dejar escuchar otra cosa.",
    text_English:
      "And if you ignore it, it will scream so loudly that you won’t be able to hear anything else.",
  },
  {
    start: 81.0,
    end: 87.0,
    text_Spanish:
      "Entonces lo primero es prestar atención a que nos está diciendo nuestro cuerpo y por qué.",
    text_English:
      "So the first thing is to pay attention to what our body is telling us and why.",
  },
  {
    start: 87.0,
    end: 96.0,
    text_Spanish:
      "Así que es verdad que hay en muchísimas ocasiones en las que nos encontramos mal, estamos tristes, tenemos ansiedad por situaciones que no podemos cambiar.",
    text_English:
      "It’s true that, many times, we feel bad, sad, and anxious about situations we cannot change.",
  },
  {
    start: 97.0,
    end: 103.0,
    text_Spanish:
      "Y es que a veces la vida se pone muy fea. La vida, a veces se pone muy fea.",
    text_English:
      "And the truth is, sometimes life gets very ugly. Life sometimes gets very ugly.",
  },
  {
    start: 103.0,
    end: 111.0,
    text_Spanish:
      "Yo como psicóloga he visto muchísimos casos de personas que he pensado Dios mío lo que está viviendo esta persona.",
    text_English:
      "As a psychologist, I have seen many cases of people where I thought, ‘My God, what this person is living through.’",
  },
  {
    start: 111.0,
    end: 122.0,
    text_Spanish:
      "Es que es imposible pedirle, no escucha tu cuerpo, a ver qué te dice, bueno, qué me dice, me dice que me encuentro mal, me dice que estoy triste, me dice que me ha pasado algo espantoso, que no puedo hacer nada.",
    text_English:
      "It’s impossible to ask them to listen to their body to see what it says. Well, it says I feel bad, it says I am sad, it says something terrible happened to me, and I can’t do anything about it.",
  },
  {
    start: 123.0,
    end: 134.0,
    text_Spanish:
      "Entonces sí que es verdad que a veces la vida pasan cosas y madres que pierden a un hijo, hombres que se quedan viudos de manera inesperada, enfermedades.",
    text_English:
      "So yes, it’s true that sometimes life happens—mothers lose a child, men become widowers unexpectedly, illnesses strike.",
  },
  {
    start: 134.0,
    end: 136.0,
    text_Spanish: "A veces la vida te deja fuera de juego.",
    text_English: "Sometimes life leaves you out of the game.",
  },
  {
    start: 136.0,
    end: 145.0,
    text_Spanish:
      "Es que escucha tu cuerpo porque quizá necesita que pares, que te recuperes, que te dediques tiempo a ti, que pidas ayuda profesional.",
    text_English:
      "It’s about listening to your body because maybe it needs you to stop, recover, dedicate time to yourself, and seek professional help.",
  },
  {
    start: 146.0,
    end: 154.0,
    text_Spanish:
      "Pero más allá de estas situaciones que yo creo que todos las hemos vivido, yo creo que si miramos atrás, todos recordaremos su momento de nuestra vida que tiene fecha y hora.",
    text_English:
      "But beyond these situations, which I believe we’ve all experienced, I think if we look back, we’ll all remember a moment in our life that has a date and time.",
  },
  {
    start: 154.0,
    end: 161.0,
    text_Spanish:
      "Y que está ahí marcado, momento en el cual pensamos, yo de ésta nos salvo y salimos y estamos aquí.",
    text_English:
      "And it’s marked there—a moment when we thought, ‘I won’t make it through this,’ and yet we did, and here we are.",
  },
  {
    start: 161.0,
    end: 167.0,
    text_Spanish:
      "Entonces es importante recordar que todos hemos pasado por situaciones de yo de ésta nos salvo.",
    text_English:
      "So it’s important to remember that we’ve all gone through situations where we thought, ‘I won’t survive this.’",
  },
  {
    start: 168.0,
    end: 176.0,
    text_Spanish:
      "Yo recuerdo cuando yo tenía 13 años que mi padre se suicidó y cuando mi familia me tuvo que dar esta noticia.",
    text_English:
      "I remember when I was 13, and my father committed suicide, and my family had to give me that news.",
  },
  {
    start: 176.0,
    end: 182.0,
    text_Spanish:
      "Claro, darle una noticia así ahora, niña de 13 años que toda su vida es su padre, es algo complicadísimo.",
    text_English:
      "Of course, giving news like that to a 13-year-old girl whose entire world is her father is incredibly complicated.",
  },
  {
    start: 182.0,
    end: 185.0,
    text_Spanish: "Y yo recuerdo que en aquel momento pensé, se acabó.",
    text_English: "And I remember thinking at that moment, ‘It’s over.’",
  },
  {
    start: 185.0,
    end: 193.0,
    text_Spanish:
      "No hay nada después de esto. Si la vida me ha quitado mi padre, después de esto me niego a pensar que yo voy a seguir viviendo.",
    text_English:
      "There is nothing after this. If life has taken my father, after this, I refuse to think I’ll keep living.",
  },
  {
    start: 193.0,
    end: 198.0,
    text_Spanish:
      "No lo veía, no veía nada más. Y mira que me han pasado cosas feas en la vida.",
    text_English:
      "I couldn’t see it, I couldn’t see anything else. And mind you, I’ve been through other tough times in life.",
  },
  {
    start: 198.0,
    end: 203.0,
    text_Spanish:
      "Pero es un golpe tan fuerte que a mí no me podías venir a que el momento de decir estos ataques de pánicos,",
    text_English:
      "But it’s such a strong blow that no one could come to me at that moment and talk about these panic attacks,",
  },
  {
    start: 203.0,
    end: 210.0,
    text_Spanish:
      "estos ataques de ansiedad, esta depresión que vas a tener, escucha tu cuerpo, a ver que te pide, ser resiliente, vas a salir mejor después de esto.",
    text_English:
      "these anxiety attacks, this depression you’re going to have. Listen to your body, see what it asks for, be resilient—you’ll come out better after this.",
  },
  {
    start: 210.0,
    end: 213.0,
    text_Spanish: "A mí nadie me podía venir a decir eso.",
    text_English: "No one could come and tell me that.",
  },
  {
    start: 213.0,
    end: 217.0,
    text_Spanish:
      "Entonces hay que admitir y hay que entender que situaciones en la vida que te dejan fuera de juego.",
    text_English:
      "So we must admit and understand that there are situations in life that leave you out of the game.",
  },
  {
    start: 217.0,
    end: 228.0,
    text_Spanish:
      "Pero también hay que aprender a mirar atrás y darnos cuenta de que todos hemos vividos situaciones así, algunos más, otros menos, otros casi ninguna y otros de repente quince de estas situaciones.",
    text_English:
      "But we also need to learn to look back and realize that we’ve all been through situations like this—some more, some less, some almost none, and others perhaps 15 of these situations.",
  },
  {
    start: 228.0,
    end: 235.0,
    text_Spanish:
      "Pero una vez miras atrás y te das cuenta de que sí, en un momento lo pensaste que no podrías salir pero saliste.",
    text_English:
      "But once you look back and realize, yes, at one point, you thought you couldn’t make it, but you did.",
  },
  {
    start: 235.0,
    end: 239.0,
    text_Spanish: "Creo que te das cuenta de que el ser humano es maravilloso.",
    text_English: "I think you realize that the human being is wonderful.",
  },
  {
    start: 239.0,
    end: 248.0,
    text_Spanish:
      "A mí parecer como psicólogo, como profesional y como persona, he podido ver que el ser humano es resilientemente increíble.",
    text_English:
      "In my view as a psychologist, a professional, and a person, I’ve seen that the human being is resiliently incredible.",
  },
  {
    start: 248.0,
    end: 255.0,
    text_Spanish:
      "Es increíble, he visto a persona recuperarse de situaciones que parecían imposibles y lo hacen.",
    text_English:
      "It’s incredible. I’ve seen people recover from situations that seemed impossible, and they do it.",
  },
  {
    start: 255.0,
    end: 265.0,
    text_Spanish:
      "Pero más allá de las situaciones que no podemos cambiar y que no suceden y punto y sobrevivimos como podemos y de las cuales salimos arrastras.",
    text_English:
      "But beyond the situations we cannot change, the ones that just happen, and we survive as best we can, crawling out of them.",
  },
  {
    start: 266.0,
    end: 267.0,
    text_Spanish: "Hay situaciones que sí.",
    text_English: "There are situations that yes.",
  },
  {
    start: 267.0,
    end: 273.0,
    text_Spanish:
      "Hay situaciones que sí vale la pena escuchar a nuestro cuerpo y decirnos que me pasa.",
    text_English:
      "There are situations where it’s worth listening to our body and asking, ‘What’s wrong with me?’",
  },
  {
    start: 273.0,
    end: 279.0,
    text_Spanish:
      "¿Por qué tengo ansiedad? ¿Por qué cada vez que voy a trabajar antes de entrar al trabajo me encuentro mal?",
    text_English:
      "Why am I anxious? Why do I feel bad every time I’m about to go to work?",
  },
  {
    start: 279.0,
    end: 286.0,
    text_Spanish:
      "¿Por qué cuando acaban las vacaciones en los últimos tres días de vacaciones empieza a tener taquí cardias, empieza a tener ganas de llorar?",
    text_English:
      "Why do I start having heart palpitations and feel like crying in the last three days of vacation?",
  },
  {
    start: 286.0,
    end: 288.0,
    text_Spanish: "¿Por qué mi cuerpo me está diciendo esto?",
    text_English: "Why is my body telling me this?",
  },
  {
    start: 288.0,
    end: 291.0,
    text_Spanish:
      "Que yo voy al trabajo luego cuando vuelvo a casa siento alivio.",
    text_English: "That I go to work and then feel relief when I return home.",
  },
  {
    start: 291.0,
    end: 296.0,
    text_Spanish:
      "Pero por la noche otra vez sé que por la mañana cuando me levante tengo que volver a este sitio de trabajo.",
    text_English:
      "But at night, I know that in the morning, when I wake up, I’ll have to go back to this workplace.",
  },
  {
    start: 296.0,
    end: 300.0,
    text_Spanish:
      "¿Por qué yo era feliz antes de conocer a esta persona y desde que...",
    text_English:
      "Why was I happy before meeting this person, and ever since...",
  },
];

// Wave Bar Component
const WaveBar = ({ active, height }: { active: boolean; height: number }) => (
  <motion.div
    className={`w-0.5 mx-[0.5px] rounded-full ${
      active ? "bg-amber-400" : "bg-gray-600/50"
    }`}
    animate={{
      height: height,
    }}
    transition={{
      duration: 0.2,
      ease: "easeOut",
    }}
  />
);

const AudioPlayer = () => {
  // Existing state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnglish, setIsEnglish] = useState(true); // Language toggle
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waveHeights, setWaveHeights] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();

  // Initialize wave heights
  useEffect(() => {
    const heights = Array.from(
      { length: 128 },
      () => Math.floor(Math.random() * 16) + 4
    );
    setWaveHeights(heights);
  }, []);

  // Update wave heights periodically when playing
  useEffect(() => {
    const updateWaveHeights = () => {
      if (isPlaying) {
        setWaveHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 16) + 4)
        );
      }
    };

    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(updateWaveHeights, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Split audio initialization and playback effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initial setup
    const handleLoadedMetadata = () => {
      console.log("Metadata loaded - Duration:", audio.duration);
      setDuration(audio.duration);
      setError(null);
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setError("Failed to load audio. Please try again later.");
    };

    // Add initial event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);

    // Load audio
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Handle playback and time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsAudioEnded(true);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    audio.addEventListener("ended", handleEnded);

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        if (audio.readyState < 2) {
          await new Promise((resolve) => {
            audio.addEventListener("canplay", resolve, { once: true });
          });
        }
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      console.error("Playback failed:", e);
      setError("Playback failed. Please try again.");
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      const validTime = Math.max(0, Math.min(time, duration));
      audio.currentTime = validTime;
      setCurrentTime(validTime);

      if (validTime < duration) {
        setIsAudioEnded(false);
      }

      if (isAudioEnded && validTime < duration) {
        setIsAudioEnded(false);
      }
    } catch (error) {
      console.error("Error seeking:", error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const findCurrentSummary = () => {
    if (isAudioEnded) {
      return isEnglish
        ? overallSummary.Psychometric_Summary_English
        : overallSummary.Psychometric_Summary_Spanish;
    }
    const summary = summaries
      .slice()
      .reverse()
      .find((s) => currentTime >= s.Interval_Time);
    return summary
      ? isEnglish
        ? summary.Psychometric_Summary_English
        : summary.Psychometric_Summary_Spanish
      : isEnglish
        ? "No summary available."
        : "No hay resumen disponible.";
  };

  const findCurrentMessage = () => {
    const message = messages.find(
      (msg) => currentTime >= msg.start && currentTime < msg.end
    );
    return message
      ? isEnglish
        ? message.text_English
        : message.text_Spanish
      : isEnglish
        ? "No transcript available."
        : "No hay transcripción disponible.";
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const totalBars = 128;
  const activeBarIndex = Math.floor((progress / 100) * totalBars);

  return (
    <div className="w-screen min-h-screen rounded-3xl flex flex-col bg-white ">
      <div className="max-w-7xl w-full mx-auto p-6 ">
        <h2 className="text-2xl font-semibold text-[#e66e36] mb-6">
          {isEnglish ? "Audio Insights" : "Percepciones de audio"}
        </h2>
        {/* Audio Player Section */}
        <div className="w-full bg-white backdrop-blur-xl p-6  shadow-lg rounded-3xl text-black mb-8">
          <audio
            ref={audioRef}
            src={AUDIO_URL}
            preload="auto"
            onLoadedMetadata={(e) => {
              const audio = e.currentTarget;
              setDuration(audio.duration);
              setCurrentTime(audio.currentTime);
            }}
          />

          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">
              {isEnglish ? "Audio Analysis" : "Análisis de Audio"}
            </h1>
            {/* <p className="text-sm text-black">
              {isEnglish
                ? "Real-time Transcription & Analysis"
                : "Transcripción y Análisis en Tiempo Real"}
            </p> */}
          </div>

          {error ? (
            <div className="text-red-500 text-center mb-4">{error}</div>
          ) : (
            <>
              <div className="relative w-full h-16 mb-2 flex items-center">
                <div className="absolute inset-0 flex items-center justify-between">
                  {waveHeights.map((height, index) => (
                    <WaveBar
                      key={index}
                      active={index <= activeBarIndex}
                      height={isPlaying ? height : 4}
                    />
                  ))}
                </div>
                <input
                  type="range"
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                />
              </div>

              <div className="flex justify-between text-sm text-orange-400 mb-6">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-between px-4">
                <div className="relative group">
                  <button
                    className="text-black/80 hover:text-orange-400 transition-colors relative"
                    onClick={() => handleSeek(Math.max(currentTime - 10, 0))}
                    title="Rewind 10 seconds"
                  >
                    <SkipBack size={28} />
                  </button>
                </div>

                <motion.button
                  className="bg-orange-400 text-black p-4 rounded-full"
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause size={28} />
                  ) : (
                    <Play size={28} className="ml-1" />
                  )}
                </motion.button>

                <div className="relative group">
                  <button
                    className="text-black/80 hover:text-orange-400 transition-colors relative"
                    onClick={() =>
                      handleSeek(Math.min(currentTime + 10, duration))
                    }
                    title="Forward 10 seconds"
                  >
                    <SkipForward size={28} />
                  </button>
                </div>

                <button
                  className="text-black/80 hover:text-orange-400 transition-colors"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Language Selection */}
        <div className="mt-6 flex justify-center mb-4">
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-6  rounded-xl py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-md hover:from-orange-500 hover:to-orange-600 transition-transform transform hover:scale-105"
          >
            {isEnglish ? "Switch to Spanish" : "Cambiar a Inglés"}
          </button>
        </div>
        {/* Transcript and Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Transcript Panel */}

          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#e66e36] mb-4">
              {isEnglish ? "Transcript" : "Transcripción"}
            </h3>
            <div
              className={`text-gray-700 text-lg ${
                findCurrentMessage()?.split(".").length > 10
                  ? "h-[500px] overflow-y-auto"
                  : "min-h-fit"
              }`}
            >
              {findCurrentMessage() ||
                (isEnglish
                  ? "Play Audio to see the transcript ."
                  : "Reproducir audio para ver la transcripción.")}
            </div>
          </div>

          {/* Summary/Final Report Panel */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#e66e36] mb-4">
              {isAudioEnded
                ? isEnglish
                  ? "Final Report"
                  : "Informe Final"
                : isEnglish
                  ? "Summary"
                  : "Resumen"}
            </h3>
            <div
              className={`text-gray-700 text-lg justify-content${
                findCurrentSummary()?.split(".").length > 10
                  ? "h-[500px] overflow-y-auto"
                  : "min-h-fit"
              }`}
            >
              {findCurrentSummary()}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isAudioEnded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 text-center text-sm text-gray-600"
            >
              <p>
                {isEnglish
                  ? "Playback has ended. Replay to continue analysis."
                  : "La reproducción ha terminado. Reproduzca de nuevo para continuar con el análisis."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AudioPlayer;
