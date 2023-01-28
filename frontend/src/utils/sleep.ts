export default async function sleep(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise(r => setTimeout(r, ms));
}
