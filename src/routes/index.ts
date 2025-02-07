import { addLocaleToRoutePath } from '@/locales';
import appModules from '../modules';

export const routes = appModules.routes.map(addLocaleToRoutePath);
