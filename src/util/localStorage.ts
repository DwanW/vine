
export const loadState = () => {
  try {
    // state is in json format
    const serializedState = localStorage.getItem("vine-state");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("vine-state", serializedState);
  } catch (error) {
    console.log("failed to save to localStorage");
  }
};
