"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
} from "lucide-react";

const WEBM_URL = "/Spanish.webm";

const summaries = [
  {
    Interval_Time: 0,
    Psychometric_Summary_Spanish:
      "Durante el intervalo analizado, la persona muestra una profunda reflexión sobre el manejo de la ansiedad y las dificultades emocionales que enfrenta en su vida personal y profesional. La oradora, quien se identifica como psicóloga, comparte su experiencia sobre la importancia de escuchar las señales del cuerpo y comprender que la ansiedad actúa como un mecanismo de alerta ante situaciones de malestar. Se expresa un reconocimiento de la tristeza y el dolor asociados a experiencias de pérdida y trauma, especialmente al recordar la muerte de su padre en la adolescencia, lo que sugiere un impacto emocional significativo y un proceso de duelo no resuelto. A lo largo de su discurso, se evidencian emociones como la confusión y la tristeza, junto con momentos de determinación y esperanza, reflejando una lucha interna entre la aceptación de experiencias difíciles y el deseo de encontrar un sentido de resiliencia. Las emociones faciales y prosódicas capturadas, como la calma y la confusión, complementan esta narrativa, sugiriendo un estado emocional complejo que combina momentos de reflexión y vulnerabilidad. En general, la oradora parece estar en un proceso de autoexploración y búsqueda de entendimiento sobre su propio bienestar, manifestando tanto una conciencia de sus dificultades como una aspiración hacia la sanación y la superación personal.",
    Psychometric_Summary_English:
      "During the analyzed interval, the person demonstrates a deep reflection on managing anxiety and the emotional difficulties they face in their personal and professional life. The speaker, who identifies as a psychologist, shares her experience about the importance of listening to the body's signals and understanding that anxiety acts as a warning mechanism in situations of discomfort. There is recognition of sadness and pain associated with experiences of loss and trauma, especially when recalling the death of her father during adolescence, suggesting significant emotional impact and an unresolved grieving process. Throughout her speech, emotions such as confusion and sadness, along with moments of determination and hope, are evident, reflecting an internal struggle between accepting difficult experiences and the desire to find a sense of resilience. The captured facial and prosodic emotions, such as calmness and confusion, complement this narrative, suggesting a complex emotional state combining moments of reflection and vulnerability. Overall, the speaker seems to be in a process of self-exploration and seeking understanding of her own well-being, manifesting both an awareness of her difficulties and an aspiration toward healing and personal growth.",
  },
  {
    Interval_Time: 120,
    Psychometric_Summary_Spanish:
      "Durante el intervalo analizado, la persona manifiesta una profunda reflexión sobre la ansiedad y su relación con las experiencias de vida adversas. Expresa la necesidad de reconocer la ansiedad como una señal de alerta más que como un estado permanente, sugiriendo que es crucial escuchar las señales del cuerpo para identificar lo que nos afecta negativamente. El relato revela momentos de vulnerabilidad, donde recuerda situaciones dolorosas como la pérdida de un ser querido en su adolescencia, lo que generó un sentimiento de desesperanza y confusión. Esta narrativa está acompañada de emociones como la tristeza y la confusión, que son evidentes en sus expresiones faciales y en su tono, que denotan determinación a pesar de las dificultades. La capacidad de reflexionar sobre experiencias pasadas y reconocer que ha superado situaciones difíciles resalta una resiliencia subyacente, aunque también se percibe un estado de fatiga emocional y una lucha con la ansiedad en situaciones cotidianas, como el regreso al trabajo tras las vacaciones. En conjunto, la persona parece atravesar un proceso de autoconocimiento, donde la ansiedad se presenta como un tema recurrente que invita a la introspección y a la búsqueda de apoyo profesional, reflejando una mezcla de emociones complejas que incluyen la tristeza, la calma y un leve sentido de asombro ante la capacidad humana de recuperación.",
    Psychometric_Summary_English:
      "During the analyzed interval, the person manifests a deep reflection on anxiety and its relationship with adverse life experiences. She expresses the need to recognize anxiety as a warning signal rather than a permanent state, suggesting that it is crucial to listen to the body's signals to identify what negatively affects us. The account reveals moments of vulnerability, where she recalls painful situations such as the loss of a loved one during adolescence, which generated feelings of hopelessness and confusion. This narrative is accompanied by emotions such as sadness and confusion, evident in her facial expressions and tone, denoting determination despite difficulties. The ability to reflect on past experiences and recognize having overcome difficult situations highlights an underlying resilience, although emotional fatigue and struggles with anxiety in everyday situations, such as returning to work after a vacation, are also evident. Overall, the person seems to be undergoing a process of self-awareness, where anxiety emerges as a recurring theme inviting introspection and the search for professional support, reflecting a mix of complex emotions, including sadness, calmness, and a slight sense of awe at human resilience.",
  },
  {
    Interval_Time: 240,
    Psychometric_Summary_Spanish:
      "Durante el intervalo analizado, la persona expresa una profunda reflexión sobre la ansiedad y el sufrimiento emocional, subrayando la importancia de reconocer y atender las señales que el cuerpo envía ante situaciones adversas. Identifica la ansiedad como un mecanismo de alerta, indicando que es crucial escuchar lo que el cuerpo comunica, especialmente en contextos de estrés laboral o relaciones interpersonales dañinas. Su discurso revela una mezcla de tristeza y confusión, evidenciada por momentos de introspección sobre experiencias pasadas de pérdida y dolor, como la muerte de un ser querido en su adolescencia. Esta vivencia marcó un punto de inflexión en su vida, donde la sensación de desesperanza fue abrumadora. A pesar de estas dificultades, también transmite un mensaje de resiliencia, resaltando que, aunque hay eventos que pueden dejar a las personas 'fuera de juego', existe la capacidad de recuperarse y salir adelante. Las emociones faciales y prosódicas sugieren un estado de determinación y concentración, aunque también se perciben signos de tristeza y confusión, reflejando el conflicto interno que enfrenta al lidiar con su propia ansiedad y la de otros. En conjunto, estos elementos indican una persona que navega entre la lucha personal y la esperanza, destacando la complejidad de su estado emocional y la necesidad de buscar apoyo y atención a las propias necesidades psicológicas.",
    Psychometric_Summary_English:
      "During the analyzed interval, the person expresses a deep reflection on anxiety and emotional suffering, emphasizing the importance of recognizing and addressing the signals the body sends in adverse situations. She identifies anxiety as a warning mechanism, stating that it is crucial to listen to what the body communicates, especially in contexts of work stress or harmful interpersonal relationships. Her speech reveals a mixture of sadness and confusion, evidenced by moments of introspection about past experiences of loss and pain, such as the death of a loved one during adolescence. This experience marked a turning point in her life, where the sense of hopelessness was overwhelming. Despite these difficulties, she also conveys a message of resilience, highlighting that although there are events that can leave people 'out of the game,' there is the capacity to recover and move forward. Facial and prosodic emotions suggest a state of determination and focus, although signs of sadness and confusion are also present, reflecting the internal conflict she faces in dealing with her own anxiety and that of others. Overall, these elements indicate a person navigating between personal struggles and hope, emphasizing the complexity of her emotional state and the need to seek support and attend to her own psychological needs.",
  },
];

