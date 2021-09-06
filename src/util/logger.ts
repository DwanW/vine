const logger =
  (store: { getState: () => any }) =>
  (next: (arg0: any) => any) =>
  (action: any) => {
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    return result;
  };

export default logger;
