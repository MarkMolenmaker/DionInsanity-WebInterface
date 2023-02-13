import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitch,
} from "@fortawesome/free-brands-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faTwitch);

export { FontAwesomeIcon };