const overallSummary = {
  Psychometric_Summary_Spanish:
    "Durante la sesión, la oradora, una psicóloga, aborda la complejidad de la ansiedad y su relación con las experiencias de vida. Expresa la importancia de reconocer y escuchar las señales del cuerpo como un indicador de malestar emocional. Asimismo, comparte vivencias personales que subrayan la carga emocional que puede acarrear la pérdida y el duelo, destacando cómo eventos traumáticos pueden llevar a un estado de desesperanza y parálisis emocional. La repetición de ciertas frases y la profundización en sus recuerdos revelan una introspección significativa, sugiriendo que, a pesar de las dificultades, hay un reconocimiento del potencial resiliente del ser humano. Esto se manifiesta en su creencia en la capacidad de recuperación, aunque también se observa una lucha interna con la tristeza y la ansiedad, evidenciada por sus descripciones de síntomas físicos y emocionales asociados a situaciones que no puede cambiar. Los datos emocionales de apoyo revelan una mezcla de emociones que enriquecen esta narrativa. La expresión de confusión y tristeza, combinada con momentos de calma y determinación, sugiere que, aunque la oradora enfrenta retos significativos, también halla momentos de claridad y fortaleza. Las emociones de alegría y asombro que emergen en ciertos momentos indican una capacidad de asimilar experiencias y reflexionar sobre el crecimiento personal. Sin embargo, la ansiedad persiste, especialmente en contextos laborales, donde se siente abrumada antes de enfrentar su entorno. Este conflicto interno entre el deseo de superación y la lucha constante con la ansiedad revela un estado psicológico complejo que merece atención y posiblemente intervención profesional para facilitar su proceso de sanación. En resumen, la oradora muestra una profunda comprensión de las emociones humanas, combinada con un deseo de ayudar a otros a navegar por sus propios desafíos emocionales, lo que refleja un compromiso tanto profesional como personal con la salud mental.",
  Psychometric_Summary_English:
    "During the session, the speaker, a psychologist, addresses the complexity of anxiety and its relationship with life experiences. She expresses the importance of recognizing and listening to the body's signals as an indicator of emotional distress. Additionally, she shares personal experiences that underscore the emotional burden that loss and grief can carry, highlighting how traumatic events can lead to a state of hopelessness and emotional paralysis. The repetition of certain phrases and the deepening of her memories reveal significant introspection, suggesting that, despite the difficulties, there is an acknowledgment of the resilient potential of human beings. This is manifested in her belief in the capacity for recovery, although an internal struggle with sadness and anxiety is also observed, evidenced by her descriptions of physical and emotional symptoms associated with situations she cannot change.The supporting emotional data reveal a mix of emotions that enrich this narrative. The expression of confusion and sadness, combined with moments of calm and determination, suggests that, although the speaker faces significant challenges, she also finds moments of clarity and strength. The emotions of joy and wonder that emerge at certain moments indicate an ability to assimilate experiences and reflect on personal growth. However, anxiety persists, especially in work contexts, where she feels overwhelmed before facing her environment. This internal conflict between the desire for improvement and the constant struggle with anxiety reveals a complex psychological state that deserves attention and possibly professional intervention to facilitate her healing process. In summary, the speaker demonstrates a deep understanding of human emotions, combined with a desire to help others navigate their own emotional challenges, reflecting both a professional and personal commitment to mental health.",
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

export default function AudioInsightsDashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true); // Language toggle
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoaded(true);
    };
    const handleEnded = () => setIsAudioEnded(true);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch((error) => console.error("Playback failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (video && isLoaded) {
      video.currentTime = time; // Update video time
      setCurrentTime(time); // Update UI state
      if (time < duration) {
        setIsAudioEnded(false);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleTranslation = () => setIsEnglish(!isEnglish);

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
        : "Resumen no disponible.";
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

  return (
    <section className="w-screen py-3 md:py-2 lg:py-2 bg-[#F9F9F9] rounded-3xl flex justify-center">
      <div className="w-full max-w-[96%] lg:max-w-[98%] rounded-3xl flex items-center justify-center mx-auto">
        <motion.div
          className="w-full bg-[#FFFFFF] px-8 rounded-3xl p-6 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-[#4A4A4A]">
              {isEnglish ? " Audio Insights" : "Perspectivas de Audio "}
            </h1>
            <Button
              onClick={toggleTranslation}
              className={`transition-colors duration-300 px-6 py-2 rounded-full font-semibold ${
                isEnglish
                  ? "bg-[#2A6F97] text-white hover:bg-[#1E5676]"
                  : "bg-[#4A4A4A] text-white hover:bg-[#2A6F97]"
              }`}
            >
              {isEnglish ? "View in Spanish" : "Ver en Inglés"}
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Audio Player Section */}
            <div className="col-span-2 flex flex-col space-y-6">
              <motion.div
                className="overflow-hidden bg-[#F5F5F5] rounded-lg shadow-inner p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <video
                  ref={videoRef}
                  src={WEBM_URL}
                  className="w-full h-3"
                  preload="metadata"
                />
                <div className="flex items-center text-[#2A6F97]">
                  <Button
                    onClick={() => handleSeek(Math.max(currentTime - 10, 0))}
                  >
                    <SkipBack />
                  </Button>
                  <Button onClick={togglePlay}>
                    {isPlaying ? <Pause /> : <Play />}
                  </Button>
                  <Button
                    onClick={() =>
                      handleSeek(Math.min(currentTime + 10, duration))
                    }
                  >
                    <SkipForward />
                  </Button>
                  <Button onClick={toggleMute}>
                    {isMuted ? <VolumeX /> : <Volume2 />}
                  </Button>
                  <input
                    type="range"
                    className="ml-4 w-full h-3 md:h-2 lg:h-2"
                    min={0}
                    max={duration}
                    step="0.1"
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    disabled={!isLoaded}
                  />
                  <span className="ml-4">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </motion.div>

              {/* Transcript */}
              <motion.div className="bg-[#F5F5F5] rounded-3xl shadow-inner p-4 mt-6">
                <h2 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                  {isEnglish ? "Transcript" : "Transcripción"}
                </h2>
                <div className="text-[#4A4A4A] text-lg">
                  {findCurrentMessage()}
                </div>
              </motion.div>
            </div>

            {/* Summary Section */}
            <motion.div className="col-span-1 bg-[#F5F5F5] rounded-3xl shadow-inner p-4">
              <h2
                className={`font-semibold mb-4 text-2xl ${
                  isAudioEnded ? "text-[#2A6F97]" : "text-[#4A4A4A]"
                }`}
              >
                {isAudioEnded
                  ? isEnglish
                    ? "Final Report"
                    : "Informe Final"
                  : isEnglish
                    ? "Summary"
                    : "Resumen"}
              </h2>
              <div className="text-[#4A4A4A] text-justify">
                {findCurrentSummary()}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}