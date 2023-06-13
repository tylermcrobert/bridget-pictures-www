export default function decrement(num: number, length: number) {
  return (num + length - 1) % length;
}
