import App from '@/app';
import AcronymsRoute from '@routes/acronyms.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AcronymsRoute()]);

app.listen();
