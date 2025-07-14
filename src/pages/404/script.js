import { header } from "../../components/header.js";
import { footer } from "../../components/footer.js";

const app = document.querySelector("#app4");
app.prepend(header());
document.body.append(footer());