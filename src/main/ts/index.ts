import ConsoleApplication from "./ConsoleApplication";
process.on('unhandledRejection', console.dir);

// Support source map.
require('source-map-support').install()
process.on('unhandledRejection', console.log);

const app = new ConsoleApplication();
app.run(process.argv);
