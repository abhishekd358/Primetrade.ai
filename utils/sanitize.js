import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const sanitize = (badUserInput) => {
  return DOMPurify.sanitize(badUserInput);
};