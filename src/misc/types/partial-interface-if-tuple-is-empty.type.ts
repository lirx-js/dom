
export type PartialInterfaceIfTupleIsEmpty<GTuple extends readonly any[], GInterface> =
  GTuple extends []
    ? Partial<GInterface>
    : GInterface
  ;
