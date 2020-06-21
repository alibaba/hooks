import React from 'react';
import { BasePaginatedOptions, LoadMoreOptions, Options } from './types';

type Config = Options<any, any, any, any> | BasePaginatedOptions<any> | LoadMoreOptions<any>;

const ConfigContext = React.createContext<Config>({});
ConfigContext.displayName = 'UseRequestConfigContext';

export default ConfigContext;
