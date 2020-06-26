/**
 * @param eventFn - The variable to store the event function of a directive
*/

type TEventDirective = HTMLElement & {
  eventModifiers?: string;
  eventFn?: EventListenerOrEventListenerObject;
}

export default TEventDirective
