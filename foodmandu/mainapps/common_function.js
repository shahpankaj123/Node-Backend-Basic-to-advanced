const message = (mess) => {
  return { message: mess };
};

const is_none = (data) => {
  if (
    !data ||
    data.length < 1 ||
    data === null ||
    data === undefined ||
    data === ""
  ) {
    return true;
  }
  return false;
};

export { message, is_none };
