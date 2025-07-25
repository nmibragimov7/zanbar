import React, {PropsWithChildren} from 'react';

import Sidebar from "@/widgets/MainLayout/Sidebar/Sidebar";
import Header from "@/widgets/MainLayout/Header/Header";
import Footer from "@/widgets/MainLayout/Footer/Footer";

const MainLayout: React.FC<PropsWithChildren> = ({children}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <div className={"min-h-screen flex"}>
        <Sidebar visible={visible} setVisible={setVisible}/>
        <div className={"w-full flex flex-col relative md:ml-[312px] overflow-x-auto"}>
          <Header setVisible={setVisible}/>
          <div className={"grow mt-[68px] md:mt-[90px]"}>
            {children}
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
