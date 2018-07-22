import Arguments from './Arguments';

let argumentsInstance = null;

export default function getArgumentsInstance() {
  if (!argumentsInstance) {
    argumentsInstance = new Arguments();
  }

  return argumentsInstance;
}
