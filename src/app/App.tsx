import routes, { renderRoutes } from '@src/modules/shared/routes';
import { useAppSelector } from '@src/modules/shared/store';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { AnimationProvider } from '@src/modules/shared/layout/MainLayout/context/animationContext';

const App = () => {
  // get translation.json file from public/locales
  const { i18n } = useTranslation('translation');

  document.body.dir = i18n?.dir();

  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <AnimationProvider>
      <div id={theme}>
        <Helmet>
          <title>SoftyShop</title>
        </Helmet>

        {renderRoutes(routes)}
      </div>
    </AnimationProvider>
  );
};

export default App;
