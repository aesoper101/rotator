import Angle from "./src/angle.vue";

import { App } from "vue";

const install = (app: App) => {
  app.component(Angle.name, Angle);
};

export { Angle };
export default { install };
