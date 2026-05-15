function createMutex() {
  let tail = Promise.resolve();
  return function withLock(task) {
    const run = tail.then(task, task);
    tail = run.catch(() => {});
    return run;
  };
}

module.exports = { createMutex };
