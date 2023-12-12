import { useSelector } from "react-redux";

const withGuard = (Component) => {
  const Wrapped = (props) => {
    const { isLoggedIn } = useSelector((state) => state.authSlice);

    return isLoggedIn ? (
      <Component {...props} />
    ) : (
      <div>Please LogIn First</div>
    );
  };
  return Wrapped;
};

export default withGuard;
