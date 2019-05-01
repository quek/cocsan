function roll(dice: number) {
  return Math.floor(Math.random() * Math.floor(dice));
}

export default {
  roll1D4: () => {
    return roll(4);
  },
  roll1D6: () => {
    return roll(6);
  },
  roll2D6: () => {
    return roll(6) + roll(6);
  },
  roll3D6: () => {
    return roll(6) + roll(6) + roll(6);
  },
  roll4D6: () => {
    return roll(6) + roll(6) + roll(6) + roll(6);
  }
};
