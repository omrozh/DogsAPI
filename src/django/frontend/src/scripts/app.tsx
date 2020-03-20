// Load dependencies.
import axios from "axios";
import "bootstrap";

import "core-js";
import "regenerator-runtime/runtime";

// Configure Axios's default settings to better handle Django's CSRF tokens.
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
