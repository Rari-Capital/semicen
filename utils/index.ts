export const gweiToWei = (gwei: string | number) => {
  return 1e9 * parseFloat(gwei.toString());
};

export const nullAddress = "0x0000000000000000000000000000000000000000";
