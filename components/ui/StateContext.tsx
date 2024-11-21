import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define State Type
interface State {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  currentSummary: string;
  currentMessage: string | null;
  currentEmotion: string;
  isEnglish: boolean;
  player1: YT.Player | null; // YouTube Player for video 1
  player2: YT.Player | null; // YouTube Player for video 2
}

// Define Action Types
type Action =
  | { type: "TOGGLE_PLAY"; payload: "player1" | "player2" }
  | { type: "TOGGLE_MUTE"; payload: "player1" | "player2" }
  | {
      type: "SET_CURRENT_TIME";
      payload: { player: "player1" | "player2"; time: number };
    }
  | {
      type: "SET_DURATION";
      payload: { player: "player1" | "player2"; duration: number };
    }
  | {
      type: "SET_PLAYER";
      payload: { player: "player1" | "player2"; instance: YT.Player };
    }
  | { type: "SET_CURRENT_SUMMARY"; payload: string }
  | { type: "SET_CURRENT_MESSAGE"; payload: string | null }
  | { type: "SET_CURRENT_EMOTION"; payload: string }
  | { type: "TOGGLE_LANGUAGE" };

// Initial State
const initialState: State = {
  isPlaying: false,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  currentSummary: "Loading...",
  currentMessage: null,
  currentEmotion: "Neutral",
  isEnglish: true,
  player1: null,
  player2: null,
};

// Reducer Function
const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_PLAY":
      const playerToPlay =
        action.payload === "player1" ? state.player1 : state.player2;
      if (playerToPlay) {
        if (state.isPlaying) {
          playerToPlay.pauseVideo();
        } else {
          playerToPlay.playVideo();
        }
      }
      return { ...state, isPlaying: !state.isPlaying };

    case "TOGGLE_MUTE":
      const playerToMute =
        action.payload === "player1" ? state.player1 : state.player2;
      if (playerToMute) {
        if (state.isMuted) {
          playerToMute.unMute();
        } else {
          playerToMute.mute();
        }
      }
      return { ...state, isMuted: !state.isMuted };

    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload.time };

    case "SET_DURATION":
      return { ...state, duration: action.payload.duration };

    case "SET_PLAYER":
      return {
        ...state,
        [action.payload.player]: action.payload.instance,
      };

    case "SET_CURRENT_SUMMARY":
      return { ...state, currentSummary: action.payload };

    case "SET_CURRENT_MESSAGE":
      return { ...state, currentMessage: action.payload };

    case "SET_CURRENT_EMOTION":
      return { ...state, currentEmotion: action.payload };

    case "TOGGLE_LANGUAGE":
      return { ...state, isEnglish: !state.isEnglish };

    default:
      return state;
  }
};

// Context Types
interface StateContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Create Context
const StateContext = createContext<StateContextProps | undefined>(undefined);

// Provider Component Props
interface StateProviderProps {
  children: ReactNode;
}

// Provider Component
export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom Hook to Use Context
export const useStateContext = (): StateContextProps => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
