export type InferComponentInitFunctionReturn<GData extends (object | undefined)> =
  GData extends object
    ? GData
    : (GData | undefined | void)
  ;
