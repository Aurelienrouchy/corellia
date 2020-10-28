import React, { createContext, useReducer, useContext } from "react";

type Action = { 
  type: "setProfileProperty" | "setNextIsVisible" | "increment" | "decrement",
  payload: any
};
type State = { 
  count: number,
  profile: any,
  nextIsVisible: boolean
};
type OnBoardingProviderProps = { children: React.ReactNode };

const initialeState = {
  nextIsVisible: false,
  profile: {
    "gender": undefined,
    "bio": undefined,
    "birth_date": undefined,
    "email": undefined,
    "interested_in": undefined,
    "first_name": '',
    "last_name": '',
    "photos": [],
    "photo_provider": [],
    "provider": undefined,
    "provider_id": undefined,
  },
  count: 0
};

const OnBoardingStateContext = createContext(initialeState);

function onBoardingReducer(state: State, action: Action): any {
  switch (action.type) {
    case "increment": {
      return { ...state, count: state.count + 1 } 
    }
    case "decrement": {
      return { ...state, count: state.count - 1 } 
    }
    case "setProfileProperty": {
      if (!action.payload) {
        return;
      }
      const { property, val } = action.payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          [property]: val
        }
      };
    }
    case "setNextIsVisible": {
      if (!action.payload) {
        return;
      }
      const { nextIsVisible } = action.payload;
      console.log(nextIsVisible)
      return { ...state, nextIsVisible }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const OnBoardingProvider = ({ children }: OnBoardingProviderProps) => {
  const contextValue = useReducer(onBoardingReducer, initialeState);
  return (
    <OnBoardingStateContext.Provider value={contextValue}>
      {children}
    </OnBoardingStateContext.Provider>
  );
};

export const useOnBoarding = (): any => {
  const contextValue = useContext(OnBoardingStateContext);
  return contextValue;
};

// function OnBoardingProvider({ children }: OnBoardingProviderProps) {
//   const [state, dispatch] = useReducer(onBoardingReducer, initialeState);
//   return (
//     <OnBoardingStateContext.Provider value={state}>
//       <OnBoardingDispatchContext.Provider value={dispatch}>
//         {children}
//       </OnBoardingDispatchContext.Provider>
//     </OnBoardingStateContext.Provider>
//   );
// }

// function useOnBoardingState() {
//   const context = useContext(OnBoardingStateContext);
//   if (context === undefined) {
//     throw new Error(
//       "useOnBoardingState must be used within a onBoardingProvider"
//     );
//   }
//   return context;
// }

// function useOnBoardingDispatch() {
//   const context = useContext(OnBoardingDispatchContext);
//   if (context === undefined) {
//     throw new Error(
//       "useOnBoardingDispatch must be used within a onBoardingProvider"
//     );
//   }
//   return context;
// }

// const useOnBoarding = (): [State, any] => [useOnBoardingState(), useOnBoardingDispatch()];

// export { OnBoardingProvider, useOnBoarding };
