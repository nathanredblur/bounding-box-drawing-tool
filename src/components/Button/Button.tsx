import { FC } from "react";
import styles from "./Button.module.scss";

type Props = {
  onClick?: () => void;
  className?: string;
  disable?: boolean;
}

export const Button: FC<Props> = ({children, onClick, className, disable}) => {
  return <a 
    className={`${styles.Button} ${disable && styles.Disable} ${className}`} 
    onClick={() => !disable && onClick && onClick()}>{children}</a>;
};
