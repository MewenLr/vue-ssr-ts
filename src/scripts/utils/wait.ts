export default (delay: number): Promise<void> => new Promise((res) => setTimeout(() => res(), delay))
