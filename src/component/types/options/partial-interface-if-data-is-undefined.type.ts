export type PartialInterfaceIfDataIsUndefined<GData extends (object | undefined), GInterface> =
  GData extends object
    ? GInterface
    : Partial<GInterface>
  ;
