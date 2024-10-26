import useUser from "../hooks/use-user";

const OnlyUnauthorizedRoute = ({ Component, ...props }) => {
  const { error, isLoading } = useUser();

  if (isLoading) {
    return <>123</>;
  }

  if (!error) {
    window.location = "/";
    return;
  }

  return <Component />;
};

export default OnlyUnauthorizedRoute;
