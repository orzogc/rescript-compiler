/***
Not supported in Firefox
*/
type t

type granularity = [#grapheme | #word | #sentence]

type options = {
  localeMatcher?: Intl_Common.localeMatcher,
  granularity?: granularity,
}

type pluralCategories = [
  | #zero
  | #one
  | #two
  | #few
  | #many
  | #other
]

type resolvedOptions = {locale: string, granularity: granularity}

type supportedLocalesOptions = {localeMatcher: Intl_Common.localeMatcher}

@new external make: (~locales: array<string>=?, ~options: options=?) => t = "Intl.Segmenter"

@val
external supportedLocalesOf: (array<string>, ~options: supportedLocalesOptions=?) => t =
  "Intl.Segmenter.supportedLocalesOf"

@send external resolvedOptions: t => resolvedOptions = "resolvedOptions"

@send external segment: (t, string) => Intl_Segments.t = "segment"
