import ConsoleApplication from "./ConsoleApplication";
process.on('unhandledRejection', console.dir);
const app = new ConsoleApplication();
app.run(process.argv);
