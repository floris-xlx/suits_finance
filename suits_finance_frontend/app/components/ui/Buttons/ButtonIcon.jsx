import React, { Fragment } from 'react';

import { Button } from '@nextui-org/react';

const ButtonIcon = ({
  onPress,
  children,
  margin = null,
  hide = false,
  border = false,
  transparent = true,
}) => {

  if (hide) {
    return <Fragment />;
  }

  return (
    <Button
      className={`items-center justify-center text-sm font-semibold text-primary ${transparent ? 'bg-transparent' : 'bg-primary'} hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-primary rounded-md ${border ? 'border border-primary sm:border-transparent' : ''} p-[6px] pb-[6px] pt-[6px] !w-[45px] !h-[45px]`}
      variant="flat"
      isIconOnly={true}
      onPress={() => onPress()}
    >
      {children}
    </Button>
  );
}

export default ButtonIcon;