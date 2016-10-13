import vm from "vm";

export function createApp(sandbox) {
  return vm.createConext(sandbox);
}

export function evalRequest(req, app) {
  const util = require('util');
  const vm = require('vm');

  const sandbox = {
  animal: 'cat',
  count: 2
  };

  const script = new vm.Script('count += 1; name = "kitty";');

  const context = new vm.createContext(sandbox);
  for (var i = 0; i < 10; ++i) {
  script.runInContext(context);
  }

  console.log(util.inspect(sandbox));

}
