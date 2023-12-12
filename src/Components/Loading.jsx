import { cloneElement } from "react";

const Loading = ({ loading, error, children }) => {
  const elementType = children.type.displayName;

  if (elementType === "Button") {
    const cloneButton = cloneElement(
      children,
      { disabled: true },
      "Loading..."
    );
    return (
      <>
        {loading ? (
          cloneButton
        ) : error ? (
          <>
            {children}
            <p colSpan={3}>
              <br />
              {error}
            </p>
          </>
        ) : (
          children
        )}
      </>
    );
  }
  return (
    <>
      {loading ? (
        <p colSpan={3}>Loading...</p>
      ) : error ? (
        <p colSpan={3}>{error}</p>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
