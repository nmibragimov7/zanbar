import React, {PropsWithChildren} from 'react';

const FormLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <div className={"min-h-screen flex"}>
        <div className={"w-full flex flex-col md:ml-[312px]"}>
          <div className={"grow px-3 md:px-5"}>
            <div className={"w-full"}>
              <div className={"w-full max-w-[790px] mb-6 md:my-6"}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;