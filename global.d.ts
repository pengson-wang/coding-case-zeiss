import { CSSProp } from "styled-components"

declare module "react" {
  interface Attributes {
    name?: string
    css?: CSSProp
    id?: string
  }
}
