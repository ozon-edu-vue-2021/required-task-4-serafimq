export function debounce(t, f) {
  const calls = {};

  return function (args) {
    const prevCall = calls.lastCall;
    calls.lastCall = Date.now();

    if (prevCall && calls.lastCall - prevCall <= t) {
      clearTimeout(calls.lastCallTimer);
    }
    calls.lastCallTimer = setTimeout(() => f(args), t);
  };
}
