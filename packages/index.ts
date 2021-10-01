import { App, Plugin } from "vue";
import Angle from "./Angle";

const AnglePlugin: Plugin = {
  install: (app: App) => {
    app.component(Angle.name, Angle);
  },
};

export { Angle };
export default AnglePlugin;
