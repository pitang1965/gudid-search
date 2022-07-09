import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  to: string;
};

export default function Link({ children, to }: Props) {
  return (
    <div>
      <a href={to}>{children}</a>
    </div>
  );
}
