// Generated by ReScript, PLEASE EDIT WITH CARE


async function topLevelAsyncFunction() {
  for (let innerScopeVal = 0; innerScopeVal <= 3; ++innerScopeVal) {
    let asyncClosureAccessingScopedVal = async () => {
      console.log("Accessing scoped var inside loop", innerScopeVal);
      return await Promise.resolve();
    };
    await asyncClosureAccessingScopedVal();
  }
}

topLevelAsyncFunction();

export {
  topLevelAsyncFunction,
}
/*  Not a pure module */
