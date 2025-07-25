import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const getDefaultStaticProps: GetStaticProps = async (context) => {
  const {locale} = context;

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ru')),
    },
  };
};