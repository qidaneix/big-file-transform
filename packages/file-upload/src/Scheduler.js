export class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.limit = limit;
    this.count = 0;
  }

  add(fn) {
    this.queue.push(fn);
  }

  taskStart() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }

  async request() {
    if (!this.queue.length || this.count >= this.limit) return;
    this.count++;
    const fn = this.queue.shift();
    try {
      await fn();
      this.count--;
      this.request();
    } catch {
      // retry
      fn();
    }
  }
}
