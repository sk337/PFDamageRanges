interface Stats {
  ranges: number[][];
  torso: number;
  head: number;
  multiplier: number;
}

export function parseStats(
  ranges: number[][],
  torso: number,
  head: number,
  multiplier: number
): Stats {
  if (!ranges || !torso || !head || !multiplier) {
    throw new Error("Invalid stats");
  }

  const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);
  if (sortedRanges.length < 2) {
    throw new Error("Invalid ranges");
  }

  return {
    ranges,
    torso,
    head,
    multiplier,
  };
}
