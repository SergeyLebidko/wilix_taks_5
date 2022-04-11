function* randomSequence(seq: string, count: number): Generator<string> {
    for (let index = 0; index < count; index++) {
        yield seq[Math.floor(Math.random() * seq.length)];
    }
}

export default randomSequence;
