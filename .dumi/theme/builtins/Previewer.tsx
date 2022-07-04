import Previewer from 'dumi-theme-default/src/builtins/Previewer';

export default (props) => {
  const dependencies = Object.assign({}, props.dependencies, {
    ahooks: {
      version: 'latest',
    },
  });

  return <Previewer {...props} dependencies={dependencies} />;
};
