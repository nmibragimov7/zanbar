import React from 'react';

import MainLayout from "@/widgets/MainLayout/MainLayout";

import {getDefaultStaticProps} from "@/shared/lib/getStaticProps";

const Index = () => {
  return (
    <>
      <MainLayout>

      </MainLayout>
    </>
  );
};

export default Index;
export const getStaticProps = getDefaultStaticProps;