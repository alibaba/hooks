import { Link, useLocale, useSiteData } from 'dumi';
import { version } from '../../../../packages/hooks/package.json';

export default function Logo() {
  const { themeConfig } = useSiteData();
  const locale = useLocale();
  return (
    <Link className="dumi-default-logo" to={'base' in locale ? locale.base : '/'}>
      <img src={themeConfig.logo as string} alt="ahooks" />
      <span className="ahooks-version">{version}</span>
    </Link>
  );
}
