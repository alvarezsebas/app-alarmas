import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { codigoEventos } from "./constants";

const getNombreEvento = (type) => codigoEventos[type]

export default getNombreEvento;