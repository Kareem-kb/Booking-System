
import GoogleButton from './GoogleButton';

interface GoogleButtonWrapperProps {
  user: any;
}

export default function GoogleButtonWrapper({
  user,
}: GoogleButtonWrapperProps) {
  return <GoogleButton user={user} />;
}
