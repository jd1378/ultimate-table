import { h, withDirectives } from "vue"
import { VueLive } from "vue-live";
import layout from "./vue-live-layout.vue";
import {gripDirective} from "../directives/grip_directive"

export default (props) => {
  if (props.resizable) {
    return withDirectives(h(VueLive, { ...props, layout }), [[gripDirective]])
  } else {
    return h(VueLive, { ...props, layout })
  }
}
